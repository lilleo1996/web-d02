const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");

const usersRoute = require("./routes/users.route");
const loginRoute = require("./routes/login.route");
const postsRoute = require("./routes/posts.route");
const messagesRoute = require("./routes/messages.route");
const UserUtils = require("./utils/UserUtils")

const {addUser, getUsers, removeUser} = UserUtils

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/social-network-app", (err) => {
  if (err) {
    console.log(`Cannot connect to mongodb: ${err.toString()}`);
  }
});

app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/posts", postsRoute);
app.use("/messages", messagesRoute);

io.on("connect", (socket) => {
  socket.on("join", (user) => {
    console.log("🚀 ~ file: index.js ~ line 37 ~ socket.on ~ user", user)
    addUser(user)
    
    socket.emit("message", {
      user: "Admin",
      text: `Welcome ${user.lastName} ${user.firstName} (${user.email}).`,
    });

    socket.broadcast
      .emit("message", {
        user: "Admin",
        text: `${user.lastName} ${user.firstName} joined chat group`,
      });

    io.emit('users', {users: getUsers()});
  });

  socket.on("sendMessage", (user, message, callback) => {
    socket.broadcast.emit("message", { user, message });
    io.emit('message', { user, message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.lastName} ${user.firstName} just left chat group`,
      });

      io.emit('users', {users: getUsers(user.room)});
    }
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
