package models

// Banner merepresentasikan banner promo untuk carousel homepage.
type Banner struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	Title     string `gorm:"size:100;not null" json:"title"`
	Subtitle  string `gorm:"size:200" json:"subtitle"`
	BgColor   string `gorm:"size:20" json:"bg_color"`
	TextColor string `gorm:"size:20" json:"text_color"`
	Gradient  string `gorm:"size:255" json:"gradient"`
}
