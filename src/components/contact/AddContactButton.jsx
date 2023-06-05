import React from 'react'

export default function AddContactButton() {

    return (
        <>
        <div id="add-contact-button">
            <div id="add-contact-button-container">
                <span className="material-symbols-outlined" id='add-contact-button-icon'>
                    add
                </span>
                <h3>Aggiungi contatto</h3>
            </div>
        </div>
        <div id="add-contact-button">
            <div id="add-contact-button-container">
                <span className="material-symbols-outlined" id='add-contact-button-icon'>
                    mail
                </span>
                <h3>Richieste</h3>
            </div>
        </div>
        </>
    )
}