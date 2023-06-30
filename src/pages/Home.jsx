import React, { useState, useEffect } from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

// Backend
import { backend } from "../utils/Backend";

import io from "socket.io-client";


export default function Home({ jwt }) {

    // Dati contatto selezionato
    const [userData, setUserData] = useState({ chatId: "", name: "", image: "profile.png", jwt: jwt })
    const [messageData, setMessageData] = useState([])

    // Use state per non mostrare lista messaggi
    const [firstMessage, setFirstMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Socket
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io.connect(backend, { query: "jwt=" + jwt });
        setSocket(newSocket);
    }, [jwt]);

    return (
        <>
            <aside id="side-section">
                <SideSection jwt={jwt} socket={socket} setUserData={setUserData} setFirstMessage={setFirstMessage} setMessageData={setMessageData} setLoadingMessages={setLoading} setErrorMessages={setError} />
            </aside>
            <main id="main-section">
                <MainSection socket={socket} userData={userData} firstMessage={firstMessage} messageData={messageData} loading={loading} error={error} />
            </main>
        </>
    )
}