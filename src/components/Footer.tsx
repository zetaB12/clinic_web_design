import { Link } from "react-router-dom";
import { PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { TREATMENTS } from "../data/treatments";
import { bookingMessage, phoneDisplay, telHref, whatsappHref } from "../data/contact";
import "../assets/footer.css";

const EXPLORE = [
  ["main", "Inicio"],
  ["nosotros", "Nosotros"],
  ["tratamientos", "Tratamientos"],
  ["proceso", "Cómo funciona"],
  ["resultados", "Resultados"],
  ["faq", "Preguntas frecuentes"],
] as const;

/** Símbolo de la marca (tulipán con hojas y rombo), solo línea. */
const Mark = () => (
  <svg className="ft-mark" viewBox="165 108 640 640" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M487 206 L533 252 L487 298 L441 252 Z" />
      <path d="M380 318 C372 340 385 400 385 470 C385 560 430 620 487 632 C545 620 590 560 590 470 C590 400 602 340 592 316 C555 312 515 345 487 372 C455 345 420 312 380 318 Z" />
      <path d="M487 372 L448 416" />
      <path d="M350 433 C300 424 250 424 208 440 C216 480 290 565 345 612 C385 645 445 650 487 632" />
      <path d="M624 433 C674 424 724 424 766 440 C758 480 684 565 629 612 C589 645 529 650 487 632" />
    </g>
  </svg>
);

const Footer = () => {
  return (
    <footer className="ft">
      <div className="ft-wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Mark />
            <p className="ft-word">Rejuvena</p>
            <p className="ft-sub">MEDICINA ESTÉTICA</p>
            <p className="ft-tag">
              Realzamos tu belleza natural con criterio médico, precisión y un
              plan claro desde la primera consulta.
            </p>
          </div>
          <div className="ft-cta">
            <p className="ft-cta-title">Empieza con una valoración de 40 minutos</p>
            <div className="ft-cta-row">
              <Link className="btn" to="/#reservar">
                Reservar cita
              </Link>
              <a
                className="btn outline"
                href={whatsappHref(bookingMessage("una valoración"))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogoIcon size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="ft-cols">
          <nav aria-label="Explorar">
            <h3>Explorar</h3>
            <ul>
              {EXPLORE.map(([id, label]) => (
                <li key={id}>
                  <Link to={`/#${id}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Tratamientos">
            <h3>Tratamientos</h3>
            <ul>
              {TREATMENTS.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link to={`/tratamientos/${t.slug}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li>
                <a href={telHref}>
                  <PhoneIcon size={16} aria-hidden="true" /> {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(bookingMessage("una valoración"))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogoIcon size={16} aria-hidden="true" /> Escríbenos
                </a>
              </li>
              <li className="ft-note">Atención con cita previa. Respondemos en menos de 24 horas.</li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <span>© 2026 REJUVENA Medicina Estética</span>
          <nav aria-label="Legal">
            <a href="#main">Privacidad</a>
            <a href="#main">Términos</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
