import React from 'react'

import { Link } from "react-router-dom";

export default function SideFeature({ url, span, text, getRequestList, count }) {

    // Componente mostrato nella sezione chat, personalizzato per gestire le richieste, l'aggiunta contatti e l'eliminazione contatti

    return (
        <div id="side-feature-button" onClick={getRequestList}>
            <Link to={url}>
                <div id="side-feature-button-container">
                    <span className="material-symbols-outlined" id='side-feature-button-icon'>
                        {span}
                    </span>
                    <h3>{text} {count}</h3>
                </div>
            </Link>
        </div>
    )
}