import '../styles/Login.css'

import React from 'react'
import Input from '../components/Input'

export default function Login() {

  return (
    <div id="login-page-container">
      <h3 id="page-title">Login</h3>

      <p id="email-input-title">Email</p>
      <Input
        containerId="email-input-container"
        id="email-input"
        type="text"
        placeholder="Inserisci email..." />

      <p id="password-input-title">Password</p>
      <Input
        containerId="password-input-container"
        id="password-input"
        type="password"
        placeholder="Inserisci password..." />
    </div>
  )
}