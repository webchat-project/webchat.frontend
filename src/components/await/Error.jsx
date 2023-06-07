import React from "react";

export default function Error({event}) {
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