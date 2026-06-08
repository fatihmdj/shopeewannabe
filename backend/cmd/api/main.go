package main

import (
	"fmt"

	"github.com/fatihmdj/shopeewannabe/backend/internal/config"
	"github.com/fatihmdj/shopeewannabe/backend/internal/database"
	"github.com/fatihmdj/shopeewannabe/backend/internal/router"
)

func main() {
	// 1. Load konfigurasi dari .env
	cfg := config.LoadConfig()
	fmt.Println("🔧 Configuration loaded")

	// 2. Inisialisasi database (akan membuat file shopee.db otomatis)
	db := database.InitDB(cfg.DBDriver, cfg.DBPath)

	// 3. Masukkan data dummy jika database kosong
	database.SeedDatabase(db)

	// 4. Setup router
	r := router.SetupRouter(db, cfg)

	// 5. Jalankan server di port 8080
	fmt.Printf("\nShopee Clone API running at http://localhost:%s\n", cfg.Port)
	fmt.Printf("Health check: http://localhost:%s/health\n\n", cfg.Port)

	// Mulai server
	r.Run(":" + cfg.Port)
}
