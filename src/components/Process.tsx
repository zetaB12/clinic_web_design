import { STEPS } from "../data/const";

const Process = () => {
  return (
    <section className="s-base" id="proceso">
      <div className="wrap">
        <p className="eyebrow reveal">Cómo funciona</p>
        <h2 className="title reveal">De tu reserva a tu plan en tres pasos</h2>
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
  );
};

export default Process;
