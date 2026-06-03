# Rencana Reverse Engineering Shopee (Web & Android)

Dokumen ini disusun sebagai panduan teknis untuk melakukan analisis mendalam terhadap struktur, arsitektur, dan teknologi yang digunakan oleh platform Shopee.

## 1. Fase Pertama: Website / Desktop
Fokus pada analisis bagaimana Shopee mengelola data secara dinamis dan optimasi SEO.

* **Identifikasi Tech Stack:**
    * Verifikasi penggunaan **React.js** dan **TypeScript**.
    * Analisis mekanisme **Server-Side Rendering (SSR)** dan proses *hydration*.
* **Analisis API (Network Sniffing):**
    * Mapping endpoint API utama (Product Detail, Search, Cart).
    * Identifikasi format data (JSON) dan parameter keamanan (misal: header token, signature).
* **Bundling & Optimasi:**
    * Melihat bagaimana **Webpack** melakukan *code splitting*.

## 2. Fase Kedua: Android Application
Fokus pada dekompilasi dan analisis arsitektur *Super App*.

* **Dekompilasi (Static Analysis):**
    * Menggunakan **JADX** atau **Bytecode Viewer** untuk melihat struktur kode Kotlin/Java.
    * Analisis modul **React Native** yang tertanam di dalam aplikasi native.
* **Analisis Dinamis:**
    * Intercept trafik menggunakan **Charles Proxy** atau **Burp Suite**.
    * Mempelajari mekanisme *Local Storage* menggunakan **SQLite/Room**.
* **Arsitektur:**
    * Observasi implementasi **MVVM/MVI** dan pola modularisasi.

## 3. Komponen Backend & Infrastruktur (Eksplorasi)
Memahami sistem pendukung untuk melihat gambaran besar:
* **Microservices:** Komunikasi antar layanan menggunakan **gRPC**.
* **Database:** Penggunaan **MySQL** dan **TiDB** (Distributed SQL).
* **Messaging:** Analisis aliran data melalui **Kafka**.

## 4. Tools & Metodologi
* **Web:** Chrome DevTools, Wappalyzer, BuiltWith.
* **Android:** JADX, Charles Proxy, ADB (Android Debug Bridge).
* **Security Check:** Observasi sistem anti-bot dan enkripsi payload.

---
*Catatan: Rencana ini ditujukan untuk tujuan edukasi dan pemahaman arsitektur sistem skala besar.*
