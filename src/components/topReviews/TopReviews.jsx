import '@fortawesome/fontawesome-free/css/all.min.css';
import "./TopReviews.css"
import {useState} from "react";

const TopReviews = ({ reviews, onViewAll }) => {

    const CHARACTER_LIMIT = 100;
    const [expandedReviewsIds, setExpandedReviewsIds] = useState([]); // kleine i

    const toggleExpanded = (id) => {
        setExpandedReviewsIds((prev) =>
            prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
        );
    };

    const topReviews = [...reviews]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 2);

    return (
        <div className="top-reviews">
            <h3>Top Reviews</h3>

            {topReviews.length === 0 ? (
                <p>Be the first to leave a review behind..</p>
            ) : (
                topReviews.map((review) => {
                    const isExpanded = expandedReviewsIds.includes(review.id);
                    const shouldTruncate = review.comment.length > CHARACTER_LIMIT;
                    const displayedComment = isExpanded || !shouldTruncate
                        ? review.comment
                        : review.comment.slice(0, CHARACTER_LIMIT) + "...";

                    return (
                        <div key={review.id} className="review-item">
                            <h4>{review.user?.firstName} {review.user?.lastName}</h4>
                            <div className={`review-text ${isExpanded ? 'expanded' : ''}`}>
                                <p className="comment">
                                    {displayedComment}
                                    {shouldTruncate && (
                                        <span
                                            className="read-more-button"
                                            onClick={() => toggleExpanded(review.id)}
                                        >
                                            {" "}
                                            <strong>{isExpanded ? "Read less" : "Read more"}</strong>
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })
            )}
            {topReviews.length > 0 && (
            <button className="view-all-button" onClick={onViewAll}>
                All reviews
                <i className="fa-solid fa-arrow-right"></i>
            </button>
                )
            }
        </div>
    );
}

export default TopReviews;
