import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginAndRegister from "./pages/loginAndRegisterPage/LoginAndRegister.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";
import ForgotPasswordPage from "./pages/forgotPasswordPage/ForgotPasswordPage.jsx";
import Home from "./pages/homepage/Homepage.jsx";
import PrivateRoute from "./components/privateRouting/PrivateRoute.jsx";
import AuthHandler from "./components/authHandler/Authhandler.jsx";
import LocationPage from "./pages/locationPage/LocationPage.jsx";

function App() {
    return (
        <Router>
            <AuthHandler />
            <Routes>
                <Route path="/" element={<LoginAndRegister />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route element={<PrivateRoute/>}>
                    <Route path ="/home" element={<Home />} />
                </Route>
                <Route path="/location/:slug" element={<LocationPage />} />
            </Routes>
        </Router>
    )
}

export default App
