import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginRoute } from "../utils/ApiRoutes";

// Componenti di caricamento e errore
import Loading from "../components/await/Loading";
import Error from "../components/await/Error";

// Jwt e Axios
import jwtDecode from "jwt-decode";
import axios from "axios";

// Login Google
import { GoogleLogin } from '@react-oauth/google'

export default function Login({ jwt, setJwt }) {

  // Inizializza user state utente loggato
  const [loggedUser, setloggedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [loginUser, setLoginUser] = useState({ email: "", password: "" });

  // Stato errori input per validazione
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // Metodo invio dati
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginUser;
    setLoading(true);
    try {
      const { data } = await axios.post(loginRoute, { email, password });
      if (!data.error) {
        setJwt(data.body.jwtToken);
      }
    } catch (e) {
      setError(e.response.data.error)
    }
    setLoading(false);
  };

  // Gestione cambiamento input
  const handleChange = (event) => {
    event.preventDefault();
    setLoginUser({ ...loginUser, [event.target.name]: event.target.value });
    setFormErrors(handleValidation(loginUser));
  };

  useEffect(() => { setFormErrors(handleValidation(loginUser)); }, [loginUser])
  useEffect(() => { if (Object.keys(formErrors).length === 0) { setIsSubmit(true); } }, [formErrors])

  useEffect(() => {
    if (jwt.trim() !== "") {
      //Decode jwt token
      const decodedToken = jwtDecode(jwt);
      //Set user state
      setloggedUser(decodedToken);
      // Imposta id utente loggato in localStorage
      localStorage.setItem("currentUserId", decodedToken.id)
    }
  }, [jwt]);

  // Metodo per validare l'input
  const handleValidation = (user) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const { email, password } = user;

    if (email.trim() === '') {
      errors.email = "L'email è necessaria";
    } else if (!regexEmail.test(email)) {
      errors.emailValid = 'Email non valida';
    } if (password.trim() === '') {
      errors.password = 'La password è necessaria';
    }
    return errors;
  };

  // Metodo per la pulizia form
  const handleClearForm = () => {
    setLoginUser({
      email: "",
      password: "",
    });
  };

  // Metodo per ritornare alla pagina di login
  const handleBackToLogin = () => {
    window.location.reload();
  }

  // Metodo per accesso con Google
  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${loginRoute}/google`, response)
      if (!data.error) {
        setJwt(data.body.jwtToken);
      }
    } catch (e) {
      setError(e.response.data.error);
    }
    setLoading(false);
  }

  return (
    <div id="login-page">
      <div id="login-page-container">
        {loggedUser ? (
          <Navigate to="/" />
        ) : loading ? (
          <Loading />
        ) : error !== false ? (
          <>
            <Error event={error} />
            <button id="reset-login-button" onClick={handleBackToLogin}>Ritorna a login</button>
          </>
        ) : (
          <>
            <form onSubmit={(event) => handleSubmit(event)}>
              <h3 id="page-title">Login</h3>
              <label id="email-input-title" htmlFor="email-input">
                Email
              </label>
              <input
                id="email-input"
                type="text"
                value={loginUser.email}
                name="email"
                placeholder="Inserisci email"
                onChange={(e) => handleChange(e)}
                required
              />
              <p id="validations">
                {formErrors.email}
                {formErrors.emailValid}
              </p>
              <label id="password-input-title" htmlFor="password-input">
                Password
              </label>
              <input
                id="password-input"
                type="password"
                value={loginUser.password}
                name="password"
                placeholder="Inserisci password"
                onChange={(e) => handleChange(e)}
                required
              />
              <p id="validations">
                {formErrors.password}
              </p>
              <p id="signup-question">
                Non hai un account? <Link to="/signup">Registrati</Link>
              </p>
              <div>
                <button id="login-clear-button" onClick={handleClearForm}>
                  Svuota
                </button>
                <button id="login-send-button" type="submit" disabled={!isSubmit}>
                  Accedi
                </button>
              </div>
            </form>
            <div id="googleButtonDiv">
              <p>oppure</p>
              <GoogleLogin
                onSuccess={handleCredentialResponse}
                type="standard"
                theme="filled_blue"
                size="large"
                shape="pill"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}