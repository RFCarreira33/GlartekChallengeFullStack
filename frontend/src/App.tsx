import { useLoaderData } from "react-router-dom";
import "./App.css";
import Card from "./components/card";
import { WeatherResponse } from "./services/api";

function App() {
  const data: any = useLoaderData();

  return (
    <>
      <h1 className="text-center">Weather App</h1>
      <h2 className="text-center">Glartek FullStack Challenge</h2>
      <br />
      <section className="grid grid-cols-2 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
        {data.map((item: WeatherResponse, index: number) => (
          <Card
            key={index}
            city={item.name}
            weather={item.weather[0].main}
            description={item.weather[0].description}
            icon={item.weather[0].icon}
            temperature={item.main.temp}
          />
        ))}
      </section>
    </>
  );
}

export default App;
