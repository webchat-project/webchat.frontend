import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function MessageInputBox({ handleSubmit }) {
  // Messaggio di input
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(true);

  // Metodo per l'invio del messaggio
  const handleFormSubmit = event => {
    event.preventDefault();
    handleSubmit(messageInput);
    setMessageInput('');
  };

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event) => {
    setMessageInput(preValue => preValue += event.emoji);
  }

  return (
    <>
      {showEmojiPicker ? <div id="emoji-picker"><Picker onEmojiClick={handleEmojiClick} /></div> : <></>}
      <div id="message-input-container">
        <form onSubmit={handleFormSubmit} id="form-input-container">
          <BsEmojiSmileFill className="emoji-button" onClick={handleEmojiPickerHideShow} />
          <input
            id="message-input"
            type="text"
            value={messageInput}
            placeholder="Scrivi un messaggio"
            onChange={e => setMessageInput(e.target.value)}></input>
          <button id="message-sender" disabled={messageInput.trim() === ''}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </>
  );
}
