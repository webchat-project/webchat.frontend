import React from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

export default function Home() {

    return (
        <>
            <div id="side-section">
                <SideSection />
            </div>
            <div id="main-section">
                <MainSection />
            </div>
        </>
    )
}