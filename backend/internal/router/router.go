package router

import (
	"github.com/fatihmdj/shopeewannabe/backend/internal/config"
	"github.com/fatihmdj/shopeewannabe/backend/internal/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SetupRouter mendaftarkan semua route dan middleware ke Gin engine.
func SetupRouter(db *gorm.DB, cfg *config.Config) *gin.Engine {
	r := gin.Default()

	// Pasang Middleware CORS
	r.Use(middleware.CORSMiddleware(cfg.FrontendURL))

	// Endpoint sederhana untuk testing server hidup atau mati
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "Shopee Clone API is running"})
	})

	return r
}
