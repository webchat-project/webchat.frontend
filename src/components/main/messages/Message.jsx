import React from 'react'

export default function Message({ message, time, owner }) {

  // Metodo per assegnare la tipologia messaggio (sent o received), necessario per lo stile
  let classType = ''
  let classTime = ''
  let content = ''
  if (owner === localStorage.getItem("currentUserId")) {
    classType = "sent-message"
    classTime = "sent-time-date-container"
    content = '✓'
  } else {
    classType = "received-message"
    classTime = "received-time-date-container"
    content = ''
  }

  // Conversione data
  let date = new Date(time);
  time = date.toLocaleTimeString().slice(0, 5);
  date = date.toLocaleDateString()

  return (
    <div className={classType}>
      <div className={classTime}>
        <p className="message-time">{time}</p>
        <p className="message-date">{date}</p>
        <p className="message-status">{content}</p>
      </div>
      <p className="message-text">{message}</p>
    </div>
  )
}