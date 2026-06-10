import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const searchSuggestions = [
    'samsung galaxy s24', 'iphone 15 pro', 'skincare korea',
    'sepatu nike', 'hoodie pria', 'tas wanita', 'airpods',
    'keyboard mechanical', 'vitamin c', 'gamis wanita'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header" id="main-header">
      {/* Top Bar */}
      <div className="header__top">
        <div className="container header__top-inner">
          <div className="header__top-left">
            <Link to="/" className="header__top-link">Seller Centre</Link>
            <span className="header__top-divider">|</span>
            <span className="header__top-link header__download">
              Download
              <span className="header__download-tooltip">
                <div className="header__qr-placeholder">
                  <span>📱</span>
                  <p>Scan QR untuk Download</p>
                </div>
              </span>
            </span>
            <span className="header__top-divider">|</span>
            <span className="header__top-link">Ikuti kami di</span>
            <div className="header__social">
              <a href="#" className="header__social-icon" aria-label="Facebook">f</a>
              <a href="#" className="header__social-icon" aria-label="Instagram">📷</a>
              <a href="#" className="header__social-icon" aria-label="Twitter">𝕏</a>
            </div>
          </div>
          <div className="header__top-right">
            <div
              className="header__top-link header__notifications-trigger"
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <span className="header__icon">🔔</span>
              Notifikasi
              {showNotifications && (
                <div className="header__dropdown animate-fade-in-down">
                  <div className="header__dropdown-empty">
                    <span className="header__dropdown-empty-icon">📭</span>
                    <p>Belum ada notifikasi</p>
                  </div>
                </div>
              )}
            </div>
            <Link to="/" className="header__top-link">
              <span className="header__icon">❓</span>
              Bantuan
            </Link>
            <div className="header__top-link header__lang">
              🌐 Bahasa Indonesia
            </div>
            <span className="header__top-divider">|</span>
            <Link to="/login" className="header__top-link header__auth">Daftar</Link>
            <span className="header__top-divider">|</span>
            <Link to="/login" className="header__top-link header__auth">Log In</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="header__main">
        <div className="container header__main-inner">
          {/* Logo */}
          <Link to="/" className="header__logo" id="shopee-logo">
            <svg viewBox="0 0 192 65" className="header__logo-svg">
              <g fillRule="evenodd">
                <path d="M35.6717403 44.953764c-.3333497 2.7510509-2.0003116 4.9543414-4.5823845 6.0575984-1.4379707.6145919-3.36871.8840712-5.0718203.8840712-2.4344238 0-4.485359-.4190757-5.7471943-1.1184406-2.1740753-1.209498-3.2811398-3.0221498-3.2811398-5.4001108v-.4750645h3.612355v.1250171c0 2.4343237 2.1740753 3.7175512 6.2782016 3.7175512 3.1441494 0 5.1893267-.9777479 5.5826947-2.6707587.2430956-.9777479.0060024-1.7947578-.7009889-2.5437007-.3503519-.3820715-.5765457-.5765457-.7860218-.6145965l-.3533196-.0760728-2.4523236-.760728-.4180476-.1370214-2.1270682-.6666395-2.0923603-.7450428c-2.8479886-1.0307401-4.5765419-1.8657556-5.4852422-2.7510509-1.8567537-1.8177517-2.4163195-4.2797379-1.4749665-6.5306407 1.2034425-2.8869906 4.0634342-4.6795402 7.4895338-4.6795402 4.0454286 0 7.2845752 1.6520089 8.5765347 4.3907265l.085026.1790193h-3.7595469l-.1660169-.1550129c-1.1754353-1.0817329-3.0891335-1.6160053-5.3941832-1.6160053-2.7360534 0-4.7622219 1.1184406-5.0718203 2.8270017-.2281008 1.2615107.5765457 2.3869538 2.3509443 3.2802512.7380034.3690679 1.5765458.6736105 3.0491137 1.1514493l2.5765429.8510627 2.7360534.9207391c2.6880476 1.0487444 4.1366212 1.7167536 5.0513213 2.5797095 1.1344333 1.0667359 1.7290024 2.5077157 1.6470025 3.9947013zM73.8830584 27h-3.632658l-.7570024 2.5316386h-4.5765419L70.0185955 44.0312463 64.0595535 27H60.160625l8.4885328 23.7491671h3.720062zm-14.9348659 14.9999757h-3.5765453v8.7508243h-3.5085435V27h7.0850888c5.0693208 0 7.6230223 2.4432846 7.6230223 6.4391096 0 3.7415585-2.5765429 6.2108732-7.6230223 6.5608661zm-.1360158-10.4999842h-3.4405276v7.0599929h3.4405276c2.7720581 0 4.131621-1.2285032 4.131621-3.6259987 0-2.2114928-1.3595629-3.4339942-4.131621-3.4339942zm46.8655858 3.5000085H96.960741v7.9999834h8.7173644v3.4999914H96.960741v8.0000243h9.7163853V53.5h-13.2249288V27h13.2249288v3.5000085h-.0000085zM112.560741 53.5V27h13.224929v3.5000085h-9.7163853v7.9999834h8.7173645v3.4999914h-8.7173645v8.0000243h9.7163853V53.5h-13.224929z" fill="#FFFFFF"></path>
              </g>
            </svg>
            <span className="header__logo-text">Shopoku</span>
          </Link>

          {/* Search */}
          <div className="header__search" ref={searchRef}>
            <form className="header__search-form" onSubmit={handleSearch}>
              <div className={`header__search-input-wrap ${isSearchFocused ? 'focused' : ''}`}>
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Cari di Shopoku"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  id="search-input"
                />
                <button type="submit" className="header__search-btn" id="search-button">
                  <svg width="19" height="19" viewBox="0 0 19 19">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-1016, -32)" fill="#FFFFFF" fillRule="nonzero">
                        <g transform="translate(405, 21)">
                          <g transform="translate(611, 11)">
                            <path d="M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z M8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 Z"></path>
                            <path d="M11.6568542,13.0710678 L17.3137085,18.7279221" strokeWidth="2" stroke="#FFFFFF" strokeLinecap="round"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>

              {/* Search Suggestions */}
              {isSearchFocused && (
                <div className="header__search-suggestions animate-fade-in-down">
                  <div className="header__search-suggestions-title">Pencarian Populer</div>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className="header__search-suggestion-item"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                        setIsSearchFocused(false);
                      }}
                    >
                      <span className="header__search-suggestion-icon">🔍</span>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </form>

            <div className="header__search-tags">
              {['Flash Sale 6.6', 'Gratis Ongkir', 'ShopeePay', 'Voucher', 'iPhone 15'].map((tag, i) => (
                <Link to={`/search?q=${tag}`} key={i} className="header__search-tag">{tag}</Link>
              ))}
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="header__cart" id="cart-button">
            <svg width="26" height="26" viewBox="0 0 26.6 25.6" fill="white">
              <polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" stroke="white"></polyline>
              <circle cx="10.7" cy="23" r="2.2" stroke="white" strokeWidth="1.5"></circle>
              <circle cx="19.7" cy="23" r="2.2" stroke="white" strokeWidth="1.5"></circle>
            </svg>
            {cartCount > 0 && (
              <span className="header__cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
