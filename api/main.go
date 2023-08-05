package main

import (
	"glartek/api/handlers"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/robfig/go-cache"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		panic(err)
	}
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
	host := os.Getenv("HOST") + ":" + os.Getenv("PORT")
	router.Run(host)
	println("Server is running on host " + host)
}
