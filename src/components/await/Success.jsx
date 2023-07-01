import React from "react";

export default function Success({ event }) {

    // Componente mostrato quando una chiamata restituisce un errore
    return (
        <div className="success">
            <span className="material-symbols-outlined">
                done
            </span>
            <p>{event}</p>
        </div>
    )
}