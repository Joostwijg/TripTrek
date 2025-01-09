import React, { useState } from "react";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }

        setMessage("Registration successful", email, password);
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit'>Register</button>
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Register;
