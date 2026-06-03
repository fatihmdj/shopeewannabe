import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './CartPage.css';

const CartPage = () => {
  // Mock cart items grouped by shop
  const initialCart = [
    {
      shopId: 1, shopName: 'TechZone Official', shopBadge: 'Mall',
      items: [
        { ...products[0], quantity: 1, selected: true },
        { ...products[4], quantity: 2, selected: true },
      ],
    },
    {
      shopId: 3, shopName: 'Fashion Hub ID', shopBadge: null,
      items: [
        { ...products[10], quantity: 3, selected: false },
        { ...products[11], quantity: 1, selected: true },
      ],
    },
  ];

  const [cart, setCart] = useState(initialCart);

  const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

  const toggleSelectAll = () => {
    const allSelected = cart.every((shop) => shop.items.every((item) => item.selected));
    setCart(cart.map((shop) => ({
      ...shop,
      items: shop.items.map((item) => ({ ...item, selected: !allSelected })),
    })));
  };

  const toggleShop = (shopId) => {
    setCart(cart.map((shop) => {
      if (shop.shopId === shopId) {
        const allSelected = shop.items.every((i) => i.selected);
        return { ...shop, items: shop.items.map((i) => ({ ...i, selected: !allSelected })) };
      }
      return shop;
    }));
  };

  const toggleItem = (shopId, productId) => {
    setCart(cart.map((shop) => {
      if (shop.shopId === shopId) {
        return {
          ...shop,
          items: shop.items.map((i) =>
            i.id === productId ? { ...i, selected: !i.selected } : i
          ),
        };
      }
      return shop;
    }));
  };

  const updateQuantity = (shopId, productId, delta) => {
    setCart(cart.map((shop) => {
      if (shop.shopId === shopId) {
        return {
          ...shop,
          items: shop.items.map((i) =>
            i.id === productId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
          ),
        };
      }
      return shop;
    }));
  };

  const removeItem = (shopId, productId) => {
    setCart(cart.map((shop) => {
      if (shop.shopId === shopId) {
        return { ...shop, items: shop.items.filter((i) => i.id !== productId) };
      }
      return shop;
    }).filter((shop) => shop.items.length > 0));
  };

  const selectedItems = cart.flatMap((shop) => shop.items.filter((i) => i.selected));
  const totalItems = selectedItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalSavings = selectedItems.reduce(
    (sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0
  );
  const allSelected = cart.length > 0 && cart.every((s) => s.items.every((i) => i.selected));

  return (
    <div className="cart-page" id="cart-page">
      <div className="container">
        <h1 className="cart-page__title">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty__icon">🛒</span>
            <h3>Keranjang belanja Anda kosong</h3>
            <p>Yuk, cari produk impianmu!</p>
            <Link to="/" className="cart-empty__btn">Mulai Belanja</Link>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="cart-header">
              <label className="cart-checkbox">
                <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                <span>Produk</span>
              </label>
              <span className="cart-header__col">Harga Satuan</span>
              <span className="cart-header__col">Kuantitas</span>
              <span className="cart-header__col">Total Harga</span>
              <span className="cart-header__col cart-header__col--action">Aksi</span>
            </div>

            {/* Shop Groups */}
            {cart.map((shop) => (
              <div key={shop.shopId} className="cart-shop">
                <div className="cart-shop__header">
                  <label className="cart-checkbox">
                    <input
                      type="checkbox"
                      checked={shop.items.every((i) => i.selected)}
                      onChange={() => toggleShop(shop.shopId)}
                    />
                    <span className="cart-shop__name">
                      {shop.shopBadge && (
                        <span className={`cart-shop__badge cart-shop__badge--${shop.shopBadge.toLowerCase()}`}>
                          {shop.shopBadge}
                        </span>
                      )}
                      {shop.shopName}
                    </span>
                  </label>
                </div>

                {shop.items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item__product">
                      <label className="cart-checkbox">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleItem(shop.shopId, item.id)}
                        />
                      </label>
                      <Link to={`/product/${item.id}`} className="cart-item__image-link">
                        <img src={item.image} alt={item.name} className="cart-item__image" />
                      </Link>
                      <div className="cart-item__details">
                        <Link to={`/product/${item.id}`} className="cart-item__name line-clamp-2">
                          {item.name}
                        </Link>
                        {item.variants.length > 0 && (
                          <span className="cart-item__variant">
                            Variasi: {item.variants[0].options[0]}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="cart-item__price">
                      {item.originalPrice > item.price && (
                        <span className="cart-item__price-original">
                          Rp{formatPrice(item.originalPrice)}
                        </span>
                      )}
                      <span className="cart-item__price-current">
                        Rp{formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="cart-item__quantity">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(shop.shopId, item.id, -1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(shop.shopId, item.id, 1)}
                      >+</button>
                    </div>
                    <div className="cart-item__total">
                      <span className="cart-item__total-price">
                        Rp{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <div className="cart-item__actions">
                      <button
                        className="cart-item__delete"
                        onClick={() => removeItem(shop.shopId, item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Summary Bar */}
            <div className="cart-summary" id="cart-summary">
              <label className="cart-checkbox cart-summary__select-all">
                <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                <span>Pilih Semua ({cart.flatMap(s => s.items).length})</span>
              </label>
              <button className="cart-summary__delete">Hapus</button>
              <div className="cart-summary__right">
                {totalSavings > 0 && (
                  <div className="cart-summary__savings">
                    Hemat Rp{formatPrice(totalSavings)}
                  </div>
                )}
                <div className="cart-summary__total">
                  <span className="cart-summary__total-label">
                    Total ({totalItems} Produk):
                  </span>
                  <span className="cart-summary__total-price">
                    Rp{formatPrice(totalPrice)}
                  </span>
                </div>
                <Link to="/checkout" className="cart-summary__checkout-btn" id="checkout-btn">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
