import React, { useEffect, useState } from "react";
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

  // Metodo per ottenere i dati del profilo
  const getProfile = async () => {
    try {
      const response = await axios.get(backend + '/users/profile', config);
      console.log("1Profile: " + JSON.stringify(profile))
      setProfile(response.data);
      console.log("2Profile: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista chat
  const getChatList = async () => {
    try {
      const response = await axios.get(backend + '/chats/list', config);
      console.log("1Chat list: " + JSON.stringify(chatList));
      setChatList(response.data);
      console.log("2Chat list: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // Metodo per ottenere la lista contatti
  const getContactList = async () => {
    try {
      const response = await axios.get(backend + '/users/contacts/list', config);
      console.log("1Contact list: " + JSON.stringify(contactList))
      setContactList(response.data);
      console.log("2Contact list: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  // Ottengo i dati all'avvio
  useEffect(() => {
    getProfile();
    getChatList();
    getContactList();
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

    // Caricamento
    setLoadingMessages(true);


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

    // Caricamento
    setLoadingMessages(true);


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
                jwt={jwt}
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
                jwt={jwt}
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
                jwt={jwt}
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
            path="/contacts/*"
            element={
              searching === false ? (
                <>
                  {contactList.data.length === 0 ? (
                    <p id="no-chats-message">Non sono presenti contatti</p>
                  ) : (
                    <ContactContainer
                      contactList={contactList.data}
                      handleContactClick={handleContactClick}
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
