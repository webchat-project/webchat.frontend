import React, { useState } from "react";

// Componenti caricamento e errore
import Loading from '../../../await/Loading';
import Error from '../../../await/Error';

import {deleteChatRoute} from '../../../../utils/ApiRoutes'
// Axios
import axios from "axios";

export default function ChatDelete({ chat, jwt }) {

  // Se true, vengono mostrati i due pulsanti annulla e invia
  const [addOption, setAddOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Al click sulla chat appaiono due pulsanti per annullare o inviare la richiesta
  const handleClick = () => {

    // Resetta lo stile dei chat button
    let elements = document.getElementsByClassName('contact-button');
    Array.from(elements).forEach(element => {
      element.removeAttribute('style');
    });

    // Rende invisibili eventuali contact options
    let options = document.getElementsByClassName("chat-options")
    Array.from(options).forEach(option => {
      option.setAttribute("style", "visibility: hidden;")
    });

    // Accentua il componente selezionato
    let button = document.getElementById('chat: ' + chat.chatId);
    if (button) {
      button.setAttribute("style", "background-color: var(--button-click); border: 1px solid var(--border); height: auto")
    }
    let option = document.getElementById("contact-options: " + chat.chatId);
    if (option) {
      option.setAttribute("style", "visibility: visible;")
    }
    setAddOption(true);
  }

  // Metodo al click su annulla
  const handleAbort = () => {
    setError(false)
    setTimeout(() => {
      const button = document.getElementById('chat: ' + chat.chatId);
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
    try {
      const response = await axios.delete(deleteChatRoute + chat.chatId, config);
      console.log(response.data)
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.response.data.error)
    }
  }

  // Metodo per eliminare il pulsante chat button, una volta inviata la richiesta
  const closeConfirmedSuccess = () => {
    window.location.reload()
  }

  return (
    <div id={"chat: " + chat.chatId} className="chat-button" onClick={handleClick}>
      <div className="chat-button-container">
        <div className="image-container">
          <img alt="img" src={chat.image}></img>
        </div>
        <div className="text-container">
          <h3>{chat.firstName} {chat.lastName}</h3>
        </div>
      </div>
      <div className='contact-options' id={'contact-options: ' + chat.chatId}>
        {addOption ? (
          <>
            <div className="feature-confirm-contact-button">
              <button id="abort-delete-contact-button" onClick={handleAbort}> Annulla </button>
              <button id="confirm-delete-contact-button" onClick={handleSend}> Elimina </button>
            </div>
          </>
        )
          : loading ? <Loading />
            : success ?
              <div id="confirm-success">
                <p>Chat eliminata con successo</p>
                <button id="close-confirm-success" onClick={closeConfirmedSuccess}>Chiudi</button>
              </div>
              : error !== false ? <Error event={error} />
                : <></>}
      </div>
    </div>
  );
}
