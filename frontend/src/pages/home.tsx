import { Link, useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import { getToken } from "../services/helpers";

const Home = () => {
  const data: any = useLoaderData();

  return (
    <>
      <section className="grid grid-cols-2 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
        <h1 className="text-center">Weather App</h1>
        {getToken() == null ? (
          <Link to="/login" className="text-right text-blue-200">
            Login
          </Link>
        ) : (
          <Link to="/logout" className="text-right text-blue-200">
            Logout
          </Link>
        )}
        <h2 className="text-center">Glartek FullStack Challenge</h2>
      </section>
      <br />
      <section className="grid grid-cols-2 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
        {data.map((item: any) => (
          <Card
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
