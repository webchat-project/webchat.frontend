import React from 'react'
import MainTopBar from './MainTopBar'
import MessageContainer from '../message/MessageContainer'
import MessageInputBox from '../message/MessageInputBox'
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