package main

import (
	"glartek/api/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/robfig/go-cache"
)

func main() {
	// Setup router and cache
	router := gin.Default()
	cache_store := cache.New(30*time.Minute, 35*time.Minute)
	// Allow CORS and headers used by the react app
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"Authorization", "Content-Type", "Origin"},
	}))

	// endpoints
	router.GET("/weather", func(context *gin.Context) {
		handlers.GetWeather(context, cache_store)
	})
	router.GET("/weather/:city", func(context *gin.Context) {
		city := context.Param("city")
		handlers.GetForecast(context, cache_store, city)
	})

	router.POST("/login", func(context *gin.Context) {
		handlers.Login(context)
	})
	// end endpoints

	router.Run("localhost:8080")
	println("Server is running on port 8080")
}
