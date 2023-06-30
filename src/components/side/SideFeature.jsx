import React from 'react'

import { Link } from "react-router-dom";

export default function SideFeature({ url, span, text, getRequestList, count }) {

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