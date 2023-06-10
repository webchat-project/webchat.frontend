import React, { useState } from 'react'

import { searchContact } from '../../xyz/searchContact'

export default function SideSearch({ id, placeholder, setSearchFocus, setResult, setEmpty, setLoading, setError }) {
    // Input search
    const [search, setSearch] = useState('')

    // Inserimento
    const handleTyping = () => {
        setEmpty(true)
        setResult({})
        setSearchFocus(true)
    }

    // Click sul pulsante indietro
    const handleAbort = () => {
        setSearchFocus(false)
        setSearch('')
    }

    // Invio richiesta
    const handleSubmit = () => {
        setLoading(true)
        setEmpty(false)
        setResult(searchContact.data)
        setInterval(() => {
            setLoading(false)
            setError(false)
        }, 3000)
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