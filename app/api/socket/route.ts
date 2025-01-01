import { Server } from "socket.io";
// nextjs 15
export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Starting socket.io server...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected", socket.id);

      socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  }
  res.end();
}