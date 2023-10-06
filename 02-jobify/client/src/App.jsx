import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Error, Landing, Login, Register, ProtectedRoute } from './pages/'
import {
    SharedLayout,
    AddJob,
    Profile,
    AllJobs,
    Stats,
    EditJob,
} from './pages/Dashboard'
import {
    getThemeFromLocalStorage,
    setThemeToLocalStorage,
} from './utils/localStorage'

const App = () => {
    const handleChange = (valueChange) => {
        setThemeToLocalStorage(valueChange)
        document.body.className = valueChange ? 'dark-theme' : ''
    }

    if (getThemeFromLocalStorage()) {
        document.body.className = 'dark-theme'
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <SharedLayout handleChange={handleChange} />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AddJob />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="all-jobs" element={<AllJobs />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="edit-job/:id" element={<EditJob />} />
                </Route>
                <Route path="/" element={<Landing />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                theme="light"
            />
        </BrowserRouter>
    )
}

export default App
