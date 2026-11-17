import { useEffect, useRef } from "react";
import { CalendarCheckIcon, PhoneIcon } from "@phosphor-icons/react";
import { telHref } from "../data/contact";

const VIDEO = `${import.meta.env.BASE_URL}video/hero.mp4`;

const ScrollHero = () => {
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
    let seekTimer = 0;
    let primed = false;
    v.pause();
    const onSeeked = () => {
      seeking = false;
      clearTimeout(seekTimer);
    };
    v.addEventListener("seeked", onSeeked);

    // iOS Safari no decodifica ni pinta fotogramas de un <video> que nunca ha
    // reproducido: un seek sobre un video "virgen" deja el cuadro vacío. Un
    // play()+pause() silencioso lo activa. Si el navegador lo bloquea (ahorro
    // de energía, sin gesto), se reintenta en el primer toque o scroll.
    const prime = () => {
      if (primed) return;
      primed = true;
      const p = v.play();
      if (p === undefined) return;
      p.then(() => v.pause()).catch(() => {
        primed = false;
      });
    };
    const gesture = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
    const onGesture = () => {
      prime();
      if (primed)
        gesture.forEach((e) => window.removeEventListener(e, onGesture));
    };
    v.addEventListener("loadedmetadata", prime);
    v.addEventListener("loadeddata", prime);
    gesture.forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true }),
    );
    if (v.readyState >= 1) prime();

    // Lee el progreso de scroll una vez por evento; el render va en rAF.
    const measure = () => {
      const stick = t.firstElementChild as HTMLElement;
      const navH = parseFloat(getComputedStyle(t).paddingTop);
      const max = t.offsetHeight - navH - stick.offsetHeight;
      target = Math.min(1, Math.max(0, window.scrollY - t.offsetTop) / max);
    };
    const tick = () => {
      // Al navegar a otra ruta React suelta los refs antes de ejecutar el cleanup.
      if (!copy.current || !info.current || !bar.current) return;
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      // Un salto a la vez: se pide el siguiente solo cuando terminó el anterior.
      if (v.duration && !seeking) {
        const time = current * (v.duration - 0.05);
        if (Math.abs(v.currentTime - time) > 0.01) {
          seeking = true;
          v.currentTime = time;
          // Safari a veces no emite "seeked": evita que el scrub se congele.
          clearTimeout(seekTimer);
          seekTimer = window.setTimeout(() => {
            seeking = false;
          }, 300);
        }
      }
      // const fade = Math.max(0, 1 - current / 0.18);
      const fade = Math.max(0, Math.min(1, (0.4 - current) / 0.15));
      const c = copy.current!;
      c.style.opacity = String(fade);
      c.style.transform = `translateY(${(1 - fade) * -32}px)`;
      c.style.pointerEvents = fade < 0.1 ? "none" : "auto";
      // El segundo bloque entra cuando el primero ya se fue.
      const show = Math.min(1, Math.max(0, (current - 0.4) / 0.15));
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
      clearTimeout(seekTimer);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("loadedmetadata", prime);
      v.removeEventListener("loadeddata", prime);
      gesture.forEach((e) => window.removeEventListener(e, onGesture));
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
          poster={`${import.meta.env.BASE_URL}image/hero-poster.webp`}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          webkit-playsinline="true"
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
              <CalendarCheckIcon size={20} aria-hidden="true" />
              Reservar cita
            </a>
            <a className="btn outline" href={telHref}>
              <PhoneIcon size={20} aria-hidden="true" />
              Llamar ahora
            </a>
          </div>
          <span className="meta">Lunes a sábado, de 9:00 a 19:00</span>
        </div>
        <div className="progress" ref={bar} />
      </div>
    </div>
  );
};

export default ScrollHero;
