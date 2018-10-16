const socket = io();


        function scrollToBottom() {
            //selectors

            const messages = document.querySelector("#messages");
            const newMessage = messages.children[messages.children.length - 1];
            const clientHeight = messages.clientHeight;
            const scrollTop = messages.scrollTop;
            const scrollHeight = messages.scrollHeight;
            const newMessageHeight = newMessage.clientHeight;
            let lastMessageHeight = 0;
            if(newMessage.previousElementSibling) {
                lastMessageHeight  = newMessage.previousElementSibling.clientHeight;
            }
            if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
                messages.scrollTop = scrollHeight;
                
            }

           /* const messages = document.querySelector("#messages");
            const newMessage = messages.children("li:last-child");
            const clientHeight = messages.prop("clientHeight");
            const scrollTop = messages.prop("scrollTop");
            const scrollHeight = messages.prop("scrollHeight");
            const newMessageHeight = newMessage.innerHeight();
            const lastMessageHeight = newMessage.prev().innerHeight();

            if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
                messages.scrollTop(scrollHeight);
            }*/
        }
        socket.on("connect", function() {
            const params = jQuery.deparam(window.location.search);

            socket.emit("join", params, function (err) {
                if(err) {
                    alert(err);
                    window.location.href="/";
                } else {
                    console.log("No Error");
                }
            });
        });

        socket.on("disconnect", function() {
            console.log("Disconnected from server");
        });


        socket.on("updateUserList", function(users) {
            console.log(users);
            const ol = document.createElement("ol");
            users.forEach(function(user) {
               // ol.append(jQuery("<li></li>").text(user))
               const li = document.createElement("li");
               li.appendChild(document.createTextNode(user));
               ol.appendChild(li);
            });
           // document.querySelector("#users").children = null;
            //document.querySelector("#users").innerHTML = "";
            document.querySelector("#users").innerHTML = "";
            document.querySelector("#users").appendChild(ol);
            //jQuery("#users").html(ol);
        });

        socket.on("updateRoomList", function(rooms) {
            const ol = document.createElement("ol");
            rooms.forEach(function(room) {
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(room.name));
                ol.appendChild(li);
            });
            document.querySelector("#rooms").innerHTML = "";
            document.querySelector("#rooms").appendChild(ol);
        });


        socket.on("newMessage", function(message) {
            const formattedTime = moment(message.createdAt).format("HH:mm");
            //const template = jQuery("#message-template").html();
            const template = document.querySelector("#message-template").innerHTML;
            const html = Mustache.render(template, {
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });

            //jQuery("#messages").append(html);
            document.querySelector("#messages").innerHTML += html;
            //console.log("yep");
            scrollToBottom();
            
            /*console.log("New Message: ", message);
            const li = jQuery("<li></li>");
            li.text(`${message.from} ${formattedTime}: ${message.text}`);

            jQuery("#messages").append(li);*/

        });
        /*
        socket.emit("createMessage", {
            from: "Frank",
            text: "What up tho"
        }, function (data) {
            console.log("GOt it", data);
        });*/

        socket.on("newLocationMessage", function(message) {
            const formattedTime = moment(message.createdAt).format("h:mm a");
            //const template = jQuery("#location-message-template").html();
            const template = document.querySelector("#location-message-template").innerHTML;
            const html = Mustache.render(template, {
                url: message.url,
                from: message.from,
                createdAt: formattedTime
            });

            //jQuery("#messages").append(html);
            document.querySelector("#messages").innerHTML += html;
            scrollToBottom();
            /*const li = jQuery("<li></li>");
            const a = jQuery("<a target='_blank'>My current location</a>");

            li.text(`${message.from} ${formattedTime}: `);
            a.attr("href", message.url);

            li.append(a);

            jQuery("#messages").append(li);*/
        });
        document.querySelector("#message-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const messageTextBox = document.querySelector(".messageInput");
            socket.emit("createMessage", {
                text: messageTextBox.value,
            }, function() {
                messageTextBox.value = "";
            });
        });


        /*jQuery("#message-form").on("submit", function(e) {
            e.preventDefault();

            const messageTextbox = jQuery("[name=message]");

            socket.emit("createMessage", {
                text: messageTextbox.val()
            }, function() {
                messageTextbox.val("");
            });
        });*/

        //const locationButton = jQuery("#send-location");
        const locationButton = document.querySelector("#send-location");

        locationButton.addEventListener("click", function(e) {
            if(!navigator.geolocation) {
                return alert("Geolocation is not supported by your browser");
            }

            locationButton.setAttribute("disabled", "disabled");
            locationButton.textContent = "Sending location...";

            navigator.geolocation.getCurrentPosition(function(position) {
                locationButton.removeAttribute("disabled");
                locationButton.textContent = "Send location";
                socket.emit("createLocationMessage", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            
            }, function(e) {
                alert("Unable to fetch location");
                locationButton.removeAttribute("disabled");
                locationButton.textContent = "Send location";
            });

        });
/*
        locationButton.on("click", function(e) {
            if(!navigator.geolocation) {
                return alert("Geolocation not supported by your browser");
            }

            locationButton.attr("disabled", "disabled").text("Sending location...");

            navigator.geolocation.getCurrentPosition(function(position) {
                locationButton.removeAttr("disabled").text("Send location");
                socket.emit("createLocationMessage", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function(e) {
                alert("Unable to fetch location");
                locationButton.removeAttr("disabled").text("Send location"
                );
            });
        });*/
