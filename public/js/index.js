const socket = io();
        socket.on("connect", function() {
            console.log("Connected to server");
            /*
            socket.emit("createMessage", {
                from: "Hugh Mongus",
                text: "Do you want to know my name?"
            });*/
        });

        socket.on("disconnect", function() {
            console.log("Disconnected from server");
        });

        socket.on("newMessage", function(message) {
            console.log("New Message: ", message);
            const li = jQuery("<li></li>");
            li.text(`${message.from}: ${message.text}`);

            jQuery("#messages").append(li);
        });
        /*
        socket.emit("createMessage", {
            from: "Frank",
            text: "What up tho"
        }, function (data) {
            console.log("GOt it", data);
        });*/

        jQuery("#message-form").on("submit", function(e) {
            e.preventDefault();
            socket.emit("createMessage", {
                from: "User",
                text: jQuery("[name=message]").val()
            }, function() {

            });
        });
