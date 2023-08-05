package config

// API constants
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_URL_WEATHER = API_BASE_URL + "weather?units=metric&lang=en&appid="
const API_URL_FORECAST = API_BASE_URL + "forecast?units=metric&lang=en&cnt=16&appid="

// Supported cities
var CITY_IDS = [5]string{
	"2267056", // Lisboa
	"2267094", // Leiria
	"2740636", // Coimbra
	"2735941", // Porto
	"2268337", // Faro
}

// Cache keys
const WEATHER_CACHE_KEY = "weathers"
const FORECAST_CACHE_KEY = "forecast_"
