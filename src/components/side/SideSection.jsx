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
import { messageList } from "../../xyz/messageList.js";

export default function SideSection({ setMessageList }) {
  const handleChatClick = (chatId) => {
    setMessageList(messageList.data);
  };

  const handleContactClick = (chatId) => {
    setMessageList(messageList.data);
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
