import React, { useState } from 'react';

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
    localStorage.removeItem('currentUserId');
    reloadPage();
  }

  // Root element
  var rootElement = document.documentElement;

  // Light Theme
  var lightTheme = {
    '--back': '#ffffff',
    '--text': '#000000',
    '--main': 'rgba(255, 255, 255, 0.8)',
    '--border': 'rgba(0, 0, 0, 0.2)',
    '--primary': '#eceff1',
    '--input-focus': '#f2f2f2',
    '--button-hover': '#f2f2f2',
    '--button-click': '#e0e0e0',
    '--sent-message': '#8be9b9',
  };

  // Dark Theme
  var darkTheme = {
    '--back': '#212121',
    '--text': '#9E9E9E',
    '--main': 'rgba(0, 0, 0, 0.9)',
    '--border': 'rgba(255, 255, 255, 0.1)',
    '--primary': '#000000',
    '--input-focus': '#263238',
    '--button-hover': '#263238',
    '--button-click': '#1f282c',
    '--sent-message': '#263238',
  };

  // Default color
  var defaultColor = {
    '--back': '#ffffff',
    '--text': '#000000',
    '--main': 'rgba(255, 255, 255, 0.8)',
    '--border': 'rgba(0, 0, 0, 0.2)',
    '--primary': '#eceff1',
    '--input-focus': '#f2f2f2',
    '--button-hover': '#f2f2f2',
    '--button-click': '#e0e0e0',
    '--sent-message': '#8be9b9',
  };

  // Gold color
  var goldColor = {
    '--back': '#ffffff',
    '--text': '#000000',
    '--main': 'rgba(255, 255, 255, 0.8)',
    '--border': 'rgba(0, 0, 0, 0.2)',
    '--primary': '#fece2f',
    '--input-focus': '#fff6d7',
    '--button-hover': '#fff6d7',
    '--button-click': '#ffe695',
    '--sent-message': '#ffcc80',
  };

  // Nature color
  var natureColor = {
    '--back': '#ffffff',
    '--text': '#000000',
    '--main': 'rgba(255, 255, 255, 0.8)',
    '--border': 'rgba(0, 0, 0, 0.2)',
    '--primary': '#46a094',
    '--input-focus': '#c4e8c2',
    '--button-hover': '#c4e8c2',
    '--button-click': '#aecfa4',
    '--sent-message': '#6bbd99',
  };

  // Sky color
  var skyColor = {
    '--back': '#ffffff',
    '--text': '#000000',
    '--main': 'rgba(255, 255, 255, 0.8)',
    '--border': 'rgba(0, 0, 0, 0.2)',
    '--primary': '#3b7197',
    '--input-focus': '#a1e1fa',
    '--button-hover': '#a1e1fa',
    '--button-click': '#74bde0',
    '--sent-message': '#4a8db7',
  };

  // Tutti i nomi dei temi
  var light = 'light';
  var dark = 'dark';
  var def = 'default';
  var gold = 'gold';
  var nature = 'nature';
  var sky = 'sku';

  // Metodo per cambiare il tema
  const setColorTheme = (color, name) => {
    localStorage.setItem('theme', name);
    Object.keys(color).forEach(function (key) {
      rootElement.style.setProperty(key, color[key]);
    });
  };

  // UseState per mostrare info utente o schermata di personalizzazione
  const [custom, setCustom] = useState(false);

  const handleCustom = setting => {
    setCustom(setting);
  };

  return (
    <div id="profile-container">
      {custom === false ? (
        <>
          <div id="image-container">
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
          <p>Scegli tema</p>
          <div className="colors-container">
            <div
              className="theme-color"
              id="light-theme"
              onClick={() => setColorTheme(lightTheme, light)}
            ></div>
            <div
              className="theme-color"
              id="dark-theme"
              onClick={() => setColorTheme(darkTheme, dark)}
            ></div>
          </div>
          <p>Scegli colore</p>
          <div className="colors-container">
            <div
              className="theme-color"
              id="default-color"
              onClick={() => setColorTheme(defaultColor, def)}
            ></div>
            <div
              className="theme-color"
              id="gold-color"
              onClick={() => setColorTheme(goldColor, gold)}
            ></div>
            <div
              className="theme-color"
              id="nature-color"
              onClick={() => setColorTheme(natureColor, nature)}
            ></div>
            <div
              className="theme-color"
              id="sky-color"
              onClick={() => setColorTheme(skyColor, sky)}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}
