import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Prohibit,
  WhatsappLogo,
} from "@phosphor-icons/react";
import {
  TREATMENTS,
  findTreatment,
  type Section,
  type Treatment,
} from "../data/treatments";
import { bookingMessage, whatsappHref } from "../data/contact";
import NotFound from "./NotFound";
import "../assets/treatment-detail.css";
import { useSeo } from "../hooks/useSeo";
import { SITE_NAME, SITE_URL } from "../data/site";

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
            <p className="td-eyebrow">Zonas</p>
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
            <p className="td-eyebrow">Beneficios</p>
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
            <p className="td-eyebrow">Indicaciones</p>
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
            <p className="td-eyebrow">Tu plan</p>
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
            <p className="td-eyebrow">Resultados</p>
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
            <p className="td-eyebrow">Después del tratamiento</p>
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
            <p className="td-eyebrow">Preguntas frecuentes</p>
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
export default function TreatmentDetail() {
  const { slug = "" } = useParams();
  const t = findTreatment(slug);
  return t ? <Detail key={t.slug} t={t} /> : <NotFound />;
}

function Detail({ t }: { t: Treatment }) {
  const root = useRef<HTMLElement>(null);
  const { detail } = t;
  const others = TREATMENTS.filter((x) => x.slug !== t.slug);

  useSeo({
    title: `${t.name} | ${SITE_NAME}`,
    description: t.description,
    path: `/tratamientos/${t.slug}`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: t.name,
        description: t.description,
        url: `${SITE_URL}/tratamientos/${t.slug}`,
        provider: { "@type": "MedicalBusiness", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t.name, item: `${SITE_URL}/tratamientos/${t.slug}` },
        ],
      },
    ],
  });

  useEffect(() => {
    const el = root.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | undefined;
    // Un frame después: Layout ya llevó el scroll al inicio y los triggers se miden bien.
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero: la foto se desplaza más lento que el scroll (parallax).
        gsap.fromTo(
          ".td-hero-img img",
          { yPercent: -6, scale: 1.14 },
          {
            yPercent: 6,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: ".td-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );

        // Cada bloque entra en cascada: etiqueta, título y contenido.
        const parts = [
          ".td-split > :first-child > *",
          ".td-head > *",
          ".td-prose > *",
          ".td-zones li",
          ".td-cards li",
          ".td-col",
          ".td-steps li",
          ".td-plan > div",
          ".td-results figure",
          ".td-faq details",
          ".td-note",
        ].join(",");
        gsap.utils.toArray<HTMLElement>(".td-sec").forEach((sec) => {
          const targets = Array.from(
            new Set(gsap.utils.selector(sec)(parts)),
          ) as Element[];
          gsap.from(targets, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: sec, start: "top 78%", once: true },
          });
        });

        // Procedimiento: la línea de tiempo se dibuja al bajar y los pasos aparecen con ella.
        gsap.fromTo(
          ".td-steps",
          { "--p": 0 },
          {
            "--p": 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".td-steps",
              start: "top 70%",
              end: "bottom 65%",
              scrub: true,
            },
          },
        );
        gsap.from(".td-dot", {
          scale: 0.4,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.18,
          scrollTrigger: { trigger: ".td-steps", start: "top 75%", once: true },
        });

        // Antes / después: cada foto se destapa de izquierda a derecha.
        gsap.from(".td-pair > div", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.25,
          scrollTrigger: { trigger: ".td-results", start: "top 80%", once: true },
        });

        // Cierre y otros tratamientos.
        gsap.from(".td-final .td-wrap > *", {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".td-final", start: "top 75%", once: true },
        });
        gsap.from(".td-more li", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".td-more", start: "top 85%", once: true },
        });

        // Las fotos de resultados cambian la altura al cargar: se recalculan los triggers.
        el.querySelectorAll<HTMLImageElement>(".td-pair img").forEach((img) => {
          if (!img.complete)
            img.addEventListener("load", () => ScrollTrigger.refresh(), {
              once: true,
            });
        });
      }, el);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [t]);

  return (
    <>
      <main className="td" ref={root}>
        <section className="td-hero">
          <div className="td-hero-copy">
            <p className="td-eyebrow">{detail.category}</p>
            <h1>{t.name}</h1>
            <p className="td-lead">{detail.lead}</p>
            <div className="td-cta">
              <BookButton treatment={t.name} />
              <span className="td-assure">
                Te respondemos por WhatsApp en menos de 24 horas.
              </span>
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
                  <Link to={`/tratamientos/${o.slug}`}>
                    <o.icon size={28} weight="thin" aria-hidden="true" />
                    <span>{o.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </main>
    </>
  );
}
