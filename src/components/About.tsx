import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";

const POINTS = [
  "Valoración médica de 40 minutos",
  "Plan por escrito el mismo día",
  "Dosis conservadoras y resultados naturales",
  "El mismo equipo de principio a fin",
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrada: al cruzar ~25% de la sección se activa .in (CSS hace el resto).
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    if (reduce) {
      el.classList.add("in");
      return () => io.disconnect();
    }

    // Parallax suave: las dos fotos se desplazan a distinta velocidad.
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trigger = { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(".ab-main img", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(".ab-small", { y: 30 }, { y: -30, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(".ab-leaf", { y: 20 }, { y: -40, ease: "none", scrollTrigger: trigger });
    }, el);
    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section className="ab" id="nosotros" ref={root} aria-labelledby="ab-title">
      <div className="ab-wrap">
        <div className="ab-visual">
          <span className="ab-blob ab-blob-a" aria-hidden="true" />
          <span className="ab-blob ab-blob-b" aria-hidden="true" />
          <svg className="ab-line" viewBox="0 0 120 380" preserveAspectRatio="none" aria-hidden="true">
            <path d="M118 4 H40 Q4 4 4 40 V340 Q4 376 40 376 H70" pathLength="1" />
          </svg>
          <figure className="ab-main">
            <img
              src={`${import.meta.env.BASE_URL}image/nosotros-1.jpg`}
              alt="Paciente relajada durante un tratamiento facial"
              width={900}
              height={1100}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="ab-small">
            <img
              src={`${import.meta.env.BASE_URL}image/nosotros-2.jpg`}
              alt="Manos del especialista durante la valoración"
              width={610}
              height={380}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div className="ab-copy">
          <p className="ab-eyebrow ab-r" style={{ "--d": "0ms" } as React.CSSProperties}>
            NOSOTROS
          </p>
          <h2 id="ab-title" className="ab-r" style={{ "--d": "100ms" } as React.CSSProperties}>
            Un enfoque más personal de la medicina estética
          </h2>
          <p className="ab-text ab-r" style={{ "--d": "200ms" } as React.CSSProperties}>
            En Rejuvena combinamos criterio médico, precisión y tiempo para
            escucharte. Más de 1.500 pacientes confían en nosotros para realzar
            su belleza natural, sin exageraciones y con un plan claro desde la
            primera consulta.
          </p>
          <ul className="ab-list">
            {POINTS.map((p, i) => (
              <li
                className="ab-r"
                key={p}
                style={{ "--d": `${320 + i * 110}ms` } as React.CSSProperties}
              >
                <span className="ab-check">
                  <Check size={16} weight="bold" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            className="ab-cta ab-r"
            href="#reservar"
            style={{ "--d": "800ms" } as React.CSSProperties}
          >
            Reserva tu valoración <ArrowRight size={18} aria-hidden="true" />
          </a>
          <svg className="ab-leaf" viewBox="0 0 80 140" aria-hidden="true">
            <path d="M40 138 V30 M40 100 C14 96 8 70 10 50 C32 52 42 72 40 100 M40 70 C62 64 70 40 66 16 C46 24 36 44 40 70" />
          </svg>
        </div>
      </div>
    </section>
  );
}
