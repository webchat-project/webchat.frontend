import axios from "axios";
import React, { useState, useEffect } from "react";

import { backend } from "../../../../utils/Backend";

export default function ContactAdd({ contact, jwt }) {

  // Se true, vengono mostrati i due pulsanti annulla e invia
  const [addOption, setAddOption] = useState(false);

  // Al click sul contatto appaiono due pulsanti per annullare o inviare la richiesta
  const handleClick = (id) => {
    setAddOption(true)
  }

  // Metodo al click su annulla
  const handleAbort = () => {
    setTimeout(() => {
      setAddOption(false);
    }, 10);
  }

  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  // Metodo al click su invia, procede ad inviare la richiesta al backend
  const handleSend = async () => {
    console.log("Invio richiesta per aggiungere " + contact.userId)
    handleAbort();
    let data = { userId: contact.userId, type: "send" };
    console.warn(config)
    console.warn(data)


    try {
      const response = await axios.post(backend + '/users/requests/', data, config);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (contact) => {
    if (contact.image === "") {
    } else {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(contact.image.data.data)));
      contact.image = `data:image/png;base64,${base64String}`;
      setProfile(contact.image)
    }
  }

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);


  return (
    <div id={"contact: " + contact.id} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={profile}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
          <p>{contact.email}</p>
          {addOption === true ? <>
            <div className="feature-confirm-contact-button">
              <button id="abort-add-contact-button" onClick={handleAbort}>
                Annulla
              </button>
              <button id="confirm-add-contact-button" onClick={handleSend}>
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
