export async function fetchWeather() {
  const response = await fetch(`http://localhost:8080/weather`);
  if (response.status != 200) {
    throw new Error("Failed to fetch weather");
  }

  return response;
}

export async function fetchForecast(city: string) {
  const response = await fetch(`http://localhost:8080/weather/${city}`);
  if (response.status != 200) {
    throw new Error("Failed to fetch 10 day forecast");
  }

  return response;
}
