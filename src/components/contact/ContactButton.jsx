import React from "react";

export default function ContactButton({ contact, handleClick }) {
  return (
    <div id={"contact: " + contact.id} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="ProfilePicture" src={contact.picture}></img>
        </div>
        <div className="text-container">
          <h3>{contact.name}</h3>
        </div>
      </div>
    </div>
  );
}
