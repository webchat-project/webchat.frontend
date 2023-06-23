import React from 'react'

export default function Message({ message, owner }) {

  // Metodo per assegnare la tipologia messaggio (sent o received), necessario per lo stile
  let classType = ''
  if (owner === localStorage.getItem("currentUserId")) {
    classType = "sent-message"
  } else {
    classType = "received-message"
  }

  return (
    <div id={"UserId:" + owner} className={classType}>
      <p className="message-text">{message}</p>
    </div>
  )
}