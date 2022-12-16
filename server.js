import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { formatMessage } from "./utils/messages.js";
import { addUser, getUser, removeUser, getRoomUsers } from "./utils/users.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());

//only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, handleError) => {
    const { user, error } = addUser({ id: socket.id, username, room });
    if (error) return handleError(error);

    socket.join(user.room);
    socket.emit(
      "message",
      formatMessage(`Welcome to ChatRoom, ${user.username}!`)
    );
    socket.on("chat message", (msg) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", formatMessage(msg, user.username));
    });
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage(`${user.username} has joined the chat!`));
    io.to(user.room).emit("room users", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(`${user.username} has left the chat!`)
      );
      io.to(user.room).emit("room users", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
