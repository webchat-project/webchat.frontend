import React from 'react'

export default function MainTopBar({ user }) {

  // Metodo per mostrare la sidebar quando la larghezza dello schermo è inferiore a 600px
  const handleDisplay = () => {
    document.getElementById("side-section").setAttribute("style", "visibility: visible; display: block; width: 100%")
    document.getElementById("main-section").setAttribute("style", "visibility: hidden; display: none;")
  }

  console.log(user)

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
      <h3>{user.name}</h3>
    </div>
  )
}