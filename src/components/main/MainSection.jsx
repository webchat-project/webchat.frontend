import React, { useEffect } from "react";
import MainTopBar from "./MainTopBar";

import axios from "axios";
import { backend } from "../../utils/Backend";

import DefaultMessage from "./messages/DefaultMessage";
import MessageContainer from "./messages/MessageContainer";
import MessageInputBox from "./messages/MessageInputBox";

import Loading from '../await/Loading'
import Error from '../await/Error'


export default function MainSection({ jwt, userData, messageData, loading, error }) {

  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  // Metodo per inviare il messaggio appena digitato
  const sendMessage = async (input) => {
    let data = {
      description: input,
      chatId: userData.userId
    };

    try {
      const response = await axios.post(backend + '/messages/', data, config);
      console.log(response)
    } catch (error) {
      console.error(error);
    }

  }

  // Aggiunge il messaggio inviato al container dei messaggi
  const handleSubmit = (input) => {
    // Metodo per mostrare il messaggio appena digitato
    const messageContainer = document.getElementById('message-container');
    const sentMessage = document.createElement('div');
    sentMessage.className = "sent-message"

    sentMessage.id = "CurrentSessionMessage"
    const message = document.createElement('p');
    message.className = "message-text"
    message.innerText = input
    sentMessage.appendChild(message)
    messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

    // Invio messaggio
    sendMessage(input)
  }

  return (
    <>
      {messageData.length === 0 ? <DefaultMessage /> : loading === true ? <Loading /> : error === true ? <Error /> : <>
        <MainTopBar user={userData} />
        <div id="message-container">
          <MessageContainer messageList={messageData} />
        </div>
        <MessageInputBox handleSubmit={handleSubmit} />
      </>
      }
    </>
  );
}
