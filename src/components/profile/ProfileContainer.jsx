import React from 'react'

export default function ProfileContainer({ profile }) {

  // Elimina il cookie selezionato
  function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  
  // Ricarica la pagina
  function reloadPage() {
    window.location.reload();
  }

  // Effettua il logout eliminando il token dai cookie ed effettua il ricaricamento della pagina
  function handleLogout() {
    deleteCookie('jwt');
    reloadPage();
  }

  let user;
  profile.map(p => user = p)

  return (
    <div id="profile-container">
      <img id="profile-image" alt='Profile' src={user.picture}></img>
      <h3>{user.name}</h3>
      <button id="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}