import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from 'axios';

import { URL } from "../../constants/variables";
import Messages from "../../components/Messages";
import Header from "../../components/HeaderChat";
import MessageEntry from "../../components/MessageEntry";
import './style.scss'

let socket;

const Chat = ({ location }) => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const { user } = location.state
    setUser(user);
    // connect io with http://localhost:8080
    socket = io(URL, {transports: ['websocket']});

    // join room chat
    socket.emit("join", { user });
  }, [location.state]);

  useEffect(() => {
    axios.get(`${URL}/messages`)
    .then(function (response) {
      setMessages((messages) => [...response.data.data.messages, ...messages]);  
    })
    .catch(function (error) {
      console.log("error", error)
    });

    // listen message which fired server
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // listen users which fired server
    socket.on("users", (users) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // send message to room chat
      socket.emit("sendMessage", user, message, () => setMessage(""));
      
      // save message to database, not effect 
      axios.post(`${URL}/messages`, {
        user, message
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
        <Header users={users} />
        <Messages messages={messages} user={user} />
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
