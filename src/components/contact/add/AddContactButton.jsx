import React from 'react'

import { Link } from "react-router-dom";

export default function AddContactButton() {

    return (
        <>
            <div id="add-contact-button">
                <a href="/add">
                    <div id="add-contact-button-container">
                        <span className="material-symbols-outlined" id='add-contact-button-icon'>
                            add
                        </span>
                        <h3>Aggiungi contatto</h3>
                    </div>
                </a>

            </div>
            <div id="add-contact-button">
                <a href="/requests">
                    <div id="add-contact-button-container">
                        <span className="material-symbols-outlined" id='add-contact-button-icon'>
                            mail
                        </span>
                        <h3>Richieste</h3>
                    </div>
                </a>
            </div>
        </>
    )
}