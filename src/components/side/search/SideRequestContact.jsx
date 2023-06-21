import React from 'react'

import ContactAccept from '../contact/ContactAccept'

export default function SideRequestContact({ contactList }) {

    return contactList.map((c) => (
        <ContactAccept
            contact={c}
            key={c.id}
        />
    ));
}
