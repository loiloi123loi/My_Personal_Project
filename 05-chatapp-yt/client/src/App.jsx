import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </div>
    )
}

export default App
