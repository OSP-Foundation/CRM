import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
