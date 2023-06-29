import React from 'react'

import ContactDelete from './ContactDelete'

export default function ContactDeleteContainer({ contactList, jwt }) {

    return contactList.map((c) => (
        <ContactDelete
            jwt={jwt}
            contact={c}
            key={c.userId}
        />
    ));
}
