import "./AllReviewsPopup.css";
import { useState, useEffect } from "react";

const AllReviewsPopup = ({ isOpen, onClose, reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    const REVIEWS_PER_PAGE = 4;

    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
            setSortOrder("desc");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const sortedReviews = [...reviews].sort((a, b) => {
        return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    });

    const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
    const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
    const currentReviews = sortedReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="popup-overlay all-reviews">
            <div className="popup-container all-reviews-border">
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
                        <button className="text-button" onClick={handlePrev} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="text-button" onClick={handleNext} disabled={currentPage === totalPages}>
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
