import { Link } from "react-router-dom";
import { TREATMENTS } from "../data/treatments";
import { useSeo } from "../hooks/useSeo";
import "../assets/treatment-detail.css";

// 404: slug inexistente o ruta desconocida.
export default function NotFound() {
  useSeo({
    title: "Página no encontrada | REJUVENA",
    description: "La página que buscas no existe. Explora nuestros tratamientos.",
    path: "/404",
    noindex: true,
  });

  return (
    <main className="td-404">
      <p className="td-eyebrow">Error 404</p>
      <h1>No encontramos esta página</h1>
      <p>
        El tratamiento que buscas no existe o ha cambiado de dirección. Estos
        son los que ofrecemos:
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
