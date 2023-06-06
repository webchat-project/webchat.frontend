import "../styles/Signup.css";

import React, { useState } from "react";
//import Input from "../components/input/Input";
import { Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div id="signup-page">
      <div id="signup-page-container">
        <h3 id="page-title">Signup</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div id="signup-container">
            <div>
              <p id="name-input-title">Nome</p>
              <input
                id="name-input"
                type="text"
                name="firstName"
                placeholder="Inserisci nome"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <p id="surname-input-title">Cognome</p>
              <input
                id="surname-input"
                type="text"
                name="lastName"
                placeholder="Inserisci cognome"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <p id="email-input-title">Email</p>
              <input
                id="email-input"
                type="email"
                name="email"
                placeholder="Inserisci email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <p id="verify-email-input-title">Verifica email</p>
              <input
                id="verify-email-input"
                type="email"
                name="confirmEmail"
                placeholder="Reinserisci email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <p id="password-input-title">Password</p>
              <input
                id="password-input"
                type="password"
                placeholder="Inserisci password"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <p id="verify-password-input-title">Verifica password</p>
              <input
                id="verify-password-input"
                type="password"
                name="confirmPassword"
                placeholder="Reinserisci password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <button type="submit">Create User</button>
          <span id="login-question">
            Hai un account? <Link to="/login">Accedi</Link>
          </span>
        </form>

        <div>
          <button id="signup-clear-button">Svuota</button>
          <button id="signup-send-button">Invia</button>
        </div>
      </div>
    </div>
  );
}
