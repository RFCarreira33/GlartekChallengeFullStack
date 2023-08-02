import { useLoaderData } from "react-router-dom";
import {
  getBackground,
  getWindDirection,
  getWeekdays,
} from "../services/helpers";
import DayForecast from "../components/day_forecast";

const Forecast = () => {
  const data: any = useLoaderData();
  const weekdays = getWeekdays();

  return (
    <>
      <div
        className="block rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700"
        style={{
          backgroundImage: `url("src/assets/images/${getBackground(
            data.list[0].weather[0].icon
          )}")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30 brightness-80 rounded-lg"></div>
        <h1 className="relative z-10">{data.city.name}</h1>
        <h1 className="font-xl text-xl relative z-10">
          {data.list[0].main.temp.toFixed(0)} °C
        </h1>
        <p className="mb-4 font-l text-l text-white drop-shadow-l relative z-10">
          {data.list[0].weather[0].description}
        </p>
        <div className="flex items-center justify-center relative z-10">
          <p className="font-medium text-white text-l">
            H: {data.list[0].main.temp_max.toFixed(0)} °C
          </p>
          <p className="mx-2"></p>
          <p className="font-medium text-white text-l">
            L: {data.list[0].main.temp_min.toFixed(0)} °C
          </p>
          <p className="mx-2 font-medium text-white text-l">
            {`Gusts: ${data.list[0].wind.speed.toFixed(0)} km/h 
            ${getWindDirection(data.list[0].wind.deg)}`}
          </p>
        </div>
      </div>
      <br />
      <div className="relative z-10">
        <h2>10 Day Forecast</h2>
        <hr />
        {data.list.map((day: any, index: number) => (
          <DayForecast
            key={index}
            day={index == 0 ? "Today" : weekdays[index % 7]}
            weather={day.weather[0].main}
            temp_max={day.main.temp_max.toFixed(0)}
            temp_min={day.main.temp_min.toFixed(0)}
            wind_speed={day.wind.speed}
            wind_deg={day.wind.deg}
          />
        ))}
      </div>
    </>
  );
};

export default Forecast;
