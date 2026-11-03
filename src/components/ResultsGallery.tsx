import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeAfterSlider from "./BeforeAfterSlider";
import {
  CASES,
  TREATMENT_FILTERS,
  type ResultCase,
  type TreatmentId,
} from "../data/results";
import "./results.css";

type Filter = "all" | TreatmentId;

const LABEL = Object.fromEntries(
  TREATMENT_FILTERS.map((f) => [f.id, f.label]),
) as Record<TreatmentId, string>;

export default function ResultsGallery({
  cases = CASES,
}: {
  cases?: ResultCase[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);
  const shown = useRef(false);

  // Cantidades reales: se cuentan desde los datos, nunca se escriben a mano.
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: cases.length };
    TREATMENT_FILTERS.forEach((f) => (c[f.id] = 0));
    cases.forEach((x) => (c[x.treatment] += 1));
    return c;
  }, [cases]);

  const visible =
    filter === "all" ? cases : cases.filter((c) => c.treatment === filter);

  // Fade-in discreto: la primera vez al entrar en pantalla, luego al cambiar de filtro.
  useLayoutEffect(() => {
    const el = grid.current;
    if (!el || !el.children.length) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const play = () => {
        shown.current = true;
        gsap.to(el.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.07,
          clearProps: "opacity,transform",
        });
      };
      gsap.set(el.children, { opacity: 0, y: 16 });
      if (shown.current) play();
      else
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: play,
        });
    }, el);
    return () => ctx.revert();
  }, [filter, cases]);

  return (
    <section
      className="results"
      id="resultados"
      aria-labelledby="results-title"
    >
      <div className="results-wrap">
        <p className="results-eyebrow">Resultados</p>
        <h2 className="results-title" id="results-title">
          Antes y después
        </h2>
        <p className="results-lead">
          Desliza la línea para comparar. Los resultados varían de una persona a
          otra.
        </p>

        <div
          className="results-filters"
          role="group"
          aria-label="Filtrar por tratamiento"
        >
          {[{ id: "all", label: "Todos" }, ...TREATMENT_FILTERS].map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id as Filter)}
            >
              {f.label}
              <span className="chip-n">{counts[f.id]}</span>
            </button>
          ))}
        </div>

        <div className="results-grid" ref={grid}>
          {visible.map((c) => (
            <article className="case" key={c.id}>
              <BeforeAfterSlider
                before={c.before}
                after={c.after}
                alt={c.alt ?? c.title}
              />
              <p className="case-cat">{LABEL[c.treatment]}</p>
              <h3>{c.title}</h3>
              <p className="case-desc">{c.description}</p>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="results-empty" role="status">
            {cases.length === 0
              ? "Estamos preparando esta galería con casos reales, publicados con el consentimiento de nuestras pacientes."
              : "Aún no hay casos publicados para este tratamiento."}
          </p>
        )}
      </div>
    </section>
  );
}
