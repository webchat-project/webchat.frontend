import React from 'react'

import ContactAdd from './ContactAdd'

export default function ContactAddContainer({ resultList, jwt, handleSubmit }) {

    return resultList.map((c) => (
        <ContactAdd
            handleSubmit={handleSubmit}
            jwt={jwt}
            contact={c}
            key={c.userId}
        />
    ));
}
