import React, { useState } from "react";
import MainTopBar from "./MainTopBar";

import DefaultMessage from "../message/DefaultMessage";
import MessageContainer from "../message/MessageContainer";
import MessageInputBox from "../message/MessageInputBox";

export default function MainSection({ messageList }) {
  return (
    <>
      {messageList === 0 ? (
        <DefaultMessage />
      ) : (
        <>
          <MainTopBar />
          <div id="message-container">
            <MessageContainer messageList={messageList} />
          </div>
          <MessageInputBox />
        </>
      )}
    </>
  );
}
