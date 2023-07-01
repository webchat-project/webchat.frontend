import React from 'react'
import Message from './Message'

export default function MessageContainer({ messageList }) {

  return messageList.map(m => <Message message={m.description} time={m.time} owner={m.idSender} key={m.time} />)

}