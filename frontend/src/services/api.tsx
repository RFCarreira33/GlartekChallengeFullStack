import { redirect } from "react-router-dom";
import { BACKEND_URL, TOKEN_KEY } from "./constants";
import { getToken } from "./helpers";

export async function fetchWeather() {
  const response = await fetch(`${BACKEND_URL}/weather`);
  if (response.status != 200) {
    throw new Error("Failed to fetch weather data");
  }

  return response;
}

export async function fetchForecast(city: string) {
  const response = await fetch(`${BACKEND_URL}/weather/${city}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const status = response.status;
  if (status != 200) {
    switch (status) {
      case 401:
        localStorage.removeItem(TOKEN_KEY);
        return redirect("/login");
      case 400:
        throw new Error("Invalid city");
      default:
        throw new Error("Failed to fetch forecast data");
    }
  }
  return response;
}

export async function login(request: Request) {
  const data = await request.formData();

  const response = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.get("username"),
      password: data.get("password"),
    }),
  });

  const responseData = await response.json();
  if (response.status != 200) {
    return { error: responseData.error };
  }

  localStorage.setItem(TOKEN_KEY, responseData.token);
  return redirect("/");
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  return redirect("/");
}
