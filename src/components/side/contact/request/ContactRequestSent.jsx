import React, { useState, useEffect } from "react";

export default function ContactRequestSent({ contact }) {

  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (contact) => {
    if (contact.image === "") {
      setProfile("profile.png")
    } else {
      setProfile(contact.image)
    }
  }

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);

  return (
    <div id={"contact: " + contact.userId} className="contact-button">
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={profile}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
          <p>{contact.email}</p>
        </div>
      </div>
    </div>
  );
}