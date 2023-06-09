import React, { useState } from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

export default function Home() {

    const [data, setData] = useState({
        user: [],
        messages: []
    });

    return (
        <>
            <aside id="side-section">
                <SideSection setData={setData} />
            </aside>
            <main id="main-section">
                <MainSection data={data} />
            </main>
        </>
    )
}