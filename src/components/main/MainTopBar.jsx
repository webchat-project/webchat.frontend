import React from 'react'

export default function MainTopBar({ user }) {
  return (
    <div id="main-top-bar">
      <img
        src={user.picture}

        alt="profilo"
        id='main-top-bar-profile-picture'
      ></img>
      <h3>{user.name}</h3>
    </div>
  )
}