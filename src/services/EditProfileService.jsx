const API_URL = 'http://localhost:8080/api/users';

export const updateProfile = async(formData) => {
    try {
        const response = await fetch(`${API_URL}/profiles`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) {
            throw new Error("Error updating profile");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}