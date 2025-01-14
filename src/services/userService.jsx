import axios from "axios";

const API_URL = "http://localhost:8080/api/users"

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        throw error.response.data || "Error during registration";
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        return response.data;
    } catch (error) {
        throw error.response.data || "Error during login";
    }
};

export const forgotPassword = async (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
}

export const resetPassword = async (token, newPassword) => {
    return axios.post(`${API_URL}/reset-password?token=${token}`, {newPassword});
}