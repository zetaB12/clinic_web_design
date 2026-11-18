import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { bookingMessage, whatsappHref } from "../data/contact";
import "../assets/floating-cta.css";

/**
 * Controles fijos del borde derecho:
 *  - WhatsApp (solo inicio): aparece al salir del hero y se oculta junto al formulario de reserva.
 *  - Volver arriba (todas las páginas): discreto, con un anillo que muestra el avance de lectura.
 */
export default function FloatingCta() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [past, setPast] = useState(false);
  const [atForm, setAtForm] = useState(false);
  const [deep, setDeep] = useState(false);
  const top = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const t = document.querySelector<HTMLElement>(".hero-track");
      const end = t ? t.offsetTop + t.offsetHeight - window.innerHeight : 0;
      setPast(y >= end);
      setDeep(y > Math.max(end, 0) + window.innerHeight * 0.6);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      top.current?.style.setProperty(
        "--p",
        String(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0),
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const form = document.getElementById("reservar");
    const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), {
      threshold: 0.2,
    });
    if (form) io.observe(form);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  const showWa = isHome && past && !atForm;
  const showTop = deep;

  const toTop = () => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <button
        ref={top}
        type="button"
        className={`btt${showTop ? " is-on" : ""}${showWa ? " raised" : ""}`}
        onClick={toTop}
        aria-label="Volver arriba"
        title="Volver arriba"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <svg viewBox="0 0 44 44" aria-hidden="true">
          <circle className="btt-track" cx="22" cy="22" r="20" />
          <circle className="btt-ring" cx="22" cy="22" r="20" />
        </svg>
        <ArrowUpIcon size={16} weight="bold" aria-hidden="true" />
      </button>

      {isHome && (
        <a
          className={`fcta${showWa ? " is-on" : ""}`}
          href={whatsappHref(bookingMessage("una valoración"))}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showWa ? 0 : -1}
          aria-hidden={!showWa}
        >
          <WhatsappLogoIcon size={22} weight="fill" aria-hidden="true" />
          <span>Reserva por WhatsApp</span>
        </a>
      )}
    </>
  );
}
