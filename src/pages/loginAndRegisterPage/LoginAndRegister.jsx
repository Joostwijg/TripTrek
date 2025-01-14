import Login from "../../components/login/Login.jsx";
import Register from "../../components/Register/Register.jsx";
import "./LoginAndRegister.css"
import {useState} from "react";

function LoginAndRegisterPage() {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const toggleSection = () => {
        setIsLoginVisible(prev => !prev);
    }

    return (<div className="main-loginRegister-container">
        <div className={`login-section ${isLoginVisible ? 'fade-in login'  : 'fade-out login'}`}>
            <div className="login-container">
                <Login
                    toggleSection={toggleSection}
                />
            </div>
            <div className="login-quote">
                <quote><i>"Here comes a quote of inspiration"</i></quote>
            </div>
        </div>
        <div className={`register-section ${!isLoginVisible ? "fade-in register" : "fade-out register"}`}>
            <div className="login-container">
                <Register
                    toggleSection={toggleSection}
                />
            </div>
            <div className="login-quote">
                <quote><i>"Here comes a quote of inspiration"</i></quote>
            </div>
        </div>
    </div>);
}

export default LoginAndRegisterPage;