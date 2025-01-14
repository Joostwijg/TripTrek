import React, { useState } from "react";
import { loginUser } from "../../services/userService.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); //

    const handleSubmit = async (e) => {
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="pass">Password</label>
                <input
                    type="password"
                    id="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <button type="button" onClick={() => alert("Redirect to register")}>
                    Registreren
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
