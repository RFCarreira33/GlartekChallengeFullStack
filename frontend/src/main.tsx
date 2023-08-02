import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchForecast, fetchWeather } from "./services/api.tsx";
import Home from "./pages/home.tsx";
import Forecast from "./pages/forecast.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => fetchWeather(),
  },
  {
    path: "/:city",
    element: <Forecast />,
    loader: ({ params }) => fetchForecast(params.city!),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
