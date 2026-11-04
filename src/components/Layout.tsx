import { useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import Header from "./Header";

// Layout persistente: el Header vive aquí, fuera de <Outlet />, por lo que no se
// desmonta ni reinicia al cambiar de ruta. Sólo cambia el contenido de la página.
export default function Layout() {
  const { pathname, hash, key } = useLocation();
  const type = useNavigationType();

  // Scroll al ancla (#seccion) o al inicio en cada navegación nueva.
  useEffect(() => {
    if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView();
    } else if (type !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, key, type]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
