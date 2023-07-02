import React, { useState, useEffect } from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

// Backend
import { backend } from "../utils/Backend";

// Socket
import io from "socket.io-client";

export default function Home({ jwt, setJwt }) {

    // Dati contatto selezionato
    const [userData, setUserData] = useState({ chatId: "", name: "", image: "profile.png", jwt: jwt, online: false })
    const [lastAccess, setLastAccess] = useState('')
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
            <aside id="side-section"><SideSection jwt={jwt} setJwt={setJwt} socket={socket} setUserData={setUserData} setFirstMessage={setFirstMessage} setMessageData={setMessageData} setLoadingMessages={setLoading} setErrorMessages={setError} setLastAccess={setLastAccess} />
            </aside>
            <main id="main-section"><MainSection socket={socket} userData={userData} firstMessage={firstMessage} messageData={messageData} loading={loading} error={error} lastAccess={lastAccess} />
            </main>
        </>
    )
}