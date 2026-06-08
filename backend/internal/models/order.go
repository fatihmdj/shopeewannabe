package models

import "gorm.io/gorm"

// Order merepresentasikan pesanan yang sudah di-checkout.
type Order struct {
	gorm.Model
	UserID      uint        `gorm:"index;not null" json:"user_id"`
	TotalAmount int64       `gorm:"not null" json:"total_amount"`
	Status      string      `gorm:"size:20;not null;default:'pending'" json:"status"`
	Address     string      `gorm:"type:text;not null" json:"address"`
	Items       []OrderItem `json:"items" gorm:"foreignKey:OrderID"`
}

// OrderItem merepresentasikan satu produk dalam sebuah order.
type OrderItem struct {
	gorm.Model
	OrderID   uint    `gorm:"index;not null" json:"order_id"`
	ProductID uint    `gorm:"not null" json:"product_id"`
	Product   Product `json:"product" gorm:"foreignKey:ProductID"`
	Quantity  int     `gorm:"not null" json:"quantity"`
	Price     int64   `gorm:"not null" json:"price"`
}

// CreateOrderInput adalah payload untuk membuat order dari cart.
type CreateOrderInput struct {
	Address string `json:"address" binding:"required"`
}
