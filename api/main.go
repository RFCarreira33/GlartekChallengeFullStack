package main

import (
	"encoding/json"
	"glartek/api/config"
	"glartek/api/types"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

/**
* Function that makes a request and decodes json into a target struct
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
* Function that gets the weather from the API and returns it as a JSON
* @param context *gin.Context
**/
func getWeather(context *gin.Context) {
	var weathers []types.Weather = make([]types.Weather, len(config.CITY_IDS))
	for index, city := range config.CITY_IDS {
		var weather types.Weather
		url := config.API_URL + "&id=" + city
		err := makeRequest(url, &weather)
		if err != nil {
			context.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		weathers[index] = weather
	}

	context.IndentedJSON(http.StatusOK, weathers)
}

func main() {
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/weather", getWeather)
	router.Run("localhost:8080")
	println("Server is running on port :8080")
}
