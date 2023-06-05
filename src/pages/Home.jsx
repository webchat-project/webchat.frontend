import React from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

export default function Home() {

    return (
        <>
            <aside id="side-section">
                <SideSection />
            </aside>
            <main id="main-section">
                <MainSection />
            </main>
        </>
    )
}