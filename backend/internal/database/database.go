package database

import (
	"fmt"
	"log"

	"github.com/fatihmdj/shopeewannabe/backend/internal/models"
	"github.com/glebarez/sqlite"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// InitDB menginisialisasi koneksi database berdasarkan driver yang dipilih.
func InitDB(driver, dbPath string) *gorm.DB {
	var db *gorm.DB
	var err error

	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	// Dual-driver support: SQLite untuk lokal, PostgreSQL untuk production
	switch driver {
	case "postgres":
		db, err = gorm.Open(postgres.Open(dbPath), gormConfig)
	case "sqlite":
		fallthrough
	default:
		db, err = gorm.Open(sqlite.Open(dbPath), gormConfig)
	}

	if err != nil {
		log.Fatalf("Gagal koneksi ke database: %v", err)
	}

	fmt.Printf("✅ Database connected (driver: %s)\n", driver)

	// INI BAGIAN AJAIBNYA GORM: AutoMigrate
	// GORM akan otomatis membaca struct kita dan membuat tabelnya!
	err = db.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Shop{},
		&models.Product{},
		&models.Banner{},
		&models.CartItem{},
		&models.Order{},
		&models.OrderItem{},
	)
	if err != nil {
		log.Fatalf("Gagal auto-migrate: %v", err)
	}

	fmt.Println("✅ Database migrated successfully")

	return db
}
