import React from 'react'

export default function ContactButton({contact, action}) {

  return(
    <div id="contact-button" onClick={action}>
      <div id="contact-button-container">
        <div id="image-container">
          <img alt="ProfilePicture" src={contact.picture}></img>
        </div>
        <div id="text-container">
          <h3>{contact.name}</h3>
      </div>
      </div>
    </div>
  )
}