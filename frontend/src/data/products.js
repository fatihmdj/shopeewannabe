// Mock product data for Shopee Clone
// 60 products across different categories

const generateProducts = () => {
  const shopNames = [
    'TechZone Official', 'Gadget Universe', 'Fashion Hub ID', 'BeautyKorea Store',
    'SneakersID', 'HomeDecor Pro', 'GadgetMall', 'StyleStreet',
    'KoreanBeauty Official', 'SportZone ID', 'ElektronikMart', 'FashionKita',
    'HealthyLife Store', 'BabyWorld ID', 'AutoParts Hub', 'BookStore Online',
    'PetCare Official', 'FoodieShop', 'OutdoorGear ID', 'WatchCollection'
  ];

  const locations = [
    'Jakarta Selatan', 'Jakarta Barat', 'Bandung', 'Surabaya', 'Tangerang',
    'Bekasi', 'Yogyakarta', 'Semarang', 'Medan', 'Makassar',
    'Jakarta Utara', 'Depok', 'Bogor', 'Malang', 'Solo'
  ];

  const productData = [
    // Elektronik
    { name: 'Samsung Galaxy S24 Ultra 12/256GB Smartphone 200MP', category: 'elektronik', price: 19999000, originalPrice: 22999000, image: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Galaxy+S24', rating: 4.9, sold: 12500, badge: 'Mall' },
    { name: 'iPhone 15 Pro Max 256GB Original iBox', category: 'elektronik', price: 21499000, originalPrice: 24999000, image: 'https://placehold.co/400x400/1a1a2e/ffffff?text=iPhone+15', rating: 4.9, sold: 8700, badge: 'Mall' },
    { name: 'Xiaomi Redmi Note 13 Pro 5G 8/256GB', category: 'elektronik', price: 3299000, originalPrice: 4199000, image: 'https://placehold.co/400x400/ff6b35/ffffff?text=Redmi+13', rating: 4.8, sold: 25600, badge: 'Star' },
    { name: 'TWS Bluetooth Earphone Bass Stereo Wireless Earbuds', category: 'elektronik', price: 49000, originalPrice: 199000, image: 'https://placehold.co/400x400/2d3436/ffffff?text=TWS+Earbuds', rating: 4.5, sold: 98700, badge: null },
    { name: 'Anker PowerCore 20000mAh Power Bank Fast Charging', category: 'elektronik', price: 399000, originalPrice: 599000, image: 'https://placehold.co/400x400/0984e3/ffffff?text=PowerBank', rating: 4.8, sold: 45200, badge: 'Star' },
    { name: 'JBL Tune 520BT Wireless Headphone Bluetooth', category: 'elektronik', price: 599000, originalPrice: 899000, image: 'https://placehold.co/400x400/6c5ce7/ffffff?text=JBL+520BT', rating: 4.7, sold: 15800, badge: 'Mall' },

    // Komputer
    { name: 'Logitech G502 X Gaming Mouse 25600DPI HERO', category: 'komputer-aksesoris', price: 899000, originalPrice: 1299000, image: 'https://placehold.co/400x400/2d3436/00b894?text=G502X', rating: 4.9, sold: 7800, badge: 'Mall' },
    { name: 'Mechanical Keyboard RGB 87 Keys Hot-Swap Gaming', category: 'komputer-aksesoris', price: 259000, originalPrice: 459000, image: 'https://placehold.co/400x400/636e72/fdcb6e?text=Keyboard', rating: 4.6, sold: 32400, badge: null },
    { name: 'Monitor LED 24" IPS Full HD 75Hz Eye Care', category: 'komputer-aksesoris', price: 1599000, originalPrice: 2199000, image: 'https://placehold.co/400x400/0984e3/ffffff?text=Monitor+24', rating: 4.7, sold: 5600, badge: 'Star' },
    { name: 'Webcam Full HD 1080P Autofocus Microphone Built-in', category: 'komputer-aksesoris', price: 189000, originalPrice: 349000, image: 'https://placehold.co/400x400/00b894/ffffff?text=Webcam+HD', rating: 4.4, sold: 18900, badge: null },

    // Fashion Pria
    { name: 'Kemeja Flannel Pria Premium Cotton Kotak-Kotak', category: 'pakaian-pria', price: 89000, originalPrice: 189000, image: 'https://placehold.co/400x400/d63031/ffffff?text=Flannel', rating: 4.6, sold: 56700, badge: null },
    { name: 'Jaket Hoodie Pria Fleece Tebal Premium Quality', category: 'pakaian-pria', price: 129000, originalPrice: 259000, image: 'https://placehold.co/400x400/2d3436/ffffff?text=Hoodie', rating: 4.7, sold: 78900, badge: 'Star' },
    { name: 'Celana Chino Pria Slim Fit Stretch Cotton', category: 'pakaian-pria', price: 159000, originalPrice: 299000, image: 'https://placehold.co/400x400/636e72/ffffff?text=Chino', rating: 4.5, sold: 34500, badge: null },
    { name: 'Kaos Polos Pria Cotton Combed 30s Premium', category: 'pakaian-pria', price: 45000, originalPrice: 89000, image: 'https://placehold.co/400x400/e17055/ffffff?text=Kaos+Polos', rating: 4.4, sold: 120000, badge: null },

    // Fashion Wanita
    { name: 'Dress Wanita Korean Style Casual Midi Floral', category: 'pakaian-wanita', price: 119000, originalPrice: 239000, image: 'https://placehold.co/400x400/e84393/ffffff?text=Dress', rating: 4.6, sold: 45600, badge: null },
    { name: 'Blouse Wanita Import Premium Silk Look', category: 'pakaian-wanita', price: 79000, originalPrice: 159000, image: 'https://placehold.co/400x400/fd79a8/ffffff?text=Blouse', rating: 4.5, sold: 67800, badge: null },
    { name: 'Rok Plisket Wanita Premium Midi Skirt Korean', category: 'pakaian-wanita', price: 69000, originalPrice: 139000, image: 'https://placehold.co/400x400/a29bfe/ffffff?text=Rok+Plisket', rating: 4.7, sold: 23400, badge: 'Star' },
    { name: 'Cardigan Rajut Wanita Oversize Korean Style', category: 'pakaian-wanita', price: 99000, originalPrice: 199000, image: 'https://placehold.co/400x400/dfe6e9/2d3436?text=Cardigan', rating: 4.8, sold: 89000, badge: null },

    // Sepatu
    { name: 'Nike Air Force 1 07 White Original BNIB', category: 'sepatu-pria', price: 1499000, originalPrice: 1699000, image: 'https://placehold.co/400x400/dfe6e9/2d3436?text=AF1+White', rating: 4.9, sold: 3200, badge: 'Mall' },
    { name: 'Sneakers Pria Running Shoes Sport Ringan Casual', category: 'sepatu-pria', price: 169000, originalPrice: 349000, image: 'https://placehold.co/400x400/0984e3/ffffff?text=Sneakers', rating: 4.5, sold: 56700, badge: null },
    { name: 'Sandal Slide Pria Premium EVA Anti Slip', category: 'sepatu-pria', price: 49000, originalPrice: 129000, image: 'https://placehold.co/400x400/2d3436/ffffff?text=Sandal', rating: 4.3, sold: 89000, badge: null },
    { name: 'High Heels Wanita 7cm Suede Pointed Toe Pump', category: 'sepatu-wanita', price: 189000, originalPrice: 399000, image: 'https://placehold.co/400x400/e84393/ffffff?text=Heels', rating: 4.6, sold: 12300, badge: null },

    // Kecantikan
    { name: 'Skintific 5X Ceramide Barrier Moisturize Gel 80g', category: 'kecantikan', price: 99000, originalPrice: 159000, image: 'https://placehold.co/400x400/55efc4/2d3436?text=Skintific', rating: 4.9, sold: 250000, badge: 'Mall' },
    { name: 'Somethinc Niacinamide + Moisture Beet Serum 20ml', category: 'kecantikan', price: 79000, originalPrice: 129000, image: 'https://placehold.co/400x400/ffeaa7/2d3436?text=Somethinc', rating: 4.8, sold: 180000, badge: 'Mall' },
    { name: 'Maybelline Fit Me Foundation Matte Poreless 30ml', category: 'kecantikan', price: 89000, originalPrice: 139000, image: 'https://placehold.co/400x400/fab1a0/2d3436?text=Maybelline', rating: 4.7, sold: 95000, badge: 'Mall' },
    { name: 'Sheet Mask Korea Moisturizing Aloe Vera Pack 10pcs', category: 'kecantikan', price: 35000, originalPrice: 99000, image: 'https://placehold.co/400x400/81ecec/2d3436?text=Sheet+Mask', rating: 4.4, sold: 320000, badge: null },

    // Kesehatan
    { name: 'Vitamin C 1000mg + Zinc Suplemen Daya Tahan', category: 'kesehatan', price: 65000, originalPrice: 120000, image: 'https://placehold.co/400x400/00b894/ffffff?text=Vitamin+C', rating: 4.7, sold: 67000, badge: null },
    { name: 'Masker KN95 5 Ply Premium Box isi 50pcs', category: 'kesehatan', price: 45000, originalPrice: 125000, image: 'https://placehold.co/400x400/dfe6e9/2d3436?text=Masker+KN95', rating: 4.6, sold: 450000, badge: null },

    // Makanan
    { name: 'Indomie Goreng Special 1 Dus isi 40 pcs', category: 'makanan-minuman', price: 115000, originalPrice: 145000, image: 'https://placehold.co/400x400/fdcb6e/2d3436?text=Indomie', rating: 4.9, sold: 89000, badge: null },
    { name: 'Kopi Arabica Gayo Premium Bubuk 250g', category: 'makanan-minuman', price: 55000, originalPrice: 85000, image: 'https://placehold.co/400x400/6c5ce7/ffffff?text=Kopi+Gayo', rating: 4.8, sold: 34000, badge: 'Star' },
    { name: 'Matcha Latte Premium Japanese Green Tea 500g', category: 'makanan-minuman', price: 89000, originalPrice: 149000, image: 'https://placehold.co/400x400/00b894/ffffff?text=Matcha', rating: 4.6, sold: 28000, badge: null },

    // Rumah
    { name: 'Rak Buku Minimalis 5 Tingkat Kayu Industrial', category: 'perlengkapan-rumah', price: 259000, originalPrice: 499000, image: 'https://placehold.co/400x400/636e72/ffffff?text=Rak+Buku', rating: 4.5, sold: 12300, badge: null },
    { name: 'Lampu LED Strip RGB Remote Control 5M Waterproof', category: 'perlengkapan-rumah', price: 45000, originalPrice: 129000, image: 'https://placehold.co/400x400/6c5ce7/fdcb6e?text=LED+Strip', rating: 4.4, sold: 89000, badge: null },
    { name: 'Bantal Tidur Premium Memory Foam Ergonomis', category: 'perlengkapan-rumah', price: 149000, originalPrice: 299000, image: 'https://placehold.co/400x400/dfe6e9/636e72?text=Bantal', rating: 4.7, sold: 45000, badge: 'Star' },
    { name: 'Organizer Meja Multifungsi Bamboo Desktop', category: 'perlengkapan-rumah', price: 79000, originalPrice: 169000, image: 'https://placehold.co/400x400/ffeaa7/636e72?text=Organizer', rating: 4.5, sold: 34000, badge: null },

    // Hobi
    { name: 'Gundam RG 1/144 Strike Freedom ZGMF-X20A', category: 'hobi-koleksi', price: 459000, originalPrice: 599000, image: 'https://placehold.co/400x400/0984e3/ffffff?text=Gundam+RG', rating: 4.9, sold: 5600, badge: 'Star' },
    { name: 'Pop It Fidget Toy Rainbow Jumbo Size', category: 'hobi-koleksi', price: 25000, originalPrice: 79000, image: 'https://placehold.co/400x400/e84393/fdcb6e?text=Pop+It', rating: 4.3, sold: 230000, badge: null },
    { name: 'PS5 DualSense Wireless Controller Original', category: 'hobi-koleksi', price: 949000, originalPrice: 1199000, image: 'https://placehold.co/400x400/2d3436/dfe6e9?text=DualSense', rating: 4.8, sold: 8700, badge: 'Mall' },

    // Olahraga
    { name: 'Dumbbell Set 20kg Adjustable Barbell Home Gym', category: 'olahraga-outdoor', price: 299000, originalPrice: 599000, image: 'https://placehold.co/400x400/636e72/ffffff?text=Dumbbell', rating: 4.6, sold: 23000, badge: null },
    { name: 'Matras Yoga 10mm Premium Anti Slip + Bag', category: 'olahraga-outdoor', price: 99000, originalPrice: 199000, image: 'https://placehold.co/400x400/a29bfe/ffffff?text=Matras+Yoga', rating: 4.7, sold: 56000, badge: null },
    { name: 'Resistance Band Set 5 Level Latex Exercise', category: 'olahraga-outdoor', price: 49000, originalPrice: 149000, image: 'https://placehold.co/400x400/fdcb6e/2d3436?text=Resistance', rating: 4.5, sold: 78000, badge: null },

    // Otomotif
    { name: 'Kamera Mundur Mobil HD Night Vision Waterproof', category: 'otomotif', price: 89000, originalPrice: 249000, image: 'https://placehold.co/400x400/2d3436/00b894?text=Kamera+Mobil', rating: 4.4, sold: 34000, badge: null },
    { name: 'Parfum Mobil Pewangi AC Vent Clip Aroma Luxury', category: 'otomotif', price: 35000, originalPrice: 89000, image: 'https://placehold.co/400x400/6c5ce7/ffffff?text=Parfum', rating: 4.5, sold: 67000, badge: null },

    // Ibu & Bayi
    { name: 'Popok Bayi Premium Pants L 50 pcs Extra Soft', category: 'ibu-bayi', price: 89000, originalPrice: 139000, image: 'https://placehold.co/400x400/55efc4/2d3436?text=Popok', rating: 4.8, sold: 120000, badge: 'Mall' },
    { name: 'Botol Susu Anti Kolik 260ml BPA Free Natural', category: 'ibu-bayi', price: 125000, originalPrice: 199000, image: 'https://placehold.co/400x400/81ecec/2d3436?text=Botol+Susu', rating: 4.7, sold: 45000, badge: 'Star' },

    // Tas
    { name: 'Tas Ransel Pria Anti Air Laptop 15.6" USB Port', category: 'tas-pria', price: 159000, originalPrice: 349000, image: 'https://placehold.co/400x400/2d3436/ffffff?text=Ransel', rating: 4.6, sold: 67000, badge: null },
    { name: 'Waist Bag Pria Premium Waterproof Sling Bag', category: 'tas-pria', price: 69000, originalPrice: 149000, image: 'https://placehold.co/400x400/636e72/ffffff?text=Waist+Bag', rating: 4.5, sold: 89000, badge: null },
    { name: 'Tas Selempang Wanita Korean Style Premium PU', category: 'tas-wanita', price: 89000, originalPrice: 199000, image: 'https://placehold.co/400x400/e84393/ffffff?text=Sling+Bag', rating: 4.6, sold: 56000, badge: null },
    { name: 'Tote Bag Wanita Canvas Premium Aesthetic', category: 'tas-wanita', price: 49000, originalPrice: 99000, image: 'https://placehold.co/400x400/ffeaa7/2d3436?text=Tote+Bag', rating: 4.4, sold: 120000, badge: null },

    // Jam Tangan
    { name: 'Casio G-Shock GA-2100 CasiOak Original Resmi', category: 'jam-tangan', price: 1599000, originalPrice: 1899000, image: 'https://placehold.co/400x400/2d3436/00b894?text=G-Shock', rating: 4.9, sold: 4500, badge: 'Mall' },
    { name: 'Jam Tangan Pria Digital Sport Waterproof 50M', category: 'jam-tangan', price: 79000, originalPrice: 199000, image: 'https://placehold.co/400x400/0984e3/ffffff?text=Watch', rating: 4.3, sold: 45000, badge: null },
    { name: 'Smartwatch Fitness Tracker Heart Rate SpO2 IP68', category: 'jam-tangan', price: 199000, originalPrice: 499000, image: 'https://placehold.co/400x400/6c5ce7/ffffff?text=Smartwatch', rating: 4.5, sold: 78000, badge: null },

    // Muslim Fashion
    { name: 'Gamis Wanita Premium Wolfis Busui Friendly', category: 'muslim-fashion', price: 159000, originalPrice: 299000, image: 'https://placehold.co/400x400/a29bfe/ffffff?text=Gamis', rating: 4.7, sold: 34000, badge: null },
    { name: 'Hijab Pashmina Diamond Italiano Premium', category: 'muslim-fashion', price: 35000, originalPrice: 75000, image: 'https://placehold.co/400x400/fd79a8/ffffff?text=Hijab', rating: 4.6, sold: 230000, badge: null },
    { name: 'Mukena Travel Parasut Premium Tas Cantik', category: 'muslim-fashion', price: 129000, originalPrice: 259000, image: 'https://placehold.co/400x400/dfe6e9/636e72?text=Mukena', rating: 4.8, sold: 56000, badge: 'Star' },

    // Perawatan Rumah
    { name: 'Sapu Pel Lantai Spray Mop Microfiber 360 Putar', category: 'perawatan-rumah', price: 79000, originalPrice: 189000, image: 'https://placehold.co/400x400/00b894/ffffff?text=Spray+Mop', rating: 4.5, sold: 89000, badge: null },
    { name: 'Vacuum Cleaner Portable Wireless Handheld 120W', category: 'perawatan-rumah', price: 299000, originalPrice: 599000, image: 'https://placehold.co/400x400/636e72/ffffff?text=Vacuum', rating: 4.6, sold: 23000, badge: null },
    { name: 'Dispenser Sabun Otomatis Sensor Touchless 400ml', category: 'perawatan-rumah', price: 89000, originalPrice: 199000, image: 'https://placehold.co/400x400/81ecec/2d3436?text=Dispenser', rating: 4.4, sold: 67000, badge: null },
  ];

  return productData.map((product, index) => ({
    id: index + 1,
    ...product,
    shopName: shopNames[index % shopNames.length],
    shopId: (index % shopNames.length) + 1,
    location: locations[index % locations.length],
    discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
    stock: Math.floor(Math.random() * 500) + 50,
    description: `${product.name} - Produk berkualitas tinggi dengan harga terjangkau. Garansi resmi, pengiriman cepat ke seluruh Indonesia. Dapatkan penawaran terbaik hanya di toko kami!`,
    images: [product.image, product.image, product.image, product.image],
    variants: product.price > 500000
      ? [
          { name: 'Warna', options: ['Hitam', 'Putih', 'Biru'] },
          { name: 'Ukuran', options: ['S', 'M', 'L', 'XL'] }
        ]
      : product.price > 100000
        ? [{ name: 'Warna', options: ['Hitam', 'Putih'] }]
        : [],
    reviews: Math.floor(Math.random() * 5000) + 100,
    freeShipping: product.price > 100000,
  }));
};

export const products = generateProducts();

export const flashSaleProducts = products.filter(p => p.discount >= 40).slice(0, 12);

export const dailyDiscoverProducts = [...products].sort(() => Math.random() - 0.5);

export default products;
