import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginAndRegister from "./pages/loginAndRegisterPage/LoginAndRegister.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginAndRegister />} />
            </Routes>
        </Router>
    )
}

export default App
