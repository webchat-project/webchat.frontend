import React from "react";
import ContactButton from "./ContactButton";

export default function ContactContainer({ contactList, handleContactClick }) {
  return contactList.map((c) => (
    <ContactButton
      contact={c}
      handleClick={() => handleContactClick(c.id)}
      key={c.id}
    />
  ));
}
