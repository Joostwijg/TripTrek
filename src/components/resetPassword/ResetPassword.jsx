import React from "react";
import Button from "../button/Button.jsx";
import {resetPassword} from "../../services/userService.jsx";
import {useLocation} from "react-router-dom";


const ResetPassword = () => {
    const [newPassword, setNewPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    const location= useLocation()

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return params.get("token")
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()
        const token = getQueryParams();
        if (token) {
            try {
                await resetPassword(token, newPassword);
                setMessage('Password reset successfully.')
            }
            catch (error) {
                setMessage("Something went wrong, try again")
            }
        } else {
            setMessage("Something went wrong, try again")
        }

    }

    return (
        <div className="div-reset-password">
            <form onSubmit={handleSubmit}>
                 <label htmlFor="newPassword">New Password: </label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <p>{message}</p>
                <Button type="submit">Reset password</Button>
            </form>
        </div>
    )
}

export default ResetPassword