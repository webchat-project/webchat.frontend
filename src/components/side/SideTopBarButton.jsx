import React from 'react'

export default function SideTopBarButton({ material, name, route }) {

  return (
    <div className="side-top-bar-button-container">
      <a href={route}
      className="side-top-bar-button">
        <span className="material-symbols-outlined">
          {material}
        </span>
        <span className="side-top-bar-button-name">{name}</span>
      </a>
    </div>
  )
}