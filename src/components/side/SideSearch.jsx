import React, { useState } from 'react'

export default function SideSearch({ id, placeholder, request, setSearchFocus }) {
    const [search, setSearch] = useState('')

    // Use state per mostrare il pulsante indietro solo quando si avvia la ricerca
    const [searching, setSearching] = useState(false)

    // Inserimento
    const handleTyping = () => {
        setSearching(true)
        setSearchFocus(true)
    }

    // Click sul pulsante indietro
    const handleAbort = () => {
        setSearching(false)
        setSearchFocus(false)
        setSearch('')
    }

    // Invio richiesta
    const handleSubmit = () => {
        alert(search)
        setSearching(false)
        setSearchFocus(false)
        setSearch('')
    }

    return (
        <div id="side-search-container">
            <button id="abort-search" onClick={handleAbort}>
                <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <input
                id={id}
                type='text'
                value={search}
                placeholder={placeholder}
                onFocus={handleTyping}
                onChange={e => setSearch(e.target.value)}>
            </input>
            <button id="send-search" onClick={handleSubmit}>
                <span className="material-symbols-outlined">search</span>
            </button>
        </div>
    )
}