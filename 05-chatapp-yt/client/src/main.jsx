import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { SocketContextProvider } from './context/SocketContext'

const root = document.getElementById('root')
createRoot(root).render(
    <React.StrictMode>
        <AuthContextProvider>
            <SocketContextProvider>
                <App />
            </SocketContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
)
