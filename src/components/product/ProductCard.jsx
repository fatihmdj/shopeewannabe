import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatSold = (sold) => {
    if (sold >= 1000) {
      return `${(sold / 1000).toFixed(sold >= 10000 ? 0 : 1)}rb`;
    }
    return sold;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < fullStars ? '' : 'empty'}`}>★</span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card" id={`product-card-${product.id}`}>
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="product-card__discount-badge">
            <span className="product-card__discount-value">{product.discount}%</span>
            <span className="product-card__discount-label">GIẢM</span>
          </div>
        )}

        {/* Mall / Star Badge */}
        {product.badge && (
          <div className={`product-card__badge product-card__badge--${product.badge.toLowerCase()}`}>
            {product.badge === 'Mall' ? '🏬 Mall' : '⭐ Star+'}
          </div>
        )}

        {/* Free Shipping */}
        {product.freeShipping && (
          <div className="product-card__free-shipping">
            <span className="product-card__free-shipping-icon">🚚</span>
            Gratis Ongkir
          </div>
        )}

        {/* Hover Overlay */}
        <div className="product-card__overlay">
          <span>Lihat Produk</span>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name line-clamp-2">{product.name}</h3>

        <div className="product-card__promo-strip">
          {product.discount >= 30 && (
            <span className="product-card__voucher-tag">Diskon Spesial</span>
          )}
        </div>

        <div className="product-card__price-row">
          <span className="product-card__price">
            <span className="price-currency">₫</span>
            <span className="product-card__price-value">Rp{formatPrice(product.price)}</span>
          </span>
          {product.originalPrice && (
            <span className="product-card__original-price">
              Rp{formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="product-card__footer">
          <div className="product-card__rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
          </div>
          <span className="product-card__sold">
            Terjual {formatSold(product.sold)}
          </span>
        </div>

        <div className="product-card__location">
          {product.location}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
