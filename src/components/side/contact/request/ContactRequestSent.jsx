import React, { useState, useEffect } from "react";

export default function ContactRequestSent({ contact }) {

  return (
    <div id={"contact: " + contact.userId} className="contact-button">
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={contact.image}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
          <p>{contact.email}</p>
        </div>
      </div>
    </div>
  );
}