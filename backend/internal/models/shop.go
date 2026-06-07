package models

// Shop merepresentasikan toko/penjual di marketplace.
type Shop struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	Name         string  `gorm:"size:100;not null" json:"name"`
	AvatarURL    string  `gorm:"size:500" json:"avatar"`
	Badge        string  `gorm:"size:20" json:"badge"`
	Rating       float64 `json:"rating"`
	ResponseRate int     `json:"response_rate"`
	ResponseTime string  `gorm:"size:50" json:"response_time"`
	Followers    int     `json:"followers"`
	ProductCount int     `json:"products"`
	Joined       string  `gorm:"size:50" json:"joined"`
	Location     string  `gorm:"size:100" json:"location"`
}
