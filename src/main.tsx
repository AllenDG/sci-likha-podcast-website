// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { MainRoutes } from "./routes/MainRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={MainRoutes} />
  </StrictMode>
);
