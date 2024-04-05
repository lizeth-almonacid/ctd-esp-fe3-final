/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const Carousel = () => {
  const slides = [
    {
      url: "/foto1.jpg",
    },
    {
      url: "/foto2.jpg",
    },
    {
      url: "/foto3.jpg",
    },

    {
      url: "https://img.freepik.com/vector-premium/banner-videojuegos-cartel-juego-cibernetico-sobre-fondo-rojo_705714-63.jpg",
    },
    {
      url: "https://img.freepik.com/vector-premium/banner-videojuegos-fondo-juego-cibernetico_705714-81.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const autoPlay = () => {
      nextSlide();
    };
    const interval = setInterval(autoPlay,5000);

    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className="h-96 w-full p-2 mx-auto relative group mt-20">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover transition duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="ml-10 hidden group-hover:block absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <svg
          onClick={prevSlide}
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-x-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <svg
          onClick={nextSlide}
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-6a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2H9V5a1 1 0 00-1-1z"></path>
        </svg> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
