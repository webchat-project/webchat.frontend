import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Axios
import axios from 'axios';

// Indirizzo backend
import { backend } from '../../utils/Backend';

// Componenti React
import Loading from '../await/Loading';
import Error from '../await/Error';

import SideTopBar from './top/SideTopBar';
import ChatContainer from './chat/ChatContainer';
import ContactContainer from './contact/ContactContainer';
import ProfileContainer from './profile/ProfileContainer';

// Gestione propri contatti
import ContactDeleteContainer from './contact/delete/ContactDeleteContainer';
import ContactRequestContainer from './contact/request/ContactRequestContainer';

import Search from './contact/add/Search';
import SideFeature from './SideFeature';

export default function SideSection({
  setUserData,
  setMessageData,
  setLoadingMessages,
  setErrorMessages,
  jwt,
}) {
  // Liste chat e contatti
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', image: '' });
  const [chatList, setChatList] = useState({ data: [] });
  const [contactList, setContactList] = useState({ data: [] });
  const [requestList, setRequestList] = useState({ sent: [], received: [] });

  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  // Metodo per ottenere i dati del profilo
  const getProfile = async () => {
    try {
      const response = await axios.get(backend + '/users/profile', config);
      const base64String = btoa(String.fromCharCode(...new Uint8Array(response.data.image.data.data)));
      setProfile(prevValue => { return { ...prevValue, image: `data:image/png;base64,${base64String}` }; })
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista chat
  const getChatList = async () => {
    try {
      const response = await axios.get(backend + '/chats/list', config);
      console.log('1Chat list: ' + JSON.stringify(chatList));
      setChatList(response.data);
      console.log('2Chat list: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista contatti
  const getContactList = async () => {
    try {
      const response = await axios.get(
        backend + '/users/contacts/list',
        config
      );
      console.log('1Contact list: ' + JSON.stringify(contactList));
      setContactList(response.data);
      console.log('2Contact list: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista contatti
  const getRequestList = async () => {
    try {
      const response = await axios.get(
        backend + '/users/requests/list',
        config
      );
      setRequestList(response.data);
      console.log('2Request list: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // Location
  const location = useLocation();

  // Metodo per selezionare il pulsante nella topbar al refresh
  const setTopBarOnLoad = () => {
    if (location.pathname === '/') {
      var element = document.getElementById('side-top-bar-button: Chat');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
    if (location.pathname === '/chats') {
      var element = document.getElementById('side-top-bar-button: Chat');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
    if (location.pathname === '/contacts') {
      var element = document.getElementById('side-top-bar-button: Contatti');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
    if (location.pathname === '/profile') {
      var element = document.getElementById('side-top-bar-button: Profilo');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
  };

  // Ottengo i dati all'avvio e seleziono il pulsante chat nella topbar
  useEffect(() => {
    getProfile();
    getChatList();
    getContactList();
    getRequestList();
    setTopBarOnLoad();
  }, []);

  // Metodo che si attiva quando si clicca su una chat
  const handleChatClick = id => {
    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    var elements = document.getElementsByClassName('chat-button');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('style');
    }

    // Accentua il componente selezionato
    var element = document.getElementById('contact: ' + id);
    element.style.backgroundColor = 'var(--button-click)';
    element.style.border = '1px solid var(--border)';

    // Imposta l'utente
    setUserData()
    // Caricamento
    setLoadingMessages(true);
  };

  // Metodo che si attiva quando si clicca su un contatto
  const handleContactClick = id => {
    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    var elements = document.getElementsByClassName('contact-button');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('style');
    }
    // Accentua il componente selezionato
    var element = document.getElementById('contact: ' + id);
    element.style.backgroundColor = 'var(--button-click)';
    element.style.border = '1px solid var(--border)';

    // Caricamento
    setLoadingMessages(true);
  };

  return (
    <>
      <SideTopBar />

      <div id="side-elements-container">

        <Routes>
          <Route
            path="/contacts/*"
            element={
              <SideFeature
                url={'/add'}
                span={'add'}
                text={'Aggiungi contatto'}
              />
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
                url={'/requests'}
                span={'mail'}
                text={'Richieste'}
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
              chatList.data.length === 0 ? (
                <p id="feature-contact-message">Non sono presenti chat</p>
              ) : (
                <ChatContainer
                  chatList={chatList.data}
                  handleChatClick={handleChatClick}
                />
              )
            }
          />
          <Route
            path="/chats/*"
            element={
              chatList.data.length === 0 ? (
                <p id="feature-contact-message">Non sono presenti chat</p>
              ) : (
                <>
                  <p id="feature-contact-message">Lista di tutte le chat</p>
                  <ChatContainer
                    chatList={chatList.data}
                    handleChatClick={handleChatClick}
                  />
                </>
              )
            }
          />
          <Route
            path="/contacts/*"
            element={
              contactList.data.length === 0 ? (
                <p id="feature-contact-message">Non sono presenti contatti</p>
              ) : (
                <ContactContainer
                  contactList={contactList.data}
                  handleContactClick={handleContactClick}
                />
              )
            }
          />

          <Route
            path="/delete/*"
            element={
              <>
                <p id="feature-contact-message">Elimina contatti</p>
                <ContactDeleteContainer contactList={contactList.data} />
              </>
            }
          />

          <Route
            path="/requests/*"
            element={
              <>
                <p id="feature-contact-message">Richieste ricevute</p>
                <ContactRequestContainer contactList={contactList.data} />
                <p id="request-contact-message">Richieste inviate</p>
                <ContactRequestContainer contactList={contactList.data} />
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
