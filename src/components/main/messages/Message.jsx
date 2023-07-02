import React, { useEffect, useState } from 'react'

export default function Message({ message, image, time, owner, lastAccess }) {

  // Stato per mostrare foto o messaggio, oppure entrambi
  const [isMessage, setIsMessage] = useState(false);
  const [isImage, setIsImage] = useState(false);

  // Metodo per assegnare la tipologia messaggio (sent o received), necessario per lo stile
  let classType = ''
  let classTime = ''
  let content = ''
  if (owner === localStorage.getItem("currentUserId")) {
    classType = "sent-message"
    classTime = "sent-time-date-container"
   
    if(lastAccess === -1){
      content = '✓✓'
    }else{
      content = '✓'
    }
    
  } else {
    classType = "received-message"
    classTime = "received-time-date-container"
    content = ''
  }

  // Conversione data
  let date = new Date(time);
  time = date.toLocaleTimeString().slice(0, 5);
  date = date.toLocaleDateString()

  // Controllo tipologie messaggi
  useEffect(() => {
    setIsImage(!!image);
    setIsMessage(!!message);
  }, [image, message]);

  return (
    <div className={classType}>

      <div className={classTime}>
        <p className="message-time">{time}</p>
        <p className="message-date">{date}</p>
        <p className="message-status">{content}</p>
      </div>

      {isImage ? <img alt='img' className='message-image' src={`data:${image.contentType};base64,${image.data}`}></img> : <></>}
      {isMessage ? <p className="message-text">{message}</p> : <></>}
    </div>
  )
}