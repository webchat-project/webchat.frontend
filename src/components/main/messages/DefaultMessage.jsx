import React from 'react'

export default function DefaultMessage() {

  // Componente mostrato all'avvio, fino a quendo l'utente clicca su una chat
  return (
    <div id="default-message">
      <img alt='Logo' src='favicon.ico'></img>
      <h2>WebChat</h2>
      <p>Inizia a messaggiare cliccado su una chat o un contatto</p>
    </div>
  )

}