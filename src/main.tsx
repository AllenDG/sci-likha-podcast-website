import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { MainRoutes } from "./routes/MainRoutes";
import { initializeAllSecurityMeasures } from "./utils/security";

// Initialize security measures
initializeAllSecurityMeasures();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={MainRoutes} />
  </StrictMode>
);
