import React, {useState} from "react";
import Button from "../button/Button.jsx";
import {forgotPassword} from "../../services/userService.jsx";
import "./ForgotPassword.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await forgotPassword(email);
            setMessage("Password reset email has been sent.")
        } catch(error){
            setMessage("Email nog registered")
        }
    }

    return (
        <div className="div-forgot-password">
            <form onSubmit={handleSubmit}>
                <h4><label htmlFor="email">Enter your email:</label></h4>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <p>{message}</p>
                <Button
                    type="submit"
                    variant="button-orange"
                >Reset password</Button>
            </form>
        </div>
    )
}

export default ForgotPassword
