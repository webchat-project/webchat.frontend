import React, { useState } from 'react'
import axios from 'axios'
import { backend } from '../../../utils/Backend'

export default function SideSearch({ jwt, id, placeholder, setSearching, setResult, setEmpty, setLoading, setError }) {

    // Valore input
    const [search, setSearch] = useState('')

    // Controllo visibilità pulsanti ricerca
    const [controlVisibility, setControlVisibility] = useState(false)

    // Inserimento
    const handleTyping = () => {
        setEmpty(true)
        setResult({})
        setSearching(true)
        setControlVisibility(true)
    }

    // Click sul pulsante indietro
    const handleAbort = () => {
        setSearching(false)
        setControlVisibility(false)
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
            <input
                id={id}
                type='text'
                value={search}
                placeholder={placeholder}
                onFocus={handleTyping}
                onChange={e => setSearch(e.target.value)}>
            </input>
            {controlVisibility === true ?
                <>
                    <div id="search-control-buttons">
                        <button id="abort-search" onClick={handleAbort}>
                            <span className="material-symbols-outlined">arrow_back_ios</span>
                            <p>Indietro</p>
                        </button>
                        <button id="send-search" onClick={handleSubmit}>
                            <span className="material-symbols-outlined">search</span>
                            <p>Cerca</p>
                        </button>
                    </div>
                </> :
                <></>}
        </div>
    )
}