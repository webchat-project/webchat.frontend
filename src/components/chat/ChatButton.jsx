import React from "react";

export default function ChatButton({ chat, handleClick }) {
  return (
    <div id={"contact: " + chat.id} className="chat-button" onClick={handleClick}>
      <div className="chat-button-container">
        <div className="image-container">
          <img alt="ProfilePicture" src={chat.picture}></img>
        </div>
        <div className="text-container">
          <h3>{chat.name}</h3>
          <p>{chat.message}</p>
        </div>
      </div>
    </div>
  );
}
