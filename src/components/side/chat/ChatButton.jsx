import React from "react";

export default function ChatButton({ chat, handleClick }) {

  return (
    <div id={"chat: " + chat.chatId} className="chat-button" onClick={handleClick}>
      <div className="chat-button-container">
        <div className="image-container">
          <img alt="img" src={chat.image} />
        </div>
        <div className="text-container">
          <h3>{chat.firstName} {chat.lastName} <span hidden={!chat.online} style={{ color: 'green', fontSize: '20px' }}>●</span></h3>
          <p id={"last-message: " + chat.chatId}>{chat.lastMessage}</p>
        </div>
      </div>
    </div>
  );
}
