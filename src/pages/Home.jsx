import React, { useState } from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

export default function Home() {

    const [data, setData] = useState({
        user: [],
        messages: []
    });

    // Use state per non mostrare lista messaggi
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            <aside id="side-section">
                <SideSection setData={setData} setLoadingMessages={setLoading} setErrorMessages={setError} />
            </aside>
            <main id="main-section">
                <MainSection data={data} loading={loading} error={error} />
            </main>
        </>
    )
}