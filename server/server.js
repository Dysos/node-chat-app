const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public");


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3002;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the server"));
    socket.broadcast.emit("newMessage", generateMessage("Admin", "A new user has joined the server"));

    //socket.emit from admin text welcome to the chat app
    //socket.broadcast.emit from admin text new user joined

    socket.on("createMessage", (message, callback) => {
        //console.log("New Message: ", message);
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("This is from the server");
       /* socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected");
    });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});