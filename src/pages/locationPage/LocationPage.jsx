import Header from "../../components/header/Header.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "./LocationPage.css"
import Gallery from "../../components/gallery/Gallery.jsx";
import TopReviews from "../../components/topReviews/TopReviews.jsx";
import Button from "../../components/button/Button.jsx";



const LocationPage = () => {
    const { id } = useParams();
    const [locationData, setLocationData] = useState({
        name: "",
        description: "",
        mainImage:"",
        galleryImages: [],
    });
    const [reviews, setReviews] = useState([])



    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/locations/${id}`);
                console.log("Fetched location data:", response.data);
                if (response.data) {
                    setLocationData({
                        name: response.data.name || "",
                        description: response.data.description || "",
                        mainImage: response.data.mainImage || "",
                        galleryImages: response.data.galleryImages || [],
                    });

                    console.log("Setting location data:", {
                        name: response.data.name || "",
                        description: response.data.description || "",
                        mainImage: response.data.mainImage || "",
                        galleryImages: response.data.galleryImages || [],
                    });


                }
            } catch (error) {
                console.log("Something went wrong fetching location data", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reviews/location/${id}`);
                console.log("Fetched reviews:", response.data);
                setReviews(response.data || []);
            } catch (error) {
                console.log("Something went wrong fetching reviews", error);
            }
        };

        fetchLocationData();
        fetchReviews();
    }, [id]);

    useEffect(() => {
        console.log("Updated locationData:", locationData);
    }, [locationData]);

        return (
            <div className="main-container locationPage">
                <Header/>
                <div className="upperSection">
                    <div
                        className="upperSection-left"
                        style={{
                            backgroundImage: locationData.mainImage
                                ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${locationData.mainImage})`
                                : "none"
                        }}
                    >
                        <h2>{locationData.name}
                        </h2>
                    </div>
                    <div className="upperSection-right">
                        <div className="buttons">
                            <Button
                            type="submit"
                            variant="button-black">
                                Mark as visited
                            </Button>
                            <Button
                            type="submit"
                            variant="button-orange"
                        >Write a review</Button>

                        </div>

                    </div>
                </div>
                <div className="middleSection">
                    <div className="content-middleSection">
                        <h2>{locationData.name}
                        </h2>
                        <p>{locationData.description}
                        </p>
                        <Gallery
                            images= {locationData.galleryImages}
                        />
                    </div>
                </div>
                <div className="bottomSection">
                    <div className="bottomSection-left">
                        t
                    </div>
                    <div className="bottomSection-right">
                        <TopReviews
                            reviews={reviews}
                            onViewAll={() => console.log('Toon alle reviews of navigeer naar review pagina')}
                        />
                    </div>

                </div>


            </div>
        )
}

export default LocationPage;


