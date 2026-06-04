# Handoff Summary: Sesi 2 — Perencanaan Backend Go

Dokumen ini merupakan ringkasan sesi ke-2 proyek **Shopee Clone** dan panduan lengkap untuk membangun backend dari nol secara **guided/tutorial** (dituntun langkah demi langkah).

---

## 1. Keputusan yang Sudah Diambil di Sesi Ini

### Stack Backend (Final)
| Layer | Teknologi | Alasan |
|---|---|---|
| **Language** | Go | Mendekati stack asli Shopee, performa tinggi |
| **Web Framework** | Gin | Ringan, cepat, populer di komunitas Go |
| **ORM** | GORM | Type-safe, auto-migration, mudah ganti driver |
| **Database (Lokal)** | SQLite (pure Go driver) | Zero-setup, tidak perlu install server DB |
| **Database (Production)** | PostgreSQL via Neon | Gratis, GORM tinggal ganti driver |
| **Auth** | JWT (golang-jwt/jwt v5) | Standar industri |
| **Password** | bcrypt (golang.org/x/crypto) | Aman |
| **CORS** | gin-contrib/cors | Agar frontend bisa call backend |
| **Config** | godotenv | Load .env file |

### Strategi Deployment (Final)
| Layer | Lokal | Online (Gratis) |
|---|---|---|
| **Frontend** | localhost:5174 | Vercel |
| **Backend** | localhost:8080 | Render.com |
| **Database** | SQLite file | Neon PostgreSQL |

- Backend menggunakan **dual-driver** (SQLite lokal + PostgreSQL production) via environment variable.
- Tidak perlu ubah kode apapun saat deploy — hanya ubah `.env`.

### Strategi Portfolio
- Fokus pada **kualitas kode di GitHub** + **README berkualitas** + **demo video**.
- Deploy frontend ke Vercel sebagai showcase visual.
- Backend cukup lokal, tunjukkan via demo video.

---

## 2. Arsitektur Backend (Clean Architecture)

```
backend/
├── cmd/
│   └── api/
│       └── main.go              # Entry point, dependency injection
├── internal/
│   ├── config/
│   │   └── config.go            # Environment & app configuration
│   ├── database/
│   │   ├── database.go          # DB connection (dual-driver: SQLite/PostgreSQL)
│   │   └── seed.go              # Seed data dari frontend
│   ├── middleware/
│   │   ├── auth.go              # JWT authentication middleware
│   │   └── cors.go              # CORS untuk frontend
│   ├── models/
│   │   ├── user.go              # User + auth DTOs
│   │   ├── product.go           # Product + pagination DTO
│   │   ├── category.go          # Category
│   │   ├── shop.go              # Shop/Toko
│   │   ├── cart.go              # CartItem + input DTOs
│   │   ├── order.go             # Order + OrderItem + input DTOs
│   │   └── banner.go            # Banner carousel
│   ├── handlers/
│   │   ├── auth_handler.go      # Register, Login, Profile
│   │   ├── product_handler.go   # CRUD Products, Search, Flash Sale
│   │   ├── category_handler.go  # List Categories
│   │   ├── cart_handler.go      # Cart operations
│   │   ├── order_handler.go     # Checkout, Order history
│   │   ├── shop_handler.go      # Shop detail
│   │   └── banner_handler.go    # Homepage banners
│   ├── services/
│   │   ├── auth_service.go      # Auth business logic
│   │   ├── product_service.go   # Product business logic
│   │   ├── cart_service.go      # Cart business logic
│   │   └── order_service.go     # Order business logic
│   └── router/
│       └── router.go            # Route definitions
├── go.mod
├── go.sum
├── .env
└── .env.example
```

---

## 3. API Endpoints yang Akan Dibuat

### Public Endpoints (tanpa auth)
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/register` | Registrasi user baru |
| POST | `/api/auth/login` | Login, return JWT |
| GET | `/api/products` | List produk (pagination, filter, sort) |
| GET | `/api/products/:id` | Detail produk |
| GET | `/api/products/search?keyword=...` | Pencarian |
| GET | `/api/products/flash-sale` | Flash sale (discount ≥ 40%) |
| GET | `/api/products/daily-discover` | Daily discover (random) |
| GET | `/api/categories` | List semua kategori |
| GET | `/api/shops/:id` | Detail shop |
| GET | `/api/shops/:id/products` | Produk milik shop |
| GET | `/api/banners` | Banner carousel |

### Protected Endpoints (perlu JWT token)
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/auth/profile` | Get profil user |
| PUT | `/api/auth/profile` | Update profil |
| GET | `/api/cart` | Get semua item di cart |
| POST | `/api/cart` | Tambah item ke cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Hapus item dari cart |
| POST | `/api/orders` | Checkout (create order) |
| GET | `/api/orders` | List orders user |
| GET | `/api/orders/:id` | Detail order |

---

## 4. Data Models (Referensi dari Frontend)

Seed data backend harus sinkron dengan data mock frontend:
- **20 Categories** → `frontend/src/data/categories.js`
- **5 Shops** → `frontend/src/data/shops.js`
- **55+ Products** → `frontend/src/data/products.js`
- **5 Banners** → `frontend/src/data/banners.js`
- **1 Demo User** → username: `demo`, password: `password123`

---

## 5. Panduan Tutorial: Membangun Backend dari Nol

> **PENTING untuk agent berikutnya:** User ingin **dituntun langkah demi langkah**, BUKAN langsung dibuatkan semua file. Setiap langkah harus:
> 1. Jelaskan APA yang akan dibuat dan MENGAPA
> 2. Tunjukkan kode yang perlu ditulis
> 3. Minta user untuk memahami/review sebelum lanjut
> 4. Test setiap komponen sebelum lanjut ke berikutnya

### Langkah Tutorial (Urutan Eksekusi)

#### Langkah 1: Setup Proyek Go
- Install Go (sudah terinstall: Go 1.26.4)
- `go mod init github.com/fatihmdj/shopeewannabe/backend`
- Install semua dependencies (`go get ...`)
- Buat `.env` dan `.env.example`
- Buat `config.go`
- **Test:** Pastikan `go build` berhasil

#### Langkah 2: Definisikan Models
- Buat semua struct model satu per satu
- Jelaskan setiap field, tag GORM, dan tag JSON
- Jelaskan relasi antar model (foreignKey, dll)
- **Test:** Pastikan `go build` berhasil

#### Langkah 3: Database Connection & Migration
- Buat `database.go` dengan dual-driver (SQLite/PostgreSQL)
- Setup auto-migration
- Buat `seed.go` untuk populate data awal
- **Test:** Jalankan, pastikan file `shopee.db` terbuat dengan tabel yang benar

#### Langkah 4: Router & Middleware Dasar
- Buat `cors.go` middleware
- Buat `router.go` dengan route kosong
- Buat `main.go` entry point
- **Test:** `go run ./cmd/api/main.go` — server berjalan di :8080

#### Langkah 5: Auth System
- Buat `auth.go` JWT middleware
- Buat `auth_service.go` (register, login, bcrypt)
- Buat `auth_handler.go`
- **Test:** `POST /api/auth/register` dan `POST /api/auth/login` via curl/Postman

#### Langkah 6: Product & Catalog API
- Buat `product_handler.go` + `product_service.go`
- Buat `category_handler.go`
- Buat `shop_handler.go`
- Buat `banner_handler.go`
- **Test:** `GET /api/products`, `GET /api/categories`, dll via browser

#### Langkah 7: Cart & Order API
- Buat `cart_handler.go` + `cart_service.go`
- Buat `order_handler.go` + `order_service.go`
- **Test:** Test full flow: login → add to cart → checkout

#### Langkah 8: Integrasi Frontend
- Update frontend React untuk fetch data dari backend (bukan dari file mock)
- Test end-to-end: frontend ↔ backend ↔ database
- **Test:** Buka browser, semua data tampil dari backend

#### Langkah 9: Finalisasi
- Rapikan error handling
- Tambahkan logging
- Update README.md
- Rekam demo video

---

## 6. Status Proyek Saat Ini

| Komponen | Status |
|---|---|
| Frontend (React) | ✅ Selesai, sudah di GitHub |
| Backend folder | 🧹 Dikosongkan, siap dibangun dari nol |
| Go | ✅ Terinstall (v1.26.4) |
| Rencana arsitektur | ✅ Final (dokumen ini) |
| Implementation plan | ✅ Tersedia di artifact sesi ini |

## 7. File Referensi Penting

| File | Lokasi | Fungsi |
|---|---|---|
| Rencana RE | `SHOPEE/rencana_reverse_engineering_shopee.md` | Acuan utama fase proyek |
| Handoff sesi 1 | `SHOPEE/handoff.md` | Ringkasan sesi frontend |
| Implementation plan | Artifact conversation | Detail teknis backend |
| Frontend data | `SHOPEE/frontend/src/data/` | Referensi model data untuk seed |

---

*Proyek siap untuk dilanjutkan. Agent berikutnya harus mulai dari Langkah 1 (Setup Proyek Go) dan menuntun user langkah demi langkah.*
