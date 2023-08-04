import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { fetchForecast, fetchWeather, login, logout } from "./services/api.tsx";
import Home from "./pages/Home.tsx";
import Forecast from "./pages/Forecast.tsx";
import ErrorPage from "./pages/Error.tsx";
import Login from "./pages/Login.tsx";
import { isLoggedIn } from "./services/helpers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => fetchWeather(),
    errorElement: <ErrorPage />,
  },
  {
    path: "/:city",
    element: <Forecast />,
    loader: ({ params }) =>
      isLoggedIn() ? fetchForecast(params.city!) : redirect("/login"),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    action: ({ request }) => login(request),
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    loader: () => logout(),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
