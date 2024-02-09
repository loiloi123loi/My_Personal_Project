import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
    const { authUser } = useAuthContext()

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={authUser ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={authUser ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={authUser ? <Navigate to="/" /> : <Register />}
                    />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </div>
    )
}

export default App
