import type { ReactNode } from "react";
import "../assets/curtain.css";

/**
 * Curtain reveal solo con CSS:
 *  - Capa 1 (.cr-img): imagen `position: sticky; top: 0` a pantalla completa.
 *    No se mueve, escala ni cambia de opacidad.
 *  - Capa 2 (.cr-cover): la sección siguiente (children), con fondo sólido y
 *    z-index superior. Al hacer scroll sube sobre la imagen y la tapa.
 * El avance lo marca el scroll real; no hay temporizadores ni JS.
 */
export default function CurtainReveal({ children }: { children: ReactNode }) {
  return (
    <div className="cr">
      <div className="cr-img">
        <img
          src={`${import.meta.env.BASE_URL}image/transicion/pink-glow.webp`}
          alt="Especialista realizando un tratamiento Pink Glow a una paciente relajada"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
        />
        <div className="cr-shade" aria-hidden="true" />
        <div className="cr-copy">
          <p className="cr-eyebrow">PIEL CON LUZ PROPIA</p>
          <p className="cr-line">Resultados que se ven naturales.</p>
        </div>
      </div>
      <div className="cr-hold" aria-hidden="true" />
      <div className="cr-cover">{children}</div>
    </div>
  );
}
