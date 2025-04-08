import Button from "../button/Button.jsx";
import "./Header.css"
import React from "react";
import logo from "/src/assets/branding/TrekTrip.svg"

const header = () => {
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
                        variant="button-black"
                    >Add place</Button>
                </div>
                <div className="add-randomizer">
                    <Button
                        type="submit"
                        variant="button-green"
                    >Place randomizer</Button>
                </div>
                <div className="search">
                    <p>Search...</p>
                </div>
            </div>
        </div>
    )
}
export default header