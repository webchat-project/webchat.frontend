import React from 'react'

import ContactDelete from '../contact/ContactDelete'

export default function SideDeleteContact({ contactList }) {

    return contactList.map((c) => (
        <ContactDelete
            contact={c}
            key={c.id}
        />
    ));
}
