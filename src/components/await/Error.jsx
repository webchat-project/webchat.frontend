import React from "react";

export default function Error({ event }) {

    // Componente mostrato quando una chiamata restituisce un errore
    return (
        <div className="error">
            <span className="material-symbols-outlined">
                error
            </span>
            <p>Errore</p>
            <p>{event}</p>
        </div>
    )
}