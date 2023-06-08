import React from "react";

export default function ChatButton({ chat, handleClick }) {
  return (
    <div id="chat-button" onClick={handleClick}>
      <div id="chat-button-container">
        <div id="image-container">
          <img alt="ProfilePicture" src={chat.picture}></img>
        </div>
        <div id="text-container">
          <h3>{chat.name}</h3>
          <p>{chat.message}</p>
        </div>
      </div>
    </div>
  );
}
