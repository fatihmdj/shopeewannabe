package services

import (
	"errors"
	"time"

	"github.com/fatihmdj/shopeewannabe/backend/internal/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	DB        *gorm.DB
	JWTSecret string
}

func NewAuthService(db *gorm.DB, jwtSecret string) *AuthService {
	return &AuthService{DB: db, JWTSecret: jwtSecret}
}

// Register membuat user baru dengan password yang di-hash.
func (s *AuthService) Register(input models.RegisterInput) (*models.AuthResponse, error) {
	// Cek apakah username sudah dipakai
	var existing models.User
	if err := s.DB.Where("username = ?", input.Username).First(&existing).Error; err == nil {
		return nil, errors.New("username sudah digunakan")
	}

	// Cek apakah email sudah dipakai
	if err := s.DB.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		return nil, errors.New("email sudah digunakan")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("gagal memproses password")
	}

	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: string(hashedPassword),
		FullName: input.FullName,
	}

	if err := s.DB.Create(&user).Error; err != nil {
		return nil, errors.New("gagal membuat akun")
	}

	// Generate JWT token
	token, err := s.generateToken(user.ID)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{Token: token, User: user}, nil
}

// Login memverifikasi username dan password, lalu mengembalikan JWT token.
func (s *AuthService) Login(input models.LoginInput) (*models.AuthResponse, error) {
	var user models.User
	if err := s.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
		return nil, errors.New("username atau password salah")
	}

	// Bandingkan password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return nil, errors.New("username atau password salah")
	}

	token, err := s.generateToken(user.ID)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{Token: token, User: user}, nil
}

// GetProfile mengambil data user berdasarkan ID.
func (s *AuthService) GetProfile(userID uint) (*models.User, error) {
	var user models.User
	if err := s.DB.First(&user, userID).Error; err != nil {
		return nil, errors.New("user tidak ditemukan")
	}
	return &user, nil
}

// UpdateProfile mengupdate data profil user.
func (s *AuthService) UpdateProfile(userID uint, input models.UpdateProfileInput) (*models.User, error) {
	var user models.User
	if err := s.DB.First(&user, userID).Error; err != nil {
		return nil, errors.New("user tidak ditemukan")
	}

	// Update field yang diisi
	if input.FullName != "" {
		user.FullName = input.FullName
	}
	if input.Phone != "" {
		user.Phone = input.Phone
	}
	if input.Address != "" {
		user.Address = input.Address
	}
	if input.AvatarURL != "" {
		user.AvatarURL = input.AvatarURL
	}

	s.DB.Save(&user)
	return &user, nil
}

func (s *AuthService) generateToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.JWTSecret))
}
