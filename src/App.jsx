// File Stile CSS
import './styles/App.css'
import './styles/Signup.css'
import './styles/Login.css'
import './styles/Side.css'
import './styles/Main.css'
import './styles/Chat.css'
import './styles/Contact.css'
import './styles/Profile.css'
import './styles/Message.css'

// Componenti
import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='*' element=<Home/> />
        <Route path='/signup' element=<Signup/> />
        <Route path='/login' element=<Login/> />
      </Routes>
    </>
  )
}
