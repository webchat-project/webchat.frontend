import React from "react";
import ContactRequest from "./ContactRequest";

export default function ContactRequestContainer({ getRequestList, contactList, jwt }) {

  return contactList.map((c) => (
    <ContactRequest
      getRequestList={getRequestList}
      contact={c}
      key={c.userId}
      jwt={jwt}
    />
  ));
}
