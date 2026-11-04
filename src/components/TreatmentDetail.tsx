import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Prohibit,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { TREATMENTS, type Section, type Treatment } from "../data/treatments";
import { bookingMessage, telHref, whatsappHref } from "../data/contact";
import "./treatment-detail.css";
import Header from "./Header";

const BASE = import.meta.env.BASE_URL;

// Tono por defecto de cada tipo de bloque (se puede sobrescribir con `tone` en los datos).
const DEFAULT_TONE: Record<Section["type"], "bone" | "sand" | "dark"> = {
  intro: "bone",
  zones: "sand",
  benefits: "bone",
  indications: "sand",
  procedure: "dark",
  plan: "bone",
  results: "sand",
  aftercare: "bone",
  faq: "sand",
};

function BookButton({
  treatment,
  className = "",
}: {
  treatment: string;
  className?: string;
}) {
  return (
    <a
      className={`btn td-btn ${className}`}
      href={whatsappHref(bookingMessage(treatment))}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
      Reservar valoración
    </a>
  );
}

function Block({ s, treatment }: { s: Section; treatment: Treatment }) {
  switch (s.type) {
    case "intro":
      return (
        <div className="td-split">
          <div>
            <p className="td-eyebrow">Sobre el tratamiento</p>
            <h2>{s.title}</h2>
          </div>
          <div className="td-prose">
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.highlight && <blockquote>{s.highlight}</blockquote>}
          </div>
        </div>
      );

    case "zones":
      return (
        <>
          <header className="td-head">
            <h2>{s.title}</h2>
            {s.lead && <p>{s.lead}</p>}
          </header>
          <ol className="td-zones">
            {s.items.map((z, i) => (
              <li key={z.name}>
                <span className="td-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{z.name}</h3>
                <p>{z.text}</p>
              </li>
            ))}
          </ol>
        </>
      );

    case "benefits":
      return (
        <>
          <header className="td-head">
            <h2>{s.title}</h2>
          </header>
          <ul
            className="td-cards"
            style={{ "--n": s.items.length } as React.CSSProperties}
          >
            {s.items.map((b) => (
              <li key={b.title}>
                <Check size={22} weight="light" aria-hidden="true" />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
        </>
      );

    case "indications":
      return (
        <>
          <header className="td-head">
            <h2>{s.title}</h2>
          </header>
          <div className={`td-two${s.notFor ? "" : " single"}`}>
            <div className="td-col yes">
              <h3>{s.forTitle ?? "Indicado para"}</h3>
              <ul>
                {s.for.map((x) => (
                  <li key={x}>
                    <Check size={18} weight="bold" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            {s.notFor && (
              <div className="td-col no">
                <h3>{s.notForTitle ?? "No recomendado si"}</h3>
                <ul>
                  {s.notFor.map((x) => (
                    <li key={x}>
                      <Prohibit size={18} aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      );

    case "procedure":
      return (
        <div className="td-split">
          <header className="td-head left">
            <p className="td-eyebrow">Procedimiento</p>
            <h2>{s.title}</h2>
            {s.lead && <p>{s.lead}</p>}
          </header>
          <ol className="td-steps">
            {s.steps.map((st, i) => (
              <li key={st.title}>
                <span className="td-dot">{i + 1}</span>
                <div>
                  <h3>
                    {st.title}
                    {st.time && <em>{st.time}</em>}
                  </h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case "plan":
      return (
        <>
          <header className="td-head">
            <h2>{s.title}</h2>
            {s.lead && <p>{s.lead}</p>}
          </header>
          <dl className="td-plan">
            {s.rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>
                  <strong>{r.value}</strong>
                  {r.text && <span>{r.text}</span>}
                </dd>
              </div>
            ))}
          </dl>
          {s.note && <p className="td-note">{s.note}</p>}
        </>
      );

    case "results":
      return (
        <>
          <header className="td-head">
            <h2>{s.title}</h2>
            {s.lead && <p>{s.lead}</p>}
          </header>
          <div className="td-results">
            {s.pairs.map((p) => (
              <figure key={p.before}>
                <div className="td-pair">
                  <div>
                    <img
                      src={p.before}
                      alt={`${p.alt} (antes)`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>Antes</span>
                  </div>
                  <div>
                    <img
                      src={p.after}
                      alt={`${p.alt} (después)`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>Después</span>
                  </div>
                </div>
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
          {s.note && <p className="td-note">{s.note}</p>}
        </>
      );

    case "aftercare":
      return (
        <>
          <header className="td-head">
            <h2>{s.title}</h2>
          </header>
          <div className={`td-two${s.donts ? "" : " single"}`}>
            <div className="td-col yes">
              <h3>Recomendado</h3>
              <ul>
                {s.dos.map((x) => (
                  <li key={x}>
                    <Check size={18} weight="bold" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            {s.donts && (
              <div className="td-col no">
                <h3>Evita</h3>
                <ul>
                  {s.donts.map((x) => (
                    <li key={x}>
                      <Prohibit size={18} aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {s.note && <p className="td-note">{s.note}</p>}
        </>
      );

    case "faq":
      return (
        <div className="td-split">
          <header className="td-head left">
            <p className="td-eyebrow">FAQ</p>
            <h2>{s.title}</h2>
            <p>¿Te queda alguna duda? Te la resolvemos en la valoración.</p>
            <BookButton treatment={treatment.name} />
          </header>
          <div className="td-faq">
            {s.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      );
  }
}

// Página individual /tratamientos/:slug. Pinta solo los bloques definidos en los datos.
export default function TreatmentDetail({
  treatment: t,
}: {
  treatment: Treatment;
}) {
  const root = useRef<HTMLElement>(null);
  const { detail } = t;
  const others = TREATMENTS.filter((x) => x.slug !== t.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = `${t.name} | REJUVENA Medicina Estética`;

    // Aparición suave de cada bloque al entrar en pantalla.
    const els = root.current!.querySelectorAll<HTMLElement>(".td-sec");
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((e) => e.classList.add("in"));
      return () => void (document.title = prev);
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((e) => io.observe(e));
    return () => {
      io.disconnect();
      document.title = prev;
    };
  }, [t]);

  return (
    <>
      <header className="td-bar">
        <a className="td-brand" href={BASE} aria-label="Ir al inicio">
          <img src={`${BASE}image/logo-nav.png`} alt="Rejuvena" height={32} />
        </a>
        <a className="td-back" href={`${BASE}#tratamientos`}>
          <ArrowLeft size={16} aria-hidden="true" /> Todos los tratamientos
        </a>
        <BookButton treatment={t.name} className="sm" />
      </header>
      <Header />

      <main className="td" ref={root}>
        <section className="td-hero">
          <div className="td-hero-copy">
            <p className="td-eyebrow">{detail.category}</p>
            <h1>{t.name}</h1>
            <p className="td-lead">{detail.lead}</p>
            <div className="td-cta">
              <BookButton treatment={t.name} />
              <a className="td-link" href={telHref}>
                <Phone size={18} aria-hidden="true" /> Prefiero llamar
              </a>
            </div>
          </div>
          <figure className="td-hero-img">
            {t.image && (
              <img
                src={t.image}
                alt={t.alt ?? t.name}
                style={{ objectPosition: detail.heroPos }}
                width={1536}
                height={1024}
              />
            )}
          </figure>
          <dl className="td-facts">
            {detail.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {detail.sections.map((s, i) => (
          <section
            key={`${s.type}-${i}`}
            className={`td-sec t-${s.tone ?? DEFAULT_TONE[s.type]} k-${s.type}`}
          >
            <div className="td-wrap">
              <Block s={s} treatment={t} />
            </div>
          </section>
        ))}

        <section className="td-final">
          <div className="td-wrap">
            <p className="td-eyebrow">Valoración médica</p>
            <h2>Empieza con una valoración personalizada</h2>
            <p>
              Revisamos tu caso, resolvemos tus dudas y te entregamos un plan
              por escrito. Sin compromiso.
            </p>
            <BookButton treatment={t.name} />
          </div>
        </section>

        <nav className="td-more" aria-label="Otros tratamientos">
          <div className="td-wrap">
            <h2>Otros tratamientos</h2>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={`${BASE}tratamientos/${o.slug}`}>
                    <o.icon size={28} weight="thin" aria-hidden="true" />
                    <span>{o.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </main>
    </>
  );
}
