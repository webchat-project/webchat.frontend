import React from 'react'

import ContactDelete from './ContactDelete'

export default function ContactDeleteContainer({ contactList, jwt, getContactList }) {

    return contactList.map((c) => (
        <ContactDelete
            getContactList={getContactList}
            jwt={jwt}
            contact={c}
            key={c.userId}
        />
    ));
}
