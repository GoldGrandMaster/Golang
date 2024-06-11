package controllers

import (
	"go-auth/initializers"
	"go-auth/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var authInput models.SignupInput

	if err := c.ShouldBindJSON(&authInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userFound models.User
	initializers.DB.Where("username = ? OR email = ?", authInput.Username, authInput.Email).Find(&userFound)

	if userFound.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username or email is already exist"})
		return
	}

	// initializers.DB.Where("email=?", authInput.Email).Find(&userFound)
	// if userFound.ID != 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "email is already exist"})
	// 	return
	// }

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(authInput.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Username: authInput.Username,
		Email:    authInput.Email,
		Password: string(passwordHash),
	}

	initializers.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func LoginUser(c *gin.Context) {
	var authInput models.LoginInput

	if err := c.ShouldBindJSON(&authInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userFound models.User
	initializers.DB.Where("username = ? OR email = ?", authInput.User, authInput.User).First(&userFound)

	if userFound.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFound.Password), []byte(authInput.Password)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid password"})
		return
	}

	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  userFound.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := generateToken.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(200, gin.H{
		"user":  userFound,
		"token": token,
	})
}
