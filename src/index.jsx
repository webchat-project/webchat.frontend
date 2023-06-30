import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

// Google OAuth
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider clientId='2003874951-4a57qenlo1ihs5u1tf4uj39oqr82oecb.apps.googleusercontent.com'>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GoogleOAuthProvider>
)