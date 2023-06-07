import React from "react";

export default function Loading({ event }) {
    return (
        <div className="loading">
            <div className="loading-circle"></div>
            <p>Caricamento</p>
            <p>{event}</p>
        </div>
    )
}