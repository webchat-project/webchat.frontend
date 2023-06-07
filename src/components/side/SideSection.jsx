import React from 'react'
import { Routes, Route } from 'react-router-dom'

import SideTopBar from './SideTopBar'

import Loading from '../await/Loading'
import Error from '../await/Error'

import ChatContainer from '../chat/ChatContainer'
import ContactContainer from '../contact/ContactContainer'
import ProfileContainer from '../profile/ProfileContainer'

import SideSearch from './SideSearch'

import AddContactButton from '../contact/add/NewContacts'

import { chatList } from '../../xyz/chatList.js'
import { contactList } from '../../xyz/contactList.js'
import { profile } from '../../xyz/profile.js'

export default function SideSection() {

  return (
    <>
      <SideTopBar />
      <Routes>
        <Route path='/' element={<SideSearch id={"side-search"} placeholder={"Cerca o inizia una nuova chat"} request={"chats"} />}/>
        <Route path='/chats/*' element={<SideSearch id={"side-search"} placeholder={"Cerca o inizia una nuova chat"} request={"chats"} />}/>
        <Route path='/contacts/*' element={<SideSearch id={"side-search"} placeholder={"Cerca contatto"} request={"contacts"} />} />
      </Routes>

      <Routes>
        <Route path='/contacts/*' element={<AddContactButton /> } />
      </Routes>

      <Routes>
        <Route path='/*' element={<Loading /> } />
      </Routes>

      <Routes>
        <Route path='/*' element={<Error /> } />
      </Routes>

      <Routes>
        <Route path='/add/*' element={<SideSearch id={"side-search"} placeholder={"Cerca contatto online"} />} />
      </Routes>

      <Routes>
        <Route path='/' element={<ChatContainer chatList={chatList.data} /> }/>
        <Route path='/chats/*' element={<ChatContainer chatList={chatList.data} /> }/>
        <Route path='/contacts/*' element={<ContactContainer contactList={contactList.data} /> }/>
        <Route path='/profile/*' element={<ProfileContainer profile={profile.data} /> }/>
      </Routes>
    </>
  )
}
