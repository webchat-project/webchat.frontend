import React from 'react'
import ContactButton from './ContactButton'

export default function ContactContainer({contactList, action}) {
  
  return contactList.map(c => <ContactButton contact={c} action={action} key={c.id} />)
}