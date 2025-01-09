import React, { useState } from "react";




const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email", email);
        console.log("password", password);
    };




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"> E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="pass">Password:</label>
                <input
                    type="password"
                    id="pass"
                    value={password}

                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Login;