import React from 'react'

import ContactAdd from './ContactAdd'

export default function ContactAddContainer({ resultList, jwt }) {

    return resultList.map((c) => (
        <ContactAdd
            jwt={jwt}
            contact={c}
            key={c.userId}
        />
    ));
}
