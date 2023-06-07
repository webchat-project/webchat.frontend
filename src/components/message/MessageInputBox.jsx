import React, { useState } from 'react'

export default function MessageInputBox() {
    const [messageInput, setMessageInput] = useState('')

    return (
        <div id="message-input-container">
            <input
                id="message-input"
                type='text'
                value={messageInput}
                placeholder='Scrivi un messaggio'
                onChange={e => setMessageInput(e.target.value)}>
            </input>
            <button id="message-sender">
                <span className="material-symbols-outlined">
                    send
                </span>
            </button>
        </div>
    )
}