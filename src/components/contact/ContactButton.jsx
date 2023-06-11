import React, { useState, useEffect } from "react";

export default function ContactButton({ contact, handleClick }) {

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (contact) => {
    if (contact.picture) {
      setProfile(contact.picture)
    } else {
      setProfile("profile.png")
    }
  }

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);

  return (
    <div id={"contact: " + contact.id} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="profile" src={profile}></img>
        </div>
        <div className="text-container">
          <h3>{contact.name}</h3>
        </div>
      </div>
    </div>
  );
}
