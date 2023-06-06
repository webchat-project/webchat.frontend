import React, { useState } from 'react'

export default function ContactSearchInput() {
    const [contact, setContact] = useState('')

    // Metodo per cercare il contatto
    return (
        <div id="contact-search-container">
            <input
                id="contact-search"
                type='text'
                value={contact}
                placeholder='Cerca un contatto'
                onChange={e => setContact(e.target.value)}>
            </input>
        </div>
    )
}