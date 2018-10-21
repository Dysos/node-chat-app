const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users, Rooms} = require("./utils/users");
const publicPath = path.join(__dirname, "../public");


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
const rooms = new Rooms();
const port = process.env.PORT || 3002;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Please input valid info");
        }
        params.room = params.room.toLowerCase();
        socket.join(params.room.toLowerCase());
        //const newUser = new User(socket.id, params.name);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name);
        rooms.addRoom(params.room);

        users.addUserToRoom(socket.id, params.room);
        users.changeCurrentRoom(socket.id, params.room);

        //users.addUser(socket.id, params.name, params.room);
        io.emit("updateRoomList", rooms.getRoomList());
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Server", "Welcome to the server"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Server", `${params.name} has joined the server`));
        //socket.leave("The office fans");
        //socket.broadcast.emit -> socket.broadcast.to("the office fans").emit
        //socket.emit
        //io.emit -> io.to("The Office fans").emit
        callback();
    });

    //socket.emit from admin text welcome to the chat app
    //socket.broadcast.emit from admin text new user joined

    socket.on("createMessage", (message, callback) => {
        //console.log("New Message: ", message);
        const user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.currentRoom).emit("newMessage", generateMessage(user.name, message.text));
        }

        callback();
       /* socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on("createLocationMessage", (coords) => {
        const user = users.getUser(socket.id);
        if(user) {
            io.to(user.currentRoom).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
    });

    socket.on("joinRoom", (data) => {
        const user = users.getUser(socket.id);
        const previousRoom = user.currentRoom;
        if(user.currentRoom === data.name) {
            return false;
        }
        socket.join(data.name);
        users.changeCurrentRoom(socket.id, data.name);
        io.emit("updateRoomList", rooms.getRoomList());
        console.log()
        console.log("Users in new room: ", users.getUserList(data.name));
        io.to(data.name).emit("updateUserList", users.getUserList(data.name));
        io.to(previousRoom).emit("updateUserList", users.getUserList(previousRoom));
        socket.emit("updateUserList", users.getUserList(data.name));
        socket.emit("newMessage", generateMessage("Server", `Welcome to room ${data.name}`));
        socket.broadcast.to(data.name).emit("newMessage", generateMessage("Server", `${user.name} has joined the server`));
        socket.broadcast.to(previousRoom).emit("newMessage", generateMessage("Server", `${user.name} has left the room`))
    });

    socket.on("disconnect", () => {
        const user = users.removeUser(socket.id);

        if(user) {
            io.to(user.currentRoom).emit("updateUserList", users.getUserList(user.currentRoom));
            io.to(user.currentRoom).emit("newMessage", generateMessage("Server", `${user.name} has left the server.`));
        }
    });

    
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});