const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require("mongoose");
// import socket
const socketio = require("socket.io");
const cors = require("cors");

const UserUtils = require("./utils/UserUtils")
const usersRoute = require("./routes/users.route");
const loginRoute = require("./routes/login.route");
const postsRoute = require("./routes/posts.route");
// messages route
const messagesRoute = require("./routes/messages.route");

// utils
const {addUser, getUsers, removeUser} = UserUtils

const app = express();
const server = http.createServer(app);
// connect socketio with server
const io = socketio(server);
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/posts", postsRoute);
// use messages route
app.use("/messages", messagesRoute);

mongoose.connect("mongodb://localhost:27017/social-network-app", (err) => {
  if (err) {
    console.log(`Cannot connect to mongodb: ${err.toString()}`);
  }
});

// connect io from client
io.on("connect", (socket) => {
  // join room chat
  socket.on("join", ({user}) => {
    // add user to room chat
    addUser(user)

    // sending to the client who joined
    socket.emit("message", {
      user: "Admin",
      message: `Welcome ${user.lastName} ${user.firstName} (${user.email}).`,
    });
    
    // sending to all clients except client who joined
    socket.broadcast.emit("message", {
      user: "Admin",
      message: `${user.lastName} ${user.firstName} joined chat group`,
    });

    // sending to all connected clients
    io.emit('users', {users: getUsers()});
  });

  // send message to room chat
  socket.on("sendMessage", (user, message, callback) => {
    io.emit('message', { user, message });
    callback();
  });

  // out room chat
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      socket.broadcast.emit("message", {
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