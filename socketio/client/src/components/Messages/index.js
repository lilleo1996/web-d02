import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import ReactEmoji from "react-emoji";
import './style.scss'

const Messages = ({ messages, user }) => {

  const renderMessage = (message) => {
    let isSentByCurrentUser = false;
    let author

    if (message.user.email === user.email) {
      isSentByCurrentUser = true;
    }

    if (typeof message.user === 'string'){
      author = message.user
    } else {
      author = `${message.user.lastName} ${message.user.firstName}`
    }

    return isSentByCurrentUser ? (
      <div className="message message--justify-end">
        <p className="message__sent-text pr-10">{author}</p>
        <div className="message__box message--bg-blue">
          <p className="message__text message--color-white">
            {ReactEmoji.emojify(message.message)}
          </p>
        </div>
      </div>
    ) : (
      <div className="message message--justify-start">
        <div className="message__box message--bg-light">
          <p className="message__text message--color-dark">
            {ReactEmoji.emojify(message.message)}
          </p>
        </div>
        <p className="message__sent-text pl-10 ">{author}</p>
      </div>
    );
  };

  return (
    <ScrollToBottom className="messages">
      {messages.map((message, index) => (
        <div key={index}>{renderMessage(message)}</div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
