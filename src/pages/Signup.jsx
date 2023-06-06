import '../styles/Signup.css'

import React from 'react'
import Input from '../components/input/Input'

export default function Signup() {

  return (
    <div id='signup-page'>
      <div id="signup-page-container">

        <h3 id="page-title">Signup</h3>

        <div id="signup-container">
        <div>
        <p id="name-input-title">Nome</p>
        <Input
          containerId="name-input-container"
          id="name-input"
          type="text"
          placeholder="Inserisci nome" />
        </div>

        <div>
        <p id="surname-input-title">Cognome</p>
        <Input
          containerId="surname-input-container"
          id="surname-input"
          type="text"
          placeholder="Inserisci cognome" />
        </div>

        <div>
        <p id="email-input-title">Email</p>
        <Input
          containerId="email-input-container"
          id="email-input"
          type="text"
          placeholder="Inserisci email" />
        </div>

        <div>
        <p id="verify-email-input-title">Verifica email</p>
        <Input
          containerId="verify-email-input-container"
          id="verify-email-input"
          type="text"
          placeholder="Reinserisci email" />
        </div>

        <div>
        <p id="password-input-title">Password</p>
        <Input
          containerId="password-input-container"
          id="password-input"
          type="password"
          placeholder="Inserisci password" />
        </div>

        <div>
        <p id="verify-password-input-title">Verifica password</p>
        <Input
          containerId="verify-password-input-container"
          id="verify-password-input"
          type="password"
          placeholder="Reinserisci password" />
        </div>
        </div>

        <p id="login-question">Hai un account? <a href='/login'>Accedi</a></p>

        <div>
          <button id="signup-clear-button">
            Svuota
          </button>
          <button id="signup-send-button">
            Invia
          </button>
        </div>

      </div>
    </div>
  )
}