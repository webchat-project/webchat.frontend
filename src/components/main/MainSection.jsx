import React, { useEffect } from 'react';
import MainTopBar from './MainTopBar';

import DefaultMessage from './messages/DefaultMessage';
import MessageContainer from './messages/MessageContainer';
import MessageInputBox from './messages/MessageInputBox';

import Loading from '../await/Loading';
import Error from '../await/Error';

export default function MainSection({
  userData,
  socket,
  firstMessage,
  messageData,
  loading,
  error,
  lastAccess,
  setLastAccess
}) {
  // Metodo per aggiornare l'utlimo messaggio
  const updateLastMessage = (id, update) => {
    let chat = document.getElementById('last-message: ' + id);
    if (chat) {
      chat.innerText = update;
    }
  };

  // Metodo per inviare il messaggio appena digitato
  const sendMessage = async (messageInput, imageInput) => {
    // Mostro il messaggio se invio solo il testo
    if (imageInput === '') {
      const messageContainer = document.getElementById('message-container');
      const sentMessage = document.createElement('div');
      sentMessage.className = 'sent-message';

      const sentTimeDateContainer = document.createElement('div');
      sentTimeDateContainer.className = 'sent-time-date-container';

      sentMessage.id = 'CurrentSessionMessage';

      const message = document.createElement('p');
      message.className = 'message-text';
      message.innerText = messageInput;

      let oraCorrente = new Date();
      let ore = String(oraCorrente.getHours()).padStart(2, '0');
      let minuti = String(oraCorrente.getMinutes()).padStart(2, '0');
      let oraFormattata = ore + ':' + minuti;

      const time = document.createElement('p');
      time.className = 'message-time';
      time.innerText = oraFormattata;

      let dataCorrente = new Date().toLocaleDateString();

      const date = document.createElement('p');
      date.className = 'message-date';
      date.innerText = dataCorrente;

      let messageStatus = document.createElement('p');
      messageStatus.className = 'message-status';
      messageStatus.innerText = '· · ·';

      sentTimeDateContainer.appendChild(time);
      sentTimeDateContainer.appendChild(date);
      sentTimeDateContainer.appendChild(messageStatus);
      sentMessage.appendChild(sentTimeDateContainer);
      sentMessage.appendChild(message);
      messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

      let data = {
        description: messageInput,
        chatId: userData.chatId,
        jwtToken: userData.jwt,
      };

      const handleSuccess = () => {
        if (lastAccess === -1) {
          messageStatus.innerText = '✓✓';
        } else {
          messageStatus.innerText = '✓';
        }
        updateLastMessage(userData.chatId, messageInput);
      };

      const handleError = error => {
        messageStatus.innerText = '✗';
        console.error(error);
      };

      socket.emit('sendMessage', data, response => {
        if (!response.error) {
          handleSuccess();
        } else {
          handleError(new Error(response.error));
        }
      });
    }

    // Mostro il messaggio se invio solo l'immagine
    else if (messageInput === '') {
      const messageContainer = document.getElementById('message-container');
      const sentMessage = document.createElement('div');
      sentMessage.className = 'sent-message';

      const sentTimeDateContainer = document.createElement('div');
      sentTimeDateContainer.className = 'sent-time-date-container';

      sentMessage.id = 'CurrentSessionMessage';

      const message = document.createElement('p');
      message.className = 'message-text';
      message.innerText = messageInput;

      const image = document.createElement('img');
      image.className = 'message-image';
      image.src = imageInput;

      let oraCorrente = new Date();
      let ore = String(oraCorrente.getHours()).padStart(2, '0');
      let minuti = String(oraCorrente.getMinutes()).padStart(2, '0');
      let oraFormattata = ore + ':' + minuti;

      const time = document.createElement('p');
      time.className = 'message-time';
      time.innerText = oraFormattata;

      let dataCorrente = new Date().toLocaleDateString();

      const date = document.createElement('p');
      date.className = 'message-date';
      date.innerText = dataCorrente;

      let messageStatus = document.createElement('p');
      messageStatus.className = 'message-status';
      messageStatus.innerText = '· · ·';

      sentTimeDateContainer.appendChild(time);
      sentTimeDateContainer.appendChild(date);
      sentTimeDateContainer.appendChild(messageStatus);
      sentMessage.appendChild(sentTimeDateContainer);
      sentMessage.appendChild(image);
      sentMessage.appendChild(message);
      messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

      const handleSuccess = () => {
        if (lastAccess === -1) {
          messageStatus.innerText = '✓✓';
        } else {
          messageStatus.innerText = '✓';
        }
        let text = '📷Foto';
        updateLastMessage(userData.chatId, text);
      };

      const handleError = error => {
        messageStatus.innerText = '✗';
        console.error(error);
      };

      socket.emit(
        'sendMessage',
        { image: imageInput, chatId: userData.chatId, jwtToken: userData.jwt },
        response => {
          if (!response.error) {
            handleSuccess();
          } else {
            handleError(new Error(response.error));
          }
        }
      );
    }

    // Mostro il messaggio se invio sia immagine che testo
    else if (messageInput !== '' && imageInput !== '') {
      // Metodo per mostrare il messaggio appena digitato
      const messageContainer = document.getElementById('message-container');
      const sentMessage = document.createElement('div');
      sentMessage.className = 'sent-message';

      const sentTimeDateContainer = document.createElement('div');
      sentTimeDateContainer.className = 'sent-time-date-container';

      sentMessage.id = 'CurrentSessionMessage';

      const message = document.createElement('p');
      message.className = 'message-text';
      message.innerText = messageInput;

      const image = document.createElement('img');
      image.className = 'message-image';
      image.src = imageInput;

      let oraCorrente = new Date();
      let ore = String(oraCorrente.getHours()).padStart(2, '0');
      let minuti = String(oraCorrente.getMinutes()).padStart(2, '0');
      let oraFormattata = ore + ':' + minuti;

      const time = document.createElement('p');
      time.className = 'message-time';
      time.innerText = oraFormattata;

      let dataCorrente = new Date().toLocaleDateString();

      const date = document.createElement('p');
      date.className = 'message-date';
      date.innerText = dataCorrente;

      let messageStatus = document.createElement('p');
      messageStatus.className = 'message-status';
      messageStatus.innerText = '· · ·';

      sentTimeDateContainer.appendChild(time);
      sentTimeDateContainer.appendChild(date);
      sentTimeDateContainer.appendChild(messageStatus);
      sentMessage.appendChild(sentTimeDateContainer);
      sentMessage.appendChild(image);
      sentMessage.appendChild(message);
      messageContainer.insertBefore(sentMessage, messageContainer.firstChild);

      const handleSuccess = () => {
        if (lastAccess === -1) {
          messageStatus.innerText = '✓✓';
        } else {
          messageStatus.innerText = '✓';
        }
        let text = '📷Foto';
        updateLastMessage(userData.chatId, text);
      };

      const handleError = error => {
        messageStatus.innerText = '✗';
        console.error(error);
      };

      socket.emit(
        'sendMessage',
        {
          description: messageInput,
          image: imageInput,
          chatId: userData.chatId,
          jwtToken: userData.jwt,
        },
        response => {
          if (!response.error) {
            handleSuccess();
          } else {
            handleError(new Error(response.error));
          }
        }
      );
    }
  };

  // Metodo per mostrare il messaggio ricevuto se è solo testo
  const handleReceivedOnlyMessage = receivedText => {
    if (receivedText.chatId === localStorage.getItem('currentContactId')) {
      // Metodo per mostrare il messaggio appena ricevuto solo se sono nella chat da cui proviene il messaggio
      const messageContainer = document.getElementById('message-container');
      const receivedMessage = document.createElement('div');
      receivedMessage.className = 'received-message';

      const receivedTimeDateContainer = document.createElement('div');
      receivedTimeDateContainer.className = 'received-time-date-container';

      receivedMessage.id = 'CurrentSessionMessage';

      const message = document.createElement('p');
      message.className = 'message-text';
      message.innerText = receivedText.message;

      // Conversione data
      let dateVal = new Date(receivedText.time);
      let timeVal = dateVal.toLocaleTimeString().slice(0, 5);
      dateVal = dateVal.toLocaleDateString();

      const time = document.createElement('p');
      time.className = 'message-time';
      time.innerText = timeVal;

      const date = document.createElement('p');
      date.className = 'message-date';
      date.innerText = dateVal;

      receivedTimeDateContainer.appendChild(time);
      receivedTimeDateContainer.appendChild(date);
      receivedMessage.appendChild(receivedTimeDateContainer);
      receivedMessage.appendChild(message);
      messageContainer.insertBefore(
        receivedMessage,
        messageContainer.firstChild
      );

      // Aggiorna l'ultimo messaggio nella sidebar
      updateLastMessage(receivedText.message);

      // Aggiorna lo stato
      const currentUserAccess = document.getElementById('last-access');

      if (currentUserAccess.innerText !== 'Online') {
        setLastAccess(-1);
        currentUserAccess.innerText = 'Online';
      }
    } else {
      // Non viene mostrato nessun messaggio se la chatId è diversa dalla chatId della chat aperta
    }
  };

  // Metodo per mostrare il messaggio ricevuto se è solo immagine
  const handleReceivedOnlyImage = receivedText => {
    if (receivedText.chatId === localStorage.getItem('currentContactId')) {
      // Metodo per mostrare il messaggio appena ricevuto solo se sono nella chat da cui proviene il messaggio
      const messageContainer = document.getElementById('message-container');
      const receivedMessage = document.createElement('div');
      receivedMessage.className = 'received-message';

      const receivedTimeDateContainer = document.createElement('div');
      receivedTimeDateContainer.className = 'received-time-date-container';

      receivedMessage.id = 'CurrentSessionMessage';

      const image = document.createElement('img');
      image.className = 'message-image';
      const imageBlob = new Blob([new Uint8Array(receivedText.image.data)], {
        type: 'image/png',
      });
      image.src = URL.createObjectURL(imageBlob);

      // Conversione data
      let dateVal = new Date(receivedText.time);
      let timeVal = dateVal.toLocaleTimeString().slice(0, 5);
      dateVal = dateVal.toLocaleDateString();

      const time = document.createElement('p');
      time.className = 'message-time';
      time.innerText = timeVal;

      const date = document.createElement('p');
      date.className = 'message-date';
      date.innerText = dateVal;

      receivedTimeDateContainer.appendChild(time);
      receivedTimeDateContainer.appendChild(date);
      receivedMessage.appendChild(receivedTimeDateContainer);
      receivedMessage.appendChild(image);
      messageContainer.insertBefore(
        receivedMessage,
        messageContainer.firstChild
      );

      // Aggiorna l'ultimo messaggio nella sidebar
      let text = '📷Foto';
      updateLastMessage(userData.chatId, text);

      // Aggiorna lo stato
      const currentUserAccess = document.getElementById('last-access');

      if (currentUserAccess.innerText !== 'Online') {
        setLastAccess(-1);
        currentUserAccess.innerText = 'Online';
      }
    } else {
      // Non viene mostrato nessun messaggio se la chatId è diversa dalla chatId della chat aperta
    }
  };

  // Metodo per mostrare il messaggio ricevuto se è sia immagine che testo
  const handleReceivedMessage = receivedText => {
    if (receivedText.chatId === localStorage.getItem('currentContactId')) {
      // Metodo per mostrare il messaggio appena ricevuto solo se sono nella chat da cui proviene il messaggio
      const messageContainer = document.getElementById('message-container');
      const receivedMessage = document.createElement('div');
      receivedMessage.className = 'received-message';

      const receivedTimeDateContainer = document.createElement('div');
      receivedTimeDateContainer.className = 'received-time-date-container';

      receivedMessage.id = 'CurrentSessionMessage';

      const message = document.createElement('p');
      message.className = 'message-text';
      message.innerText = receivedText.message;

      const image = document.createElement('img');
      image.className = 'message-image';
      const imageBlob = new Blob([new Uint8Array(receivedText.image.data)], {
        type: 'image/png',
      });
      const imageUrl = URL.createObjectURL(imageBlob);
      image.src = imageUrl;

      // Conversione data
      let dateVal = new Date(receivedText.time);
      let timeVal = dateVal.toLocaleTimeString().slice(0, 5);
      dateVal = dateVal.toLocaleDateString();

      const time = document.createElement('p');
      time.className = 'message-time';
      time.innerText = timeVal;

      const date = document.createElement('p');
      date.className = 'message-date';
      date.innerText = dateVal;

      receivedTimeDateContainer.appendChild(time);
      receivedTimeDateContainer.appendChild(date);
      receivedMessage.appendChild(receivedTimeDateContainer);
      receivedMessage.appendChild(image);
      receivedMessage.appendChild(message);
      messageContainer.insertBefore(
        receivedMessage,
        messageContainer.firstChild
      );

      // Aggiorna l'ultimo messaggio nella sidebar
      let text = '📷Foto';
      updateLastMessage(userData.chatId, text);

      // Aggiorna lo stato
      const currentUserAccess = document.getElementById('last-access');

      if (currentUserAccess.innerText !== 'Online') {
        setLastAccess(-1);
        currentUserAccess.innerText = 'Online';
      }
    } else {
      // Non viene mostrato nessun messaggio se la chatId è diversa dalla chatId della chat aperta
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('receivedMessage', response => {
        if (response.error) {
          console.log(response.error);
        } else {
          // Mostra il messaggio ricevuto
          if (response.body.message && !response.body.image)
            handleReceivedOnlyMessage(response.body);
          if (!response.body.message && response.body.image)
            handleReceivedOnlyImage(response.body);
          if (response.body.message && response.body.image)
            handleReceivedMessage(response.body);
        }
      });
    } // eslint-disable-next-line
  }, [socket]);

  return (
    <>
      {firstMessage === false ? (
        <DefaultMessage />
      ) : loading === true ? (
        <Loading />
      ) : error !== false ? (
        <Error event={error} />
      ) : (
        <>
          <MainTopBar user={userData} lastAccess={lastAccess} />
          <div id="message-container">
            <MessageContainer
              messageList={messageData}
              lastAccess={lastAccess}
            />
          </div>
          <MessageInputBox handleSubmit={sendMessage} />
        </>
      )}
    </>
  );
}
