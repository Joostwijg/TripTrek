import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginAndRegister from "./pages/loginAndRegisterPage/LoginAndRegister.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";
import ForgotPasswordPage from "./pages/forgotPasswordPage/ForgotPasswordPage.jsx";
import Home from "./pages/homepage/Homepage.jsx";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginAndRegister />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/home" element={<Home />} />
                {/* <Route element={<PrivateRoute/>}>
                    <Route path ="/home" element={<Home />} />
                </Route> PAS OPEN ZODRA HOMEPAGINA ALLEEN MAG BENADEREN WANNEER JE BENT INGELOGD*/ }
            </Routes>
        </Router>
    )
}

export default App
