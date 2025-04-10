import Button from "../button/Button.jsx";
import "./Header.css"
import React, {useState} from "react";
import logo from "/src/assets/branding/TrekTrip.svg"
import axios from "axios";
import AddLocationPopup from "../addLocationPopup/AddLocationPopup.jsx";

const header = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddLocation = async (locationData) => {
        try {
            await axios.post("http://localhost:8080/api/locations", locationData);
            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error adding location", error);
        }
    };


    return (
        <div className="header">
            <div className="header-menu">
                <div className="logo-container">
                    <a href="/">
                    <img src={logo}  className="logo" title="Logo_Triptrek"/>
                    </a>
                </div>
                <div className="add-place">
                    <Button
                        type="submit"
                        variant="button-green"
                        onClick={() => setIsPopupOpen(true)}
                    >Add location</Button>
                </div>
                <div className="search">
                    <p>Search...</p>
                </div>
            </div>
            <AddLocationPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleAddLocation}
            />
        </div>
    )
}
export default header