import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { backend } from '../../../../utils/Backend';

export default function ContactAdd({ contact, jwt }) {
  // Se true, vengono mostrati i due pulsanti annulla e invia
  const [addOption, setAddOption] = useState(false);

  // Al click sul contatto appaiono due pulsanti per annullare o inviare la richiesta
  const handleClick = e => {
    //console.log(e.target);
    //console.log('contact: ' + contact.userId);
    const button = document.getElementById('contact: ' + contact.userId);
    button.style = 'height: 90px';
    const emailParagraph = document.getElementById(`${contact.email}`);
    emailParagraph.style = 'font-weight: bold';

    setAddOption(true);
  };

  // Metodo al click su annulla
  const handleAbort = () => {
    setTimeout(() => {
      const button = document.getElementById('contact: ' + contact.userId);
      button.style = 'height: normal';
      const emailParagraph = document.getElementById(`${contact.email}`);
      emailParagraph.style = 'font-weight: normal';
      setAddOption(false);
    }, 10);
  };



  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  // Metodo al click su invia, procede ad inviare la richiesta al backend
  const handleSend = async () => {
    console.log('Invio richiesta per aggiungere ' + contact.userId);
    handleAbort();
    //console.warn(config);
   //console.warn(data);

    try {
      const { data } = await axios.post(backend + '/users/requests/', { userId: contact.userId, type: 'send' } ,config);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState('profile.png');

  const handleProfile = contact => {
    if (contact.image !== '') {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(contact.image.data.data))
      );
      contact.image = `data:image/png;base64,${base64String}`;
      setProfile(contact.image);
    }
  };

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);



  return (
    <div
      id={'contact: ' + contact.userId}
      className="contact-button"
      onClick={handleClick}
    >
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={profile}></img>
        </div>
        <div className="text-container">
          <p id={`${contact.email}`}>{contact.email}</p>
          {addOption ? (
                        <>
                          <div className="feature-confirm-contact-button">
                            <button id="abort-add-contact-button" onClick={handleAbort}> Annulla </button>
                            <button id="confirm-add-contact-button" onClick={handleSend}> Aggiungi </button>
                          </div>
                        </>
                      ) : ( <></>)}
        </div>
      </div>
    </div>
  );
}
