package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port        string
	DBDriver    string
	DBPath      string
	JWTSecret   string
	FrontendURL string
}

func LoadConfig() *Config {
	godotenv.Load() // baca file .env

	return &Config{
		Port:        getEnv("PORT", "8080"),
		DBDriver:    getEnv("DB_DRIVER", "sqlite"),
		DBPath:      getEnv("DB_PATH", "./shopee.db"),
		JWTSecret:   getEnv("JWT_SECRET", "default-secret"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:5174"),
	}
}

func getEnv(key, fallback string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return fallback
}
