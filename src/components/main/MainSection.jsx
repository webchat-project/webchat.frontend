import React from "react";
import MainTopBar from "./MainTopBar";

import DefaultMessage from "../message/DefaultMessage";
import MessageContainer from "../message/MessageContainer";
import MessageInputBox from "../message/MessageInputBox";

export default function MainSection({ data }) {

  const handleSubmit = (input) => {

    const messageContainer = document.getElementById('message-container');

    const sentMessage = document.createElement('div');
    sentMessage.className = "sent-message"

    const message = document.createElement('p');
    message.className = "message-text"
    message.innerText = input

    sentMessage.appendChild(message)

    messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

  }

  return (
    <>
      {data.messages.length === 0 ? (
        <DefaultMessage />
      ) : (
        <>
          <MainTopBar user={data.user[0][0]} />
          <div id="message-container">
            <MessageContainer messageList={data.messages[0]} />
          </div>
          <MessageInputBox handleSubmit={handleSubmit} />
        </>
      )}
    </>
  );
}
