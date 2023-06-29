import React from 'react'

export default function Message({ message, time, owner }) {

  // Metodo per assegnare la tipologia messaggio (sent o received), necessario per lo stile
  let classType = ''
  let classTime = ''
  if (owner === localStorage.getItem("currentUserId")) {
    classType = "sent-message"
    classTime = "sent-message-time"
  } else {
    classType = "received-message"
    classTime = "received-message-time"
  }

  return (
    <div id={"UserId:" + owner} className={classType}>
      <p className={classTime}>{time}</p>
      <p className="message-text">{message}</p>
    </div>
  )
}