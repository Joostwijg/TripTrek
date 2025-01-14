import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/login/Login.jsx";
import Register from "./components/Register/Register.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element=
                    {
                    <>
                        <Login />
                        <Register />
                    </>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
