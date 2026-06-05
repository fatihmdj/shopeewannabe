package models

// Category merepresentasikan kategori produk.
type Category struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"size:100;not null" json:"name"`
	Icon string `gorm:"size:10" json:"icon"`
	Slug string `gorm:"uniqueIndex;size:50;not null" json:"slug"`
}
