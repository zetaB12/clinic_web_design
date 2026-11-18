import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import TreatmentDetail from "./components/TreatmentDetail.tsx";
import NotFound from "./components/NotFound.tsx";

// Sitio en la raíz del dominio (https://rejuvena.neal.pe/): sin basename.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="tratamientos/:slug" element={<TreatmentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
