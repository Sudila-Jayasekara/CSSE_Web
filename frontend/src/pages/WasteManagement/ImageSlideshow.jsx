import React, { useState, useEffect } from "react";

const ImageSlideshow = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log(`Current interval: ${interval} ms`); // Debugging to check interval
    const changeImage = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      console.log(`Image changed to index: ${currentImageIndex}`); // Debugging image change
    }, interval);

    return () => clearInterval(changeImage); // Cleanup interval on unmount
  }, [images.length, interval]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={images[currentImageIndex]}
        alt="Recycle Items"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ImageSlideshow;
