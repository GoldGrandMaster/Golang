package controllers

import (
	"go-auth/initializers"
	"go-auth/models"
	"net/http"

	"github.com/gin-gonic/gin"
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
