import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { shops } from '../data/shops';
import ProductCard from '../components/product/ProductCard';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id)) || products[0];
  const shop = shops.find((s) => s.id === product.shopId) || shops[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

  const formatSold = (sold) => {
    if (sold >= 1000) return `${(sold / 1000).toFixed(sold >= 10000 ? 0 : 1)}rb`;
    return sold;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}>★</span>
    ));
  };

  // Generate mock reviews
  const mockReviews = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    user: ['Budi S.', 'Sari M.', 'Andi P.', 'Rina K.', 'Deni H.', 'Lina T.'][i],
    avatar: `https://placehold.co/40x40/EE4D2D/ffffff?text=${['BS', 'SM', 'AP', 'RK', 'DH', 'LT'][i]}`,
    rating: [5, 4, 5, 5, 4, 3][i],
    date: `2024-0${i + 1}-${10 + i}`,
    text: [
      'Barang sesuai deskripsi, pengiriman cepat! Sangat recommended seller ini.',
      'Kualitas bagus untuk harganya. Packing aman sampai tujuan.',
      'Mantap! Sudah repeat order ke-3 kalinya. Tidak pernah mengecewakan.',
      'Produk original, respon seller cepat. Terima kasih!',
      'Barangnya ok, tapi pengiriman agak lama. Overall puas.',
      'Lumayan lah untuk harga segitu. Bisa lebih baik sih packingnya.'
    ][i],
    likes: Math.floor(Math.random() * 50) + 5,
  }));

  const ratingDistribution = [
    { stars: 5, count: Math.floor(product.reviews * 0.6) },
    { stars: 4, count: Math.floor(product.reviews * 0.25) },
    { stars: 3, count: Math.floor(product.reviews * 0.1) },
    { stars: 2, count: Math.floor(product.reviews * 0.03) },
    { stars: 1, count: Math.floor(product.reviews * 0.02) },
  ];

  return (
    <div className="pdp" id="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="pdp-breadcrumb">
          <Link to="/">Shopee</Link>
          <span>›</span>
          <Link to={`/search?category=${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span className="pdp-breadcrumb__current">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="pdp-main">
          {/* Gallery */}
          <div className="pdp-gallery" id="product-gallery">
            <div className="pdp-gallery__main">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="pdp-gallery__main-image"
              />
              {product.discount > 0 && (
                <div className="pdp-gallery__discount">{product.discount}% OFF</div>
              )}
            </div>
            <div className="pdp-gallery__thumbs">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`pdp-gallery__thumb ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pdp-info" id="product-info">
            {/* Badges */}
            <div className="pdp-info__badges">
              {product.badge && (
                <span className={`pdp-badge pdp-badge--${product.badge.toLowerCase()}`}>
                  {product.badge === 'Mall' ? '🏬 Mall' : '⭐ Star+'}
                </span>
              )}
              {product.freeShipping && (
                <span className="pdp-badge pdp-badge--shipping">🚚 Gratis Ongkir</span>
              )}
            </div>

            <h1 className="pdp-info__title">{product.name}</h1>

            <div className="pdp-info__stats">
              <div className="pdp-info__rating">
                <span className="pdp-info__rating-score">{product.rating}</span>
                <div className="stars">{renderStars(product.rating)}</div>
              </div>
              <span className="pdp-info__stat-divider">|</span>
              <span className="pdp-info__stat">{formatSold(product.reviews)} Penilaian</span>
              <span className="pdp-info__stat-divider">|</span>
              <span className="pdp-info__stat">{formatSold(product.sold)} Terjual</span>
            </div>

            {/* Price */}
            <div className="pdp-price">
              <span className="pdp-price__current">Rp{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="pdp-price__original">Rp{formatPrice(product.originalPrice)}</span>
                  <span className="pdp-price__discount">{product.discount}% OFF</span>
                </>
              )}
            </div>

            {/* Shipping */}
            <div className="pdp-row">
              <span className="pdp-row__label">Pengiriman</span>
              <div className="pdp-row__content">
                <div className="pdp-shipping">
                  <span className="pdp-shipping__icon">🚚</span>
                  <div>
                    <div className="pdp-shipping__free">Gratis Ongkir</div>
                    <div className="pdp-shipping__est">Estimasi tiba 3-5 hari</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variants */}
            {product.variants.map((variant, vIndex) => (
              <div className="pdp-row" key={vIndex}>
                <span className="pdp-row__label">{variant.name}</span>
                <div className="pdp-row__content">
                  <div className="pdp-variants">
                    {variant.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        className={`pdp-variant-btn ${
                          selectedVariants[variant.name] === option ? 'active' : ''
                        }`}
                        onClick={() =>
                          setSelectedVariants({ ...selectedVariants, [variant.name]: option })
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="pdp-row">
              <span className="pdp-row__label">Jumlah</span>
              <div className="pdp-row__content">
                <div className="pdp-quantity">
                  <button
                    className="pdp-quantity__btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="pdp-quantity__input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    min="1"
                    max={product.stock}
                  />
                  <button
                    className="pdp-quantity__btn"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                  <span className="pdp-quantity__stock">
                    {product.stock} tersedia
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pdp-actions">
              <button className="pdp-actions__cart" id="add-to-cart-btn">
                <span>🛒</span> Tambah ke Keranjang
              </button>
              <button className="pdp-actions__buy" id="buy-now-btn">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <div className="pdp-shop" id="shop-info">
          <div className="pdp-shop__main">
            <img src={shop.avatar} alt={shop.name} className="pdp-shop__avatar" />
            <div className="pdp-shop__details">
              <h3 className="pdp-shop__name">{shop.name}</h3>
              <span className="pdp-shop__status">Online 3 menit lalu</span>
              <div className="pdp-shop__badges">
                {shop.badge && (
                  <span className={`pdp-badge pdp-badge--${shop.badge.toLowerCase()}`}>
                    {shop.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="pdp-shop__actions">
              <button className="pdp-shop__btn pdp-shop__btn--chat">💬 Chat Sekarang</button>
              <button className="pdp-shop__btn pdp-shop__btn--visit">
                <Link to="/">Kunjungi Toko</Link>
              </button>
            </div>
          </div>
          <div className="pdp-shop__stats">
            <div className="pdp-shop__stat">
              <span className="pdp-shop__stat-label">Penilaian</span>
              <span className="pdp-shop__stat-value">{shop.rating}</span>
            </div>
            <div className="pdp-shop__stat">
              <span className="pdp-shop__stat-label">Produk</span>
              <span className="pdp-shop__stat-value">{shop.products}</span>
            </div>
            <div className="pdp-shop__stat">
              <span className="pdp-shop__stat-label">Respon</span>
              <span className="pdp-shop__stat-value">{shop.responseRate}%</span>
            </div>
            <div className="pdp-shop__stat">
              <span className="pdp-shop__stat-label">Waktu Respon</span>
              <span className="pdp-shop__stat-value">{shop.responseTime}</span>
            </div>
            <div className="pdp-shop__stat">
              <span className="pdp-shop__stat-label">Bergabung</span>
              <span className="pdp-shop__stat-value">{shop.joined}</span>
            </div>
            <div className="pdp-shop__stat">
              <span className="pdp-shop__stat-label">Pengikut</span>
              <span className="pdp-shop__stat-value">{formatSold(shop.followers)}</span>
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div className="pdp-tabs" id="product-tabs">
          <div className="pdp-tabs__header">
            <button
              className={`pdp-tabs__tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Deskripsi Produk
            </button>
            <button
              className={`pdp-tabs__tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Penilaian ({product.reviews})
            </button>
          </div>

          <div className="pdp-tabs__content">
            {activeTab === 'description' && (
              <div className="pdp-description animate-fade-in">
                <div className="pdp-description__specs">
                  <h3>Spesifikasi Produk</h3>
                  <table className="pdp-specs-table">
                    <tbody>
                      <tr><td>Kategori</td><td>{product.category}</td></tr>
                      <tr><td>Stok</td><td>{product.stock}</td></tr>
                      <tr><td>Dikirim Dari</td><td>{product.location}</td></tr>
                      {product.variants.map((v, i) => (
                        <tr key={i}><td>{v.name}</td><td>{v.options.join(', ')}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pdp-description__text">
                  <h3>Deskripsi Produk</h3>
                  <p>{product.description}</p>
                  <p style={{ marginTop: '16px' }}>
                    ✅ Original 100% Garansi Resmi<br />
                    ✅ Pengiriman Cepat ke Seluruh Indonesia<br />
                    ✅ Bisa COD (Bayar di Tempat)<br />
                    ✅ Free Bubble Wrap + Packing Aman<br />
                    ✅ Customer Service 24 Jam
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="pdp-reviews animate-fade-in">
                {/* Rating Summary */}
                <div className="pdp-reviews__summary">
                  <div className="pdp-reviews__score">
                    <span className="pdp-reviews__score-num">{product.rating}</span>
                    <span className="pdp-reviews__score-max">dari 5</span>
                    <div className="stars" style={{ fontSize: '20px' }}>
                      {renderStars(product.rating)}
                    </div>
                  </div>
                  <div className="pdp-reviews__bars">
                    {ratingDistribution.map((item) => (
                      <div key={item.stars} className="pdp-reviews__bar-row">
                        <span className="pdp-reviews__bar-label">
                          {item.stars} <span className="star">★</span>
                        </span>
                        <div className="pdp-reviews__bar-track">
                          <div
                            className="pdp-reviews__bar-fill"
                            style={{
                              width: `${(item.count / product.reviews) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="pdp-reviews__bar-count">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review List */}
                <div className="pdp-reviews__list">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="pdp-review">
                      <img src={review.avatar} alt={review.user} className="pdp-review__avatar" />
                      <div className="pdp-review__content">
                        <span className="pdp-review__user">{review.user}</span>
                        <div className="stars" style={{ fontSize: '12px' }}>
                          {renderStars(review.rating)}
                        </div>
                        <span className="pdp-review__date">{review.date}</span>
                        <p className="pdp-review__text">{review.text}</p>
                        <button className="pdp-review__like">
                          👍 Membantu ({review.likes})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="pdp-similar" id="similar-products">
            <div className="section-title">
              <h2>PRODUK SERUPA</h2>
            </div>
            <hr className="section-divider" />
            <div className="pdp-similar__grid">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
