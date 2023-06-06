import "../styles/Login.css";

import React from "react";
import Input from "../components/Input";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";

export default function Login() {
  //inizializzare il cookie
  const cookies = new Cookies();

  //Inizializza user state
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
  };

  useEffect(() => {
    // Retrieve state from cookie
    const jwtToken = cookies.get("jwt_authorization");
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setUser(decodedToken);
    }
  }, []);

  // Pass a function reference to onClick instead of invoking the function directly
  const handleLogin = () => {
    login(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
  };

  // DOPO IL CONTROLLO NEL BACKEND PER L'ESISTENZA DEL TOKEN VIENE MANDATO IL TOKEN COME JSON E POI VIENE PASATTO A LOGIN
  const login = (jwtToken) => {
    //Decode jwt token
    const decodedToken = jwtDecode(jwtToken);

    //Set user state
    setUser(decodedToken);
    console.log(decodedToken);

    //set cookie
    cookies.set("jwt_authorization", jwtToken, {
      expires: new Date(decodedToken.expires * 1000),
    });
  };

  return (
    <div id="login-page">
      <div id="login-page-container">
        {/* Use user state to determine whether to render Login or Logout button */}
        {user ? (
          <>
            <h3>{user.name}</h3>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            {" "}
            <h3 id="page-title">Login</h3>
            <p id="email-input-title">Email</p>
            <Input
              containerId="email-input-container"
              id="email-input"
              type="text"
              placeholder="Inserisci email"
            />
            <p id="password-input-title">Password</p>
            <Input
              containerId="password-input-container"
              id="password-input"
              type="password"
              placeholder="Inserisci password"
            />
            <button onClick={handleLogin}>Login</button>
            <p id="signup-question">
              Non hai un account? <a href="/signup">Registrati</a>
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
