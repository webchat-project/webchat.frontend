import "../styles/Signup.css";

import React, { useState } from "react";
//import Input from "../components/input/Input";
import { Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  
  const handleValidation = () => {
    const { password, confirmPassword, email, confirmEmail } = values;

    if (password !== confirmPassword) {
      toast.error;
    }
  };

  return (
    <div id="signup-page">
      <div id="signup-page-container">
        <h3 id="page-title">Signup</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div id="signup-container">
            <div>
              <label id="name-input-title" htmlFor="name-input">
                Nome
              </label>
              <input
                id="name-input"
                type="text"
                name="firstName"
                placeholder="Inserisci nome"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label id="surname-input-title" htmlFor="surname-input">
                Cognome
              </label>
              <input
                id="surname-input"
                type="text"
                name="lastName"
                placeholder="Inserisci cognome"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label id="email-input-title" htmlFor="email-input">
                Email
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                placeholder="Inserisci email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label id="verify-email-input-title" htmlFor="verify-email-input">
                Verifica email
              </label>
              <input
                id="verify-email-input"
                type="email"
                name="confirmEmail"
                placeholder="Reinserisci email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label id="password-input-title" htmlFor="password-input">
                Password
              </label>
              <input
                id="password-input"
                type="password"
                name="password"
                placeholder="Inserisci password"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label
                id="verify-password-input-title"
                htmlFor="verify-password-input">
                Verifica password
              </label>
              <input
                id="verify-password-input"
                type="password"
                name="confirmPassword"
                placeholder="Reinserisci password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <span id="login-question">
            Hai un account? <Link to="/login">Accedi</Link>
          </span>
          <div>
            <button id="signup-clear-button">Svuota</button>
            <button id="signup-send-button" type="submit">
              Invia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
