import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';

export default function MessageInputBox({ handleSubmit }) {

  // Messaggio di input
  const [messageInput, setMessageInput] = useState("");

  // Immagine come input
  const [imageInput, setImageInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Metodo per l'invio del messaggio
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowEmojiPicker(false);
    handleSubmit(messageInput, imagePreview);
    handleRemoveImage();
    setImageInput("");
    setMessageInput("");
  };

  // Metodo per mostrare o nascondere emoji picker
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  // Metodo per nascondere emoji picker
  const hideEmojiPicker = () => {
    setShowEmojiPicker(false);
  }

  // Metodo per aggiungere l'emoji in input
  const handleEmojiClick = (event) => {
    setMessageInput(preValue => preValue += event.emoji);
  }

  // Metodo per impostare l'immagine
  const handleImageChange = event => {
    let file = event.target.files[0];
    setImageInput(file);
    setImagePreview(file);
  };

  // Metodo per rimuovere l'immagine
  const handleRemoveImage = () => {
    setImageInput("")
    setImagePreview("");
  };

  useEffect(() => {
    if (imageInput) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(imageInput);
    }
  }, [imageInput]);



  return (
    <>
      {showEmojiPicker ? <div id="emoji-picker"><Picker onEmojiClick={handleEmojiClick} /></div> : <></>}

      {imagePreview !== "" ?
        <div id="image-preview-container">
          <img id="image-preview" src={imagePreview} alt="img" />
          {imagePreview !== '' ? (
            <button
              type="button"
              id="remove-image-preview"
              onClick={handleRemoveImage}>Elimina
            </button>
          ) : (
            <></>
          )}
        </div>
        : <></>}

      <div id="message-input-container">

        <div id="image-sender" onClick={hideEmojiPicker}>
          <label htmlFor="image-input">
            <span className="material-symbols-outlined">
              image
            </span>
          </label>
          <input autocomplete="off" id="image-input" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>

        <button id="emoji-sender" onClick={handleEmojiPickerHideShow}>
          <span className="material-symbols-outlined">
            mood
          </span>
        </button>

        <form onSubmit={handleFormSubmit} id="form-input-container">
          <input
            id="message-input"
            type='text'
            value={messageInput}
            placeholder='Scrivi un messaggio'
            onChange={e => setMessageInput(e.target.value)}>
          </input>

          <button id="message-sender" disabled={messageInput.trim() === "" && imageInput === ""}>
            <span className="material-symbols-outlined">
              send
            </span>
          </button>
        </form>
      </div>
    </>
  );
}
