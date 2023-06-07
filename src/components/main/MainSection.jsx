import React, { useState } from 'react'
import MainTopBar from './MainTopBar'

import DefaultMessage from '../message/DefaultMessage'
import MessageContainer from '../message/MessageContainer'
import MessageInputBox from '../message/MessageInputBox'
import { messageList } from '../../xyz/messageList'

export default function MainSection() {

  const [show, setShow] = useState(true);

  return (
    <>
      {show ? <DefaultMessage /> : (
        <>
          <MainTopBar />
          <div id="message-container">
            <MessageContainer messageList={messageList.data} />
          </div>
          <MessageInputBox />
        </>
      )}
    </>
  )
}