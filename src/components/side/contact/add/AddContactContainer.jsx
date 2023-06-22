import React from 'react'

import ContactDelete from './ContactDelete'

export default function contactDeleteContainer({ contactList }) {

    return contactList.map((c) => (
        <ContactDelete
            contact={c}
            key={c.chatId}
        />
    ));
}
