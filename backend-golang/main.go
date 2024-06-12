package main

import (
	"go-auth/controllers"
	"go-auth/initializers"
	"go-auth/middlewares"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvs()
	initializers.ConnectDB()
}

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}

	router.Use(cors.New(config))

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "hello world! THis is Golang!"})
	})

	/* User Authentication Router */
	router.POST("/api/auth/register", controllers.CreateUser)
	router.POST("/api/auth/login", controllers.LoginUser)
	router.GET("/user/profile", middlewares.CheckAuth, controllers.GetUserProfile)

	/* Application Router */
	router.POST("/api/app/create", controllers.CreateApp)
	router.GET("/api/app/getlist", controllers.GetAppList)
	router.GET("/api/app/get/:id", controllers.GetAppById)

	/* Document Uploading */
	router.POST("/api/upload", controllers.UploadDocument)

	router.Run()
}
