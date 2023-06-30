import React from "react";

export default function ContactButton({ contact, handleClick }) {

  return (
    <div id={"contact: " + contact.chatId} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={contact.image}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
        </div>
      </div>
    </div>
  );
}
