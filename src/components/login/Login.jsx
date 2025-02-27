import React, { useState } from "react";
import { loginUser } from "../../services/userService.jsx";
import Button from "../button/Button.jsx";
import "./Login.css"

const Login = ({ toggleSection }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); //

    const handleSubmit = async (e) => {
        setEmail("");
        setPassword("");
        e.preventDefault();

        try {
            const loginDetails = { email, password };
            const user = await loginUser(loginDetails);
            setMessage(`Welcome back, ${user.email}!`);
        } catch (error) {
            setMessage("Invalid credentials, please try again.");
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
                <p>{message && <p>{message}</p>}</p>
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
