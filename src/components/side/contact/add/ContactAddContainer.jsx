import React from 'react'

import ContactAdd from './ContactAdd'

export default function ContactAddContainer({ resultList, jwt, setQueryString, setResultList }) {

    return resultList.map((c) => (
        <ContactAdd
            setQueryString={setQueryString}
            setResultList={setResultList}
            jwt={jwt}
            contact={c}
            key={c.userId}
        />
    ));
}
