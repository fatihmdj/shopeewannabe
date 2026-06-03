import { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      className="scroll-to-top animate-fade-in"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      id="scroll-to-top-btn"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3L14 9L12.6 10.4L8 5.8L3.4 10.4L2 9L8 3Z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
