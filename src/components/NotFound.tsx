import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TREATMENTS } from "../data/treatments";
import "./treatment-detail.css";

// 404: slug inexistente o ruta desconocida.
export default function NotFound() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Página no encontrada | REJUVENA";
    return () => void (document.title = prev);
  }, []);

  return (
    <main className="td-404">
      <p className="td-eyebrow">Error 404</p>
      <h1>No encontramos esta página</h1>
      <p>
        El tratamiento que buscas no existe o ha cambiado de dirección. Estos son
        los que ofrecemos:
      </p>
      <ul>
        {TREATMENTS.map((t) => (
          <li key={t.slug}>
            <Link to={`/tratamientos/${t.slug}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
      <Link className="btn" to="/">
        Volver al inicio
      </Link>
    </main>
  );
}
