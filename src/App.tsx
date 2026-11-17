import { useEffect } from "react";
import ResultsGallery from "./components/ResultsGallery";
import About from "./components/About";
import TreatmentsCarousel from "./components/TreatmentsCarousel";
import "./index.css";
import Process from "./components/Process";
import Faq from "./components/Faq";
import Reserve from "./components/Reserve";
import Footer from "./components/Footer";
import Tagline from "./components/Tagline";
import { useSeo } from "./hooks/useSeo";
import { FAQ } from "./data/const";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, OG_IMAGE } from "./data/site";
import { PHONE } from "./data/contact";
import ScrollHero from "./components/ScrollHero";
import CurtainReveal from "./components/CurtainReveal";

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

const HOME_LD = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    description: SITE_DESCRIPTION,
    telephone: `+${PHONE}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export default function App() {
  useReveal();
  useSeo({
    title: "REJUVENA | Medicina Estética",
    description: SITE_DESCRIPTION,
    path: "",
    jsonLd: HOME_LD,
  });

  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <main id="main">
        <ScrollHero />
        <Tagline />
        <About />
        <TreatmentsCarousel />
        <CurtainReveal>
          <Process />
          <ResultsGallery />
        </CurtainReveal>
        <Faq />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
