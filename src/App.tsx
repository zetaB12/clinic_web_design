import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CalendarCheck,
  Phone,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResultsGallery from "./components/ResultsGallery";
import About from "./components/About";
import TreatmentsCarousel from "./components/TreatmentsCarousel";
import "./index.css";

const VIDEO = "/video/paseo-111-scrub-fast.mp4";

const TRUST = [
  { end: 3, suffix: "+", l: "AÑOS DE EXPERIENCIA" },
  { end: 1500, suffix: "+", l: "PACIENTES ATENDIDOS" },
  { end: 18, suffix: "", l: "TRATAMIENTOS DISPONIBLES" },
  { end: 100, suffix: "%", l: "ATENCIÓN PERSONALIZADA" },
];

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

const NAV = [
  ["main", "Inicio"],
  ["nosotros", "Nosotros"],
  ["tratamientos", "Tratamientos"],
  ["resultados", "Resultados"],
  ["reservar", "Contacto"],
] as const;

// Secciones sin enlace propio cuentan para la entrada del menú que las precede.
const NAV_OF: Record<string, string> = {
  proceso: "tratamientos",
  faq: "resultados",
  resultados: "resultados",
};

const STEPS = [
  {
    t: "Reserva tu valoración",
    d: "Elige día y hora por la web o por teléfono. Toma menos de un minuto.",
  },
  {
    t: "Conoce tu plan",
    d: "Cuarenta minutos con tu médico, fotos de referencia y un plan escrito para llevarte.",
  },
  {
    t: "Empieza cuando quieras",
    d: "No hay compromiso de iniciar ese día. Agendas el tratamiento solo si te convence.",
  },
];

const STATS = [
  { n: "1.847", l: "pacientes atendidos desde 2019" },
  { n: "4,8 de 5", l: "en 312 reseñas verificadas" },
  { n: "15 días", l: "hasta tu control de seguimiento" },
];

const FAQ = [
  [
    "¿Cuánto cuesta la primera valoración?",
    "S/ 90. Si decides empezar un tratamiento, ese monto se descuenta de tu primera sesión.",
  ],
  [
    "¿Cuánto dura la consulta?",
    "Cuarenta minutos. Incluye la revisión de tu piel, fotos de referencia y un plan por escrito.",
  ],
  [
    "¿Los tratamientos duelen?",
    "La mayoría usa anestesia tópica. Sentirás una molestia leve que dura unos segundos.",
  ],
  [
    "¿Cuándo veré resultados?",
    "Depende del tratamiento. Con ácido hialurónico se nota al terminar. Con bioestimuladores, entre 8 y 12 semanas.",
  ],
  [
    "¿Quién realiza los procedimientos?",
    "Siempre un médico del equipo. Los procedimientos inyectables no se delegan.",
  ],
  [
    "¿Puedo cancelar o reprogramar mi cita?",
    "Sí, sin costo hasta 24 horas antes de la hora reservada.",
  ],
  [
    "¿Pueden atenderme si estoy embarazada?",
    "Algunos tratamientos no se recomiendan durante el embarazo o la lactancia. Lo revisamos juntos en la valoración.",
  ],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ScrollHero() {
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = video.current!;
    const t = track.current!;
    let target = 0;
    let current = 0;
    let raf = 0;
    let seeking = false;
    v.pause();
    const onSeeked = () => {
      seeking = false;
    };
    v.addEventListener("seeked", onSeeked);

    // Lee el progreso de scroll una vez por evento; el render va en rAF.
    const measure = () => {
      const stick = t.firstElementChild as HTMLElement;
      const navH = parseFloat(getComputedStyle(t).paddingTop);
      const max = t.offsetHeight - navH - stick.offsetHeight;
      target = Math.min(1, Math.max(0, window.scrollY - t.offsetTop) / max);
    };
    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      // Un salto a la vez: se pide el siguiente solo cuando terminó el anterior.
      if (v.duration && !seeking) {
        const time = current * (v.duration - 0.05);
        if (Math.abs(v.currentTime - time) > 0.01) {
          seeking = true;
          v.currentTime = time;
        }
      }
      const fade = Math.max(0, 1 - current / 0.18);
      const c = copy.current!;
      c.style.opacity = String(fade);
      c.style.transform = `translateY(${(1 - fade) * -32}px)`;
      c.style.pointerEvents = fade < 0.1 ? "none" : "auto";
      // El segundo bloque entra cuando el primero ya se fue.
      const show = Math.min(1, Math.max(0, (current - 0.27) / 0.15));
      const i = info.current!;
      i.style.opacity = String(show);
      // Sube desde el borde inferior de la pantalla, frenando al llegar.
      const eased = 1 - Math.pow(1 - show, 3);
      i.style.transform = `translateY(${(1 - eased) * 130}%)`;
      i.style.pointerEvents = show > 0.1 ? "auto" : "none";
      bar.current!.style.transform = `scaleX(${current})`;
      raf = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="hero-track" ref={track}>
      <div className="hero-stick">
        <video
          ref={video}
          src={VIDEO}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-copy" ref={copy}>
          <span className="hero-label">REJUVENA · MEDICINA ESTÉTICA</span>
          <h1>
            Tu belleza.
            <br />
            En su mejor <span className="key">esencia.</span>
          </h1>
          <p>
            Realzamos tu belleza natural a través de la ciencia, la precisión y
            el cuidado personalizado.
          </p>
          <a className="btn outline" href="#tratamientos">
            Descubre nuestros tratamientos
          </a>
        </div>
        <div className="hero-info" ref={info}>
          <span className="hero-label">PRIMERA CONSULTA DE VALORACIÓN</span>
          <h2>Agenda tu cita con nuestro equipo médico</h2>
          <p>
            Evaluamos tu piel, escuchamos lo que buscas y te proponemos un plan
            a tu medida. Respondemos en menos de 24 horas.
          </p>
          <div className="row">
            <a className="btn" href="#reservar">
              <CalendarCheck size={20} aria-hidden="true" />
              Reservar cita
            </a>
            <a className="btn outline" href="tel:+51900000000">
              <Phone size={20} aria-hidden="true" />
              Llamar ahora
            </a>
          </div>
          <span className="meta">Lunes a sábado, de 9:00 a 19:00</span>
        </div>
        <div className="progress" ref={bar} />
      </div>
    </div>
  );
}

// Un solo ScrollTrigger dispara los cuatro contadores a la vez, una única vez por visita.
function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const nums = el.querySelectorAll<HTMLElement>(".count");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      nums.forEach((n, i) => (n.textContent = fmt(0) + TRUST[i].suffix));
      const tl = gsap.timeline({ paused: true });
      nums.forEach((n, i) => {
        const { end, suffix } = TRUST[i];
        const o = { v: 0 };
        tl.to(
          o,
          {
            v: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              n.textContent = fmt(o.v) + suffix;
            },
          },
          0,
        );
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          el.classList.add("in");
          tl.play();
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div
      className="trust"
      ref={ref}
      role="list"
      aria-label="Datos de la clínica"
    >
      {TRUST.map((s, i) => (
        <div
          className="trust-item"
          role="listitem"
          key={s.l}
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <strong>
            <span className="count" aria-hidden="true">
              {fmt(s.end)}
              {s.suffix}
            </span>
            <span className="sr">
              {fmt(s.end)}
              {s.suffix}
            </span>
          </strong>
          <span className="lbl">{s.l}</span>
        </div>
      ))}
    </div>
  );
}

function Tagline() {
  return (
    <section className="tagline s-raised" aria-label="Nuestra filosofía">
      <TrustBar />
    </section>
  );
}

export default function App() {
  useReveal();
  const [msg, setMsg] = useState("");
  const [invalid, setInvalid] = useState<"name" | "email" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("main");
  const [scrolled, setScrolled] = useState(false);
  const lockUntil = useRef(0);

  // Al hacer clic se marca de inmediato y se ignora el observador mientras dura el scroll suave.
  const pick = (id: string) => {
    setActive(id);
    lockUntil.current = performance.now() + 1200;
  };

  // Marca la sección que cruza una franja a ~40% de la altura de la pantalla.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting || performance.now() < lockUntil.current)
            return;
          const id = e.target.id;
          setActive(NAV_OF[id] ?? (id || "main"));
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll("#main > *").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Navbar transparente sobre el hero; sólido al terminar la primera pantalla. setState solo cambia si el valor cambia.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // Blanco cuando el video del hero llega a su final (fin del scroll del hero).
      const t = document.querySelector<HTMLElement>(".hero-track");
      const end = t ? t.offsetTop + t.offsetHeight - window.innerHeight : 0;
      setScrolled(window.scrollY >= end - 4);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Con el menú móvil abierto se bloquea el scroll y Escape lo cierra.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name) {
      setInvalid("name");
      return setMsg("Escribe tu nombre para continuar.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalid("email");
      return setMsg(
        "El correo no es válido. Revisa que incluya @ y un dominio.",
      );
    }
    setInvalid(null);
    setMsg(
      `Listo, ${name}. Te escribiremos a ${email} en menos de 24 horas para confirmar tu cita.`,
    );
  };

  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <nav
        className={`nav${scrolled || menuOpen ? " is-solid" : ""}`}
        aria-label="Principal"
      >
        <div className="nav-left">
          <a className="brand" href="#main" aria-label="Rejuvena, inicio">
            <img src="/image/logo-nav.png" alt="Rejuvena" />
          </a>
          <ul
            className={menuOpen ? "open" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "page" : undefined}
                  onClick={() => pick(id)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-cta-item">
              <a className="btn" href="#reservar">
                Reservar cita
              </a>
            </li>
          </ul>
        </div>
        <a className="btn sm" href="#reservar">
          Reservar cita
        </a>
        <button
          className="nav-toggle"
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <main id="main">
        <ScrollHero />
        <Tagline />

        <About />

        <TreatmentsCarousel />

        <section className="s-base" id="proceso">
          <div className="wrap">
            <p className="eyebrow reveal">Cómo funciona</p>
            <h2 className="title reveal">
              De tu reserva a tu plan en tres pasos
            </h2>
            <div className="grid g3">
              {STEPS.map((s, i) => (
                <article className="card reveal" key={s.t}>
                  <div className="n">Paso {i + 1}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ResultsGallery />

        <section className="s-base" id="faq">
          <div className="wrap">
            <p className="eyebrow reveal">Preguntas frecuentes</p>
            <h2 className="title reveal">
              Lo que nos preguntan antes de reservar
            </h2>
            <div className="reveal">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta s-raised" id="reservar">
          <div className="wrap">
            <h2 className="title reveal">
              Empieza con una valoración de 40 minutos
            </h2>
            <p className="lead reveal">
              Deja tus datos y te escribimos en menos de 24 horas para coordinar
              tu cita.
            </p>
            <form onSubmit={submit} noValidate className="reveal">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                aria-label="Nombre"
                aria-invalid={invalid === "name"}
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                aria-invalid={invalid === "email"}
                autoComplete="email"
              />
              <button className="btn" type="submit">
                Reservar cita
              </button>
            </form>
            <p className="msg" role="status">
              {msg}
            </p>
            <p className="risk reveal">
              Cancelación gratuita hasta 24 horas antes. La valoración se
              descuenta de tu primer tratamiento.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 REJUVENA Medicina Estética</span>
          <nav aria-label="Legal">
            <a href="#main">Privacidad</a>
            <a href="#main">Términos</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
