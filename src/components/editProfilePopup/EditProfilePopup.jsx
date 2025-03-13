import "./EditProfilePopup.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "../button/Button.jsx";
import {updateProfile} from "../../services/EditProfileService.jsx";
import axios from "axios";

const EditProfilePopup = ( {isOpen, onClose, onProfileUpdate}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        password: "",
        confirmPassword: "",
    })

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'content-type': 'application/json'

                    }
                });

                console.log("User data fetched:", JSON.stringify(response.data, null, 2));


                if (response.data) {
                    setFormData((prevData) => ({
                        ...prevData,
                        firstName: response.data.firstName || "",
                        lastName: response.data.lastName || "",
                        email: response.data.email || "",
                        phoneNumber: response.data.phoneNumber || "",
                        address: response.data.address || "",
                        city: response.data.city || "",
                        state: response.data.state || "",
                        zipCode: response.data.zipCode || "",
                        country: response.data.country || "",
                        }));
                }
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };

        fetchUserData()

    },[]);

    const [errors, setErrors] = useState({
        passwordMisMatch: false,
    });

    if (!isOpen) return null;

    const handleClose = () => {
        navigate("/")
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });


        if (name === "confirmPassword" || name === "password") {
            setErrors({
                ...errors,
                passwordMismatch: formData.password !== value && name === "confirmPassword",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrors({...errors, passwordMismatch: true});
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
                password: formData.password,
            });
            console.log("Profile updated successfully");

            // ✅ Stuur de nieuwe profielgegevens terug naar Home.jsx
            if (onProfileUpdate) {
                onProfileUpdate({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    registrationDate: formData.registrationDate,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                });
            }

            onClose(); // ✅ Sluit de popup na opslaan
        } catch (error) {
            console.log("Something went wrong", error);
            alert("Something went wrong");
        }
    }


    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-menu">
                    <button
                        className="close-button"
                        onClick={handleClose}
                    >Close edit profile</button>
                </div>
                <div className="popup-body">
                    <div className="popup-header">
                        <div className="popup-title">
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="popup-profile-picture">
                            <h2>pic
                            </h2>
                        </div>

                    </div>
                    <div className="popup-form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>First name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        defaultValue={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        inputMode="numeric"
                                        maxLength="20"
                                    />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-profile-input">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Zip-code/Postal code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br/><br/>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.passwordMismatch && (
                                        <p className="error-message">Passwords do not match!</p>
                                    )}
                                </div>
                            </div>
                            <br/>
                            <div className="submit-edit-profile">
                                <Button
                                    type="submit"
                                    className="close-button"
                                    variant="button-black"
                                >
                                    Save Changes
                                </Button>

                            </div>
                        </form>

                    </div>


                </div>

            </div>

        </div>
    );
}
export default EditProfilePopup;