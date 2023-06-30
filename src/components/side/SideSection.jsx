import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Componenti React
import SideTopBar from './top/SideTopBar';
import ChatContainer from './chat/ChatContainer';
import ContactContainer from './contact/ContactContainer';
import ProfileContainer from './profile/ProfileContainer';

// Gestione propri contatti
import ContactDeleteContainer from './contact/delete/ContactDeleteContainer';
import ContactRequestContainer from './contact/request/ContactRequestContainer';
import ContactRequestSentContainer from './contact/request/ContactRequestSentContainer';

// Ricerca
import Search from './contact/add/Search';
import SideFeature from './SideFeature';

// Componenti di caricamento ed errore
import Loading from '../await/Loading';
import Error from '../await/Error';

// Indirizzo backend
import { backend } from '../../utils/Backend';

// Axios
import axios from 'axios';




export default function SideSection({ jwt, socket, setUserData, setFirstMessage, setMessageData, setLoadingMessages, setErrorMessages}) {

  // Liste chat e contatti
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: 'profile.png',
  });
  const [chatList, setChatList] = useState([
    {
      chatId: '',
      userId: '',
      firstName: '',
      lastName: '',
      image: 'profile.png',
      lastMessage: '',
      online: false,
    },
  ]);
  const [contactList, setContactList] = useState([
    {
      chatId: '',
      userId: '',
      firstName: '',
      lastName: '',
      image: 'profile.png',
    },
  ]);
  const [requestList, setRequestList] = useState({
    sent: [{ userId: '', firstName: '', lastName: '', image: 'profile.png' }],
    received: [
      { userId: '', firstName: '', lastName: '', image: 'profile.png' },
    ],
  });
  const [requestCount, setRequestCount] = useState('');

  // Caricamento e errore chat e contatti
  const [chatsLoading, setChatsLoading] = useState();
  const [chatsError, setChatsError] = useState();
  const [contactsLoading, setContactsLoading] = useState();
  const [contactsError, setContactsError] = useState();

  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  // Metodo per ottenere i dati del profilo
  const getProfile = async () => {
    try {
      const { data } = await axios.get(backend + '/users/profile', config);
      setProfile(data.body);
      const imageBlob = new Blob([new Uint8Array(data.body.image.data.data)], {
        type: 'image/png',
      });
      const imageUrl = URL.createObjectURL(imageBlob);
      setProfile(prevValue => {
        return { ...prevValue, image: imageUrl };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista chat
  const getChatList = async () => {
    setChatsLoading(true);
    try {
      const { data } = await axios.get(backend + '/chats/list', config);
      setChatsLoading(false);
      setChatList(
        data.body.map(chat => {
          const imageBlob = new Blob([new Uint8Array(chat.image.data.data)], {
            type: 'image/jpeg',
          });
          chat.image = URL.createObjectURL(imageBlob);
          return chat;
        })
      );
    } catch (error) {
      setChatsLoading(false);
      setChatsError(true);
      console.error(error);
    }
  };

  // Metodo per ottenere la lista contatti
  const getContactList = async () => {
    setContactsLoading(true);
    try {
      const { data } = await axios.get(
        backend + '/users/contacts/list',
        config
      );
      setContactsLoading(false);
      setContactList(
        data.body.map(chat => {
          const imageBlob = new Blob([new Uint8Array(chat.image.data.data)], {
            type: 'image/jpeg',
          });
          chat.image = URL.createObjectURL(imageBlob);
          return chat;
        })
      );
    } catch (error) {
      setContactsLoading(false);
      setContactsError(true);
      console.error(error);
    }
  };

  // Metodo per ottenere la lista richieste contatti
  const getRequestList = async () => {
    try {
      const { data } = await axios.get(
        backend + '/users/requests/list',
        config
      );
      setRequestList(data.body.requests);

      // If per impostare il numero di richieste ricevute
      if (data.body.requests.received.length === 0) {
        setRequestCount('');
      } else if (data.body.requests.received.length > 0) {
        setRequestCount(data.body.requests.received.length);
      }

      setRequestList({
        sent: data.body.requests.sent.map(s => {
          const imageBlob = new Blob([new Uint8Array(s.image.data.data)], {
            type: 'image/jpeg',
          });
          s.image = URL.createObjectURL(imageBlob);
          return s;
        }),

        received: data.body.requests.received.map(r => {
          const imageBlob = new Blob([new Uint8Array(r.image.data.data)], {
            type: 'image/jpeg',
          });
          r.image = URL.createObjectURL(imageBlob);
          return r;
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Ottengo i dati all'avvio e seleziono il pulsante chat nella topbar
  useEffect(() => {
    getProfile(); // eslint-disable-next-line
    getChatList(); // eslint-disable-next-line
    getContactList(); // eslint-disable-next-line
    getRequestList(); // eslint-disable-next-line
    setTopBarOnLoad(); // eslint-disable-next-line
  }, []);

  // Location
  const location = useLocation();

  // Metodo per selezionare il pulsante nella topbar al refresh
  const setTopBarOnLoad = () => {
    let element = null;

    switch (location.pathname) {
      case '/':
      case '/chats':
        element = document.getElementById('side-top-bar-button: Chat');
        break;
      case '/contacts':
        element = document.getElementById('side-top-bar-button: Contatti');
        break;
      case '/profile':
        element = document.getElementById('side-top-bar-button: Profilo');
        break;
      default:
        break;
    }
  
    if (element) {
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
  };
  



  // Metodo per ottenere la lista messaggi
  const getMessages = async (id) => {
    try {
      const { data } = await axios.get(backend + '/chats/' + id, config);
      setMessageData(data.body.messages);
      setLoadingMessages(false);
      setErrorMessages(false);
    } catch (error) {
      console.error(error);
      setLoadingMessages(false);
      setErrorMessages(error.response.data.error);
    }
  };

  // Metodo che si attiva quando si clicca su una chat
  const handleChatClick = id => {
    localStorage.setItem('currentContactId', id);

    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    let elements = document.getElementsByClassName('chat-button');
    elements.forEach(function(element) {
      element.removeAttribute('style');
    });
    
    // Accentua il componente selezionato
    var element = document.getElementById('chat: ' + id);
    element.style.backgroundColor = 'var(--button-click)';
    element.style.border = '1px solid var(--border)';

    // Imposta l'utente registrato
    setUserData(prevValue => ({ ...prevValue, chatId: id }));

    let elementText = element.querySelectorAll('h3');
    let elementImg = element.querySelectorAll('img');
    elementText.forEach(e => {
      let nameValue = e.innerText.replace(/●/g, "");
      setUserData(prevValue => ({ ...prevValue, name: nameValue }));
    });

    

    elementImg.forEach(e => {
      let imgSrc = e.src;
      setUserData(prevValue => ({ ...prevValue, image: imgSrc }));
    });

    // Primo messaggio
    setFirstMessage(true);

    // Loading
    setLoadingMessages(true);
    setErrorMessages(false);

    // Metodo per eliminare i messaggi
    const sentMessages = document.querySelectorAll('#CurrentSessionMessage');
    if (sentMessages.length > 0) {
      sentMessages.forEach(message => message.remove());
    }
    
    // Connessione socket
    socket.emit('joinChat', id);

    // Caricamento messaggi
    getMessages(id);
  };

  // Metodo che si attiva quando si clicca su un contatto
  const handleContactClick = id => {
    localStorage.setItem('currentContactId', id);

    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    let elements = document.getElementsByClassName('contact-button');
    elements.forEach(function(element) {
      element.removeAttribute('style');
    });
    

    // Accentua il componente selezionato
    let element = document.getElementById('contact: ' + id);
    element.style.backgroundColor = 'var(--button-click)';
    element.style.border = '1px solid var(--border)';

    // Imposta l'utente registrato
    setUserData(prevValue => ({ ...prevValue, chatId: id }));

    let elementText = element.querySelectorAll('h3');
    let elementImg = element.querySelectorAll('img');
    elementText.forEach(e => {
      let nameValue = e.innerText;
      setUserData(prevValue => ({ ...prevValue, name: nameValue }));
    });

    elementImg.forEach(e => {
      let imgSrc = e.src;
      setUserData(prevValue => ({ ...prevValue, image: imgSrc }));
    });

    // Primo messaggio
    setFirstMessage(true);

    // Loading
    setLoadingMessages(true);
    setErrorMessages(false);

    // Metodo per eliminare i messaggi
    const sentMessages = document.querySelectorAll('#CurrentSessionMessage');
    if (sentMessages.length > 0) {
      for (var j = 0; j < sentMessages.length; j++) {
        sentMessages[j].remove();
      }
    }

    // Connessione socket
    socket.emit('joinChat', id);

    // Caricamento messaggi
    getMessages(id);
  };

  return (
    <>
      <SideTopBar
        getChatList={getChatList}
        getContactList={getContactList}
        getProfile={getProfile}
      />

      <div id="side-elements-container">
        <Routes>
          <Route
            path="/contacts/*"
            element={
              <>
                <p id="first-feature-contact-message">Gestione contatti</p>
                <SideFeature
                  url={'/add'}
                  span={'add'}
                  text={'Aggiungi contatto'}
                />
              </>
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              <SideFeature
                url={'/delete'}
                span={'delete'}
                text={'Elimina contatti'}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              <SideFeature
                getRequestList={getRequestList}
                url={'/requests'}
                span={'mail'}
                text={'Richieste'}
                count={requestCount}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/add/*"
            element={
              <>
                <Search
                  id={'side-search'}
                  jwt={jwt}
                  placeholder={'Cerca contatto online'}
                />
              </>
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              chatsLoading === true ? (
                <Loading />
              ) : chatsError === true ? (
                <Error />
              ) : chatList.length === 0 ? (
                <p id="first-feature-contact-message">Non sono presenti chat</p>
              ) : (
                <>
                  <p id="first-feature-contact-message">
                    Lista di tutte le chat
                  </p>
                  <ChatContainer
                    chatList={chatList}
                    handleChatClick={handleChatClick}
                  />
                </>
              )
            }
          />
          <Route
            path="/chats/*"
            element={
              chatsLoading === true ? (
                <Loading />
              ) : chatsError === true ? (
                <Error />
              ) : chatList.length === 0 ? (
                <p id="first-feature-contact-message">Non sono presenti chat</p>
              ) : (
                <>
                  <p id="first-feature-contact-message">
                    Lista di tutte le chat
                  </p>
                  <ChatContainer
                    chatList={chatList}
                    handleChatClick={handleChatClick}
                  />
                </>
              )
            }
          />
          <Route
            path="/contacts/*"
            element={
              contactsLoading === true ? (
                <Loading />
              ) : contactsError === true ? (
                <Error />
              ) : contactList.length === 0 ? (
                <p id="second-feature-contact-message">
                  Non sono presenti contatti
                </p>
              ) : (
                <>
                  <p id="second-feature-contact-message">
                    Lista di tutti i contatti
                  </p>
                  <ContactContainer
                    contactList={contactList}
                    handleContactClick={handleContactClick}
                  />
                </>
              )
            }
          />

          <Route
            path="/delete/*"
            element={
              <>
                <p id="first-feature-contact-message">Elimina contatti</p>
                <ContactDeleteContainer
                  getContactList={getContactList}
                  contactList={contactList}
                  jwt={jwt}
                />
              </>
            }
          />

          <Route
            path="/requests/*"
            element={
              <>
                {requestList.received.length === 0 ? (
                  <>
                    <p id="first-feature-contact-message">Richieste ricevute</p>
                    <p id="side-text-message-info">
                      Nessuna richiesta ricevuta
                    </p>
                  </>
                ) : (
                  <>
                    <p id="first-feature-contact-message">Richieste ricevute</p>
                    <ContactRequestContainer
                      getRequestList={getRequestList}
                      contactList={requestList.received}
                      jwt={jwt}
                    />
                  </>
                )}
                {requestList.sent.length === 0 ? (
                  <>
                    <p id="second-feature-contact-message">Richieste inviate</p>
                    <p id="side-text-message-info">Nessuna richiesta inviata</p>
                  </>
                ) : (
                  <>
                    <p id="second-feature-contact-message">Richieste inviate</p>
                    <ContactRequestSentContainer
                      getRequestList={getRequestList}
                      contactList={requestList.sent}
                      jwt={jwt}
                    />
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile/*"
            element={<ProfileContainer profile={profile} />}
          />
        </Routes>
      </div>
    </>
  );
}
