import './ShopeeFeatures.css';

const ShopeeFeatures = () => {
  const features = [
    { icon: '🚚', label: 'Gratis Ongkir', sublabel: 'Min. Rp0', color: '#00BFA5' },
    { icon: '💳', label: 'ShopeePay', sublabel: 'Cashback 100%', color: '#FF6633' },
    { icon: '🎫', label: 'Voucher Diskon', sublabel: 'Ekstra hemat', color: '#D0011B' },
    { icon: '🏬', label: 'Shopee Mall', sublabel: '100% Original', color: '#EE4D2D' },
    { icon: '🌟', label: 'Star Seller', sublabel: 'Toko terpercaya', color: '#FFBB00' },
    { icon: '↩️', label: 'Return Gratis', sublabel: '15 hari', color: '#0984E3' },
    { icon: '✅', label: 'Garansi Shopee', sublabel: 'Uang kembali', color: '#00B894' },
    { icon: '📦', label: 'COD', sublabel: 'Bayar di tempat', color: '#6C5CE7' },
  ];

  return (
    <section className="shopee-features" id="shopee-features">
      <div className="container">
        <div className="shopee-features__grid">
          {features.map((feature, index) => (
            <div key={index} className="shopee-features__item">
              <div
                className="shopee-features__icon"
                style={{ background: `${feature.color}12` }}
              >
                <span>{feature.icon}</span>
              </div>
              <div className="shopee-features__text">
                <span className="shopee-features__label">{feature.label}</span>
                <span className="shopee-features__sublabel">{feature.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopeeFeatures;
