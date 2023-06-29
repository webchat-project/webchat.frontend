import React, { useState } from 'react'

export default function MessageInputBox({ handleSubmit }) {


    const [messageInput, setMessageInput] = useState("")
    const [inputType, setInputType] = useState("text")

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(messageInput);
        setMessageInput('');
    };

    // Metodo per cambiare il tipo di input in image
    const imageInput = () => {
        setInputType("image")
    }

    // Metodo per cambiare il tipo di input in image
    const textInput = () => {
        setInputType("text")
    }

    return (
        <>
            <div id="message-input-container">
                {inputType === "text" ?
                    <button id="message-type-changer" onClick={imageInput}>
                        <span class="material-symbols-outlined">
                            image
                        </span>
                    </button>
                    : <button id="message-type-changer" onClick={textInput}>
                        <span class="material-symbols-outlined">
                            text_fields
                        </span>
                    </button>}
                <form onSubmit={handleFormSubmit} id="form-input-container">
                    {inputType === "text" ?
                        <>
                            <input
                                id="message-input"
                                type='text'
                                value={messageInput}
                                placeholder='Scrivi un messaggio'
                                onChange={e => setMessageInput(e.target.value)}>
                            </input>
                            <button id="message-sender" disabled={messageInput.trim() === ""}>
                                <span className="material-symbols-outlined">
                                    send
                                </span>
                            </button>
                        </>
                        : <>
                            <div>
                                <label htmlFor="image-input" id="image-input-button">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>Carica immagine</p>
                                </label>
                                <input id="image-input" type="file" accept="image/*" />
                            </div>

                            <button id="message-sender" disabled={messageInput.trim() === ""}>
                                <span className="material-symbols-outlined">
                                    send
                                </span>
                            </button>
                        </>
                    }
                </form>
            </div>
        </>
    )
}