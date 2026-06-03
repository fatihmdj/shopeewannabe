import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('shopeepay');
  const [voucherCode, setVoucherCode] = useState('');

  const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

  // Mock checkout items
  const checkoutItems = [
    {
      shopName: 'TechZone Official', shopBadge: 'Mall',
      items: [
        { ...products[0], quantity: 1 },
        { ...products[4], quantity: 2 },
      ],
      shippingOption: 'J&T Express',
      shippingCost: 0,
      shippingEstimate: '3-5 hari',
    },
  ];

  const subtotal = checkoutItems.reduce(
    (sum, shop) => sum + shop.items.reduce((s, i) => s + i.price * i.quantity, 0), 0
  );
  const shippingTotal = checkoutItems.reduce((sum, shop) => sum + shop.shippingCost, 0);
  const total = subtotal + shippingTotal;

  const paymentMethods = [
    { id: 'shopeepay', name: 'ShopeePay', icon: '💳', desc: 'Saldo: Rp500.000' },
    { id: 'cod', name: 'COD (Bayar di Tempat)', icon: '💵', desc: 'Bayar saat terima' },
    { id: 'transfer', name: 'Transfer Bank', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
    { id: 'va', name: 'Virtual Account', icon: '📱', desc: 'Otomatis terverifikasi' },
    { id: 'cc', name: 'Kartu Kredit/Debit', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'indomaret', name: 'Indomaret / Alfamart', icon: '🏪', desc: 'Bayar di gerai' },
  ];

  return (
    <div className="checkout-page" id="checkout-page">
      <div className="container">
        <h1 className="checkout-page__title">Checkout</h1>

        {/* Address */}
        <div className="checkout-section checkout-address" id="shipping-address">
          <div className="checkout-address__header">
            <span className="checkout-address__icon">📍</span>
            <h2>Alamat Pengiriman</h2>
          </div>
          <div className="checkout-address__content">
            <div className="checkout-address__info">
              <span className="checkout-address__name">Fatih (+62 812-xxxx-xxxx)</span>
              <p className="checkout-address__detail">
                Jl. Contoh Alamat No. 123, RT 01/RW 02, Kelurahan Contoh, Kecamatan Contoh, Jakarta Selatan, DKI Jakarta, 12345
              </p>
              <span className="checkout-address__tag">Default</span>
            </div>
            <button className="checkout-address__change">Ubah</button>
          </div>
          <div className="checkout-address__stripe"></div>
        </div>

        {/* Order Items */}
        {checkoutItems.map((shop, index) => (
          <div key={index} className="checkout-section checkout-order">
            <div className="checkout-order__shop">
              {shop.shopBadge && (
                <span className="checkout-order__badge">{shop.shopBadge}</span>
              )}
              <span className="checkout-order__shop-name">{shop.shopName}</span>
              <button className="checkout-order__chat">💬 Chat</button>
            </div>

            {shop.items.map((item) => (
              <div key={item.id} className="checkout-order__item">
                <img src={item.image} alt={item.name} className="checkout-order__image" />
                <div className="checkout-order__details">
                  <span className="checkout-order__name line-clamp-2">{item.name}</span>
                  {item.variants.length > 0 && (
                    <span className="checkout-order__variant">
                      Variasi: {item.variants[0].options[0]}
                    </span>
                  )}
                </div>
                <span className="checkout-order__price">Rp{formatPrice(item.price)}</span>
                <span className="checkout-order__qty">x{item.quantity}</span>
                <span className="checkout-order__subtotal">
                  Rp{formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="checkout-order__shipping">
              <span className="checkout-order__shipping-label">Opsi Pengiriman:</span>
              <div className="checkout-order__shipping-info">
                <span className="checkout-order__shipping-method">
                  🚚 {shop.shippingOption}
                </span>
                <span className="checkout-order__shipping-est">
                  Estimasi tiba {shop.shippingEstimate}
                </span>
              </div>
              <span className="checkout-order__shipping-cost">
                {shop.shippingCost === 0 ? (
                  <span className="checkout-order__free-ship">GRATIS</span>
                ) : (
                  `Rp${formatPrice(shop.shippingCost)}`
                )}
              </span>
            </div>

            <div className="checkout-order__total">
              <span>Total Pesanan ({shop.items.reduce((s, i) => s + i.quantity, 0)} Produk):</span>
              <span className="checkout-order__total-price">
                Rp{formatPrice(shop.items.reduce((s, i) => s + i.price * i.quantity, 0))}
              </span>
            </div>
          </div>
        ))}

        {/* Voucher */}
        <div className="checkout-section checkout-voucher" id="voucher-section">
          <div className="checkout-voucher__header">
            <span>🎫</span>
            <h2>Voucher Shopee</h2>
          </div>
          <div className="checkout-voucher__input-wrap">
            <input
              type="text"
              placeholder="Masukkan kode voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="checkout-voucher__input"
            />
            <button className="checkout-voucher__apply">Terapkan</button>
          </div>
        </div>

        {/* Payment */}
        <div className="checkout-section checkout-payment" id="payment-section">
          <h2 className="checkout-payment__title">Metode Pembayaran</h2>
          <div className="checkout-payment__methods">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`checkout-payment__method ${selectedPayment === method.id ? 'active' : ''}`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <span className="checkout-payment__method-icon">{method.icon}</span>
                <div className="checkout-payment__method-info">
                  <span className="checkout-payment__method-name">{method.name}</span>
                  <span className="checkout-payment__method-desc">{method.desc}</span>
                </div>
                {selectedPayment === method.id && (
                  <span className="checkout-payment__method-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="checkout-section checkout-summary-section" id="order-summary">
          <div className="checkout-summary__rows">
            <div className="checkout-summary__row">
              <span>Subtotal Produk</span>
              <span>Rp{formatPrice(subtotal)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Total Ongkos Kirim</span>
              <span>{shippingTotal === 0 ? 'GRATIS' : `Rp${formatPrice(shippingTotal)}`}</span>
            </div>
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Total Pembayaran</span>
              <span className="checkout-summary__total-price">
                Rp{formatPrice(total)}
              </span>
            </div>
          </div>
          <div className="checkout-summary__action">
            <p className="checkout-summary__terms">
              Dengan mengklik &ldquo;Buat Pesanan&rdquo;, Anda menyetujui
              <a href="#"> Syarat & Ketentuan</a> Shopee
            </p>
            <button className="checkout-summary__order-btn" id="place-order-btn">
              Buat Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
