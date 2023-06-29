import React, { useState } from 'react'

export default function MessageInputBox({ handleSubmit }) {

    // Messaggio di input
    const [messageInput, setMessageInput] = useState("")

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(messageInput);
        setMessageInput('');
    };

    return (
        <div id="message-input-container">
            <form onSubmit={handleFormSubmit} id="form-input-container">
                <input
                    id="message-input"
                    type='text'
                    value={messageInput}
                    placeholder='Scrivi un messaggio'
                    onChange={e => setMessageInput(e.target.value)}>
                </input>
                <button id="message-sender" disabled={messageInput.trim() === ""}>
                    <span className="material-symbols-outlined">
                        send
                    </span>
                </button>
            </form>
        </div >
    )
}