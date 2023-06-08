import React from "react";
import ChatButton from "./ChatButton";

export default function ChatContainer({ chatList, handleChatClick }) {
  return chatList.map((c) => (
    <ChatButton
      chat={c}
      handleClick={() => handleChatClick(c.id)}
      key={c.id}
    />
  ));
}
