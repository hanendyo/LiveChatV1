const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`[SERVER] USER CONNECTED: `, socket.id);

  // join room
  socket.on("join_room", ({ room }) => {
    socket.join(room);
    console.log(`user with id: ${socket.id} has joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    console.log(`live_message: `, data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`[SERVER] USER DISCONNECTED: `, socket.id);
  });
});

server.listen(3001, () => {
  console.log(`SERVER IS RUNNING`);
});
