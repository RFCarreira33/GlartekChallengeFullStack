package config

const API_KEY = "c4a04758561c56c17e9db53e3f9090f0"
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_URL_GENERAL = API_BASE_URL + "weather?units=metric&lang=en&appid=" + API_KEY
const API_URL_SEVEN_DAYS = API_BASE_URL + "forecast?units=metric&lang=en&cnt=10&appid=" + API_KEY

var CITY_IDS = [5]string{
	"2267056", // Lisboa
	"2267094", // Leiria
	"2740636", // Coimbra
	"2735941", // Porto
	"2268337", // Faro
}

const WEATHER_CACHE_KEY = "weathers"
const FORECAST_CACHE_KEY = "forecast_"
