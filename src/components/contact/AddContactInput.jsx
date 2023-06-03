import React, { useState } from 'react'

export default function AddContactBox() {
    const [contact, setContact] = useState('')

    // Metodo per cercare il contatto

    return (
        <div id="add-contact-input-container">
            <input
                id="add-contact-input"
                type='text'
                value={contact}
                placeholder='Cerca nome contatto...'
                onChange={e => setContact(e.target.value)}>
            </input>
        </div>
    )
}