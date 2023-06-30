import React from 'react'

export default function Message({ message, time, date, owner }) {

  // Metodo per assegnare la tipologia messaggio (sent o received), necessario per lo stile
  let classType = ''
  let classTime = ''
  if (owner === localStorage.getItem("currentUserId")) {
    classType = "sent-message"
    classTime = "sent-time-date-container"
  } else {
    classType = "received-message"
    classTime = "received-time-date-container"
  }

  return (
    <div className={classType}>
      <div className={classTime}>
        <p className="message-time">{time}</p>
        <p className="message-date">{date}</p>
      </div>
      <p className="message-text">{message}</p>
    </div>
  )
}