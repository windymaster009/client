// HotelGallery.jsx
import React, { useState } from "react";
import "./HotelGallery.css"; // Ensure this file contains the necessary styling

const HotelGallery = ({ gallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!gallery || gallery.length === 0) {
    return <p>No images available for this hotel</p>;
  }

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
  };

  return (
    <div>
      {/* Thumbnail Gallery */}
      <div className="gallery">
        {gallery.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hotel Image ${index + 1}`}
            className="galleryThumbnail"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Modal for Lightbox View */}
      {isOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <button className="prev" onClick={goToPrevImage}>&lt;</button>
          <img src={gallery[currentIndex]} alt={`Hotel Image ${currentIndex + 1}`} className="modalImage" />
          <button className="next" onClick={goToNextImage}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default HotelGallery;
