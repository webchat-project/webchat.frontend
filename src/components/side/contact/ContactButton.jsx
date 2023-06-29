import React from "react";

export default function ContactButton({ contact, handleClick }) {
/*
  // Metodo per importare l'immagine di profilo default se l'account ne è privo
  const [profile, setProfile] = useState("profile.png")

  const handleProfile = (contact) => {
    if (contact.image === "") {
      setProfile("profile.png")
    } else {
      setProfile(contact.image)
    }
  }

  useEffect(() => {
    handleProfile(contact);
  }, [contact]);

*/
  return (
    <div id={"contact: " + contact.chatId} className="contact-button" onClick={handleClick}>
      <div className="contact-button-container">
        <div className="image-container">
          <img alt="img" src={contact.image}></img>
        </div>
        <div className="text-container">
          <h3>{contact.firstName} {contact.lastName}</h3>
        </div>
      </div>
    </div>
  );
}
