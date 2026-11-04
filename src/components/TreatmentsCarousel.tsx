import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkle } from "@phosphor-icons/react";
import { TREATMENTS } from "../data/treatments";
import "./treatments.css";

export default function TreatmentsCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [edge, setEdge] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEdge((p) => (p.start === start && p.end === end ? p : { start, end }));
  }, []);

  useEffect(() => {
    update();
    const el = track.current!;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // Avanza una tarjeta (ancho de tarjeta + separación).
  const go = (dir: 1 | -1) => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  // Arrastre con mouse; el táctil usa el scroll nativo.
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const d = drag.current;
    d.active = true;
    d.moved = false;
    d.x = e.clientX;
    d.left = track.current!.scrollLeft;
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current!.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
  };
  // Si hubo arrastre, no se sigue el enlace.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="tx" id="tratamientos" aria-labelledby="tx-title">
      <div className="tx-wrap">
        <header className="tx-head">
          <p className="tx-eyebrow">TRATAMIENTOS DESTACADOS</p>
          <h2 id="tx-title">Tratamientos diseñados para ti</h2>
          <span className="tx-rule" aria-hidden="true" />
          <p className="tx-sub">
            Procedimientos médicos pensados para realzar tu belleza natural,
            con precisión y cuidado personalizado.
          </p>
        </header>

        <div className="tx-stage">
          <button
            className="tx-arrow prev"
            aria-label="Tratamientos anteriores"
            disabled={edge.start}
            onClick={() => go(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <ul
            className={`tx-track${dragging ? " dragging" : ""}`}
            ref={track}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            onPointerCancel={onUp}
            onClickCapture={onClickCapture}
          >
            {TREATMENTS.map((t) => (
              <li className="tx-card" key={t.slug}>
                <div className="tx-photo">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.alt ?? t.name}
                      width={574}
                      height={334}
                      style={{ objectPosition: t.pos, ["--o" as string]: t.pos, ["--z" as string]: t.zoom ?? 1 }}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <div className="tx-ph" aria-hidden="true">
                      <Sparkle size={40} weight="thin" />
                    </div>
                  )}
                </div>
                <div className="tx-body">
                  <t.icon className="tx-icon" size={44} weight="thin" aria-hidden="true" />
                  <div className="tx-text">
                    <h3>{t.name}</h3>
                    <p>{t.description}</p>
                    <a
                      className="tx-link"
                      href={`${import.meta.env.BASE_URL}tratamientos/${t.slug}`}
                      draggable={false}
                    >
                      Ver más <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="tx-arrow next"
            aria-label="Más tratamientos"
            disabled={edge.end}
            onClick={() => go(1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
