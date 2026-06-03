import { useState, useEffect, useCallback } from 'react';
import { banners, quickLinks } from '../../data/banners';
import './BannerCarousel.css';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="banner-section" id="banner-carousel">
      <div className="container banner-section__inner">
        {/* Main Carousel */}
        <div className="banner-carousel">
          <div
            className="banner-carousel__track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="banner-carousel__slide"
                style={{ background: banner.gradient }}
              >
                <div className="banner-carousel__content">
                  <h2 className="banner-carousel__title">{banner.title}</h2>
                  <p className="banner-carousel__subtitle">{banner.subtitle}</p>
                  <button className="banner-carousel__cta">Lihat Sekarang</button>
                </div>
                <div className="banner-carousel__decoration">
                  <div className="banner-carousel__circle banner-carousel__circle--1"></div>
                  <div className="banner-carousel__circle banner-carousel__circle--2"></div>
                  <div className="banner-carousel__circle banner-carousel__circle--3"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="banner-carousel__arrow banner-carousel__arrow--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="banner-carousel__arrow banner-carousel__arrow--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dots */}
          <div className="banner-carousel__dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`banner-carousel__dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="banner-side-panel">
          {quickLinks.map((link, index) => (
            <a key={index} href="#" className="banner-side-panel__item">
              <span className="banner-side-panel__icon" style={{ background: `${link.color}15` }}>
                {link.icon}
              </span>
              <span className="banner-side-panel__label">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
