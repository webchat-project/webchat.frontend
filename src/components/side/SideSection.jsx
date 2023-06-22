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
import DeleteContactContainer from './contact/delete/ContactDeleteContainer';

import SideSearch from './search/SideSearch';
import SideSearchResult from './search/SideSearchResult';
import SideFeature from './SideFeature';

export default function SideSection({
  setData,
  setLoadingMessages,
  setErrorMessages,
  jwt,
}) {
  // Liste chat e contatti
  const [profile, setProfile] = useState({ data: [] });
  const [chatList, setChatList] = useState({ data: [] });
  const [contactList, setContactList] = useState({ data: [] });
  const [sentRequestList, setSentRequestList] = useState({ sent: [] });
  const [receivedRequestList, setReceviedRequestList] = useState({ received: [] });

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
      console.log('1Profile: ' + JSON.stringify(profile));
      setProfile(response.data);
      console.log('2Profile: ' + JSON.stringify(response.data));
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
      console.log('1Request list: ' + JSON.stringify(sentRequestList));
      //setSentRequestList();
      console.log('2Request list: ' + JSON.stringify(response.data.sent));
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

  // Use state per non mostrare lista contatti e chat quando si ricerca
  const [searching, setSearching] = useState(false);

  // Use state per non mostrare lista contatti e chat quando si ricerca
  const [result, setResult] = useState({ data: [] });
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
                <SideSearch
                  id={'side-search'}
                  placeholder={'Cerca contatto online'}
                  setSearchFocus={setSearching}
                  setEmpty={setEmpty}
                  setResult={setResult}
                  setLoading={setLoading}
                  setError={setError}
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
                <p id="no-chats-message">Non sono presenti chat</p>
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
                <p id="no-chats-message">Non sono presenti chat</p>
              ) : (
                <ChatContainer
                  chatList={chatList.data}
                  handleChatClick={handleChatClick}
                />
              )
            }
          />
          <Route
            path="/contacts/*"
            element={
              contactList.data.length === 0 ? (
                <p id="no-chats-message">Non sono presenti contatti</p>
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
                <DeleteContactContainer contactList={contactList.data} />
              </>
            }
          />

          <Route
            path="/requests/*"
            element={
              <>
                <p id="feature-contact-message">Richieste ricevute</p>
                <DeleteContactContainer contactList={contactList.data} />
                <p id="feature-contact-message">Richieste inviate</p>
                <DeleteContactContainer contactList={contactList.data} />
              </>
            }
          />

          <Route
            path="/add/*"
            element={
              searching === false ? (
                <></>
              ) : empty === true ? (
                <></>
              ) : loading === true ? (
                <Loading />
              ) : error === true ? (
                <Error />
              ) : (
                <SideSearchResult contactList={result} />
              )
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
