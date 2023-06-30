import React from "react";
import ContactRequestSent from "./ContactRequestSent";

export default function ContactRequestSentContainer({ contactList }) {

  return contactList.map((c) => (
    <ContactRequestSent
      contact={c}
      key={c.userId}
    />
  ));
}
