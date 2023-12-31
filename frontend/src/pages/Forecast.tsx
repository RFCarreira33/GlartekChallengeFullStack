import { useLoaderData } from "react-router-dom";
import {
  getBackground,
  getWindDirection,
  getCapitalized,
} from "../services/helpers";
import DayForecast from "../components/DayForecast";

interface ForecastProps {
  city: string;
  icon: string;
  temperature: number;
  temp_max: number;
  temp_min: number;
  description: string;
  wind_speed: number;
  wind_deg: number;
}

const Forecast = () => {
  const data: any = useLoaderData();

  const recentData: ForecastProps = {
    city: data.city.name,
    icon: data.list[0].weather[0].icon,
    temperature: data.list[0].main.temp,
    temp_max: data.list[0].main.temp_max,
    temp_min: data.list[0].main.temp_min,
    description: data.list[0].weather[0].description,
    wind_speed: data.list[0].wind.speed * 3.6,
    wind_deg: data.list[0].wind.deg,
  };

  return (
    <>
      <div
        className="block rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700"
        style={{
          backgroundImage: `url("/src/assets/images/${getBackground(
            recentData.icon.slice(0, -1)
          )}")`,
        }}
      >
        <div className="fixed inset-0 bg-black opacity-30 brightness-80 rounded-lg"></div>
        <h1 className="relative z-10">{data.city.name}</h1>
        <div className="flex items-center justify-center">
          <img
            className="weather-badge w-12 h-12 mr-1 z-10 brightness-120"
            src={`https://openweathermap.org/img/wn/${recentData.icon}@2x.png`}
            alt="weather icon"
          />
          <h1 className="font-xl text-xl relative z-10">
            {recentData.temperature.toFixed(0)} °C
          </h1>
        </div>

        <p className="mb-4 font-l text-l text-white drop-shadow-l relative z-10">
          {getCapitalized(recentData.description)}
        </p>
        <div className="flex items-center justify-center relative z-10">
          <p className="font-medium text-white text-l">
            H: {recentData.temp_max.toFixed(0)} °C
          </p>
          <p className="mx-2"></p>
          <p className="font-medium text-white text-l">
            L: {recentData.temp_min.toFixed(0)} °C
          </p>
          <p className="mx-2"></p>
          <p className="font-medium text-white text-l">
            {`Wind: ${recentData.wind_speed.toFixed(0)} km/h 
            ${getWindDirection(recentData.wind_deg)}`}
          </p>
        </div>
      </div>
      <br />
      <div className="relative z-10">
        <h2>48 Hour Forecast</h2>
        <hr />
        {data.list.map((day: any, index: number) => (
          <DayForecast
            key={index}
            time={new Date(day.dt * 1000).getHours()}
            weather={day.weather[0].main}
            temp={day.main.temp.toFixed(0)}
            wind_speed={day.wind.speed * 3.6}
            wind_deg={day.wind.deg}
          />
        ))}
      </div>
    </>
  );
};

export default Forecast;
