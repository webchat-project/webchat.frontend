import React from 'react'
import { Routes, Route } from 'react-router-dom'

import SideTopBar from './SideTopBar'

import ChatContainer from '../chat/ChatContainer'
import ContactContainer from '../contact/ContactContainer'
import ProfileContainer from '../profile/ProfileContainer'

import ChatSearchInput from '../chat/ChatSearchInput'

import SideSearch from './SideSearch'

import AddContactButton from '../contact/add/AddContactButton'

import { chatList } from '../../xyz/chatList.js'
import { contactList } from '../../xyz/contactList.js'
import { profile } from '../../xyz/profile.js'

export default function SideSection() {

  /*
  const url="https://jsonplaceholder.typicode.com/photos"

  const [chatList, setChatList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('Si è verificato un errore');
      })
      .then(obj => {
        setLoading(false)
        setChatList(obj)
      })
      .catch(error => {
        setLoading(false)
        setError(true)
    })
    
  }, [])
  */

 
  return (
    <>
      <SideTopBar />
      <Routes>
        <Route path='/' element=<ChatSearchInput /> />
        <Route path='/chats' element=<ChatSearchInput /> />
        <Route path='/contacts' element=<SideSearch id={"chat-search"} placeholder={"Cerca contatto"}  /> />
        </Routes>

        <Routes>
        <Route path='/contacts' element=<AddContactButton /> />
        </Routes>

        <Routes>
        <Route path='/add' element=<SideSearch id={"chat-search"} placeholder={"Cerca contatto online"} /> />
        <Route path='/add' element=<AddContactButton /> />
        </Routes>
        
        <Routes>
        <Route path='/' element=<ChatContainer chatList={chatList.data} /> />
        <Route path='/chats' element=<ChatContainer chatList={chatList.data} /> />
        <Route path='/contacts' element=<ContactContainer contactList={contactList.data} /> />
        <Route path='/profile' element=<ProfileContainer profile={profile.data}/> />
      </Routes>
    </>
  )
}
