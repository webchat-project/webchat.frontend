import React, { useState } from 'react';
import Theme from '../../theme/Theme';

export default function ProfileContainer({ profile, setJwt }) {

  // Effettua il logout eliminando il token dai cookie ed effettua il ricaricamento della pagina
  function handleLogout() {
    //deleteCookie('jwt');
    setJwt("");
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentContactId');
    localStorage.removeItem('theme');
    window.location.reload();
  }

  // UseState per mostrare info utente o schermata di personalizzazione
  const [custom, setCustom] = useState(false);

  const handleCustom = setting => {
    setCustom(setting);
  };

  return (
    <div id="profile-container">
      {custom === false ? (
        <>
          <div id="profile-image-container">
            <img id="profile-image" alt="img" src={profile.image}></img>
          </div>
          <h3>
            {profile.firstName} {profile.lastName}
          </h3>
          <p>{profile.email}</p>
          <div id="profile-button-container">
            <button id="personalize-button" onClick={() => handleCustom(true)}>
              Personalizza
            </button>
            <button id="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <button id="backtoinfo-button" onClick={() => handleCustom(false)}>
            Indietro
          </button>
          <Theme />
        </>
      )}
    </div>
  );
}
