package models

import "gorm.io/gorm"

// Product merepresentasikan produk yang dijual di marketplace.
type Product struct {
	gorm.Model
	Name          string  `gorm:"size:255;not null" json:"name"`
	CategorySlug  string  `gorm:"size:50;index;not null" json:"category"`
	Price         int64   `gorm:"not null" json:"price"`
	OriginalPrice int64   `json:"original_price"`
	ImageURL      string  `gorm:"size:500" json:"image"`
	Rating        float64 `json:"rating"`
	Sold          int     `json:"sold"`
	Badge         string  `gorm:"size:20" json:"badge"`
	ShopID        uint    `gorm:"index" json:"shop_id"`
	Shop          Shop    `json:"shop" gorm:"foreignKey:ShopID"`
	Location      string  `gorm:"size:100" json:"location"`
	Discount      int     `json:"discount"`
	Stock         int     `json:"stock"`
	Description   string  `gorm:"type:text" json:"description"`
	FreeShipping  bool    `json:"free_shipping"`
	Reviews       int     `json:"reviews"`
}

// ProductListResponse membungkus list produk dengan informasi pagination.
type ProductListResponse struct {
	Products   []Product `json:"products"`
	Total      int64     `json:"total"`
	Page       int       `json:"page"`
	Limit      int       `json:"limit"`
	TotalPages int       `json:"total_pages"`
}
