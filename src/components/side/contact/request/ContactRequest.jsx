import axios from "axios";
import React, { useState, useEffect } from "react";

import { backend } from "../../../../utils/Backend";
import Loading from '../../../await/Loading';
import Error from '../../../await/Error';


export default function ContactRequest({ contact, jwt, getRequestList }) {

  // Se true, vengono mostrati i due pulsanti annulla e invia
  const [addOption, setAddOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Al click sul contatto appaiono due pulsanti per annullare o inviare la richiesta
  const handleClick = () => {

    // Resetta lo stile dei contact button
    let elements = document.getElementsByClassName('contact-button');
    Array.from(elements).forEach(element => {
      element.removeAttribute('style');
    });

    // Rende invisibili eventuali contact options
    let options = document.getElementsByClassName("contact-options")
    Array.from(options).forEach(option => {
      option.setAttribute("style", "visibility: hidden;")
    });

    // Accentua il componente selezionato
    let button = document.getElementById('contact: ' + contact.userId);
    if (button) {
      button.setAttribute("style", "background-color: var(--button-click); border: 1px solid var(--border); height: auto")
    }
    let option = document.getElementById("contact-options: " + contact.userId);
    if (option) {
      option.setAttribute("style", "visibility: visible;")
    }
    setAddOption(true);
  };

  // Metodo al click su annulla
  const handleAbort = () => {
    setError(false)
    setTimeout(() => {
      const button = document.getElementById('contact: ' + contact.userId);
      button.style = 'height: normal';
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
    setTimeout(() => {
      setAddOption(false);
    }, 10);
    setLoading(true);
    let data = { userId: contact.userId, type: "accept" };
    try {
      const response = await axios.post(backend + '/users/requests/', data, config);
      console.log(response.data)
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.response.data.error)
    }

  }

  // Metodo per eliminare il pulsante contact button, una volta inviata la richiesta
  const closeConfirmedSuccess = () => {
    setSuccess(false)
    getRequestList()
  }

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (contact) => {
    if (contact.image === "") {
      setProfile("profile.png")
    } else {
      setProfile(contact.image)
    }
  }

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);

  return (
    <div id={"contact: " + contact.userId} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={profile}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
        </div>
      </div>
      <div className='contact-options' id={'contact-options: ' + contact.userId}>
        {addOption ? (
          <>
            <div className="feature-confirm-contact-button">
              <button id="abort-request-contact-button" onClick={handleAbort}> Annulla </button>
              <button id="accept-request-contact-button" onClick={handleSend}> Accetta </button>
              <button id="reject-request-contact-button" onClick={handleAbort}> Rifiuta</button>
            </div>
          </>
        )
          : loading ? <Loading />
            : success ?
              <div id="confirm-success">
                <p>Richiesta accettata</p>
                <button id="close-confirm-success" onClick={closeConfirmedSuccess}>Chiudi</button>
              </div>
              : error !== false ? <Error event={error} />
                : <></>}
      </div>
    </div>
  );
}