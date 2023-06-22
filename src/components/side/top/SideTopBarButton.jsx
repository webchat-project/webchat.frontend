import React from "react";
import { Link } from "react-router-dom";

export default function SideTopBarButton({ material, name, route }) {

  // Handle Click
  const handleClick = (name) => {

    // Ripristina lo sfondo degli elementi ed evidenzia l'elemento attivo
    var elements = document.getElementsByClassName("side-top-bar-button");

    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute("style");
    }

    var element = document.getElementById("side-top-bar-button: " + name);
    element.style.backgroundColor = "var(--button-click)";
    element.style.border = "1px solid var(--border)";
  }

  return (
    <div className="side-top-bar-button-container" onClick={() => handleClick(name)}>
      <Link to={route} className="side-top-bar-button" id={"side-top-bar-button: " + name}>
        <span className="material-symbols-outlined">{material}</span>
        <span className="side-top-bar-button-name">{name}</span>
      </Link>
    </div>
  );
}
