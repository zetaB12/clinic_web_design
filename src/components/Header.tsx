import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("main");
  const lockUntil = useRef(0);

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
    if (isHome)
      document.querySelectorAll("#main > *").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  // Fuera del inicio no hay secciones: ninguna entrada queda marcada.
  useEffect(() => {
    setActive(isHome ? "main" : "");
  }, [isHome]);

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
  }, [pathname]);

  return (
    <nav
      className={`nav${scrolled || menuOpen ? " is-solid" : ""}`}
      aria-label="Principal"
    >
      <div className="nav-left">
        <Link className="brand" to="/#main" aria-label="Rejuvena, inicio">
          <img
            src={`${import.meta.env.BASE_URL}image/logo-nav.png`}
            alt="Rejuvena"
          />
        </Link>
        <ul
          className={menuOpen ? "open" : ""}
          onClick={() => setMenuOpen(false)}
        >
          {NAV.map(([id, label]) => (
            <li key={id}>
              <Link
                to={`/#${id}`}
                aria-current={active === id ? "page" : undefined}
                onClick={() => pick(id)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="nav-cta-item">
            <Link className="btn" to="/#reservar">
              Reservar cita
            </Link>
          </li>
        </ul>
      </div>
      <Link className="btn sm" to="/#reservar">
        Reservar cita
      </Link>
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
  );
};

export default Header;
