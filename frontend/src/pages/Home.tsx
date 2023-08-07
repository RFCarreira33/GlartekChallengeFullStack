import { Link, useLoaderData } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import { isLoggedIn } from "../services/helpers";

const Home = () => {
  const data: any = useLoaderData();
  const loggedIn = isLoggedIn();

  return (
    <>
      <section className="grid grid-cols-2 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
        <h1 className="text-left">Weather App</h1>
        {!loggedIn ? (
          <Link to="/login" className="text-right text-blue-200">
            Login
          </Link>
        ) : (
          <Link to="/logout" className="text-right text-blue-200">
            Logout
          </Link>
        )}
        <h2 className="text-left">Glartek FullStack Challenge</h2>
        {loggedIn && <h2 className="text-right">Welcome</h2>}
      </section>
      <br />
      <section className="grid grid-cols-2 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
        {data.map((item: any) => (
          <WeatherCard
            key={item.id}
            city_id={item.id}
            city={item.name}
            feels={item.main.feels_like}
            description={item.weather[0].description}
            icon={item.weather[0].icon}
            temperature={item.main.temp}
            humidity={item.main.humidity}
            wind_speed={item.wind.speed * 3.6}
            wind_deg={item.wind.deg}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
