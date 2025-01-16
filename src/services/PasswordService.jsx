import axios from "axios";

const API_URL="http://localhost:8080/api/users";

    export const forgotPassword = async (email) => {
        try{
            const response = await axios.post(`${API_URL}/forgot-password`, { email })

            if (response.data === "Email not registered") {
                throw new Error("Email not registered")
            }
            return response.data;

        } catch (error) {
            throw error.response?.data || error.message || "Error during forgot password process";
        }
    };

    export const resetPassword = async (token, password) => {
        try {
            const response = await axios.put(`${API_URL}/reset-password'`, null,{
                params: { token, password },
            })
            return response.data;
        } catch (error) {
            throw error.response.data || "Error during password reset";

        }
    }
