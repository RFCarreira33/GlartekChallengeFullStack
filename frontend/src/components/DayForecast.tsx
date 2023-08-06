import { getWindDirection } from "../services/helpers";

interface DayForecastProps {
  time: number;
  weather: string;
  temp: number;
  wind_speed: number;
  wind_deg: number;
}

const DayForecast: React.FC<DayForecastProps> = ({
  weather,
  temp,
  wind_speed,
  wind_deg,
  time,
}) => {
  return (
    <>
      <section className="mx-4 my-2 grid grid-cols-4 gap-4 auto-cols-max md:grid-cols-4 s:grid-cols-4 xs:gap-3">
        <p className="font-bold">{time}H</p>
        <p className="font-bold text-blue-200">{weather}</p>
        <p className="font-bold relative">{temp} °C</p>
        <p className="field-wind font-bold">
          {wind_speed.toFixed()} km/h {getWindDirection(wind_deg)}
        </p>
      </section>
      <hr />
    </>
  );
};

export default DayForecast;
