package database

import (
	"fmt"
	"log"
	"math/rand"

	"github.com/fatihmdj/shopeewannabe/backend/internal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// SeedDatabase mengisi database dengan data awal jika masih kosong.
// Data diambil dari mock data frontend untuk menjaga konsistensi.
func SeedDatabase(db *gorm.DB) {
	// Cek apakah sudah ada data
	var categoryCount int64
	db.Model(&models.Category{}).Count(&categoryCount)
	if categoryCount > 0 {
		fmt.Println("ℹ️  Database sudah berisi data, skip seeding.")
		return
	}

	fmt.Println("🌱 Seeding database...")

	seedCategories(db)
	seedShops(db)
	seedBanners(db)
	seedProducts(db)
	seedDemoUser(db)

	fmt.Println("✅ Seeding selesai!")
}

func seedCategories(db *gorm.DB) {
	categories := []models.Category{
		{ID: 1, Name: "Elektronik", Icon: "📱", Slug: "elektronik"},
		{ID: 2, Name: "Komputer & Aksesoris", Icon: "💻", Slug: "komputer-aksesoris"},
		{ID: 3, Name: "Handphone & Aksesoris", Icon: "📲", Slug: "handphone-aksesoris"},
		{ID: 4, Name: "Pakaian Pria", Icon: "👔", Slug: "pakaian-pria"},
		{ID: 5, Name: "Pakaian Wanita", Icon: "👗", Slug: "pakaian-wanita"},
		{ID: 6, Name: "Sepatu Pria", Icon: "👟", Slug: "sepatu-pria"},
		{ID: 7, Name: "Sepatu Wanita", Icon: "👠", Slug: "sepatu-wanita"},
		{ID: 8, Name: "Tas Pria", Icon: "🎒", Slug: "tas-pria"},
		{ID: 9, Name: "Tas Wanita", Icon: "👜", Slug: "tas-wanita"},
		{ID: 10, Name: "Jam Tangan", Icon: "⌚", Slug: "jam-tangan"},
		{ID: 11, Name: "Muslim Fashion", Icon: "🧕", Slug: "muslim-fashion"},
		{ID: 12, Name: "Kesehatan", Icon: "💊", Slug: "kesehatan"},
		{ID: 13, Name: "Kecantikan", Icon: "💄", Slug: "kecantikan"},
		{ID: 14, Name: "Ibu & Bayi", Icon: "🍼", Slug: "ibu-bayi"},
		{ID: 15, Name: "Makanan & Minuman", Icon: "🍜", Slug: "makanan-minuman"},
		{ID: 16, Name: "Perawatan Rumah", Icon: "🏠", Slug: "perawatan-rumah"},
		{ID: 17, Name: "Perlengkapan Rumah", Icon: "🛋️", Slug: "perlengkapan-rumah"},
		{ID: 18, Name: "Hobi & Koleksi", Icon: "🎮", Slug: "hobi-koleksi"},
		{ID: 19, Name: "Olahraga & Outdoor", Icon: "⚽", Slug: "olahraga-outdoor"},
		{ID: 20, Name: "Otomotif", Icon: "🚗", Slug: "otomotif"},
	}
	db.Create(&categories)
	fmt.Printf("  ✓ %d categories seeded\n", len(categories))
}

func seedShops(db *gorm.DB) {
	shops := []models.Shop{
		{ID: 1, Name: "TechZone Official", AvatarURL: "https://placehold.co/80x80/EE4D2D/ffffff?text=TZ", Badge: "Mall", Rating: 4.9, ResponseRate: 98, ResponseTime: "dalam hitungan menit", Followers: 125000, ProductCount: 342, Joined: "3 tahun lalu", Location: "Jakarta Selatan"},
		{ID: 2, Name: "Gadget Universe", AvatarURL: "https://placehold.co/80x80/0984e3/ffffff?text=GU", Badge: "Star", Rating: 4.8, ResponseRate: 95, ResponseTime: "dalam hitungan menit", Followers: 89000, ProductCount: 567, Joined: "2 tahun lalu", Location: "Jakarta Barat"},
		{ID: 3, Name: "Fashion Hub ID", AvatarURL: "https://placehold.co/80x80/e84393/ffffff?text=FH", Badge: "", Rating: 4.7, ResponseRate: 92, ResponseTime: "dalam beberapa jam", Followers: 56000, ProductCount: 1250, Joined: "4 tahun lalu", Location: "Bandung"},
		{ID: 4, Name: "BeautyKorea Store", AvatarURL: "https://placehold.co/80x80/fd79a8/ffffff?text=BK", Badge: "Mall", Rating: 4.9, ResponseRate: 99, ResponseTime: "dalam hitungan menit", Followers: 234000, ProductCount: 890, Joined: "5 tahun lalu", Location: "Jakarta Selatan"},
		{ID: 5, Name: "SneakersID", AvatarURL: "https://placehold.co/80x80/2d3436/ffffff?text=SI", Badge: "Star", Rating: 4.8, ResponseRate: 96, ResponseTime: "dalam hitungan menit", Followers: 178000, ProductCount: 456, Joined: "3 tahun lalu", Location: "Surabaya"},
	}
	db.Create(&shops)
	fmt.Printf("  ✓ %d shops seeded\n", len(shops))
}

func seedBanners(db *gorm.DB) {
	banners := []models.Banner{
		{ID: 1, Title: "Flash Sale 6.6", Subtitle: "Diskon s/d 90% + Gratis Ongkir", BgColor: "#EE4D2D", TextColor: "#FFFFFF", Gradient: "linear-gradient(135deg, #EE4D2D 0%, #FF6633 100%)"},
		{ID: 2, Title: "ShopeePay Deals", Subtitle: "Cashback hingga 100%", BgColor: "#FF6633", TextColor: "#FFFFFF", Gradient: "linear-gradient(135deg, #FF6633 0%, #FFAB76 100%)"},
		{ID: 3, Title: "Gratis Ongkir Xtra", Subtitle: "Min. Belanja Rp0 s/d Rp30rb", BgColor: "#00BFA5", TextColor: "#FFFFFF", Gradient: "linear-gradient(135deg, #00BFA5 0%, #69F0AE 100%)"},
		{ID: 4, Title: "Shopee Mall", Subtitle: "100% Original, Gratis Return 15 Hari", BgColor: "#D0011B", TextColor: "#FFFFFF", Gradient: "linear-gradient(135deg, #D0011B 0%, #FF424F 100%)"},
		{ID: 5, Title: "Elektronik Super Sale", Subtitle: "Voucher Diskon s/d 1 Juta", BgColor: "#1A1A2E", TextColor: "#FFFFFF", Gradient: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)"},
	}
	db.Create(&banners)
	fmt.Printf("  ✓ %d banners seeded\n", len(banners))
}

func seedProducts(db *gorm.DB) {
	shopNames := []string{
		"TechZone Official", "Gadget Universe", "Fashion Hub ID", "BeautyKorea Store",
		"SneakersID", "HomeDecor Pro", "GadgetMall", "StyleStreet",
		"KoreanBeauty Official", "SportZone ID", "ElektronikMart", "FashionKita",
		"HealthyLife Store", "BabyWorld ID", "AutoParts Hub", "BookStore Online",
		"PetCare Official", "FoodieShop", "OutdoorGear ID", "WatchCollection",
	}
	_ = shopNames

	locations := []string{
		"Jakarta Selatan", "Jakarta Barat", "Bandung", "Surabaya", "Tangerang",
		"Bekasi", "Yogyakarta", "Semarang", "Medan", "Makassar",
		"Jakarta Utara", "Depok", "Bogor", "Malang", "Solo",
	}

	type productSeed struct {
		Name          string
		Category      string
		Price         int64
		OriginalPrice int64
		Image         string
		Rating        float64
		Sold          int
		Badge         string
	}

	productData := []productSeed{
		// Elektronik
		{Name: "Samsung Galaxy S24 Ultra 12/256GB Smartphone 200MP", Category: "elektronik", Price: 19999000, OriginalPrice: 22999000, Image: "https://placehold.co/400x400/1a1a2e/ffffff?text=Galaxy+S24", Rating: 4.9, Sold: 12500, Badge: "Mall"},
		{Name: "iPhone 15 Pro Max 256GB Original iBox", Category: "elektronik", Price: 21499000, OriginalPrice: 24999000, Image: "https://placehold.co/400x400/1a1a2e/ffffff?text=iPhone+15", Rating: 4.9, Sold: 8700, Badge: "Mall"},
		{Name: "Xiaomi Redmi Note 13 Pro 5G 8/256GB", Category: "elektronik", Price: 3299000, OriginalPrice: 4199000, Image: "https://placehold.co/400x400/ff6b35/ffffff?text=Redmi+13", Rating: 4.8, Sold: 25600, Badge: "Star"},
		{Name: "TWS Bluetooth Earphone Bass Stereo Wireless Earbuds", Category: "elektronik", Price: 49000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/2d3436/ffffff?text=TWS+Earbuds", Rating: 4.5, Sold: 98700, Badge: ""},
		{Name: "Anker PowerCore 20000mAh Power Bank Fast Charging", Category: "elektronik", Price: 399000, OriginalPrice: 599000, Image: "https://placehold.co/400x400/0984e3/ffffff?text=PowerBank", Rating: 4.8, Sold: 45200, Badge: "Star"},
		{Name: "JBL Tune 520BT Wireless Headphone Bluetooth", Category: "elektronik", Price: 599000, OriginalPrice: 899000, Image: "https://placehold.co/400x400/6c5ce7/ffffff?text=JBL+520BT", Rating: 4.7, Sold: 15800, Badge: "Mall"},
		// Komputer
		{Name: "Logitech G502 X Gaming Mouse 25600DPI HERO", Category: "komputer-aksesoris", Price: 899000, OriginalPrice: 1299000, Image: "https://placehold.co/400x400/2d3436/00b894?text=G502X", Rating: 4.9, Sold: 7800, Badge: "Mall"},
		{Name: "Mechanical Keyboard RGB 87 Keys Hot-Swap Gaming", Category: "komputer-aksesoris", Price: 259000, OriginalPrice: 459000, Image: "https://placehold.co/400x400/636e72/fdcb6e?text=Keyboard", Rating: 4.6, Sold: 32400, Badge: ""},
		{Name: "Monitor LED 24\" IPS Full HD 75Hz Eye Care", Category: "komputer-aksesoris", Price: 1599000, OriginalPrice: 2199000, Image: "https://placehold.co/400x400/0984e3/ffffff?text=Monitor+24", Rating: 4.7, Sold: 5600, Badge: "Star"},
		{Name: "Webcam Full HD 1080P Autofocus Microphone Built-in", Category: "komputer-aksesoris", Price: 189000, OriginalPrice: 349000, Image: "https://placehold.co/400x400/00b894/ffffff?text=Webcam+HD", Rating: 4.4, Sold: 18900, Badge: ""},
		// Fashion Pria
		{Name: "Kemeja Flannel Pria Premium Cotton Kotak-Kotak", Category: "pakaian-pria", Price: 89000, OriginalPrice: 189000, Image: "https://placehold.co/400x400/d63031/ffffff?text=Flannel", Rating: 4.6, Sold: 56700, Badge: ""},
		{Name: "Jaket Hoodie Pria Fleece Tebal Premium Quality", Category: "pakaian-pria", Price: 129000, OriginalPrice: 259000, Image: "https://placehold.co/400x400/2d3436/ffffff?text=Hoodie", Rating: 4.7, Sold: 78900, Badge: "Star"},
		{Name: "Celana Chino Pria Slim Fit Stretch Cotton", Category: "pakaian-pria", Price: 159000, OriginalPrice: 299000, Image: "https://placehold.co/400x400/636e72/ffffff?text=Chino", Rating: 4.5, Sold: 34500, Badge: ""},
		{Name: "Kaos Polos Pria Cotton Combed 30s Premium", Category: "pakaian-pria", Price: 45000, OriginalPrice: 89000, Image: "https://placehold.co/400x400/e17055/ffffff?text=Kaos+Polos", Rating: 4.4, Sold: 120000, Badge: ""},
		// Fashion Wanita
		{Name: "Dress Wanita Korean Style Casual Midi Floral", Category: "pakaian-wanita", Price: 119000, OriginalPrice: 239000, Image: "https://placehold.co/400x400/e84393/ffffff?text=Dress", Rating: 4.6, Sold: 45600, Badge: ""},
		{Name: "Blouse Wanita Import Premium Silk Look", Category: "pakaian-wanita", Price: 79000, OriginalPrice: 159000, Image: "https://placehold.co/400x400/fd79a8/ffffff?text=Blouse", Rating: 4.5, Sold: 67800, Badge: ""},
		{Name: "Rok Plisket Wanita Premium Midi Skirt Korean", Category: "pakaian-wanita", Price: 69000, OriginalPrice: 139000, Image: "https://placehold.co/400x400/a29bfe/ffffff?text=Rok+Plisket", Rating: 4.7, Sold: 23400, Badge: "Star"},
		{Name: "Cardigan Rajut Wanita Oversize Korean Style", Category: "pakaian-wanita", Price: 99000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/dfe6e9/2d3436?text=Cardigan", Rating: 4.8, Sold: 89000, Badge: ""},
		// Sepatu
		{Name: "Nike Air Force 1 07 White Original BNIB", Category: "sepatu-pria", Price: 1499000, OriginalPrice: 1699000, Image: "https://placehold.co/400x400/dfe6e9/2d3436?text=AF1+White", Rating: 4.9, Sold: 3200, Badge: "Mall"},
		{Name: "Sneakers Pria Running Shoes Sport Ringan Casual", Category: "sepatu-pria", Price: 169000, OriginalPrice: 349000, Image: "https://placehold.co/400x400/0984e3/ffffff?text=Sneakers", Rating: 4.5, Sold: 56700, Badge: ""},
		{Name: "Sandal Slide Pria Premium EVA Anti Slip", Category: "sepatu-pria", Price: 49000, OriginalPrice: 129000, Image: "https://placehold.co/400x400/2d3436/ffffff?text=Sandal", Rating: 4.3, Sold: 89000, Badge: ""},
		{Name: "High Heels Wanita 7cm Suede Pointed Toe Pump", Category: "sepatu-wanita", Price: 189000, OriginalPrice: 399000, Image: "https://placehold.co/400x400/e84393/ffffff?text=Heels", Rating: 4.6, Sold: 12300, Badge: ""},
		// Kecantikan
		{Name: "Skintific 5X Ceramide Barrier Moisturize Gel 80g", Category: "kecantikan", Price: 99000, OriginalPrice: 159000, Image: "https://placehold.co/400x400/55efc4/2d3436?text=Skintific", Rating: 4.9, Sold: 250000, Badge: "Mall"},
		{Name: "Somethinc Niacinamide + Moisture Beet Serum 20ml", Category: "kecantikan", Price: 79000, OriginalPrice: 129000, Image: "https://placehold.co/400x400/ffeaa7/2d3436?text=Somethinc", Rating: 4.8, Sold: 180000, Badge: "Mall"},
		{Name: "Maybelline Fit Me Foundation Matte Poreless 30ml", Category: "kecantikan", Price: 89000, OriginalPrice: 139000, Image: "https://placehold.co/400x400/fab1a0/2d3436?text=Maybelline", Rating: 4.7, Sold: 95000, Badge: "Mall"},
		{Name: "Sheet Mask Korea Moisturizing Aloe Vera Pack 10pcs", Category: "kecantikan", Price: 35000, OriginalPrice: 99000, Image: "https://placehold.co/400x400/81ecec/2d3436?text=Sheet+Mask", Rating: 4.4, Sold: 320000, Badge: ""},
		// Kesehatan
		{Name: "Vitamin C 1000mg + Zinc Suplemen Daya Tahan", Category: "kesehatan", Price: 65000, OriginalPrice: 120000, Image: "https://placehold.co/400x400/00b894/ffffff?text=Vitamin+C", Rating: 4.7, Sold: 67000, Badge: ""},
		{Name: "Masker KN95 5 Ply Premium Box isi 50pcs", Category: "kesehatan", Price: 45000, OriginalPrice: 125000, Image: "https://placehold.co/400x400/dfe6e9/2d3436?text=Masker+KN95", Rating: 4.6, Sold: 450000, Badge: ""},
		// Makanan
		{Name: "Indomie Goreng Special 1 Dus isi 40 pcs", Category: "makanan-minuman", Price: 115000, OriginalPrice: 145000, Image: "https://placehold.co/400x400/fdcb6e/2d3436?text=Indomie", Rating: 4.9, Sold: 89000, Badge: ""},
		{Name: "Kopi Arabica Gayo Premium Bubuk 250g", Category: "makanan-minuman", Price: 55000, OriginalPrice: 85000, Image: "https://placehold.co/400x400/6c5ce7/ffffff?text=Kopi+Gayo", Rating: 4.8, Sold: 34000, Badge: "Star"},
		{Name: "Matcha Latte Premium Japanese Green Tea 500g", Category: "makanan-minuman", Price: 89000, OriginalPrice: 149000, Image: "https://placehold.co/400x400/00b894/ffffff?text=Matcha", Rating: 4.6, Sold: 28000, Badge: ""},
		// Rumah
		{Name: "Rak Buku Minimalis 5 Tingkat Kayu Industrial", Category: "perlengkapan-rumah", Price: 259000, OriginalPrice: 499000, Image: "https://placehold.co/400x400/636e72/ffffff?text=Rak+Buku", Rating: 4.5, Sold: 12300, Badge: ""},
		{Name: "Lampu LED Strip RGB Remote Control 5M Waterproof", Category: "perlengkapan-rumah", Price: 45000, OriginalPrice: 129000, Image: "https://placehold.co/400x400/6c5ce7/fdcb6e?text=LED+Strip", Rating: 4.4, Sold: 89000, Badge: ""},
		{Name: "Bantal Tidur Premium Memory Foam Ergonomis", Category: "perlengkapan-rumah", Price: 149000, OriginalPrice: 299000, Image: "https://placehold.co/400x400/dfe6e9/636e72?text=Bantal", Rating: 4.7, Sold: 45000, Badge: "Star"},
		{Name: "Organizer Meja Multifungsi Bamboo Desktop", Category: "perlengkapan-rumah", Price: 79000, OriginalPrice: 169000, Image: "https://placehold.co/400x400/ffeaa7/636e72?text=Organizer", Rating: 4.5, Sold: 34000, Badge: ""},
		// Hobi
		{Name: "Gundam RG 1/144 Strike Freedom ZGMF-X20A", Category: "hobi-koleksi", Price: 459000, OriginalPrice: 599000, Image: "https://placehold.co/400x400/0984e3/ffffff?text=Gundam+RG", Rating: 4.9, Sold: 5600, Badge: "Star"},
		{Name: "Pop It Fidget Toy Rainbow Jumbo Size", Category: "hobi-koleksi", Price: 25000, OriginalPrice: 79000, Image: "https://placehold.co/400x400/e84393/fdcb6e?text=Pop+It", Rating: 4.3, Sold: 230000, Badge: ""},
		{Name: "PS5 DualSense Wireless Controller Original", Category: "hobi-koleksi", Price: 949000, OriginalPrice: 1199000, Image: "https://placehold.co/400x400/2d3436/dfe6e9?text=DualSense", Rating: 4.8, Sold: 8700, Badge: "Mall"},
		// Olahraga
		{Name: "Dumbbell Set 20kg Adjustable Barbell Home Gym", Category: "olahraga-outdoor", Price: 299000, OriginalPrice: 599000, Image: "https://placehold.co/400x400/636e72/ffffff?text=Dumbbell", Rating: 4.6, Sold: 23000, Badge: ""},
		{Name: "Matras Yoga 10mm Premium Anti Slip + Bag", Category: "olahraga-outdoor", Price: 99000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/a29bfe/ffffff?text=Matras+Yoga", Rating: 4.7, Sold: 56000, Badge: ""},
		{Name: "Resistance Band Set 5 Level Latex Exercise", Category: "olahraga-outdoor", Price: 49000, OriginalPrice: 149000, Image: "https://placehold.co/400x400/fdcb6e/2d3436?text=Resistance", Rating: 4.5, Sold: 78000, Badge: ""},
		// Otomotif
		{Name: "Kamera Mundur Mobil HD Night Vision Waterproof", Category: "otomotif", Price: 89000, OriginalPrice: 249000, Image: "https://placehold.co/400x400/2d3436/00b894?text=Kamera+Mobil", Rating: 4.4, Sold: 34000, Badge: ""},
		{Name: "Parfum Mobil Pewangi AC Vent Clip Aroma Luxury", Category: "otomotif", Price: 35000, OriginalPrice: 89000, Image: "https://placehold.co/400x400/6c5ce7/ffffff?text=Parfum", Rating: 4.5, Sold: 67000, Badge: ""},
		// Ibu & Bayi
		{Name: "Popok Bayi Premium Pants L 50 pcs Extra Soft", Category: "ibu-bayi", Price: 89000, OriginalPrice: 139000, Image: "https://placehold.co/400x400/55efc4/2d3436?text=Popok", Rating: 4.8, Sold: 120000, Badge: "Mall"},
		{Name: "Botol Susu Anti Kolik 260ml BPA Free Natural", Category: "ibu-bayi", Price: 125000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/81ecec/2d3436?text=Botol+Susu", Rating: 4.7, Sold: 45000, Badge: "Star"},
		// Tas
		{Name: "Tas Ransel Pria Anti Air Laptop 15.6\" USB Port", Category: "tas-pria", Price: 159000, OriginalPrice: 349000, Image: "https://placehold.co/400x400/2d3436/ffffff?text=Ransel", Rating: 4.6, Sold: 67000, Badge: ""},
		{Name: "Waist Bag Pria Premium Waterproof Sling Bag", Category: "tas-pria", Price: 69000, OriginalPrice: 149000, Image: "https://placehold.co/400x400/636e72/ffffff?text=Waist+Bag", Rating: 4.5, Sold: 89000, Badge: ""},
		{Name: "Tas Selempang Wanita Korean Style Premium PU", Category: "tas-wanita", Price: 89000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/e84393/ffffff?text=Sling+Bag", Rating: 4.6, Sold: 56000, Badge: ""},
		{Name: "Tote Bag Wanita Canvas Premium Aesthetic", Category: "tas-wanita", Price: 49000, OriginalPrice: 99000, Image: "https://placehold.co/400x400/ffeaa7/2d3436?text=Tote+Bag", Rating: 4.4, Sold: 120000, Badge: ""},
		// Jam Tangan
		{Name: "Casio G-Shock GA-2100 CasiOak Original Resmi", Category: "jam-tangan", Price: 1599000, OriginalPrice: 1899000, Image: "https://placehold.co/400x400/2d3436/00b894?text=G-Shock", Rating: 4.9, Sold: 4500, Badge: "Mall"},
		{Name: "Jam Tangan Pria Digital Sport Waterproof 50M", Category: "jam-tangan", Price: 79000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/0984e3/ffffff?text=Watch", Rating: 4.3, Sold: 45000, Badge: ""},
		{Name: "Smartwatch Fitness Tracker Heart Rate SpO2 IP68", Category: "jam-tangan", Price: 199000, OriginalPrice: 499000, Image: "https://placehold.co/400x400/6c5ce7/ffffff?text=Smartwatch", Rating: 4.5, Sold: 78000, Badge: ""},
		// Muslim Fashion
		{Name: "Gamis Wanita Premium Wolfis Busui Friendly", Category: "muslim-fashion", Price: 159000, OriginalPrice: 299000, Image: "https://placehold.co/400x400/a29bfe/ffffff?text=Gamis", Rating: 4.7, Sold: 34000, Badge: ""},
		{Name: "Hijab Pashmina Diamond Italiano Premium", Category: "muslim-fashion", Price: 35000, OriginalPrice: 75000, Image: "https://placehold.co/400x400/fd79a8/ffffff?text=Hijab", Rating: 4.6, Sold: 230000, Badge: ""},
		{Name: "Mukena Travel Parasut Premium Tas Cantik", Category: "muslim-fashion", Price: 129000, OriginalPrice: 259000, Image: "https://placehold.co/400x400/dfe6e9/636e72?text=Mukena", Rating: 4.8, Sold: 56000, Badge: "Star"},
		// Perawatan Rumah
		{Name: "Sapu Pel Lantai Spray Mop Microfiber 360 Putar", Category: "perawatan-rumah", Price: 79000, OriginalPrice: 189000, Image: "https://placehold.co/400x400/00b894/ffffff?text=Spray+Mop", Rating: 4.5, Sold: 89000, Badge: ""},
		{Name: "Vacuum Cleaner Portable Wireless Handheld 120W", Category: "perawatan-rumah", Price: 299000, OriginalPrice: 599000, Image: "https://placehold.co/400x400/636e72/ffffff?text=Vacuum", Rating: 4.6, Sold: 23000, Badge: ""},
		{Name: "Dispenser Sabun Otomatis Sensor Touchless 400ml", Category: "perawatan-rumah", Price: 89000, OriginalPrice: 199000, Image: "https://placehold.co/400x400/81ecec/2d3436?text=Dispenser", Rating: 4.4, Sold: 67000, Badge: ""},
	}

	for i, p := range productData {
		discount := int(float64(p.OriginalPrice-p.Price) / float64(p.OriginalPrice) * 100)
		stock := rand.Intn(500) + 50
		reviews := rand.Intn(5000) + 100

		product := models.Product{
			Name:          p.Name,
			CategorySlug:  p.Category,
			Price:         p.Price,
			OriginalPrice: p.OriginalPrice,
			ImageURL:      p.Image,
			Rating:        p.Rating,
			Sold:          p.Sold,
			Badge:         p.Badge,
			ShopID:        uint((i % 5) + 1), // assign ke 5 shops yang ada
			Location:      locations[i%len(locations)],
			Discount:      discount,
			Stock:         stock,
			Description:   p.Name + " - Produk berkualitas tinggi dengan harga terjangkau. Garansi resmi, pengiriman cepat ke seluruh Indonesia.",
			FreeShipping:  p.Price > 100000,
			Reviews:       reviews,
		}
		db.Create(&product)
	}
	fmt.Printf("  ✓ %d products seeded\n", len(productData))
}

func seedDemoUser(db *gorm.DB) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		return
	}

	user := models.User{
		Username:  "demo",
		Email:     "demo@shopee.com",
		Password:  string(hashedPassword),
		FullName:  "Demo User",
		Phone:     "08123456789",
		Address:   "Jl. Sudirman No. 1, Jakarta Selatan",
		AvatarURL: "https://placehold.co/80x80/EE4D2D/ffffff?text=DU",
	}
	db.Create(&user)
	fmt.Println("  ✓ Demo user seeded (username: demo, password: password123)")
}
