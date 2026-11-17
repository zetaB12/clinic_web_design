import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { fmt, TRUST } from "../data/const";

// Un solo ScrollTrigger dispara los cuatro contadores a la vez, una única vez por visita.
const TrustBar = () => {
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
};

export default TrustBar;
