import React, { useState } from "react";
import { loginUser } from "../../services/userService.jsx";
import Button from "../button/Button.jsx";
import "./Login.css";

const Login = ({ toggleSection }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginDetails = { email, password };
            const response = await loginUser(loginDetails);

            localStorage.setItem("authToken", response.token);
            window.location.href = "/home";
        } catch (error) {
            setMessage(error.message || "Error during login");
        }
    };

    return (
        <div className="div-login">
            <form className="login-form" onSubmit={handleSubmit}>
                <h4><label htmlFor="email">E-mail:</label></h4>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <h4><label htmlFor="pass">Password:</label></h4>
                <input
                    type="password"
                    id="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <a
                    className="smallText"
                    href="/forgot-password"
                >Forgot password</a>

                {message && <p>{message}</p>}

                <Button
                    type="submit"
                    variant="button-white"
                >Login
                </Button>
                <Button
                    type="button"
                    onClick={toggleSection}
                    variant="button-orange"
                >Register
                </Button>
            </form>
        </div>
    );
};

export default Login;
