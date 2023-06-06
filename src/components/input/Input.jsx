import React, { useState } from 'react'

export default function Input({ containerId, id, type, placeholder }) {
    const [input, setInput] = useState('')

    return (
        <input
            id={id}
            type={type}
            value={input}
            placeholder={placeholder}
            onChange={e => setInput(e.target.value)}>
        </input>
    )
}

/*
id="message-input-container"
id="message-input
type='text'
placeholder='Scrivi messaggio'
*/