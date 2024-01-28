import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    ErrorPage,
    LoginPage,
    RegisterPage,
    LandingPage,
    ProtectedRoute,
    ResetPasswordPage,
    ForgotPasswordPage,
    VerifyEmailPage,
} from './pages'
import { SharedLayout, Chat, Profile } from './pages/DashBoard'
import { getThemeFromStorage, saveThemeToStorage } from './utils/localStorage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <SharedLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Chat />} />
                    <Route path="my-profile" element={<Profile />} />
                </Route>
                <Route path="landing" element={<LandingPage />} />
                <Route path="verify-email" element={<VerifyEmailPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route
                    path="forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                theme="light"
                closeOnClick={true}
                pauseOnHover={false}
            />
        </BrowserRouter>
    )
}

export default App
