import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="503380557945-2suna7ha853gec125a8gfka4836r6e3b.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
