interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface WeatherResponse {
  name: string;
  weather: Weather[];
  main: Main;
  wind: Wind;
}

export async function fetchWeather() {
  const response = await fetch(`http://localhost:8080/weather`);
  if (response.status != 200) {
    throw new Error("Failed to fetch weather");
  }

  const obj: WeatherResponse = await response.json();

  return obj;
}
