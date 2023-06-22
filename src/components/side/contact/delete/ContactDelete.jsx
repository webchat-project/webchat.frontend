import React, { useState, useEffect } from "react";

export default function ContactDelete({ contact }) {

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (contact) => {
    if (contact.image.trim() === "") {
      setProfile("profile.png")
    } else {
      setProfile(contact.image)
    }
  }

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);

  // Se true, vengono mostrati i due pulsanti annulla e invia
  const [addOption, setAddOption] = useState(false);

  // Al click sul contatto appaiono due pulsanti per annullare o inviare la richiesta
  const handleClick = () => {
    setAddOption(true)
  }

  // Metodo al click su annulla
  const handleAbort = () => {
    setTimeout(() => {
      setAddOption(false);
    }, 10);
  }

  // Metodo al click su invia, procede ad inviare la richiesta al backend
  const handleSend = () => {
    console.log("Invio richiesta per aggiungere " + contact.chatId)
    handleAbort();
  }


  return (
    <div id={"contact: " + contact.chatId} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={profile}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
        </div>
        {addOption === true ? <>
          <div id="feature-contact-button">
            <button id="abort-feature-contact-button" onClick={handleAbort}>
              Annulla
            </button>
            <button id="confirm-feature-contact-button" onClick={handleSend}>
              Aggiungi
            </button>
          </div>
        </> :
          <></>}
      </div>
    </div>
  );
}
