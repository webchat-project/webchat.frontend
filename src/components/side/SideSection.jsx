import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

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

export default function SideSection({  jwt, setUserData, setFirstMessage, setMessageData, setLoadingMessages, setErrorMessages, joinChat }) {

  // Liste chat e contatti
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', image: 'profile.png' });
  const [chatList, setChatList] = useState([{ chatId: '', userId: '', firstName: '', lastName: '', image: 'profile.png', lastMessage: '' }]);
  const [contactList, setContactList] = useState([{ chatId: '', userId: '', firstName: '', lastName: '', image: 'profile.png', },]);
  const [requestList, setRequestList] = useState({ sent: [{ userId: '', firstName: '', lastName: '', image: 'profile.png' }], received: [{ userId: '', firstName: '', lastName: '', image: 'profile.png' }] });

  //const [receivedRequestList, setReceivedRequestList] = useState({ received: [{ userId: '', firstName: '', lastName: '', image: 'profile.png' }] });
  //const [sentRequestList, setSentRequestList] = useState({ sent: [{ userId: '', firstName: '', lastName: '', image: 'profile.png' }] });

  const navigate = useNavigate();


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
      //console.log(response.data)
      setProfile(data.body);
      const base64String = btoa(String.fromCharCode(...new Uint8Array(data.body.image.data.data)));
      setProfile(prevValue => {
        return { ...prevValue, image: `data:image/png;base64,${base64String}` };
      });
    } catch (error) {
      console.error(error);

    }
  };

  // Metodo per ottenere la lista chat
  const getChatList = async () => {
    try {
      const { data } = await axios.get(backend + '/chats/list', config);
      //console.log('1Chat list: ' + JSON.stringify(chatList));
      //console.log(response.data.data);
      setChatList(
        data.body.map(chat => {
          const base64String = btoa(String.fromCharCode(...new Uint8Array(chat.image.data.data)));
          chat.image = `data:image/png;base64,${base64String}`;
          return chat;
        })
      );
    } catch (error) {
      console.error(error);

    }
  };

  //console.log(contactList);

  // Metodo per ottenere la lista contatti
  const getContactList = async () => {
    try {
      const { data } = await axios.get(backend + '/users/contacts/list', config);
      setContactList(
        data.body.map(chat => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(chat.image.data.data))
          );
          chat.image = `data:image/png;base64,${base64String}`;
          return chat;
        })
      );

      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista contatti
  const getRequestList = async () => {
    try {
      const { data } = await axios.get(backend + '/users/requests/list', config);
      setRequestList(data.body.requests);
      //console.log(data.body.requests)
      setRequestList({
        sent: data.body.requests.sent.map(s => {
          const base64String = btoa(String.fromCharCode(...new Uint8Array(s.image.data.data)));
          s.image = `data:image/png;base64,${base64String}`;
          return s;
        }),

        received: data.body.requests.received.map(r => {
          const base64String = btoa(String.fromCharCode(...new Uint8Array(r.image.data.data)));
          r.image = `data:image/png;base64,${base64String}`;
          return r;
        }),
      });
    } catch (error) {
      console.error(error);
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

  // Location
  const location = useLocation();

  // Metodo per selezionare il pulsante nella topbar al refresh
  const setTopBarOnLoad = () => {
    if (location.pathname === '/') {
      let element = document.getElementById('side-top-bar-button: Chat');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
    if (location.pathname === '/chats') {
      let element = document.getElementById('side-top-bar-button: Chat');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
    if (location.pathname === '/contacts') {
      let element = document.getElementById('side-top-bar-button: Contatti');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
    if (location.pathname === '/profile') {
      let element = document.getElementById('side-top-bar-button: Profilo');
      element.style.backgroundColor = 'var(--button-click)';
      element.style.border = '1px solid var(--border)';
    }
  };


  // Metodo per ottenere la lista messaggi
  const getMessages = async (id) => {
    try {
      const { data } = await axios.get(backend + '/chats/' + id, config);
      setMessageData(data.body.messages);
      setLoadingMessages(false)
      setErrorMessages(false)
    } catch (error) {
      console.error(error);
      setLoadingMessages(false)
      setErrorMessages(true)
    }
  };





  // Metodo che si attiva quando si clicca su una chat
  const handleChatClick = (id) => {
    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    var elements = document.getElementsByClassName('chat-button');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('style');
    }

    // Accentua il componente selezionato
    var element = document.getElementById('contact: ' + id);
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
      setUserData(prevValue => ({ ...prevValue, image: imgSrc })
      );
    });

    // Primo messaggio
    setFirstMessage(true)

    // Loading
    setLoadingMessages(true)
    setErrorMessages(false)

    // Metodo per eliminare i messaggi
    const sentMessages = document.querySelectorAll('#CurrentSessionMessage');
    if (sentMessages.length > 0) {
      for (var j = 0; j < sentMessages.length; j++) {
        sentMessages[j].remove();
      }
    }

    // Caricamento messaggi
    getMessages(id);
  };




  // Metodo per redirigere in chat quando si clicca su un contatto






  // Metodo che si attiva quando si clicca su un contatto
  const handleContactClick = (id) => {
    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    var elements = document.getElementsByClassName('contact-button');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('style');
    }
    // Accentua il componente selezionato
    var element = document.getElementById('contact: ' + id);
    element.style.backgroundColor = 'var(--button-click)';
    element.style.border = '1px solid var(--border)';

    // Imposta l'utente
    setUserData(prevValue => ({ ...prevValue, chatId: id })
    );

    let elementText = element.querySelectorAll('h3');
    let elementImg = element.querySelectorAll('img');
    elementText.forEach(e => {
      let nameValue = e.innerText;
      setUserData(prevValue => ({ ...prevValue, name: nameValue })
      );

    });
    elementImg.forEach(e => {
      let imgSrc = e.src;
      setUserData(prevValue => ({ ...prevValue, image: imgSrc })
      );
    });
    // Primo messaggio
    setFirstMessage(true)

    // Loading
    setLoadingMessages(true)
    setErrorMessages(false)

    // Metodo per eliminare i messaggi
    const sentMessages = document.querySelectorAll('#CurrentSessionMessage');
    if (sentMessages.length > 0) {
      for (var j = 0; j < sentMessages.length; j++) {
        sentMessages[j].remove();
      }
    }

    // Caricamento messaggi
    getMessages(id);
  };



  return (
    <>
      <SideTopBar />

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
              <SideFeature url={'/requests'} span={'mail'} text={'Richieste'} />
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
              chatList.length === 0 ? (
                <p id="first-feature-contact-message">Non sono presenti chat</p>
              ) : (

                <ChatContainer
                  chatList={chatList}
                  handleChatClick={handleChatClick}
                  joinChat = {joinChat}
                />

                <>
                  <p id="first-feature-contact-message">Lista di tutte le chat</p>
                  <ChatContainer
                    chatList={chatList}
                    handleChatClick={handleChatClick}
                    joinChat = {joinChat}

                  />
                </>

              )
            }
          />
          <Route
            path="/chats/*"
            element={
              chatList.length === 0 ? (
                <p id="first-feature-contact-message">Non sono presenti chat</p>
              ) : (
                <>
                  <p id="first-feature-contact-message">Lista di tutte le chat</p>
                  <ChatContainer
                    chatList={chatList}
                    handleChatClick={handleChatClick}
                    joinChat = {joinChat}
                  />
                </>
              )
            }
          />
          <Route
            path="/contacts/*"
            element={
              contactList.length === 0 ? (
                <p id="second-feature-contact-message">Non sono presenti contatti</p>
              ) : (
                <>
                  <p id="second-feature-contact-message">Lista di tutti i contatti</p>
                  <ContactContainer contactList={contactList} handleContactClick={handleContactClick} />
                </>
              )
            }
          />

          <Route
            path="/delete/*"
            element={
              <>
                <p id="first-feature-contact-message">Elimina contatti</p>
                <ContactDeleteContainer contactList={contactList} />
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
                    <p id="side-text-message-info">Nessuna richiesta ricevuta</p>
                  </>
                ) : (
                  <>
                    <p id="first-feature-contact-message">Richieste ricevute</p>
                    <ContactRequestContainer contactList={requestList.received} jwt={jwt} />
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
                    <ContactRequestContainer contactList={requestList.sent} jwt={jwt} />
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
