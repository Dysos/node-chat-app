const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const publicPath = path.join(__dirname, "../public");


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3002;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback("Please input valid info");
        }

        socket.join(params.room);
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
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
       /* socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected");
    });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});