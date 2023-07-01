import React, { useEffect } from "react";
import MainTopBar from "./MainTopBar";

import DefaultMessage from "./messages/DefaultMessage";
import MessageContainer from "./messages/MessageContainer";
import MessageInputBox from "./messages/MessageInputBox";

import Loading from '../await/Loading'
import Error from '../await/Error'

export default function MainSection({ userData, socket, firstMessage, messageData, loading, error }) {

  // Metodo per inviare il messaggio appena digitato
  const sendMessage = async (input) => {

    // Metodo per mostrare il messaggio appena digitato
    const messageContainer = document.getElementById('message-container');
    const sentMessage = document.createElement('div');
    sentMessage.className = "sent-message"

    const sentTimeDateContainer = document.createElement('div');
    sentTimeDateContainer.className = "sent-time-date-container"

    sentMessage.id = "CurrentSessionMessage"

    const message = document.createElement('p');
    message.className = "message-text"
    message.innerText = input;

    let oraCorrente = new Date();
    let ore = String(oraCorrente.getHours()).padStart(2, '0');
    let minuti = String(oraCorrente.getMinutes()).padStart(2, '0');
    let oraFormattata = ore + ':' + minuti;

    const time = document.createElement('p');
    time.className = "message-time"
    time.innerText = oraFormattata;

    let dataCorrente = new Date().toLocaleDateString();

    const date = document.createElement('p');
    date.className = "message-date"
    date.innerText = dataCorrente;

    let messageStatus = document.createElement('p');
    messageStatus.className = "message-status"
    messageStatus.innerText = "· · ·"

    sentTimeDateContainer.appendChild(time)
    sentTimeDateContainer.appendChild(date)
    sentTimeDateContainer.appendChild(messageStatus)
    sentMessage.appendChild(sentTimeDateContainer)
    sentMessage.appendChild(message)
    messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

    let data = { description: input, chatId: userData.chatId, jwtToken: userData.jwt };

    const handleSuccess = () => {
      messageStatus.innerText = "✓";
      console.log("Messaggio inviato con successo");
    };

    const handleError = (error) => {
      messageStatus.innerText = "✗";
      console.error(error);
      console.log("Errore nell'invio del messaggio");
    };

    socket.emit("sendMessage", data, (response) => {
      if (!response.error) {
        handleSuccess();
      } else {
        handleError(new Error(response.error));
      }
    });

  }

  // Metodo per mostrare il messaggio ricevuto
  const handleReceivedMessage = (receivedText) => {

    if (receivedText.chatId === localStorage.getItem("currentContactId")) {

      // Metodo per mostrare il messaggio appena ricevuto solo se sono nella chat da cui proviene il messaggio
      const messageContainer = document.getElementById('message-container');
      const receivedMessage = document.createElement('div');
      receivedMessage.className = "received-message"

      const receivedTimeDateContainer = document.createElement('div');
      receivedTimeDateContainer.className = "received-time-date-container"

      receivedMessage.id = "CurrentSessionMessage"

      const message = document.createElement('p');
      message.className = "message-text"
      message.innerText = receivedText.message;

      // Conversione data
      let dateVal = new Date(receivedText.time);
      let timeVal = dateVal.toLocaleTimeString().slice(0, 5);
      dateVal = dateVal.toLocaleDateString()

      const time = document.createElement('p');
      time.className = "message-time"
      time.innerText = timeVal;

      const date = document.createElement('p');
      date.className = "message-date"
      date.innerText = dateVal;

      receivedTimeDateContainer.appendChild(time)
      receivedTimeDateContainer.appendChild(date)
      receivedMessage.appendChild(receivedTimeDateContainer)
      receivedMessage.appendChild(message)
      messageContainer.insertBefore(receivedMessage, messageContainer.firstChild);

    } else {

      // Non viene mostrato nessun messaggio se la chatId è diversa dalla chatId della chat aperta
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("receivedMessage", (response) => {

        if (response.error) {
          console.log(response.error)
        } else {

          // Mostra il messaggio ricevuto
          handleReceivedMessage(response.body)
        }
      })
    }
  }, [socket])

  return (
    <>
      {firstMessage === false ? <DefaultMessage />
        : loading === true ? <Loading />
          : error !== false ? <Error event={error} />
            : <>
              <MainTopBar user={userData} />
              <div id="message-container">
                <MessageContainer messageList={messageData} />
              </div>
              <MessageInputBox handleSubmit={sendMessage} />
            </>
      }
    </>
  );
}
