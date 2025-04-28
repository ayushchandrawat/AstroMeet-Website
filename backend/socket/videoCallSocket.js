import { Server } from "socket.io";

const initializeVideoCallSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "http://localhost:3000" }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).emit("user-connected", userId);

            socket.on("disconnect", () => {
                socket.to(roomId).emit("user-disconnected", userId);
            });
        });

        socket.on("offer", (data) => {
            socket.to(data.room).emit("offer", data);
        });

        socket.on("answer", (data) => {
            socket.to(data.room).emit("answer", data);
        });

        socket.on("ice-candidate", (data) => {
            socket.to(data.room).emit("ice-candidate", data);
        });
    });
};

export default initializeVideoCallSocket;
