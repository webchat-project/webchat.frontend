import React, { useState } from 'react'
import axios from 'axios'
import { backend } from '../../../../utils/Backend'
import { Link } from 'react-router-dom'
import ContactAddContainer from './ContactAddContainer'
import Loading from '../../../await/Loading'
import Error from '../../../await/Error'

export default function SideSearch({ jwt, id, placeholder }) {

    // Valore input
    const [search, setSearch] = useState('')

    // Valori risultato ricerca
    const [resultList, setResultList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Controllo visibilità pulsanti ricerca
    const [controlVisibility, setControlVisibility] = useState(false)

    // Inserimento
    const handleTyping = () => {
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
        try {
            const { data } = await axios.get(backend + '/users/list', config);
            console.log(data.body)
            setResultList(data.body.map(user => {
                const imageBlob = new Blob([new Uint8Array(user.image.data.data)], { type: 'image/jpeg' });
                user.image = URL.createObjectURL(imageBlob);
                return user;
            }));
            setLoading(false)
            setError(false)
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }



    return (
        <>
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
            {loading === true ? <Loading />
                : error === true ? <Error />
                    : resultList.length === 0 ? <></> : <ContactAddContainer jwt={jwt} resultList={resultList} />}
        </>
    )
}