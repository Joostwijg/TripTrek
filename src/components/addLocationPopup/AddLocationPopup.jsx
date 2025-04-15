import './AddLocationPopup.css';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "../button/Button.jsx";

const AddLocationPopup = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const popupRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setDescription('');
            setMainImage('');
            setGalleryImages([]);
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

    const handleMainImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("http://localhost:8080/api/locations/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        setMainImage(response.data);
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        const urls = await Promise.all(files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("http://localhost:8080/api/locations/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        }));
        setGalleryImages(urls);
    };

    const handleSubmit = async () => {
        if (!name || !description || !mainImage) return;
        await axios.post("http://localhost:8080/api/locations", {
            name,
            description,
            mainImage,
            galleryImages
        });
        onClose();
    };

    return (
        <div className="popup-overlay add-location">
            <div className="popup-container add-location-border" ref={popupRef}>
                <div className="popup-body add-location-content">
                    <div className="popup-header">
                        <div className="popup-title">
                            <h2>Add a new location</h2>
                        </div>
                    </div>
                    <div className="popup-form-container add-location-form">
                        <div className="input-group">
                            <label>Location name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Description</label>
                            <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Main Image</label>
                            <input type="file" onChange={handleMainImageUpload} />
                            {mainImage && <img src={mainImage} alt="Main preview" className="main-image-preview" />}
                        </div>
                        <div className="input-group">
                            <label>Gallery Images</label>
                            <input type="file" multiple onChange={handleGalleryUpload} />
                            <div className="preview-gallery">
                                {galleryImages.map((img, i) => (
                                    <img key={i} src={img} alt={`Gallery ${i}`} />
                                ))}
                            </div>
                        </div>
                        <div className="popup-buttons">
                            <Button variant="button-black" onClick={onClose}>Cancel</Button>
                            <Button variant="button-green" onClick={handleSubmit}>Add location</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLocationPopup;
