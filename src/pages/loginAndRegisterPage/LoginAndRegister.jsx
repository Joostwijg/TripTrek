import Login from "../../components/login/Login.jsx";
import Register from "../../components/Register/Register.jsx";
import "./LoginAndRegister.css"

function LoginAndRegisterPage() {
    return (<div className="main-loginRegister-container">

        <div className="login-section">
            <div className="login-container">
                <Login/>
            </div>
            <div className="login-quote">
                <quote><i>"Here comes a quote of inspiration"</i></quote>
            </div>
        </div>
        <div className="register-section">
            <div className="login-container">
                <Register/>
            </div>
            <div className="login-quote">
                <quote><i>"Here comes a quote of inspiration"</i></quote>
            </div>
        </div>
    </div>);
}

export default LoginAndRegisterPage;