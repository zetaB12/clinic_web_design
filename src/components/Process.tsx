import { STEPS } from "../data/const";
import "../assets/process.css";

const Process = () => {
  return (
    <section className="pr" id="proceso" aria-labelledby="pr-title">
      <div className="pr-wrap">
        <header className="pr-head">
          <p className="eyebrow reveal">Cómo funciona</p>
          <h2 className="reveal" id="pr-title">
            De tu reserva a tu plan en tres pasos
          </h2>
          <span className="pr-rule reveal" aria-hidden="true" />
        </header>
        <ol className="pr-steps">
          {STEPS.map((s, i) => (
            <li className="pr-step reveal" key={s.t}>
              <span className="pr-node" aria-hidden="true" />
              <span className="pr-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
