import React from 'react'
import Message from './Message'

export default function MessageContainer({messageList}) {

  return messageList.map(m => <Message message={m.message} owner={m.type}/>)
  
}