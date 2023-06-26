import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider clientId='grefd'>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GoogleOAuthProvider>
)