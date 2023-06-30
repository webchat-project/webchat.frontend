import React from 'react'
import Message from './Message'

export default function MessageContainer({ messageList }) {

  return messageList.map(m => <Message message={m.description} time={m.time} date={m.date} owner={m.idSender} key={m._id} />)

}