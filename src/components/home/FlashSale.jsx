import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useCountdown from '../../hooks/useCountdown';
import { flashSaleProducts } from '../../data/products';
import './FlashSale.css';

const FlashSale = () => {
  const scrollRef = useRef(null);
  // Set flash sale end time to 8 hours from now
  const endTime = new Date().getTime() + 8 * 60 * 60 * 1000;
  const { hours, minutes, seconds } = useCountdown(endTime);

  const pad = (num) => String(num).padStart(2, '0');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 600;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="flash-sale" id="flash-sale-section">
      <div className="container">
        {/* Header */}
        <div className="flash-sale__header">
          <div className="flash-sale__title-wrap">
            <span className="flash-sale__icon">⚡</span>
            <h2 className="flash-sale__title">FLASH SALE</h2>
            <div className="flash-sale__timer">
              <span className="flash-sale__timer-box">{pad(hours)}</span>
              <span className="flash-sale__timer-sep">:</span>
              <span className="flash-sale__timer-box">{pad(minutes)}</span>
              <span className="flash-sale__timer-sep">:</span>
              <span className="flash-sale__timer-box">{pad(seconds)}</span>
            </div>
          </div>
          <Link to="/search?flash_sale=true" className="flash-sale__see-all">
            Lihat Semua &rsaquo;
          </Link>
        </div>

        {/* Products Scroll */}
        <div className="flash-sale__container">
          <button
            className="flash-sale__scroll-btn flash-sale__scroll-btn--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <div className="flash-sale__products no-scrollbar" ref={scrollRef}>
            {flashSaleProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="flash-sale__card"
              >
                <div className="flash-sale__card-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="flash-sale__card-image"
                    loading="lazy"
                  />
                  <div className="flash-sale__card-discount">
                    {product.discount}% OFF
                  </div>
                </div>
                <div className="flash-sale__card-info">
                  <div className="flash-sale__card-price">
                    Rp{formatPrice(product.price)}
                  </div>
                  <div className="flash-sale__card-progress">
                    <div
                      className="flash-sale__card-progress-bar"
                      style={{ width: `${Math.min(Math.random() * 60 + 30, 95)}%` }}
                    >
                      <span className="flash-sale__card-progress-text">
                        Terjual {Math.floor(Math.random() * 80 + 10)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            className="flash-sale__scroll-btn flash-sale__scroll-btn--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
