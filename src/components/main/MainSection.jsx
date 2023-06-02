import React from 'react'
import MainTopBar from './MainTopBar'
import MessageContainer from './MessageContainer'
import MessageInputBox from './MessageInputBox'
import { messageList } from '../../messageList'

export default function MainSection() {

  return (
    <>
      <MainTopBar />
      <div id="message-container">
        <MessageContainer messageList={messageList.data} />
      </div>
      <MessageInputBox />
    </>
  )
}