import React from "react";

export default function Loading({ event }) {

    // Componente chiamato quando si effettua una chiamata a backend
    return (
        <div className="loading">
            <div className="loading-circle"></div>
            <p>Caricamento</p>
            <p>{event}</p>
        </div>
    )
}