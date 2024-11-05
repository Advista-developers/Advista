import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Assume we have 3 slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [totalSlides]);

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container relative overflow-hidden w-full h-64">
      <div
        className="slider flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="slide w-full flex items-center justify-center bg-red-400 h-full">Slide 1</div>
        <div className="slide w-full flex items-center justify-center bg-blue-400 h-full">Slide 2</div>
        <div className="slide w-full flex items-center justify-center bg-green-400 h-full">Slide 3</div>
      </div>

      <div className="slider-controls absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`mx-2 w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => showSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
