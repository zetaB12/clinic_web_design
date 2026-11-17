import { useState } from "react";
import type { SyntheticEvent } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { bookingMessage, whatsappHref } from "../data/contact";
import "../assets/reserve.css";

const Reserve = () => {
  const [msg, setMsg] = useState("");
  const [invalid, setInvalid] = useState<"name" | "email" | null>(null);

  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name) {
      setInvalid("name");
      return setMsg("Escribe tu nombre para continuar.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalid("email");
      return setMsg(
        "El correo no es válido. Revisa que incluya @ y un dominio.",
      );
    }
    setInvalid(null);
    setMsg(
      `Listo, ${name}. Te escribiremos a ${email} en menos de 24 horas para confirmar tu cita.`,
    );
  };

  return (
    <section className="cta" id="reservar">
      <div className="wrap">
        <h2 className="title reveal">
          Empieza con una valoración de 40 minutos
        </h2>
        <p className="lead reveal">
          Deja tus datos y te escribimos en menos de 24 horas para coordinar tu
          cita.
        </p>
        <form onSubmit={submit} noValidate className="reveal">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            aria-label="Nombre"
            aria-invalid={invalid === "name"}
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            placeholder="tu@correo.com"
            aria-label="Correo electrónico"
            aria-invalid={invalid === "email"}
            autoComplete="email"
          />
          <button className="btn" type="submit">
            Reservar cita
          </button>
        </form>
        <p className="msg" role="status">
          {msg}
        </p>
        <p className="cta-alt reveal">
          ¿Prefieres escribirnos?{" "}
          <a
            href={whatsappHref(bookingMessage("una valoración"))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogoIcon size={18} aria-hidden="true" /> Reserva por
            WhatsApp
          </a>
        </p>
        <p className="risk reveal">
          Cancelación gratuita hasta 24 horas antes. La valoración se descuenta
          de tu primer tratamiento.
        </p>
      </div>
    </section>
  );
};

export default Reserve;
