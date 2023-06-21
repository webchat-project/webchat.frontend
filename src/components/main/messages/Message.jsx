import React from 'react'

export default function Message({message, owner}) {
  return(
    <div className={owner}>
        <p className="message-text">{message}</p>
    </div>
  )
}