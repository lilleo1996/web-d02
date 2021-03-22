import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from 'axios';

import { URL, ADD_MESSAGE_API } from "constants/variables";
import Messages from "../../components/Messages";
import Header from "../../components/HeaderChat";
import MessageEntry from "../../components/MessageEntry";
import 'style.scss'

let socket;

const Chat = ({ location }) => {
  const [email, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { user } = location.state
    console.log("🚀 ~ file: index.js ~ line 22 ~ useEffect ~ user", user)
    setUser(user)
    socket = io('localhost:8080')
    socket.emit("join", { user });
  }, [location.state]);

  useEffect(() => {
    axios.get(`${URL}/messages`)
    .then(function (response) {
      setMessages((messages) => [...messages, ...response.data.messages]);  
    })
    .catch(function (error) {
      console.log("error", error)
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      axios.post(ADD_MESSAGE_API, {
        room, email, text: message
      })
      .then(function (response) {
        console.log("response", response)   
      })
      .catch(function (error) {
        console.log("error", error)
      });
    }
  };

  return (
    <div className="chat">
      <div className="chat__box">
        <Header room={room} />
        <Messages messages={messages} email={email} />
        <MessageEntry
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
