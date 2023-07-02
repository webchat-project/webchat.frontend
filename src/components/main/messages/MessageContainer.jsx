import React from 'react'
import Message from './Message'

export default function MessageContainer({ messageList, lastAccess }) {

  return messageList.map(m => <Message message={m.description} image={m.image} time={m.time} owner={m.idSender} key={m.time} lastAccess={lastAccess}/>)

}