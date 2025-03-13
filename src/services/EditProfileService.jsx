import axios from "axios";

const API_URL = "http://localhost:8080/api/users/profile";

export const updateProfile = async (formData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("No token found, user not logged in.");
        }

        const response = await axios.put(`${API_URL}/edit`, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};
