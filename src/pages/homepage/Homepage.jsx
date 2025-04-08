import Header from "../../components/header/Header.jsx";
import './Homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import EditProfilePopup from "../../components/editProfilePopup/EditProfilePopup.jsx";
import axios from "axios";

const Home = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        registrationDate: "",
    });

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.log("No token found, user is not logged in.");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log("Fetched user data:", response.data);

                if (response.data) {
                    setUserData({
                        firstName: response.data.firstName || "",
                        lastName: response.data.lastName || "",
                        registrationDate: response.data.registrationDate || "",
                        address: response.data.address || "",
                        city: response.data.city || "",
                        state: response.data.state || "",
                        zipCode: response.data.zipCode || "",
                        country: response.data.country || "",
                    });
                }
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };

        fetchUserData();
    }, []);

    const handleProfileUpdate = (updatedData) => {
        setUserData((prevData) => ({
            ...prevData,
            ...updatedData
        }));
    };




    return (


        <div className="main-container homepage">
            <Header />
            <div className="content-container">
                <div className="content-left-container">
                    <div className="content-left-upper-container">
                        <div className="container-profile-picture">
                            <img src="/src/assets/test/Mask group.png" alt="" className='profile-picture'/>
                        </div>
                        <div className="container-personal-information">
                            <h2>
                                {userData.firstName && userData.lastName
                                    ? `${userData.firstName} ${userData.lastName}`
                                    : "Name not available"
                                }
                            </h2>
                            <p>Registration date</p>
                            <div className="follow-information">
                                <div className="follow-information-following">
                                    <h4>Following</h4>
                                    <p>350</p>
                                </div>
                                <div className="follow-information-followers">
                                    <h4>Followers</h4>
                                    <p>350</p>
                                </div>
                            </div>
                            <div className="edit-profile-button" onClick={openPopup}>
                                <p>Edit profile</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>

                    </div>
                    <div className="content-right-upper-container">

                    </div>
                </div>
                <div className="content-right-container">
                </div>

            </div>
            <EditProfilePopup isOpen={isPopupOpen} onClose={closePopup} onProfileUpdate={handleProfileUpdate} />
        </div>
    );
}

export default Home;