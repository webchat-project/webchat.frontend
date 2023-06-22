import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";
import { backend } from "../../utils/Backend";

import SideTopBar from "./top/SideTopBar";

import ChatContainer from "./chat/ChatContainer";
import ContactContainer from "./contact/ContactContainer";
import ProfileContainer from "./profile/ProfileContainer";

import SideSearch from "./search/SideSearch";
import SideSearchResult from "./search/SideSearchResult";

import SideFeature from "./SideFeature";

import Loading from "../await/Loading";
import Error from "../await/Error";

// Dati provvisori
import { messageSalvatore } from "../../xyz/messageSalvatore.js";
import { messageGledjan } from "../../xyz/messageGledjan.js";
import { messagePietro } from "../../xyz/messagePietro.js";

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

  // Configurazione token
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  // Richiesta chat all'avvio
  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get(backend + "/users/profile", config)
        .then((response) => {
          setProfile(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getProfile();

    const getChatList = async () => {
      await axios
        .get(backend + "/chats/list", config)
        .then((response) => {
          setChatList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getChatList();
  }, []);



  // Use state per non mostrare lista contatti e chat quando si ricerca
  const [searching, setSearching] = useState(false);

  // Use state per non mostrare lista contatti e chat quando si ricerca
  const [result, setResult] = useState({});
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Metodo che si attiva quando si clicca su una chat
  const handleChatClick = (id) => {
    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    var elements = document.getElementsByClassName("chat-button");
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute("style");
    }

    // Accentua il componente selezionato
    var element = document.getElementById("contact: " + id);
    element.style.backgroundColor = "var(--button-click)";
    element.style.border = "1px solid var(--border)";

    // Configurazione token
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

   console.log(chatList);
    setLoadingMessages(true);


    setTimeout(() => {
     /* if (id === 1) {
        // Logica per il caso 1
        const updatedData = {
          user: [messageSalvatore.user], // Aggiorna l'array user
          messages: [messageSalvatore.data], // Aggiorna l'array messages
        };
        setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      } else if (id === 2) {
        // Logica per il caso 2
        const updatedData = {
          user: [messageGledjan.user], // Aggiorna l'array user
          messages: [messageGledjan.data], // Aggiorna l'array messages
        };
        setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      } else if (id === 3) {
        // Logica per il caso 3
        const updatedData = {
          user: [messagePietro.user], // Aggiorna l'array user
          messages: [messagePietro.data], // Aggiorna l'array messages
        };
        setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      } else {
        // Logica per il caso predefinito
      }
*/
      setLoadingMessages(false);
    }, 1000);
  };







  // Metodo che si attiva quando si clicca su un contatto
  const handleContactClick = (id) => {
    // Resetta lo stile di tutti i componenti che hanno la stessa classe
    var elements = document.getElementsByClassName("contact-button");
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute("style");
    }
    // Accentua il componente selezionato
    var element = document.getElementById("contact: " + id);
    element.style.backgroundColor = "var(--button-click)";
    element.style.border = "1px solid var(--border)";

    setLoadingMessages(true);
    setTimeout(() => {
      if (id === 1) {
        // Logica per il caso 1
        const updatedData = {
          user: [messageSalvatore.user], // Aggiorna l'array user
          messages: [messageSalvatore.data], // Aggiorna l'array messages
        };
        setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      } else if (id === 2) {
        // Logica per il caso 2
        const updatedData = {
          user: [messageGledjan.user], // Aggiorna l'array user
          messages: [messageGledjan.data], // Aggiorna l'array messages
        };
        setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      } else if (id === 3) {
        // Logica per il caso 3
        const updatedData = {
          user: [messagePietro.user], // Aggiorna l'array user
          messages: [messagePietro.data], // Aggiorna l'array messages
        };
        setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      } else {
        // Logica per il caso predefinito
      }

      setLoadingMessages(false);
    }, 2000);
  };






  return (
    <>
      <SideTopBar setSearchFocus={setSearching} />

      <div id="side-elements-container">
        <Routes>
          <Route
            path="/"
            element={
              <SideSearch
                id={"side-search"}
                placeholder={"Cerca o inizia una nuova chat"}
                request={"chats"}
                setSearchFocus={setSearching}
                setEmpty={setEmpty}
                setResult={setResult}
                setLoading={setLoading}
                setError={setError}
              />
            }
          />
          <Route
            path="/chats/*"
            element={
              <SideSearch
                id={"side-search"}
                placeholder={"Cerca o inizia una nuova chat"}
                request={"chats"}
                setSearchFocus={setSearching}
                setEmpty={setEmpty}
                setResult={setResult}
                setLoading={setLoading}
                setError={setError}
              />
            }
          />
          <Route
            path="/contacts/*"
            element={
              <SideSearch
                id={"side-search"}
                placeholder={"Cerca contatto"}
                request={"contacts"}
                setSearchFocus={setSearching}
                setEmpty={setEmpty}
                setResult={setResult}
                setLoading={setLoading}
                setError={setError}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              searching === false ? (
                <SideFeature
                  url={"/add"}
                  span={"add"}
                  text={"Aggiungi contatto"}
                />
              ) : (
                <></>
              )
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              searching === false ? (
                <SideFeature
                  url={"/delete"}
                  span={"delete"}
                  text={"Elimina contatti"}
                />
              ) : (
                <></>
              )
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              searching === false ? (
                <SideFeature
                  url={"/requests"}
                  span={"mail"}
                  text={"Richieste"}
                />
              ) : (
                <></>
              )
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/add/*"
            element={
              <>
                <SideSearch
                  id={"side-search"}
                  placeholder={"Cerca contatto online"}
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
              searching === false ? (
                <>
                  {chatList.data.length === 0 ? (
                    <p id="no-chats-message">Non sono presenti chat</p>
                  ) : (
                    <ChatContainer
                      chatList={chatList.data}
                      handleChatClick={handleChatClick}
                    />
                  )}
                </>
              ) : empty === true ? (
                <></>
              ) : loading === true ? (
                <Loading />
              ) : error === true ? (
                <Error />
              ) : (
                <ContactContainer
                  contactList={result}
                  handleContactClick={handleContactClick}
                />
              )
            }
          />
          <Route
            path="/chats/*"
            element={
              searching === false ? (
                <>
                  {chatList.length === 0 ? (
                    <p id="no-chats-message">Non sono presenti chat</p>
                  ) : (
                    <ChatContainer
                      chatList={chatList.data}
                      handleChatClick={handleChatClick}
                    />
                  )}
                </>
              ) : empty === true ? (
                <></>
              ) : loading === true ? (
                <Loading />
              ) : error === true ? (
                <Error />
              ) : (
                <ContactContainer
                  contactList={result}
                  handleContactClick={handleContactClick}
                />
              )
            }
          />
          <Route
            path="/contacts/*"
            element={
              searching === false ? (
                <ContactContainer
                  contactList={contactList.data}
                  handleContactClick={handleContactClick}
                />
              ) : empty === true ? (
                <></>
              ) : loading === true ? (
                <Loading />
              ) : error === true ? (
                <Error />
              ) : (
                <ContactContainer
                  contactList={result}
                  handleContactClick={handleContactClick}
                />
              )
            }
          />
          <Route
            path="/delete"
            element={
              searching === false ? (
                <ContactContainer
                  contactList={contactList.data}
                  handleContactClick={handleContactClick}
                />
              ) : empty === true ? (
                <></>
              ) : loading === true ? (
                <Loading />
              ) : error === true ? (
                <Error />
              ) : (
                <ContactContainer
                  contactList={result}
                  handleContactClick={handleContactClick}
                />
              )
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
