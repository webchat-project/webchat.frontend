import React from 'react'
import ChatButton from './ChatButton'

export default function ChatContainer({chatList, action}) {
  
  return chatList.map(c => <ChatButton chat={c} action={action} key={c.id}/>)
}