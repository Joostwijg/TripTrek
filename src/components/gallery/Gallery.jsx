import "./Gallery.css";
import { useEffect, useState } from "react";

const Gallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [visibleImagesCount, setVisibleImagesCount] = useState(5);

    const hasImages = images && images.length > 0;

    // Dynamisch aantal zichtbare afbeeldingen op basis van schermgrootte
    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width <= 900) {
                setVisibleImagesCount(1);
            } else if (width <= 1300) {
                setVisibleImagesCount(3);
            } else {
                setVisibleImagesCount(5);
            }
        };

        updateVisibleCount(); // Initial run
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const prevSlide = () => {
        if (!hasImages) return;
        setCurrentIndex((prevIndex) =>
            prevIndex <= 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        if (!hasImages) return;
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % images.length
        );
    };

    const getVisibleImages = () => {
        if (!hasImages) return [];
        return Array.from({ length: visibleImagesCount }, (_, i) => {
            const imageIndex = (currentIndex + i) % images.length;
            return { image: images[imageIndex], imageIndex };
        });
    };

    const openLightbox = (index) => {
        if (!hasImages) return;
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const prevLightbox = () => {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextLightbox = () => {
        setLightboxIndex((prev) => (prev + 1) % images.length);
    };

    if (!hasImages) {
        return <p style={{ textAlign: "center" }}>Geen afbeeldingen beschikbaar.</p>;
    }

    return (
        <>
            <div className="slider-wrapper">
                <button onClick={prevSlide} className="slider-button left">‹</button>
                <div className="slider-container">
                    <div className="slider">
                        {getVisibleImages().map(({ image, imageIndex }, renderIndex) => (
                            <div
                                key={renderIndex}
                                className="slider-image-container visible"
                                onClick={() => openLightbox(imageIndex)}
                            >
                                <img
                                    src={image}
                                    alt={`slide-${imageIndex}`}
                                    className="slider-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={nextSlide} className="slider-button right">›</button>
            </div>

            {lightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>×</button>
                    <button
                        className="lightbox-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            prevLightbox();
                        }}
                    >
                        ‹
                    </button>
                    <img
                        src={images[lightboxIndex] || ""}
                        alt={`large-${lightboxIndex}`}
                        className="lightbox-image"
                    />
                    <button
                        className="lightbox-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextLightbox();
                        }}
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
};

export default Gallery;
