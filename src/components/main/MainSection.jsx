import React, { useState } from "react";
import MainTopBar from "./MainTopBar";

import DefaultMessage from "../message/DefaultMessage";
import MessageContainer from "../message/MessageContainer";
import MessageInputBox from "../message/MessageInputBox";

export default function MainSection({ data }) {
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
          <MessageInputBox />
        </>
      )}
    </>
  );
}
