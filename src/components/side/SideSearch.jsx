import React, { useState } from 'react'

export default function SideSearch({id, placeholder}) {
    const [search, setSearch] = useState('')

    // Metodo per cercare il contatto
    return (
        <div id="chat-search-container">
            <input
                id={id}
                type='text'
                value={search}
                placeholder={placeholder}
                onChange={e => setSearch(e.target.value)}>
            </input>
        </div>
    )
}