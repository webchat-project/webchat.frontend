import React, { useEffect, useState } from "react";

import Loading from "../components/await/Loading";
import Error from "../components/await/Error";

import jwtDecode from "jwt-decode";
import axios from "axios";

// import useCookie from "../util/useCookies";
//import {useNavigate } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";
import { loginRoute } from "../utils/ApiRoutes";

export default function Login({ jwt, setJwt }) {
  //inizializzare il cookie //const [jwt, setJwt] = useCookie("jwt", ""); //const navigate = useNavigate();

  //Inizializza user state
  const [loggedUser, setloggedUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginUser;

    setLoading(true); // Imposta il caricamento su true

    try {
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (data.status) {
        setJwt(data.jwtToken);
        //navigate("/");
      } else {
        console.log(data.msg);
        //window.location.reload();
      }
    } catch (e) {
      setError(true); // Imposta l'errore
      console.error(e);
      //window.location.reload();
    }

    setLoading(false); // Imposta il caricamento su false dopo che la chiamata è completata
  };

  const handleChange = (event) => {
    event.preventDefault();
    setLoginUser({ ...loginUser, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (jwt.trim() !== "") {
      //Decode jwt token
      const decodedToken = jwtDecode(jwt);
      //Set user state
      setloggedUser(decodedToken);
      console.log(decodedToken);
    }
  }, [jwt]);

  const handleClearForm = () => {
    setLoginUser({
      email: "",
      password: "",
    });
  };

  return (
    <div id="login-page">
      <div id="login-page-container">
        {loggedUser ? (
          <Navigate to="/" />
        ) : loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
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
            <p id="signup-question">
              Non hai un account? <Link to="/signup">Registrati</Link>
            </p>
            <div>
              <button id="login-clear-button" onClick={handleClearForm}>
                Svuota
              </button>
              <button id="login-send-button" type="submit" >
                Accedi
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/*// DOPO IL CONTROLLO NEL BACKEND PER L'ESISTENZA DEL TOKEN VIENE MANDATO IL TOKEN COME JSON E POI VIENE PASATTO A LOGIN
// Pass a function reference to onClick instead of invoking the function directly
const handleLogin = () => {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0OTM4MjI5ODUiLCJuYW1lIjoiR2xlZGlNZXRhIiwiaWF0IjoxNTE2MjM5MDIyNTU1NX0.z4Cgxch0FiYY9suwwY5kO03TYD8JuXQnMbmHZjkdN0Q";
  setJwt(jwtToken);
};*/
