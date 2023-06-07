import React from 'react'

import Login from '../../pages/Login';

export default function ProfileContainer({ profile }) {

  let user;

  profile.map(p => user = p)

  return (
    <div id="profile-container">
      <img id="profile-image" alt='Profile' src={user.picture}></img>
      <h3>{user.name}</h3>
      <button id="logout-button" onClick={Login.handleLogout}>Logout</button>
    </div>
  )
}