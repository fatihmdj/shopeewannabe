import { useState } from 'react';
import ProductCard from '../product/ProductCard';
import { dailyDiscoverProducts } from '../../data/products';
import './ProductGrid.css';

const ProductGrid = () => {
  const [visibleCount, setVisibleCount] = useState(30);
  const productsToShow = dailyDiscoverProducts.slice(0, visibleCount);
  const hasMore = visibleCount < dailyDiscoverProducts.length;

  return (
    <section className="product-grid-section" id="daily-discover">
      <div className="container">
        <div className="product-grid-section__header">
          <h2 className="product-grid-section__title">REKOMENDASI HARIAN</h2>
        </div>
        <hr className="section-divider" />

        <div className="product-grid">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="product-grid-section__load-more">
            <button
              className="product-grid-section__load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 12)}
              id="load-more-btn"
            >
              Lihat Lagi
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
