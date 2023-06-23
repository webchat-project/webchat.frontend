import React, { useState } from 'react'

export default function MessageInputBox({ handleSubmit }) {


    const [messageInput, setMessageInput] = useState('')

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(messageInput);
        setMessageInput('');
    };

    return (
        <form onSubmit={handleFormSubmit} id="message-input-container">
            <input
                id="message-input"
                type='text'
                value={messageInput}
                placeholder='Scrivi un messaggio'
                onChange={e => setMessageInput(e.target.value)}>
            </input>
            <button id="message-sender" disabled={messageInput.trim()===""}>
                <span className="material-symbols-outlined">
                    send
                </span>
            </button>
        </form>
    )
}