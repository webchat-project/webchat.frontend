import React, {useState} from "react"
import SideSection from '../components/side/SideSection'
import MainSection from '../components/main/MainSection'

export default function Home() {

    const [messageList, setMessageList] = useState([]);


    return (
        <>
            <aside id="side-section">
                <SideSection setMessageList={setMessageList}/>
            </aside>
            <main id="main-section">
                <MainSection messageList={messageList}/>
            </main>
        </>
    )
}