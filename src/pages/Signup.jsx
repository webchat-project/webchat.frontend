import "../styles/Signup.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { signupRoute } from "../utils/ApiRoutes";
import Theme from "../components/theme/Theme";

export default function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  // UseState per il caricamento immagine profilo
  const [showUploader, setShowUploader] = useState(false)
  const [profilePicture, setProfilePicture] = useState("/profile.png")

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

      const { firstName, lastName, email, password } = user;

      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', profilePicture);

      console.log(formData)

      try {
        const { data } = await axios.post(signupRoute, formData);

        if (data.status) {
          console.log(data.msg);
          navigate("/login");
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleClearForm = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Metodo per mostrare l'uploader
  const handleShowUploader = () => {
    setShowUploader(true)
  };

  // Metodo per nascondere l'uploader
  const handleHideUploader = () => {
    setShowUploader(false)
  };

  // Metodo per impostare la foto
  const handlePhotoChange = (event) => {
    let file = event.target.files[0];

    setUser((prevUser) => ({
      ...prevUser,
      image: file,
    }));

    console.log(file)

    setProfilePicture(file)
  };

  // Metodo per rimuovere la foto
  const handleRemovePhoto = () => {
    setUser((prevUser) => ({
      ...prevUser,
      image: "",
    }));

    setProfilePicture("/profile.png")
  };

  useEffect(() => {
    if (user.image) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(user.image);
    }
  }, [user.image])

  //VALIDATIONS

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
          {showUploader === false ?
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
                    /* onFocus={handleInputFocus}
                     onBlur={handleInputBlur}
                     style={nameStyle}
                     */
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
                    value={user.lastName}
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
                    value={user.email}
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
                    value={user.confirmEmail}
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
                    value={user.password}
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
                    value={user.confirmPassword}
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
                <button type="reset" id="signup-clear-button" onClick={handleClearForm}>
                  Svuota
                </button>
                <button type="button" id="show-uploader-button" onClick={handleShowUploader}>
                  Avanti
                </button>
              </div>
            </>
            :
            <>
              <div id="photo-uploader-container">

                <div id="preview-picture-container">
                  <div id="signup-picture-container">
                    <img id="signup-picture" src={profilePicture} alt="img" />
                  </div>
                  {profilePicture !== "/profile.png" ? <button type="button" id="remove-signup-picture" onClick={handleRemovePhoto}>Rimuovi immagine</button> : <></>}
                </div>

                <div>
                  <label htmlFor="input-profile-picture" id="upload-profile-picture-button">
                    <span className="material-symbols-outlined">upload</span>
                    <p>Carica immagine</p>
                  </label>
                  <input id="input-profile-picture" type="file" accept="image/*" onChange={handlePhotoChange} />
                </div>

                <div id="photo-uploader-container-buttons">
                  <button type="button" id="hide-uploader-button" onClick={handleHideUploader}>
                    Indietro
                  </button>
                  <button id="signup-send-button" type="submit">
                    Registrati
                  </button>
                </div>
              </div>
              <Theme />
            </>
          }
        </form>
      </div>
    </div>
  );
}

//************************************************************************************************************************************************* */
/*
// Metodi per modifica stile
const nameStyle = () => {
  if (
    (this.signupFormControl.name.touched || this.submitted1) &&
    this.signupFormControl.name.invalid
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.name.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}

const surnameStyle=()=> {
  if (
    (this.signupFormControl.surname.touched || this.submitted1) &&
    this.signupFormControl.surname.invalid
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.surname.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}

const birthStyle=()=> {
  if (
    (this.signupFormControl.birth.touched || this.submitted1) &&
    this.signupFormControl.birth.invalid
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.birth.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}


const emailStyle = ()=> {
  if (
    (this.signupFormControl.email.touched || this.submitted2) &&
    this.signupFormControl.email.invalid
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.email.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}

const emailCheckStyle = ()=> {
  if (
    (this.signupFormControl.emailcheck.touched || this.submitted2) &&
    (this.signupFormControl.emailcheck.value !== this.signupFormControl.email.value)
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.emailcheck.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}

const passwordStyle=()=> {
  if (
    (this.signupFormControl.password.touched || this.submitted2) &&
    this.signupFormControl.password.invalid
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.password.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}

const passwordCheckStyle = ()=> {
  if (
    (this.signupFormControl.passwordcheck.touched || this.submitted2) &&
    (this.signupFormControl.passwordcheck.value !== this.signupFormControl.password.value)
  ) {
    return { 'background-color': '#ffebee', border: '1px solid #ffcdd2' };
  } else {
    if (this.signupFormControl.passwordcheck.valid) {
      return { 'background-color': '#e8f5e9', border: '1px solid #c8e6c9' };
    } else {
      return {};
    }
  }
}

*/
