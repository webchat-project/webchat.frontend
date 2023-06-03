import React from 'react'
import ContactButton from './ContactButton'

export default function ContactContainer({contactList}) {
  
  return contactList.map(c => <ContactButton contact={c} />)
}