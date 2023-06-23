import React, { useState } from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

export default function Home({ jwt }) {

    const [userData, setUserData] = useState({
        userId: "",
        name: "",
        image: "profile.png"
    })


    const [messageData, setMessageData] = useState([])

    // Use state per non mostrare lista messaggi
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            <aside id="side-section">
                <SideSection jwt={jwt} setUserData={setUserData} setMessageData={setMessageData} setLoadingMessages={setLoading} setErrorMessages={setError} />
            </aside>
            <main id="main-section">
                <MainSection jwt={jwt} userData={userData} messageData={messageData} loading={loading} error={error} />
            </main>
        </>
    )
}