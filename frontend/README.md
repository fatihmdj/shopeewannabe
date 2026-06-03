# Shopee Web Frontend Clone (Vite + React + Vanilla CSS)

Replikasi antarmuka fungsional dari platform e-commerce **Shopee Indonesia**. Proyek ini dibuat menggunakan **Vite**, **React**, dan **Vanilla CSS** dengan fokus pada presisi pixel, mikro-animasi, serta fungsionalitas dinamis menggunakan data tiruan (mock data).

## Fitur Utama

1. **Sistem Desain & Layout**:
   * **Vertical Stacked Navigation Bar**: Bagian atas (*Seller Centre, Notifikasi, Bantuan, Login*) dan bagian pencarian diintegrasikan dalam satu komponen dengan ketinggian dinamis yang menyesuaikan konten secara otomatis.
   * **Footer Informasi**: Navigasi multi-kolom yang menyajikan Layanan Pelanggan, Hubungi Kami, Mitra Logistik/Pembayaran, dan Media Sosial.
   * **Dynamic Sticky Header**: Header menempel di bagian atas saat halaman di-scroll dengan transisi yang mulus.

2. **Halaman Beranda (Homepage)**:
   * **Banner Carousel**: Slider promosi otomatis dengan kontrol manual.
   * **Flash Sale Countdown**: Penghitung mundur waktu diskon secara real-time dengan progres bar stok barang.
   * **Daily Discover**: Grid produk yang mendukung pemuatan bertahap (*pagination*).

3. **Halaman Detail Produk**:
   * Galeri gambar interaktif dengan *thumbnail switcher*.
   * Pemilihan variasi produk (warna/ukuran) secara dinamis.
   * Tab Deskripsi dan Penilaian Toko terperinci.

4. **Keranjang & Checkout**:
   * Manajemen keranjang belanja terkelompok berdasarkan toko penjual.
   * Perhitungan total harga dan kuantitas barang secara otomatis.
   * Proses checkout dengan pilihan kurir pengiriman dan ringkasan pembayaran yang lengkap.

5. **Halaman Login & Autentikasi**:
   * Form login menggunakan Email/Nomor HP.
   * Fitur simulasi login menggunakan pemindaian **QR Code** interaktif.

## Cara Menjalankan Proyek

### Prasyarat
Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstal di komputer Anda.

### Langkah-langkah
1. Clone repositori ini:
   ```bash
   git clone https://github.com/fatihmdj/shopeewannabe.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd shopeewannabe
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka tautan lokal yang muncul (default: `http://localhost:5173`) di browser Anda.

## Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan analisis rekayasa perangkat lunak (reverse engineering).
