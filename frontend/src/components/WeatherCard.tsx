import { Link } from "react-router-dom";
import {
  getBackground,
  getCapitalized,
  getWindDirection,
} from "../services/helpers";

interface CardProps {
  city_id: number;
  city: string;
  feels: number;
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
}

const WeatherCard: React.FC<CardProps> = ({
  city,
  feels,
  description,
  icon,
  temperature,
  wind_speed,
  wind_deg,
  city_id,
}) => {
  return (
    <div
      className="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700 relative link-card hover:scale-105 ease-out transition-transform"
      style={{
        backgroundImage: `url("src/assets/images/${getBackground(
          icon.slice(0, -1)
        )}")`,
      }}
    >
      <Link to={`/forecast/${city_id}`}>
        <div className="absolute inset-0 bg-black opacity-30 brightness-80 rounded-lg"></div>
        <h5 className="mb-2 text-xl font-medium text-white relative z-10">
          {city}
        </h5>
        <div className="flex items-center justify-center pr-2">
          <img
            className="weather-badge w-12 h-12 z-10 brightness-120"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
          <p className="font-medium text-white text-xl z-10">
            {temperature.toFixed(0)} °C
          </p>
        </div>
        <p className="text-white relative z-10 drop-shadow-xl">
          Feels like {feels.toFixed(0)} °C
        </p>
        <p className="mb-4 text-white relative z-10 drop-shadow-xl">
          {getCapitalized(description)}
        </p>
        <div className="flex items-center justify-center ">
          <p className="font-medium z-10">
            Wind: {wind_speed.toFixed()} km/h {getWindDirection(wind_deg)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default WeatherCard;
