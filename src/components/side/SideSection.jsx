import React from 'react'
import ChatContainer from './ChatContainer'
import {chatList} from '../../chatList.js'
import NewChatButton from './NewChatButton'
import SideTopBar from './SideTopBar'

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

  return(
    <>
      <SideTopBar />
      <NewChatButton />
      <ChatContainer chatList={chatList.data} />
    </>
  )
}