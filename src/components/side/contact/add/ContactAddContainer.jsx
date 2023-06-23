import React from 'react'

import ContactAdd from './ContactAdd'

export default function ContactAddContainer({ resultList }) {

    return resultList.map((c) => (
        <ContactAdd
            contact={c}
            key={c.userId}
        />
    ));
}
