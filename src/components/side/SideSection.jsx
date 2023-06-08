import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import SideTopBar from "./SideTopBar";

import ChatContainer from "../chat/ChatContainer";
import ContactContainer from "../contact/ContactContainer";
import ProfileContainer from "../profile/ProfileContainer";

import SideSearch from "./SideSearch";
import SideFeature from "./SideFeature";

// Dati provvisori
import { chatList } from "../../xyz/chatList.js";
import { contactList } from "../../xyz/contactList.js";

import { profile } from "../../xyz/profile.js";
import { messageSalvatore } from "../../xyz/messageSalvatore.js";
import { messageGledjan } from "../../xyz/messageGledjan.js";
import { messagePietro } from "../../xyz/messagePietro.js";

export default function SideSection({ setData }) {

  const handleChatClick = (id) => {

    if (id === 1) {
      // Logica per il caso 1
      const updatedData = {
        user: [messageSalvatore.user], // Aggiorna l'array user
        messages: [messageSalvatore.data] // Aggiorna l'array messages
      };
      setData(updatedData); // Imposta i dati aggiornati nel tuo stato
      console.log(updatedData)
    } else if (id === 2) {
      // Logica per il caso 2
      const updatedData = {
        user: [messageGledjan.user], // Aggiorna l'array user
        messages: [messageGledjan.data] // Aggiorna l'array messages
      };
      setData(updatedData); // Imposta i dati aggiornati nel tuo stato
    } else if (id === 3) {
      // Logica per il caso 3
      const updatedData = {
        user: [messagePietro.user], // Aggiorna l'array user
        messages: [messagePietro.data] // Aggiorna l'array messages
      };
      setData(updatedData); // Imposta i dati aggiornati nel tuo stato
    } else {
      // Logica per il caso predefinito
    }

  };

  const handleContactClick = (id) => {
    if (id === 1) {
      // Logica per il caso 1
      const updatedData = {
        user: [messageSalvatore.user], // Aggiorna l'array user
        messages: [messageSalvatore.data] // Aggiorna l'array messages
      };
      setData(updatedData); // Imposta i dati aggiornati nel tuo stato
    } else if (id === 2) {
      // Logica per il caso 2
      const updatedData = {
        user: [messageGledjan.user], // Aggiorna l'array user
        messages: [messageGledjan.data] // Aggiorna l'array messages
      };
      setData(updatedData); // Imposta i dati aggiornati nel tuo stato
    } else if (id === 3) {
      // Logica per il caso 3
      const updatedData = {
        user: [messagePietro.user], // Aggiorna l'array user
        messages: [messagePietro.data] // Aggiorna l'array messages
      };
      setData(updatedData); // Imposta i dati aggiornati nel tuo stato
    } else {
      // Logica per il caso predefinito
    }

  };


  return (
    <>
      <SideTopBar />

      <div id="side-elements-container">
        <Routes>
          <Route
            path="/"
            element={
              <SideSearch
                id={"side-search"}
                placeholder={"Cerca o inizia una nuova chat"}
                request={"chats"}
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
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              <SideFeature span={"bookmark"} text={"Messaggi personali"} />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/chats/*"
            element={
              <SideFeature span={"bookmark"} text={"Messaggi personali"} />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              <SideFeature
                url={"/add"}
                span={"add"}
                text={"Aggiungi contatto"}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/contacts/*"
            element={
              <SideFeature url={"/requests"} span={"mail"} text={"Richieste"} />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/add/*"
            element={
              <SideSearch
                id={"side-search"}
                placeholder={"Cerca contatto online"}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              <ChatContainer
                chatList={chatList.data}
                handleChatClick={handleChatClick}
              />
            }
          />
          <Route
            path="/chats/*"
            element={
              <ChatContainer
                chatList={chatList.data}
                handleChatClick={handleChatClick}
              />
            }
          />
          <Route
            path="/contacts/*"
            element={
              <ContactContainer
                contactList={contactList.data}
                handleContactClick={handleContactClick}
              />
            }
          />
          <Route
            path="/profile/*"
            element={<ProfileContainer profile={profile.data} />}
          />
        </Routes>
      </div>
    </>
  );
}
