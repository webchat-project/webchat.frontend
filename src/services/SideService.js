//import axios from 'axios';
import { urlBackend } from '../Backend'

// Costante per salvare l'indirizzo del backend
const Backend = urlBackend

// Metodo get per ottenere la lista chat
export const getChatList = () => {
    console.log("Get chat list")
    console.log(Backend + '/api/v1/chatList')

}

// Metodo get per ottenere la lista contatti
export const getContactList = () => {
    console.log("Get contact list")
    console.log(Backend + '/api/v1/contactList/')

}
