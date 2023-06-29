import React from "react";
import ChatButton from "./ChatButton";

export default function ChatContainer({ chatList, handleChatClick }) {

  const handleDisplay = () => {

    if (window.innerWidth <= 600) {
      document.getElementById("side-section").setAttribute("style", "visibility: hidden; display: none; width: 300px")
      document.getElementById("main-section").setAttribute("style", "visibility: visible; display: flex; width: 100%")
    } else {
      document.getElementById("side-section").setAttribute("style", "visibility: visible; display: block; width: 300px")
      document.getElementById("main-section").setAttribute("style", "visibility: visible; display: flex; width: calc(100% - 300px);")
    }
  }



  const handleClick = (id) => {
    handleChatClick(id);
    handleDisplay();
  }

  return chatList.map((c) => (
    <ChatButton
      chat={c}
      handleClick={() => handleClick(c.chatId)}
      key={c.chatId}
    />
  ));
}
