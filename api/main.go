package main

import (
	"glartek/api/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/robfig/go-cache"
)

func main() {
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	cache_store := cache.New(30*time.Minute, 35*time.Minute)
	router.Use(cors.Default())

	// endpoints
	router.GET("/weather", func(context *gin.Context) {
		handlers.GetWeather(context, cache_store)
	})
	router.GET("/forecast/:city", func(context *gin.Context) {
		city := context.Param("city")
		handlers.GetForecast(context, cache_store, city)
	})
	// end endpoints

	router.Run("localhost:8080")
	println("Server is running on port 8080")
}
