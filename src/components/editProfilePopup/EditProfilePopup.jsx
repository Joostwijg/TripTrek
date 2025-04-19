import "./EditProfilePopup.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Button from "../button/Button.jsx";
import axios from "axios";

const EditProfilePopup = ({ isOpen, onClose, onProfileUpdate }) => {
    const navigate = useNavigate();
    const popupRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", phoneNumber: "",
        address: "", city: "", state: "", zipCode: "", country: "",
        password: "", confirmPassword: ""
    });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    const {
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        address,
                        city,
                        state,
                        zipCode,
                        country
                    } = response.data;

                    setFormData({
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        address,
                        city,
                        state,
                        zipCode,
                        country,
                        password: "",
                        confirmPassword: ""
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords are not matching.");
            return;
        }

        const token = localStorage.getItem("authToken");

        try {
            await axios.put("http://localhost:8080/api/users/profile/edit", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            onProfileUpdate?.(formData);
            onClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Bijwerken mislukt. Probeer het opnieuw.");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container" ref={popupRef}>
                <div className="popup-menu">
                    <button className="close-button" onClick={onClose}>Close edit profile</button>
                </div>
                <div className="popup-body">
                    <div className="popup-header">
                        <div className="popup-title"><h2>Edit Profile</h2></div>
                        <div className="popup-profile-picture">
                            <div className="profile-picture-placeholder">Upload your profile picture</div>
                        </div>
                    </div>
                    <div className="popup-form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>First name</label>
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Last name</label>
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Email</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Phone</label>
                                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Address</label>
                                    <input name="address" value={formData.address} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>City</label>
                                    <input name="city" value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="edit-profile-input">
                                    <label>State</label>
                                    <input name="state" value={formData.state} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Zip</label>
                                    <input name="zipCode" value={formData.zipCode} onChange={handleChange} />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Country</label>
                                    <input name="country" value={formData.country} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="edit-profile-row">
                                <div className="edit-profile-input">
                                    <label>Password</label>
                                    <input name="password" type="password" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="edit-profile-input">
                                    <label>Confirm Password</label>
                                    <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="submit-edit-profile">
                                <Button type="submit" variant="button-black">Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePopup;
