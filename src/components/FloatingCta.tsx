import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { bookingMessage, whatsappHref } from "../data/contact";
import "../assets/floating-cta.css";

/** CTA persistente: aparece al salir del hero y se oculta cuando ya se ve el formulario de reserva. */
export default function FloatingCta() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [past, setPast] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = document.querySelector<HTMLElement>(".hero-track");
      const end = t ? t.offsetTop + t.offsetHeight - window.innerHeight : 0;
      setPast(window.scrollY >= end);
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
  }, [isHome]);

  if (!isHome) return null;
  const show = past && !atForm;
  return (
    <a
      className={`fcta${show ? " is-on" : ""}`}
      href={whatsappHref(bookingMessage("una valoración"))}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <WhatsappLogoIcon size={22} weight="fill" aria-hidden="true" />
      <span>Reserva por WhatsApp</span>
    </a>
  );
}
