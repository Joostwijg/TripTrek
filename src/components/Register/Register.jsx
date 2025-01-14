import React, { useState } from "react";
import {registerUser} from "../../services/userService.jsx";
import Button from "../button/Button.jsx";



const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }

        try {
            const newUser = {email, password, confirmPassword};
            await registerUser(newUser);
            setMessage("User registered successfully, Please log in.");
        } catch (error) {
            setMessage(error);
        }


    }


    return (
        <div className="div-login">
            <form className="login-form" onSubmit={handleSubmit}>
                <h4><label htmlFor="email">E-mail:</label></h4>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h4><label htmlFor="password">Password:</label></h4>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <h4><label htmlFor="confirmPassword">Confirm Password:</label></h4>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p>{message}</p>
                <Button
                    type="submit"
                    variant="button-orange"
                >Register
                </Button>
                <Button
                    type="submit"
                    variant="button-white"
                >Already registered
                </Button>
            </form>
        </div>
    )
}

export default Register;
