import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import './ProductListPage.css';

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categorySlug = searchParams.get('category') || '';

  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Tangerang', 'Bekasi', 'Yogyakarta', 'Semarang', 'Medan'];

  const toggleLocation = (loc) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (query) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (categorySlug) {
      result = result.filter((p) => p.category === categorySlug);
    }

    if (priceRange.min) {
      result = result.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter((p) => p.price <= Number(priceRange.max));
    }

    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    if (selectedLocations.length > 0) {
      result = result.filter((p) =>
        selectedLocations.some((loc) => p.location.includes(loc))
      );
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'sales':
        result.sort((a, b) => b.sold - a.sold);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.rating * b.sold - a.rating * a.sold);
    }

    return result;
  }, [query, categorySlug, sortBy, priceRange, selectedRating, selectedLocations]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const currentCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="product-list-page" id="product-list-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="plp-breadcrumb">
          <span>Shopee</span>
          <span className="plp-breadcrumb__sep">›</span>
          {currentCategory ? (
            <span className="plp-breadcrumb__current">{currentCategory.name}</span>
          ) : query ? (
            <span className="plp-breadcrumb__current">
              Hasil pencarian untuk &ldquo;{query}&rdquo;
            </span>
          ) : (
            <span className="plp-breadcrumb__current">Semua Produk</span>
          )}
        </div>

        <div className="plp-layout">
          {/* Sidebar Filters */}
          <aside className="plp-sidebar" id="search-filters">
            <div className="plp-filter">
              <h3 className="plp-filter__title">
                <span>☰</span> Semua Kategori
              </h3>
              <div className="plp-filter__list">
                {categories.slice(0, 12).map((cat) => (
                  <a
                    key={cat.id}
                    href={`/search?category=${cat.slug}`}
                    className={`plp-filter__item ${cat.slug === categorySlug ? 'active' : ''}`}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="plp-filter">
              <h3 className="plp-filter__title">Lokasi</h3>
              <div className="plp-filter__list">
                {locations.map((loc) => (
                  <label key={loc} className="plp-filter__checkbox">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggleLocation(loc)}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="plp-filter">
              <h3 className="plp-filter__title">Khoảng Giá / Rentang Harga</h3>
              <div className="plp-filter__price">
                <input
                  type="number"
                  placeholder="Rp MIN"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="plp-filter__price-input"
                />
                <span className="plp-filter__price-sep">—</span>
                <input
                  type="number"
                  placeholder="Rp MAX"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="plp-filter__price-input"
                />
              </div>
              <button
                className="plp-filter__apply-btn"
                onClick={() => setCurrentPage(1)}
              >
                Terapkan
              </button>
            </div>

            <div className="plp-filter">
              <h3 className="plp-filter__title">Rating</h3>
              <div className="plp-filter__list">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    className={`plp-filter__rating ${selectedRating === star ? 'active' : ''}`}
                    onClick={() => setSelectedRating(selectedRating === star ? 0 : star)}
                  >
                    <span className="stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`star ${i < star ? '' : 'empty'}`}>★</span>
                      ))}
                    </span>
                    {star < 5 && <span>& Up</span>}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="plp-content">
            {/* Sort Bar */}
            <div className="plp-sort-bar" id="sort-bar">
              <span className="plp-sort-bar__label">Urutkan</span>
              <div className="plp-sort-bar__buttons">
                {[
                  { key: 'popular', label: 'Populer' },
                  { key: 'newest', label: 'Terbaru' },
                  { key: 'sales', label: 'Terlaris' },
                ].map((sort) => (
                  <button
                    key={sort.key}
                    className={`plp-sort-bar__btn ${sortBy === sort.key ? 'active' : ''}`}
                    onClick={() => setSortBy(sort.key)}
                  >
                    {sort.label}
                  </button>
                ))}
                <select
                  className="plp-sort-bar__select"
                  value={sortBy.startsWith('price') ? sortBy : ''}
                  onChange={(e) => e.target.value && setSortBy(e.target.value)}
                >
                  <option value="">Harga</option>
                  <option value="price-asc">Harga: Rendah ke Tinggi</option>
                  <option value="price-desc">Harga: Tinggi ke Rendah</option>
                </select>
              </div>
              <div className="plp-sort-bar__page">
                <span>{currentPage}/{totalPages || 1}</span>
                <div className="plp-sort-bar__page-btns">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    ‹
                  </button>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {paginatedProducts.length > 0 ? (
              <div className="plp-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="plp-empty">
                <span className="plp-empty__icon">🔍</span>
                <h3>Tidak ada hasil ditemukan</h3>
                <p>Coba kata kunci lain atau kurangi filter</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="plp-pagination">
                <button
                  className="plp-pagination__btn"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ‹
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      className={`plp-pagination__btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="plp-pagination__dots">...</span>}
                <button
                  className="plp-pagination__btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
