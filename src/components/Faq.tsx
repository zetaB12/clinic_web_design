import { useId, useState } from "react";
import { FAQ } from "../data/const";
import "../assets/faq.css";

// Acordeón accesible: un botón por pregunta y un panel que se despliega con transición suave.
const Faq = () => {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="s-base faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <p className="eyebrow reveal">Preguntas frecuentes</p>
        <h2 className="title reveal" id="faq-title">
          Lo que nos preguntan antes de reservar
        </h2>
        <div className="faq-list reveal">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? " is-open" : ""}`} key={q}>
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    id={`${base}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq-icon" aria-hidden="true" />
                    <span className="faq-text">{q}</span>
                  </button>
                </h3>
                <div
                  className="faq-panel"
                  id={`${base}-a${i}`}
                  role="region"
                  aria-labelledby={`${base}-q${i}`}
                >
                  <div className="faq-clip">
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
