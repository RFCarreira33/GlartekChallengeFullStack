interface CardProps {
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
}) => {
  return (
    <div
      className="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700 relative link-card hover:scale-105 ease-out transition-transform"
      style={{
        backgroundImage: `url("src/assets/images/${getBackground(icon)}")`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 brightness-80 rounded-lg"></div>
      <h5 className="mb-2 text-xl font-medium text-white relative z-10">
        {city}
      </h5>
      <div className="flex items-center justify-center mr-4">
        <img
          className="w-12 h-12 mr-2 z-10"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
        <p className="font-medium text-white text-xl z-10">{temperature} °C</p>
      </div>
      <p className="mb-1 font-medium text-white relative z-10 drop-shadow-xl">
        {weather}
      </p>
      <p className="mb-4 text-white relative z-10 drop-shadow-xl">
        {description}
      </p>
    </div>
  );
};

const getBackground = (icon: string) => {
  switch (icon) {
    case "01d":
      return "clear-d.jpg";
    case "01n":
      return "clear-n.jpg";
    case "02d":
    case "03d":
    case "04d":
      return "cloudy-d.jpg";
    case "02n":
    case "03n":
    case "04n":
      return "cloudy-n.jpg";
    case "09d":
    case "10d":
      return "rainy-d.jpg";
    case "09n":
    case "10n":
      return "rainy-n.png";
    case "11d":
    case "11n":
      return "thunderstorm.jpg";
    case "13d":
    case "13n":
      return "snow.jpg";
    default:
      return "clear-d.jpg";
  }
};

export default Card;
