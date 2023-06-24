import React from "react";
import ContactRequest from "./ContactRequest";

export default function ContactRequestContainer({ contactList, handleContactClick, jwt }) {

  const handleDisplay = () => {
    if (window.innerWidth <= 600) {
      document.getElementById("side-section").setAttribute("style", "visibility: hidden; display: none; width: 300px")
      document.getElementById("main-section").setAttribute("style", "visibility: visible; display: flex; width: 100%")
    } else {
      document.getElementById("side-section").setAttribute("style", "visibility: visible; display: block; width: 300px")
      document.getElementById("main-section").setAttribute("style", "visibility: visible; display: flex; width: calc(100% - 300px);")
    }
  }

  const handleClick = (id) => {
    handleContactClick(id)
    handleDisplay()
  }

  return contactList.map((c) => (
    <ContactRequest
      contact={c}
      key={c.chatId}
    />
  ));
}
