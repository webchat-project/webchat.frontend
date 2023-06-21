import React, { useState } from "react";

export default function ContactButton({ contact }) {

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
    console.log("Invio richiesta per aggiungere " + contact.name)
    handleAbort();
  }

  return (
    <div id={"contact: " + contact.id} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="ProfilePicture" src={contact.picture}></img>
        </div>
        <div className="text-container">
          <h3>{contact.name}</h3>
          {addOption === true ? <>
            <div id="add-contact-button">
              <button id="abort-add-contact" onClick={handleAbort}>
                Annulla
              </button>
              <button id="confirm-add-contact" onClick={handleSend}>
                Aggiungi
              </button>
            </div>
          </> :
            <></>}
        </div>
      </div>
    </div>
  );
}
