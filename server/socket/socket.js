const socketIO = require("socket.io");

const socketConnect = (server) => {
    const io = socketIO(server, {
            cors: {
            origin: "https://studio-fitness.vercel.app",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("setup", (userId) => {
            socket.join(userId);
        });

        socket.on("join chat", (room) => {
            socket.join(room);
        });

        socket.on("new message", (newMessage) => {
        if (!newMessage.conversation.participants) {
            return;
        }
        newMessage.conversation.participants.forEach((participant) => {
            if (newMessage.senderModel === "Trainer") {
                socket.in(participant.user._id).emit("message recieved", newMessage);
            } else {
            socket
                .in(participant.trainer._id)
                .emit("message recieved", newMessage);
            }
        });
        });

        socket.on("new call", (callLink) => {
            console.log(callLink);
            socket.in(callLink.userId).emit("trainer call", callLink.personalLink);
        });

        socket.on("disconnect", () => {
            console.log("Hello");
            console.log("A user disconnected");
        });
    });
};

module.exports = socketConnect;
