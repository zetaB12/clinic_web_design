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

export default function App() {
  useReveal();

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
