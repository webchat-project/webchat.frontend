import '../styles/Login.css'

import React from 'react'
import Input from '../components/input/Input'

export default function Login() {

  return (
    <div id='login-page'>
      <div id="login-page-container">

        <h3 id="page-title">Login</h3>

        <div>
        <p id="email-input-title">Email</p>
        <Input
          containerId="email-input-container"
          id="email-input"
          type="text"
          placeholder="Inserisci email" />

        <p id="password-input-title">Password</p>
        <Input
          containerId="password-input-container"
          id="password-input"
          type="password"
          placeholder="Inserisci password" />
        </div>

        <p id="signup-question">Non hai un account? <a href='/signup'>Registrati</a></p>

        <div>
          <button id="login-clear-button">
            Svuota
          </button>
          <button id="login-send-button">
            Invia
          </button>
        </div>

      </div>
    </div>
  )
}