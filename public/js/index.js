const socket = io();
        socket.on("connect", function() {
            console.log("Connected to server");

            socket.emit("createMessage", {
                from: "Hugh Mongus",
                text: "Do you want to know my name?"
            });
        });

        socket.on("disconnect", function() {
            console.log("Disconnected from server");
        });

        socket.on("newMessage", function(message) {
            console.log("New Message: ", message);
        });
