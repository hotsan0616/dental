import { GoDash } from "react-icons/go";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Carousel.module.css";

const Carousel: React.FC = () => {
  const slides = [
    {
      url: "/carousel/carousel-1.png",
    },
    {
      url: "/carousel/carousel-2.png",
    },
    {
      url: "/carousel/carousel-3.png",
    },
    {
      url: "/carousel/carousel-4.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className={`${styles.carouselContainer}`}>
      <Link href={"#"} passHref className={styles.imageWrapper}>
        <Image
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          fill={true}
          priority
        />
      </Link>
      {/* Left Arrow */}
      <div
        className={`${styles.carouselArrow} ${styles.left}`}
        onClick={prevSlide}
      >
        <IoIosArrowBack />
      </div>
      {/* Right Arrow */}
      <div
        className={`${styles.carouselArrow} ${styles.right}`}
        onClick={nextSlide}
      >
        <IoIosArrowForward />
      </div>
      {/* Indicators*/}
      <div className={styles.carouselIndicators}>
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`${styles.indicator} ${
              slideIndex === currentIndex ? styles.selectedSlide : ""
            }`}
          >
            <GoDash />
          </div>
        ))}
        {/* --- display:none --- */}
        <h2 className={styles.carouselTitle}>Lorem ipsum dolor sit amet.</h2>
      </div>
    </div>
  );
};
export default Carousel;
