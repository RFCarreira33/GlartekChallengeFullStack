import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchForecast, fetchWeather } from "./services/api.tsx";
import Home from "./pages/Home.tsx";
import Forecast from "./pages/Forecast.tsx";
import ErrorPage from "./pages/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => fetchWeather(),
    errorElement: (
      <ErrorPage error={Error("Failed to fetch Weather try again later")} />
    ),
  },
  {
    path: "/:city",
    element: <Forecast />,
    loader: ({ params }) => fetchForecast(params.city!),
    errorElement: (
      <ErrorPage
        error={Error("Failed to fetch 10 day forecast try again later")}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
