import { FAQ } from "../data/const";

const Faq = () => {
  return (
    <section className="s-base" id="faq">
      <div className="wrap">
        <p className="eyebrow reveal">Preguntas frecuentes</p>
        <h2 className="title reveal">Lo que nos preguntan antes de reservar</h2>
        <div className="reveal">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
