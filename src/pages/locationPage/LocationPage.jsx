import Header from "../../components/header/Header.jsx";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./LocationPage.css";

import Gallery from "../../components/gallery/Gallery.jsx";
import TopReviews from "../../components/topReviews/TopReviews.jsx";
import Button from "../../components/button/Button.jsx";
import ReviewPopup from "../../components/reviewPopup/ReviewPopup.jsx";
import AllReviewsPopup from "../../components/allReviewsPopup/AllReviewsPopup.jsx";

const LocationPage = () => {
    const { slug } = useParams();
    const { setBackgroundImage } = useOutletContext();

    const [locationData, setLocationData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userData, setUserData] = useState({ id: null, firstName: "", lastName: "" });
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [isAllReviewsOpen, setIsAllReviewsOpen] = useState(false);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            const response = await axios.get("http://localhost:8080/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData({
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        } catch (error) {
            console.error("Fout bij ophalen gebruiker:", error);
        }
    }, []);

    const fetchLocationData = useCallback(async () => {
        if (!slug) return;
        try {
            const encodedSlug = encodeURIComponent(slug);
            const response = await axios.get(`http://localhost:8080/api/locations/slug/${encodedSlug}`);
            const location = response.data;

            if (location.approved) {
                setLocationData({
                    id: location.id,
                    name: location.name,
                    description: location.description,
                    mainImage: location.mainImage,
                    galleryImages: location.galleryImages,
                });
            } else {
                setLocationData(null);
            }
        } catch (error) {
            console.error("Fout bij ophalen locatie:", error);
            setLocationData(null);
        }
    }, [slug]);

    const fetchReviews = useCallback(async (locationId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reviews/location/id/${locationId}`);
            setReviews(response.data || []);
        } catch (error) {
            console.error("Fout bij ophalen reviews:", error);
        }
    }, []);

    const handleSubmitReview = async (reviewData) => {
        try {
            const completeReview = {
                ...reviewData,
                user: { id: userData.id },
                location: { id: locationData.id },
                date: new Date().toISOString().split("T")[0]
            };

            await axios.post("http://localhost:8080/api/reviews", completeReview);
            await fetchReviews(locationData.id);
            setIsReviewPopupOpen(false);
        } catch (error) {
            console.error("Error posting review", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        fetchLocationData();
    }, [fetchLocationData]);

    useEffect(() => {
        if (locationData?.mainImage) {
            setBackgroundImage(locationData.mainImage);
        }
    }, [locationData, setBackgroundImage]);

    useEffect(() => {
        if (locationData?.id) {
            fetchReviews(locationData.id);
        }
    }, [locationData, fetchReviews]);

    if (locationData === null) {
        return (
            <div className="main-container locationPage">
                <Header />
                <div className="not-approved-message">
                    <h2>This location is not approved or does not exist.</h2>
                </div>
            </div>
        );
    }

    return (
        <div className='locationPage'>
            <div className="upperSection">
                <div
                    className="upperSection-left"
                    style={{
                        backgroundImage: locationData.mainImage
                            ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${encodeURI(locationData.mainImage)})`
                            : "none"
                    }}
                >
                    <h2>{locationData.name}</h2>
                </div>
                <div className="upperSection-right">
                    <div className="buttons">
                        <Button type="submit" variant="button-black">
                            Mark as visited
                        </Button>
                        <Button
                            type="submit"
                            variant="button-orange"
                            onClick={() => setIsReviewPopupOpen(true)}
                        >
                            Write a review
                        </Button>
                    </div>
                </div>
            </div>

            <div className="middleSection">
                <div className="content-middleSection">
                    <h2>{locationData.name}</h2>
                    <p>{locationData.description}</p>
                    <Gallery images={locationData.galleryImages} />
                </div>
            </div>

            <div className="bottomSection">
                <div className="bottomSection-left"></div>
                <div className="bottomSection-right">
                    <TopReviews
                        reviews={reviews}
                        onViewAll={() => setIsAllReviewsOpen(true)}
                    />
                </div>
            </div>

            <ReviewPopup
                isOpen={isReviewPopupOpen}
                onClose={() => setIsReviewPopupOpen(false)}
                onSubmit={handleSubmitReview}
                locationId={locationData.id}
                userId={userData.id}
            />

            <AllReviewsPopup
                isOpen={isAllReviewsOpen}
                onClose={() => setIsAllReviewsOpen(false)}
                reviews={reviews}
            />
        </div>
    );
};

export default LocationPage;
