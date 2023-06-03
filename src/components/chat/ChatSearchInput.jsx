import React, { useState } from 'react'

export default function ChatSearchInput() {
    const [chat, setChat] = useState('')

    // Metodo per cercare il contatto

    return (
        <div id="chat-search-container">
            <input
                id="chat-search"
                type='text'
                value={chat}
                placeholder='Cerca o inizia una nuova chat'
                onChange={e => setChat(e.target.value)}>
            </input>
        </div>
    )
}