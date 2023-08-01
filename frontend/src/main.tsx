import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchWeather } from "./services/api.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetchWeather(),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
