
export const backend = "https://web-chat-messenger.onrender.com"

//SignUp
export const signupRoute = `${backend}/auth/signup`
//Login
export const loginRoute = `${backend}/auth/login`

//SideSection
export const profileRoute = `${backend}/users/profile`
export const chatListRoute = `${backend}/chats/list` //anche chatListNoLoadRoute 
export const contactListRoute = `${backend}/users/contacts/list` //anche ContactListNoLoad
export const requestListRoute = `${backend}/users/requests/list` 
export const messagesRoute = `${backend}/chats/` 

//ChatDelete
export const deleteChatRoute = `${backend}/chats/` 

//ContactAdd & //ContactRequest
export const addRequestRoute = `${backend}/users/requests/`

//Search
export const searchRoute = `${backend}/users/search`

//ContactDelete
export const deleteContactRoute = `${backend}/users/contacts/`

