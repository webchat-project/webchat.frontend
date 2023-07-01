import React from 'react'

export default function MainTopBar({ user, lastAccess }) {

  // Metodo per mostrare la sidebar quando la larghezza dello schermo è inferiore a 600px
  const handleDisplay = () => {
    document.getElementById("side-section").setAttribute("style", "visibility: visible; display: block; width: 100%")
    document.getElementById("main-section").setAttribute("style", "visibility: hidden; display: none;")
  }

  // Conversione data per ultimo accesso
  let last;
  if (lastAccess !== -1) {
    let date = new Date(lastAccess);
    let time = date.toLocaleTimeString().slice(0, 5);

    // Formatto la data come 1 gennaio 1970
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dataFormattata = new Intl.DateTimeFormat('it-IT', options).format(date);

    last = "Ultimo accesso " + time + ", " + dataFormattata;
  } else {
    last = "Online"
  }

  return (
    <div id="main-top-bar">
      <button id="side-menu" onClick={handleDisplay}>
        <span className="material-symbols-outlined">
          menu
        </span>
      </button>
      <img
        src={user.image}
        alt="profilo"
        id='main-top-bar-profile-picture'
      ></img>
      <div>
        <h3 id="main-top-bar-name">{user.name}</h3>
        <p id="last-access">{last}</p>
      </div>

    </div>
  )
}