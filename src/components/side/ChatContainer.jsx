import React from 'react'
import ChatButton from './ChatButton'

export default function ChatContainer({chatList}) {
  
  return chatList.map(c => <ChatButton chat={c} />)
}