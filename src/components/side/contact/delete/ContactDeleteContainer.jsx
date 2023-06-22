import React from 'react'

import ContactDelete from './ContactDelete'

export default function ContactDeleteContainer({ contactList }) {

    return contactList.map((c) => (
        <ContactDelete
            contact={c}
            key={c.chatId}
        />
    ));
}
