import './ReviewPopup.css';
import { useEffect, useRef, useState } from 'react';
import Button from "../button/Button.jsx";

const ReviewPopup = ({ isOpen, onClose, onSubmit, locationId, userId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const popupRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setComment('');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating > 0 && comment.trim()) {
            const review = {
                rating,
                comment,
                location: { id: locationId },
                user: { id: userId },
                date: new Date().toISOString().split("T")[0],
            };
            onSubmit(review);
            onClose();
        }
    };

    return (
        <div className="popup-overlay review">
            <div className="popup-container review-border" ref={popupRef}>
                <div className="popup-body review-header">
                    <div className="popup-header">
                        <div className="popup-title">
                            <h2>Your Review</h2>
                        </div>
                    </div>
                    <div className="popup-form-container review-form">
                        <div className="rating-location">
                            <label htmlFor="rating">Rating</label>
                            <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                <option value="0">Choose Rating</option>
                                {[1, 2, 3, 4, 5].map((r) => (
                                    <option key={r} value={r}>{r} Star{r > 1 && "s"}</option>
                                ))}
                            </select>
                        </div>
                        <div className="comment-location">
                            <label htmlFor="comment">Comment</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={6}
                                placeholder="Share your experience..."
                            />
                        </div>
                        <div className="sumbit-review-row">
                            <Button type="button" variant="button-black" onClick={onClose}>Cancel</Button>
                            <Button type="button" variant="button-orange" onClick={handleSubmit}>Add review</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopup;
