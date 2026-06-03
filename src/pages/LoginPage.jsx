import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState('phone'); // phone, email, qr
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    alert(isLogin ? 'Login berhasil! (Mock)' : 'Registrasi berhasil! (Mock)');
  };

  return (
    <div className="auth-page" id="auth-page">
      <div className="auth-page__inner">
        {/* Left — Branding */}
        <div className="auth-brand">
          <div className="auth-brand__content">
            <div className="auth-brand__logo">
              <span className="auth-brand__logo-text">Shopee</span>
            </div>
            <h2 className="auth-brand__tagline">
              Jual Beli Online Terpercaya
            </h2>
            <p className="auth-brand__subtitle">
              Platform e-commerce terdepan di Asia Tenggara & Taiwan
            </p>
            <div className="auth-brand__features">
              <div className="auth-brand__feature">
                <span>🛡️</span>
                <span>Garansi Shopee — Uang dijamin kembali</span>
              </div>
              <div className="auth-brand__feature">
                <span>🚚</span>
                <span>Gratis Ongkir ke seluruh Indonesia</span>
              </div>
              <div className="auth-brand__feature">
                <span>💰</span>
                <span>Voucher diskon setiap hari</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-card__header">
              <h1>{isLogin ? 'Log In' : 'Daftar'}</h1>
              {isLogin && (
                <div className="auth-card__tabs">
                  <button
                    className={`auth-tab ${loginMethod === 'phone' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('phone')}
                  >
                    SMS
                  </button>
                  <button
                    className={`auth-tab ${loginMethod === 'email' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email
                  </button>
                  <button
                    className={`auth-tab ${loginMethod === 'qr' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('qr')}
                  >
                    QR Code
                  </button>
                </div>
              )}
            </div>

            {loginMethod === 'qr' && isLogin ? (
              <div className="auth-qr">
                <div className="auth-qr__code">
                  <div className="auth-qr__placeholder">
                    <span>📱</span>
                    <div className="auth-qr__grid">
                      {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="auth-qr__cell"></div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="auth-qr__instruction">
                  Scan QR code dengan aplikasi Shopee untuk login
                </p>
                <ol className="auth-qr__steps">
                  <li>Buka aplikasi <strong>Shopee</strong></li>
                  <li>Tap ikon <strong>Scan</strong> di pojok kanan atas</li>
                  <li>Arahkan kamera ke QR code ini</li>
                </ol>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit}>
                {loginMethod === 'phone' || !isLogin ? (
                  <div className="auth-input-group">
                    <div className="auth-input-wrap auth-input-wrap--phone">
                      <span className="auth-input__prefix">+62</span>
                      <input
                        type="tel"
                        placeholder="Nomor Handphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="auth-input"
                        id="phone-input"
                      />
                    </div>
                  </div>
                ) : null}

                {loginMethod === 'email' || !isLogin ? (
                  <div className="auth-input-group">
                    <div className="auth-input-wrap">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        id="email-input"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="auth-input-group">
                  <div className="auth-input-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input"
                      id="password-input"
                    />
                    <button
                      type="button"
                      className="auth-input__toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn" id="auth-submit-btn">
                  {isLogin ? 'LOG IN' : 'DAFTAR'}
                </button>

                {isLogin && (
                  <div className="auth-links">
                    <a href="#" className="auth-link">Lupa Password</a>
                    <a href="#" className="auth-link">Log In dengan SMS</a>
                  </div>
                )}
              </form>
            )}

            {/* Divider */}
            <div className="auth-divider">
              <span>ATAU</span>
            </div>

            {/* Social Login */}
            <div className="auth-social">
              <button className="auth-social__btn auth-social__btn--google">
                <span className="auth-social__icon">G</span>
                Google
              </button>
              <button className="auth-social__btn auth-social__btn--facebook">
                <span className="auth-social__icon">f</span>
                Facebook
              </button>
              <button className="auth-social__btn auth-social__btn--apple">
                <span className="auth-social__icon">🍎</span>
                Apple
              </button>
            </div>

            {/* Toggle */}
            <div className="auth-toggle">
              {isLogin ? (
                <span>
                  Baru di Shopee?{' '}
                  <button className="auth-toggle__link" onClick={() => setIsLogin(false)}>
                    Daftar
                  </button>
                </span>
              ) : (
                <span>
                  Sudah punya akun?{' '}
                  <button className="auth-toggle__link" onClick={() => setIsLogin(true)}>
                    Log In
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
