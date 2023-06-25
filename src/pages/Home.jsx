import React, { useState } from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'
import { backend } from "../utils/Backend";
import io from "socket.io-client";


const socket = io.connect(backend);

export default function Home({ jwt }) {


    const [userData, setUserData] = useState({chatId: "", name: "", image: "profile.png"})
    const [messageData, setMessageData] = useState([])

    // Use state per non mostrare lista messaggi
    const [firstMessage, setFirstMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);




    //metodo che viene chiammato dal componente ChatContainer al click del ChatButton
    const joinChat = ()=>{

        // posso utilizzare anche userData.chatId
        if(userData.name.trim() !== "" && userData.chatId !== null ){
          socket.emit("joinChat", userData.chatId )
    
        }
       
    }
    





    return (
        <>
            <aside id="side-section">
                <SideSection jwt={jwt} setUserData={setUserData} setFirstMessage={setFirstMessage}  setMessageData={setMessageData} setLoadingMessages={setLoading} setErrorMessages={setError} joinChat={joinChat} />
            </aside>
            <main id="main-section">
                <MainSection jwt={jwt} userData={userData} socket={socket} firstMessage={firstMessage}  messageData={messageData} loading={loading} error={error} />
            </main>
        </>
    )
}