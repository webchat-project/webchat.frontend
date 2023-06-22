import React from 'react'

import ContactAdd from '../contact/add/ContactAdd'

export default function SideSearchResult({ contactList }) {

    return contactList.map((c) => (
        <ContactAdd
            contact={c}
            key={c.id}
        />
    ));
}
