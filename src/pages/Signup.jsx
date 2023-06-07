import "../styles/Signup.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import axios from "axios";
//import { signupRoute } from "../utils/ApiRoutes";

export default function Signup() {

  const [status, setStatus] = useState('typing'); //string

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  
  /*async function handleSubmit(e) { 
    e.preventDefault(); 
    setStatus('submitting'); 
    try { 
      await sendForm(answer); 
            setStatus('success'); 
    }catch (err) {
      setStatus('typing'); 
      setError(err);
    }
}
*/

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      console.log(user);
      
      /*const { firstName, lastName, email, password } = user;
      const { data } = await axios.post(signupRoute, {
        firstName,
        lastName,
        email,
        password,
      });*/
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  



  const handleValidation = () => {
    const { password, confirmPassword, email, confirmEmail } = user;

    if (email !== confirmEmail) {
      toast.error("Email non sono uguali!", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password non sono uguali!", toastOptions);
      return false;
    } else if (email.length < 13) {
      toast.error("Email non valido!", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password deve avere minimo 8 caratteri!", toastOptions);
      return false;
    } else if (email.trim() === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    
    return true;
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>
          </div>
          <p id="login-question">
            Hai un account? <Link to="/login">Accedi</Link>
          </p>
          <div>
            <button id="signup-clear-button">Svuota</button>
             <button id="signup-send-button" type="submit" >
              Registrati
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
