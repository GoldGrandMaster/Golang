package controllers

import (
	"go-auth/initializers"
	"go-auth/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateApp(c *gin.Context) {
	var appInput models.AppInput

	if err := c.ShouldBindJSON(&appInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	application := models.Application{
		Owner:      "",
		AppNumber:  appInput.AppNumber,
		Statements: "0/0 reconcile",
		AppStatus:  0,
	}

	if err := initializers.DB.Create(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"application": application,
	})
}

func GetAppList(c *gin.Context) {
	var applications []models.Application

	// Fetch all applications from the database
	if err := initializers.DB.Find(&applications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the list of applications as a JSON response
	c.JSON(http.StatusOK, gin.H{"applications": applications})
}

func GetAppById(c *gin.Context) {
	// Get the application ID from the URL parameter
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid application ID"})
		return
	}

	var application models.Application

	// Find the application by ID
	if err := initializers.DB.First(&application, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Application not found"})
		return
	}

	// Return the application details as a JSON response
	c.JSON(http.StatusOK, gin.H{"application": application})
}
