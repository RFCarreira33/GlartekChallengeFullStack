import { Link } from "react-router-dom";
import { getBackground } from "../services/helpers";

interface CardProps {
  city_id: number;
  city: string;
  weather: string;
  description: string;
  icon: string;
  temperature: number;
}

const Card: React.FC<CardProps> = ({
  city,
  weather,
  description,
  icon,
  temperature,
  city_id,
}) => {
  return (
    <div
      className="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700 relative link-card hover:scale-105 ease-out transition-transform"
      style={{
        backgroundImage: `url("src/assets/images/${getBackground(icon)}")`,
      }}
    >
      <Link to={`/${city_id}`}>
        <div className="absolute inset-0 bg-black opacity-30 brightness-80 rounded-lg"></div>
        <h5 className="mb-2 text-xl font-medium text-white relative z-10">
          {city}
        </h5>
        <div className="flex items-center justify-center">
          <img
            className="weather-badge w-12 h-12 mr-1 z-10"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
          <p className="font-medium text-white text-xl z-10">
            {temperature.toFixed(0)} °C
          </p>
        </div>
        <p className="mb-1 font-medium text-white relative z-10 drop-shadow-xl">
          {weather}
        </p>
        <p className="mb-4 text-white relative z-10 drop-shadow-xl">
          {description}
        </p>
      </Link>
    </div>
  );
};

export default Card;
