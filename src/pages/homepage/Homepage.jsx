import Header from "../../components/header/Header.jsx";
import './Homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState, useCallback } from "react";
import EditProfilePopup from "../../components/editProfilePopup/EditProfilePopup.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [pendingLocations, setPendingLocations] = useState([]);
    const [pendingReviews, setPendingReviews] = useState([]);
    const [recentLocations, setRecentLocations] = useState([]);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        registrationDate: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const fetchUserData = useCallback(async () => {
        if (!token) return;
        try {
            const response = await axios.get('http://localhost:8080/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
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
                    role: response.data.role || "",
                });
            }
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }, [token]);

    const fetchRecentLocations = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/locations");
            const sorted = response.data
                .filter(loc => loc.approved)
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);
            setRecentLocations(sorted);
        } catch (error) {
            console.error("Fout bij ophalen recente locaties", error);
        }
    }, []);

    const fetchPendingItems = useCallback(async () => {
        if (userData.role === "moderator" && token) {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const [locRes, revRes] = await Promise.all([
                axios.get("http://localhost:8080/api/locations/pending", config),
                axios.get("http://localhost:8080/api/reviews/pending", config)
            ]);
            setPendingLocations(locRes.data);
            setPendingReviews(revRes.data);
        }
    }, [token, userData.role]);

    const approveLocation = async (id) => {
        await axios.patch(`http://localhost:8080/api/locations/approve/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingLocations(prev => prev.filter(loc => loc.id !== id));
    };

    const approveReview = async (id) => {
        await axios.patch(`http://localhost:8080/api/reviews/approve/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingReviews(prev => prev.filter(rev => rev.id !== id));
    };

    const rejectLocation = async (id) => {
        await axios.delete(`http://localhost:8080/api/locations/reject/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingLocations(prev => prev.filter(loc => loc.id !== id));
    };

    const rejectReview = async (id) => {
        await axios.delete(`http://localhost:8080/api/reviews/reject/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingReviews(prev => prev.filter(rev => rev.id !== id));
    };

    const handleProfileUpdate = (updatedData) => {
        setUserData(prevData => ({ ...prevData, ...updatedData }));
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        fetchPendingItems();
    }, [fetchPendingItems]);

    useEffect(() => {
        fetchRecentLocations();
    }, [fetchRecentLocations]);

    return (
        <div className="main-content-container">
            <div className="content-container">
                <div className="content-left-container">
                    <div className="content-left-upper-container">
                        <div className="container-personal-information">
                            <h2>
                                {userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : ''}
                            </h2>
                            <p>Registration date: {userData.registrationDate?.split("T")[0]}</p>
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
                    <div className="content-left-under-container">
                        <h3>Recently Added Locations</h3>
                        <ul className="recent-locations">
                            {recentLocations.map(loc => (
                                <li key={loc.id}>
                                    <strong>{loc.name}</strong>
                                    <br />
                                    <button
                                        className="text-button"
                                        onClick={() => navigate(`/location/${loc.slug}`)}
                                    >
                                        More info →
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="content-right-container">
                    {userData.role === "moderator" && (
                        <div className="moderator-notifications">
                            <h3>Pending locations</h3>
                            {pendingLocations.length === 0 ? <p>No pending locations.</p> : (
                                <ul>
                                    {pendingLocations.map(loc => (
                                        <li key={loc.id}>
                                            <strong>{loc.name}</strong>
                                            <br />
                                            {loc.description}
                                            <div className="button-row">
                                                <button className="text-button" onClick={() => approveLocation(loc.id)}>Approve</button>
                                                <button className="text-button reject" onClick={() => rejectLocation(loc.id)}>Reject</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <h3>Pending reviews</h3>
                            {pendingReviews.length === 0 ? <p>No reviews found.</p> : (
                                <ul>
                                    {pendingReviews.map(rev => (
                                        <li key={rev.id}>
                                            <p><em>{rev.location?.name || "Unknown"}</em></p>
                                            <h4>{rev.user?.firstName} {rev.user?.lastName}</h4>
                                            <p><strong>Rating:</strong> {rev.rating} ⭐</p>
                                            {rev.comment}
                                            <div className="button-row">
                                                <button className="text-button" onClick={() => approveReview(rev.id)}>Approve</button>
                                                <button className="text-button reject" onClick={() => rejectReview(rev.id)}>Reject</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <EditProfilePopup isOpen={isPopupOpen} onClose={closePopup} onProfileUpdate={handleProfileUpdate} />
        </div>
    );
};

export default Home;
