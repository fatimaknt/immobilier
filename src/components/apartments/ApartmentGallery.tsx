import React, { useState } from 'react';

interface ApartmentGalleryProps {
    images: string[];
    title: string;
}

const ApartmentGallery: React.FC<ApartmentGalleryProps> = ({ images, title }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="apartment-gallery">
            <div className="gallery-main">
                <img
                    src={images[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    className="main-image"
                />
                {images.length > 1 && (
                    <>
                        <button className="gallery-nav prev" onClick={prevImage}>
                            &#8249;
                        </button>
                        <button className="gallery-nav next" onClick={nextImage}>
                            &#8250;
                        </button>
                    </>
                )}
                <div className="image-counter">
                    {currentImageIndex + 1} / {images.length}
                </div>
            </div>

            {images.length > 1 && (
                <div className="gallery-thumbnails">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${title} - Thumbnail ${index + 1}`}
                            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => goToImage(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApartmentGallery;
