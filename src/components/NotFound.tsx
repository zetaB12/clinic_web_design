import { useEffect } from "react";
import { TREATMENTS } from "../data/treatments";
import "./treatment-detail.css";

const BASE = import.meta.env.BASE_URL;

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
            <a href={`${BASE}tratamientos/${t.slug}`}>{t.name}</a>
          </li>
        ))}
      </ul>
      <a className="btn" href={BASE}>
        Volver al inicio
      </a>
    </main>
  );
}
