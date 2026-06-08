package models

import "gorm.io/gorm"

// CartItem merepresentasikan satu item di keranjang belanja user.
type CartItem struct {
	gorm.Model
	UserID    uint    `gorm:"index;not null" json:"user_id"`
	ProductID uint    `gorm:"not null" json:"product_id"`
	Product   Product `json:"product" gorm:"foreignKey:ProductID"`
	Quantity  int     `gorm:"not null;default:1" json:"quantity"`
	Variant   string  `gorm:"size:255" json:"variant"`
}

// AddToCartInput adalah payload untuk menambahkan item ke cart.
type AddToCartInput struct {
	ProductID uint   `json:"product_id" binding:"required"`
	Quantity  int    `json:"quantity" binding:"required,min=1"`
	Variant   string `json:"variant"`
}

// UpdateCartInput adalah payload untuk update quantity cart item.
type UpdateCartInput struct {
	Quantity int `json:"quantity" binding:"required,min=1"`
}
