import React, { useState } from 'react'
import axios from 'axios'
import { backend } from '../../../utils/Backend'

import { searchContact } from '../../../xyz/searchContact'

export default function SideSearch({ jwt, id, placeholder, setSearchFocus, setResult, setEmpty, setLoading, setError }) {
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

    // Configurazione token
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    };

    // Invio richiesta
    const handleSubmit = async () => {
        setLoading(true)
        setEmpty(false)

        try {
            const response = await axios.get(backend + '/users/list', config);
            setResult(response.data);
            console.warn(response.data)
        } catch (error) {
            console.error(error);
        }

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