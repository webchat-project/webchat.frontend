import "../styles/Login.css";

import React, { useEffect, useState } from "react";
import Input from "../components/input/Input";
import jwtDecode from "jwt-decode";
//import useCookie from "../util/useCookies";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";



export default function Login({jwt, setJwt}) {
  //inizializzare il cookie
  //const [jwt, setJwt] = useCookie("jwt", "");

  //Inizializza user state
  const [loggedUser, setloggedUser] = useState(null);

  const handleLogout = () => {
    setloggedUser(null);
    setJwt("");
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

  // DOPO IL CONTROLLO NEL BACKEND PER L'ESISTENZA DEL TOKEN VIENE MANDATO IL TOKEN COME JSON E POI VIENE PASATTO A LOGIN
  // Pass a function reference to onClick instead of invoking the function directly
  const handleLogin = () => {
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0OTM4MjI5ODUiLCJuYW1lIjoiR2xlZGlNZXRhIiwiaWF0IjoxNTE2MjM5MDIyNTU1NX0.z4Cgxch0FiYY9suwwY5kO03TYD8JuXQnMbmHZjkdN0Q";
    setJwt(jwtToken);
  };

  return (
    <div id="login-page">
      <div id="login-page-container">
        {/* Use user state to determine whether to render Login or Logout button */}
        {loggedUser ? (
          
            <Navigate to="/"/>
          
        ) : (
          <>
            {" "}
            <h3 id="page-title">Login</h3>
            <label id="email-input-title" htmlFor="email-input">
              Email
            </label>
            <Input
              containerId="email-input-container"
              id="email-input"
              type="text"
              placeholder="Inserisci email"
            />
            <label id="password-input-title" htmlFor="password-input">
              Password
            </label>
            <Input
              containerId="password-input-container"
              id="password-input"
              type="password"
              placeholder="Inserisci password"
            />
            <button onClick={handleLogin}>Login</button>
            <p id="signup-question">
              Non hai un account? <Link to="/signup">Registrati</Link>
            </p>
            <div>
              <button id="login-clear-button">Svuota</button>
              <button id="login-send-button">Invia</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
