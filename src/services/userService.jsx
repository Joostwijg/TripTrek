import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        const message = error?.response?.data || "Error during registration";
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user, {
            headers: { "Content-Type": "application/json" }
        });
        const token = response.data.token;
        if (token) {
            localStorage.setItem("authToken", token);
        }
        return response.data;
    } catch (error) {
        const message = error?.response?.data || "Error during login";
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }
};