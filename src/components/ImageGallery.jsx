import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) {
    return <p className="no-images">No photos available</p>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-item" onClick={() => handleImageClick(image)}>
            <img src={image} alt={`Recipe photo ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img src={selectedImage} alt="Full size" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;