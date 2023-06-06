import React from "react";
import { Link } from "react-router-dom";

export default function SideTopBarButton({ material, name, route }) {
  return (
    <div className="side-top-bar-button-container">
      <Link to={route} className="side-top-bar-button">
        <span className="material-symbols-outlined">{material}</span>
        <span className="side-top-bar-button-name">{name}</span>
      </Link>
    </div>
  );
}
