import "./AllReviewsPopup.css";
import { useState, useEffect, useRef } from "react";
import useBodyScrollLock from "../../hooks/useBodyScrollLock.jsx";

const AllReviewsPopup = ({ isOpen, onClose, reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    const REVIEWS_PER_PAGE = 4;
    const popupRef = useRef(null);

    useBodyScrollLock(isOpen);

    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
            setSortOrder("desc");
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sortedReviews = [...reviews].sort((a, b) => {
        return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    });

    const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
    const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
    const currentReviews = sortedReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);

    return (
        <div className="popup-overlay all-reviews">
            <div className="popup-container all-reviews-border" ref={popupRef}>
                <div className="popup-body all-reviews-content">
                    <div className="popup-header">
                        <div className="popup-title">
                            <h3>All Reviews</h3>
                        </div>
                    </div>

                    <div className="sort-row all-reviews-sort">
                        <label>Sort by:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="desc">Highest first</option>
                            <option value="asc">Lowest first</option>
                        </select>
                    </div>

                    <div className="popup-form-container all-reviews-scroll">
                        {currentReviews.map((review) => (
                            <div key={review.id} className="review-item">
                                <h4>{review.user?.firstName} {review.user?.lastName}</h4>
                                <p><strong>Rating:</strong> {review.rating} ⭐</p>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pagination-controls">
                        <button className="text-button" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="text-button" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>

                    <div className="close-button-row">
                        <button className="text-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllReviewsPopup;
