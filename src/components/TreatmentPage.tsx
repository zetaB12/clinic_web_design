import { TREATMENTS } from "../data/treatments";
import "./treatments.css";

// Página individual /tratamientos/:slug, alimentada por el mismo array de datos.
export default function TreatmentPage({ slug }: { slug: string }) {
  const t = TREATMENTS.find((x) => x.slug === slug);
  return (
    <main className="txp">
      <a className="tx-link" href={`${import.meta.env.BASE_URL}#tratamientos`}>
        <span aria-hidden="true">←</span> Todos los tratamientos
      </a>
      {t ? (
        <>
          <p className="tx-eyebrow">TRATAMIENTO</p>
          <h1>{t.name}</h1>
          {t.image && <img src={t.image} alt={t.alt ?? t.name} />}
          <p className="tx-sub">{t.description}</p>
          <a className="btn" href={`${import.meta.env.BASE_URL}#reservar`}>
            Reservar valoración
          </a>
        </>
      ) : (
        <h1>Tratamiento no encontrado</h1>
      )}
    </main>
  );
}
