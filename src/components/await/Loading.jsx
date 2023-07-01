import React from "react";

export default function Loading({ event }) {

    // Controllo event
    if (event) {

        // Non esegue nulla
    } else {
        event = "Caricamento"
    }

    // Componente chiamato quando si effettua una chiamata a backend
    return (
        <div className="loading">
            <div className="loading-circle"></div>
            <p>{event}</p>
        </div>
    )
}