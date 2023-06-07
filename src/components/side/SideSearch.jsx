import React, { useState } from 'react'

export default function SideSearch({id, placeholder, request}) {
    const [search, setSearch] = useState('')

    return (
        <div id="side-search-container">
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