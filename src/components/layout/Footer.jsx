import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'LAYANAN PELANGGAN',
      links: ['Bantuan', 'Shopee Blog', 'Shopee Mall', 'Cara Belanja', 'Cara Jual', 'Pembayaran', 'ShopeePay', 'Koin Shopee', 'Gratis Ongkir', 'Pengembalian Barang', 'Garansi Shopee', 'Hubungi Kami'],
    },
    {
      title: 'JELAJAHI SHOPEE',
      links: ['Tentang Kami', 'Karir', 'Kebijakan Shopee', 'Kebijakan Privasi', 'Flash Sale', 'Seller Centre', 'Shopee Affiliate', 'Media', 'Shopee Barokah'],
    },
    {
      title: 'PEMBAYARAN',
      badges: ['BCA', 'Mandiri', 'BNI', 'BRI', 'OVO', 'DANA', 'GoPay', 'ShopeePay'],
    },
    {
      title: 'PENGIRIMAN',
      badges: ['JNE', 'J&T', 'SiCepat', 'Anteraja', 'Ninja', 'ID Express', 'Pos Indonesia', 'Grab'],
    },
    {
      title: 'IKUTI KAMI',
      social: [
        { name: 'Facebook', icon: 'f' },
        { name: 'Instagram', icon: '📷' },
        { name: 'Twitter', icon: '𝕏' },
        { name: 'LinkedIn', icon: 'in' },
      ],
    },
  ];

  return (
    <footer className="footer" id="main-footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {footerSections.map((section, index) => (
            <div key={index} className="footer__section">
              <h3 className="footer__section-title">{section.title}</h3>

              {section.links && (
                <ul className="footer__links">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to="/" className="footer__link">{link}</Link>
                    </li>
                  ))}
                </ul>
              )}

              {section.badges && (
                <div className="footer__badges">
                  {section.badges.map((badge, i) => (
                    <div key={i} className="footer__badge">
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.social && (
                <div className="footer__social-list">
                  {section.social.map((social, i) => (
                    <a key={i} href="#" className="footer__social-item">
                      <span className="footer__social-icon">{social.icon}</span>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__copyright">
            <span>© 2024 Shopee Clone.</span>
            <span>Proyek Reverse Engineering untuk tujuan edukasi.</span>
          </div>
          <div className="footer__country">
            <span>Negara: 🇮🇩 Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
