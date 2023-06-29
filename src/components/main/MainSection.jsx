import React, { useEffect } from "react";
import MainTopBar from "./MainTopBar";

import axios from "axios";
import { backend } from "../../utils/Backend";

import DefaultMessage from "./messages/DefaultMessage";
import MessageContainer from "./messages/MessageContainer";
import MessageInputBox from "./messages/MessageInputBox";

import Loading from '../await/Loading'
import Error from '../await/Error'


// scrolla automaticamente  <ScrollToBottom className=""></ScrollToBottom>
// eslint-disable-next-line 
import ScrollToBottom from "react-scroll-to-bottom";


export default function MainSection({ jwt, userData, socket, firstMessage, messageData, loading, error }) {


  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };



  // Metodo per inviare il messaggio appena digitato
  const sendMessage = async (input) => {

    let data = { description: input, chatId: userData.chatId, jwtToken: userData.jwt };

    //IN BACKEND DOBBIAMO AGGIUNGERE L'ATTRIBUTO time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 

    try {
      await socket.emit("sendMessage", data);

    } catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    socket.on("receivedMessage", (response) => {
      console.log(response);

      if (response.error) {
        console.log(response.error)
      } else {
        // Mostra il messaggio ricevuto
        handleReceivedMessage(response.body.message)
      }
    })
  }, [socket])


  // Metodo per mostrare il messaggio ricevuto
  const handleReceivedMessage = (receivedText) => {

    // Metodo per mostrare il messaggio appena ricevuto
    const messageContainer = document.getElementById('message-container');
    const receivedMessage = document.createElement('div');
    receivedMessage.className = "received-message"

    receivedMessage.id = "CurrentSessionMessage"
    const message = document.createElement('p');
    message.className = "message-text"
    message.innerText = receivedText;
    receivedMessage.appendChild(message)
    messageContainer.insertBefore(receivedMessage, messageContainer.firstChild);
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
    message.innerText = input;
    sentMessage.appendChild(message)
    messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

    // Invio messaggio
    sendMessage(input);
  }

  return (
    <>
      {firstMessage === false ? <DefaultMessage />
        : loading === true ? <Loading />
          : error === true ? <Error />
            : <>
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
