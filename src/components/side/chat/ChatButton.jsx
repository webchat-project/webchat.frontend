import React, { useState, useEffect } from "react";

export default function ChatButton({ chat, handleClick }) {

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (chat) => {
    if (chat.image === "") {
      setProfile("profile.png")
    } else {
      setProfile(chat.image)
    }
  }

  useEffect(() => {
    handleProfile(chat);
  }, [chat]);

  return (
    <div id={"contact: " + chat.chatId} className="chat-button" onClick={handleClick}>
      <div className="chat-button-container">
        <div className="image-container">
          <img alt="img" src={profile}></img>
        </div>
        <div className="text-container">
          <h3>{chat.firstName} {chat.lastName}</h3>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
    </div>
  );
}
