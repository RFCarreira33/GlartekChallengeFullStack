package handlers

import (
	"encoding/json"
	"glartek/api/config"
	"glartek/api/helpers"
	"glartek/api/types"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/robfig/go-cache"
)

func Login(context *gin.Context) {
	// Simulate a database check
	var userCredentials types.User
	err := json.NewDecoder(context.Request.Body).Decode(&userCredentials)
	if err != nil {
		context.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error() + " - Error on decoding credential"})
		return
	}

	if !userCredentials.CheckCrendentials() {
		context.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Create JWT token and send it back
	claims := &types.JwtClaims{
		Username:       userCredentials.Username,
		StandardClaims: jwt.StandardClaims{},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(config.SECRET_KEY))

	if err != nil {
		context.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.IndentedJSON(http.StatusOK, gin.H{"token": signedToken})
}

/**
* Function that gets the weather from the API or from the cache
* @param context *gin.Context
* @param cache_store *cache.Cache
**/
func GetWeather(context *gin.Context, cache_store *cache.Cache) {
	// Hit cache if exists
	if weathers, found := cache_store.Get(config.WEATHER_CACHE_KEY); found {
		context.IndentedJSON(http.StatusOK, weathers)
		return
	}

	// Get weather from API and cache it
	var weathers []types.Weather = make([]types.Weather, len(config.CITY_IDS))
	for index, city := range config.CITY_IDS {
		var weather types.Weather
		url := config.API_URL_GENERAL + "&id=" + city
		err := helpers.MakeRequest(url, &weather)
		if err != nil {
			context.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		weathers[index] = weather
	}
	cache_store.Set(config.WEATHER_CACHE_KEY, weathers, 30*time.Minute)
	context.IndentedJSON(http.StatusOK, weathers)
}

/**
* Function that gets the 7 day forecast by city id from the API or from the cache
* @param context *gin.Context
* @param cache_store *cache.Cache
* @param request_city string
**/
func GetForecast(context *gin.Context, cache_store *cache.Cache, city_id string) {
	// Check for authentication
	tokenString := context.Request.Header.Get("Authorization")
	if tokenString == "" {
		println("Missing")
		context.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "Missing authorization token"})
		return
	}
	tokenString = strings.Replace(tokenString, "Bearer ", "", 1)
	if !helpers.IsTokenValid(tokenString) {
		println("Error on decoding credential")
		context.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization token"})
		return
	}

	// Hit cache if exists
	if forecast, found := cache_store.Get(config.FORECAST_CACHE_KEY + city_id); found {
		context.IndentedJSON(http.StatusOK, forecast)
		return
	}

	// Check if city id is valid (exists in config.CITY_IDS)
	city := ""
	for _, id := range config.CITY_IDS {
		if id == city_id {
			city = id
			break
		}
	}
	if city == "" {
		context.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid city id"})
		return
	}

	// Get forecast from API and cache it
	var forecast types.Forecast
	url := config.API_URL_SEVEN_DAYS + "&id=" + city_id
	err := helpers.MakeRequest(url, &forecast)
	if err != nil {
		context.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	cache_store.Set(config.FORECAST_CACHE_KEY+city_id, forecast, 30*time.Minute)
	context.IndentedJSON(http.StatusOK, forecast)
}
