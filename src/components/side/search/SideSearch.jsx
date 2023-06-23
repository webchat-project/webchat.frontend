import React, { useState } from 'react'
import axios from 'axios'
import { backend } from '../../../utils/Backend'
import { Link } from 'react-router-dom'

export default function SideSearch({ jwt, id, placeholder, setResult, setEmpty, setLoading, setError }) {

    // Valore input
    const [search, setSearch] = useState('')

    // Controllo visibilità pulsanti ricerca
    const [controlVisibility, setControlVisibility] = useState(false)

    // Inserimento
    const handleTyping = () => {
        setEmpty(true)
        setResult({})
        setControlVisibility(true)
    }

    // Click sul pulsante indietro
    const handleAbort = () => {
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
                        <Link to="/contacts" id="abort-search">
                            <button id="abort-search-button" onClick={handleAbort}>
                                <span className="material-symbols-outlined">arrow_back_ios</span>
                                <p>Annulla</p>
                            </button>
                        </Link>
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