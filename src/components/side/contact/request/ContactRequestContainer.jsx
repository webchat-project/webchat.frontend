import React from "react";
import ContactRequest from "./ContactRequest";

export default function ContactRequestContainer({ contactList, jwt }) {

  return contactList.map((c) => (
    <ContactRequest
      contact={c}
      key={c.chatId}
      jwt={jwt}
    />
  ));
}
