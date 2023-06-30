import React from "react";
import ContactRequestSent from "./ContactRequestSent";

export default function ContactRequestSentContainer({ contactList, jwt, getRequestList }) {

  return contactList.map((c) => (
    <ContactRequestSent
      jwt={jwt}
      getRequestList={getRequestList}
      contact={c}
      key={c.userId}
    />
  ));
}
