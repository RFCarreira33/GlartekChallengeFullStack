package handlers

import (
	"encoding/json"
	"glartek/api/config"
	"glartek/api/types"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/robfig/go-cache"
)

/**
* Helper function that makes a request and decodes json into a target interface
* @param url string
* @param target interface{}
**/
func makeRequest(url string, target interface{}) error {
	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return json.NewDecoder(res.Body).Decode(target)
}

/**
* Function that gets the weather from the API or from the cache
* @param context *gin.Context
* @param cache_store *cache.Cache
**/
func GetWeather(context *gin.Context, cache_store *cache.Cache) {
	if weathers, found := cache_store.Get(config.WEATHER_CACHE_KEY); found {
		context.IndentedJSON(http.StatusOK, weathers)
		return
	}

	var weathers []types.Weather = make([]types.Weather, len(config.CITY_IDS))
	for index, city := range config.CITY_IDS {
		var weather types.Weather
		url := config.API_URL_GENERAL + "&id=" + city
		err := makeRequest(url, &weather)
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
	if forecast, found := cache_store.Get(config.FORECAST_CACHE_KEY + city_id); found {
		context.IndentedJSON(http.StatusOK, forecast)
		return
	}

	var forecast types.Forecast
	url := config.API_URL_SEVEN_DAYS + "&id=" + city_id
	err := makeRequest(url, &forecast)
	if err != nil {
		context.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	cache_store.Set(config.FORECAST_CACHE_KEY+city_id, forecast, 30*time.Minute)
	context.IndentedJSON(http.StatusOK, forecast)
}
