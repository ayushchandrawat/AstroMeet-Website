const { Server } = require("socket.io");

const socketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        // console.log("User connected: " + socket.id);

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        socket.on("offer", (data) => {
            socket.to(data.roomId).emit("offer", data.offer);
        });

        socket.on("answer", (data) => {
            socket.to(data.roomId).emit("answer", data.answer);
        });

        socket.on("ice-candidate", (data) => {
            socket.to(data.roomId).emit("ice-candidate", data.candidate);
        });

        socket.on("disconnect", () => {
            // console.log("User disconnected");
        });
    });
};

module.exports = socketServer;
