package models

import "gorm.io/gorm"

// User merepresentasikan pengguna yang terdaftar.
type User struct {
	gorm.Model
	Username  string `gorm:"uniqueIndex;size:50;not null" json:"username"`
	Email     string `gorm:"uniqueIndex;size:100;not null" json:"email"`
	Password  string `gorm:"not null" json:"-"`
	FullName  string `gorm:"size:100" json:"full_name"`
	Phone     string `gorm:"size:20" json:"phone"`
	Address   string `gorm:"type:text" json:"address"`
	AvatarURL string `gorm:"size:255" json:"avatar_url"`
}

// DTO (Data Transfer Object) — struct untuk menerima input dari client

type RegisterInput struct {
	Username string `json:"username" binding:"required,min=3,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	FullName string `json:"full_name"`
}

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UpdateProfileInput struct {
	FullName  string `json:"full_name"`
	Phone     string `json:"phone"`
	Address   string `json:"address"`
	AvatarURL string `json:"avatar_url"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}
