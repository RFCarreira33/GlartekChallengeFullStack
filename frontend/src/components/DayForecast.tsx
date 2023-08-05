import { getWindDirection } from "../services/helpers";

interface DayForecastProps {
  time: number;
  weather: string;
  temp_max: number;
  temp_min: number;
  wind_speed: number;
  wind_deg: number;
}

const DayForecast: React.FC<DayForecastProps> = ({
  weather,
  temp_max,
  temp_min,
  wind_speed,
  wind_deg,
  time,
}) => {
  return (
    <>
      <section className="mx-4 my-2 grid grid-cols-4 gap-4 auto-cols-max md:grid-cols-5 s:grid-cols-4 xs:gap-3">
        <p className="font-bold">{time}H</p>
        <p className="font-bold">{weather}</p>
        <p className="font-bold text-amber-200 relative">{temp_max} °C</p>
        <p className="font-bold text-sky-200 relative">{temp_min} °C</p>
        <p className="field-wind font-bold">
          {wind_speed.toFixed()} km/h {getWindDirection(wind_deg)}
        </p>
      </section>
      <hr />
    </>
  );
};

export default DayForecast;
