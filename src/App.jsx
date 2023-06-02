import './App.css'
import SideSection from './components/side/SideSection'
import MainSection from './components/main/MainSection'

export default function App() {
  return (
    <>
      <div id="side-section">
        <SideSection />
      </div>
      <div id="main-section">
        <MainSection/>
      </div>
    </>
  )
}
