const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3002;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", {
        from: "Dysos",
        text: "Waddup",
        createdAt: new Date().toString()
    });

    socket.on("createMessage", (message) => {
        console.log("New Message: ", message);
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected");
    });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});