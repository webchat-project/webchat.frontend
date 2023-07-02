import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ContactAddContainer from './ContactAddContainer'

// Backend
import { backend } from '../../../../utils/Backend';

// Axios
import axios from "axios";

export default function SideSearch({ jwt, id, placeholder }) {

    // Valore input
    const [queryString, setQueryString] = useState('')

    // Valori risultato ricerca
    const [resultList, setResultList] = useState([])

    // Configurazione token
    let config = {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    };

    // Metodo per ricerca automatica
    const handleTyping = (e) => {
        setQueryString(e.target.value)
        handleSubmit()
    }

    // Invio richiesta
    const handleSubmit = async () => {
        try {
            config = { ...config, params: { queryString: queryString } }
            const { data } = await axios.get(backend + '/users/search', config);
            setResultList(data.body.map(user => {
                const imageBlob = new Blob([new Uint8Array(user.image.data.data)], { type: user.image.contentType });
                user.image = URL.createObjectURL(imageBlob);
                return user;
            }));
        } catch (error) {
        }
    }

    return (
        <>
            <div id="side-search-container">
                <input
                    id={id}
                    type='text'
                    value={queryString}
                    placeholder={placeholder}
                    onChange={e => handleTyping(e)}>
                </input>
                <Link to="/contacts" id="abort-search">
                    <button id="abort-search-button">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                        <p>Indietro</p>
                    </button>
                </Link>
            </div>
            {resultList.length === 0 && queryString.trim() !== "" ? <p id='search-no-result'>Non è presente nessun utente corrispondente alla tua ricerca</p> : <ContactAddContainer jwt={jwt} resultList={resultList} setQueryString={setQueryString} setResultList={setResultList} />}
        </>
    )
}