package controllers

import (
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func UploadDocument(c *gin.Context) {
	// Parse the multipart form
	err := c.Request.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error parsing form"})
		return
	}

	// Retrieve the file from the form data
	file, handler, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error retrieving file from form"})
		return
	}
	defer file.Close()

	// Create a directory to save the uploaded file
	uploadDir := "./uploads"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.Mkdir(uploadDir, os.ModePerm)
	}

	// Create a file in the uploads directory
	filePath := filepath.Join(uploadDir, handler.Filename)
	out, err := os.Create(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating file"})
		return
	}
	defer out.Close()

	// Copy the uploaded file to the destination file
	_, err = io.Copy(out, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving file"})
		return
	}

	// File successfully uploaded
	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully", "filePath": filePath})
}
