import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Componenti
import { signupRoute } from '../utils/ApiRoutes';
import Theme from '../components/theme/Theme';

// Componenti di caricamento e errore
import Loading from "../components/await/Loading";
import Error from "../components/await/Error";
import Success from "../components/await/Success";

// Axios
import axios from 'axios';

export default function Signup() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    image: '',
  });
  const [showUploader, setShowUploader] = useState(false);
  const [profilePicture, setProfilePicture] = useState('/profile.png');
  const [isSubmit, setIsSubmit] = useState(false);

  // Stato errori input
  const [formErrors, setFormErrors] = useState({});

  // Stato caricamento e errore
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Metodo invio submit
  const handleSubmit = async event => {
    event.preventDefault();
    const { firstName, lastName, email, password } = user;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', profilePicture);
    setLoading(true);
    try {
      const { data } = await axios.post(signupRoute, formData);
      if (data.status) { 
        setSuccess("Registrazione completata con successo") }

    } catch (error) {
      console.log(error);
      setError(error.message)
    }
    setLoading(false);
  };

  // Metodo per gestione cambiamento input
  const handleChange = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
    setFormErrors(handleValidation(user));

    if (Object.keys(formErrors).length === 0) {
      setIsSubmit(true);
    }
  };

  // Metodo per svuotare tutti gli input
  const handleClearForm = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Metodo per mostrare l'uploader
  const handleShowUploader = () => {
    setFormErrors(handleValidation(user));
    if (isSubmit) {
      setShowUploader(true);
    }
  };

  // Metodo per nascondere l'uploader
  const handleHideUploader = () => {
    setShowUploader(false);
  };

  // Metodo per impostare la foto
  const handlePhotoChange = event => {
    let file = event.target.files[0];
    setUser(prevUser => ({
      ...prevUser,
      image: file,
    }));
    setProfilePicture(file);
  };

  // Metodo per rimuovere la foto
  const handleRemovePhoto = () => {
    setUser(prevUser => ({
      ...prevUser,
      image: '',
    }));
    setProfilePicture('/profile.png');
  };

  useEffect(() => {
    if (user.image) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(user.image);
    }
  }, [user.image]);

  // Metodo per la validazione input
  const handleValidation = (user) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      confirmEmail,
    } = user;
    if (firstName.trim() === '') {
      errors.firstName = 'Il nome è necessario';
    }
    if (lastName.trim() === '') {
      errors.lastName = 'Il cognome è necessario';
    }
    if (email.trim() === '') {
      errors.email = "L'email è necessaria";
    } else if (!regexEmail.test(email)) {
      errors.emailValid = 'Email non valida';
    } if (email !== confirmEmail) {
      errors.confrontEmail = 'Le email non corrispondono';
    }
    if (password.trim() === '') {
      errors.password = 'La password è necessaria';
    } if (password !== confirmPassword) {
      errors.confrontPassword = 'Le password non corrispondono';
    } else if (password.length.trim() < 8) {
      errors.passwordValid = 'La password deve avere minimo 8 caratteri';
    }
    return errors;
  };

  // Metodo per ritornare a signup in caso di errore
  const handleBackToSignup = () => {
    window.location.reload();
  }

  // Metodo per effettuare il login
  const handleGoToLogin = () => {
    navigate('/login');
  }

  return (
    <div id="signup-page">
      <div id="signup-page-container">
        <h3 id="page-title">Signup</h3>
        {loading ? <Loading event={"Registrazione in corso"} />
          : error !== false ? (<> <Error event={error} /> <button id="reset-signup-button" onClick={handleBackToSignup}>Ritorna a signup</button></>)
            : success !== false ? (<> <Success event={success} /> <button id="go-login-button" onClick={handleGoToLogin}>Accedi</button></>)
              : (<>
                <form onSubmit={event => handleSubmit(event)}>
                  {showUploader === false ? (
                    <>
                      <div id="signup-container">
                        <div>
                          <label id="name-input-title" htmlFor="name-input">
                            Nome
                          </label>
                          <input
                            id="name-input"
                            type="text"
                            value={user.firstName}
                            name="firstName"
                            placeholder="Inserisci nome"
                            onChange={e => handleChange(e)}
                            required
                          />
                          <p id="validations">{formErrors.firstName}</p>
                        </div>

                        <div>
                          <label id="surname-input-title" htmlFor="surname-input">
                            Cognome
                          </label>
                          <input
                            id="surname-input"
                            type="text"
                            value={user.lastName}
                            name="lastName"
                            placeholder="Inserisci cognome"
                            onChange={e => handleChange(e)}
                            required
                          />
                          <p id="validations">{formErrors.lastName}</p>
                        </div>

                        <div>
                          <label id="email-input-title" htmlFor="email-input">
                            Email
                          </label>
                          <input
                            id="email-input"
                            type="email"
                            value={user.email}
                            name="email"
                            placeholder="Inserisci email"
                            onChange={e => handleChange(e)}
                            required
                          />
                          <p id="validations">
                            {formErrors.email}
                            {formErrors.emailValid}
                          </p>
                        </div>

                        <div>
                          <label
                            id="verify-email-input-title"
                            htmlFor="verify-email-input"
                          >
                            Verifica email
                          </label>
                          <input
                            id="verify-email-input"
                            type="email"
                            value={user.confirmEmail}
                            name="confirmEmail"
                            placeholder="Reinserisci email"
                            onChange={e => handleChange(e)}
                            required
                          />
                          <p id="validations">{formErrors.confrontEmail}</p>
                        </div>

                        <div>
                          <label id="password-input-title" htmlFor="password-input">
                            Password
                          </label>
                          <input
                            id="password-input"
                            type="password"
                            value={user.password}
                            name="password"
                            placeholder="Inserisci password"
                            onChange={e => handleChange(e)}
                            required
                          />
                          <p id="validations">
                            {formErrors.password}
                          </p>
                        </div>

                        <div>
                          <label
                            id="verify-password-input-title"
                            htmlFor="verify-password-input"
                          >
                            Verifica password
                          </label>
                          <input
                            id="verify-password-input"
                            type="password"
                            value={user.confirmPassword}
                            name="confirmPassword"
                            placeholder="Reinserisci password"
                            onChange={e => handleChange(e)}
                            required
                          />
                          <p id="validations">{formErrors.confrontPassword}</p>
                        </div>
                      </div>
                      <p id="login-question">
                        Hai un account? <Link to="/login">Accedi</Link>
                      </p>
                      <div>
                        <button
                          type="reset"
                          id="signup-clear-button"
                          onClick={handleClearForm}
                        >
                          Svuota
                        </button>
                        <button
                          type="button"
                          id="show-uploader-button"
                          onClick={handleShowUploader}
                          disabled={!isSubmit}
                        >
                          Avanti
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div id="photo-uploader-container">
                        <div id="preview-picture-container">
                          <div id="signup-picture-container">
                            <img id="signup-picture" src={profilePicture} alt="img" />
                          </div>
                          {profilePicture !== '/profile.png' ? (
                            <button
                              type="button"
                              id="remove-signup-picture"
                              onClick={handleRemovePhoto}
                            >
                              Rimuovi immagine
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="input-profile-picture"
                            id="upload-profile-picture-button"
                          >
                            <span className="material-symbols-outlined">upload</span>
                            <p>Carica immagine</p>
                          </label>
                          <input
                            id="input-profile-picture"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handlePhotoChange}
                          />
                        </div>

                        <div id="photo-uploader-container-buttons">
                          <button
                            type="button"
                            id="hide-uploader-button"
                            onClick={handleHideUploader}
                          >
                            Indietro
                          </button>
                          <button id="signup-send-button" type="submit">
                            Registrati
                          </button>
                        </div>
                      </div>
                      <Theme />
                    </>
                  )}
                </form>
              </>)}
      </div>
    </div>
  );
}