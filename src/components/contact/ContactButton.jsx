import React from "react";

export default function ContactButton({ contact, handleClick }) {
  return (
    <div id="contact-button" onClick={handleClick}>
      <div id="contact-button-container">
        <div id="image-container">
          <img alt="ProfilePicture" src={contact.picture}></img>
        </div>
        <div id="text-container">
          <h3>{contact.name}</h3>
        </div>
      </div>
    </div>
  );
}
