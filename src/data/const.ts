export const TRUST = [
    { end: 3, suffix: "+", l: "AÑOS DE EXPERIENCIA" },
    { end: 1500, suffix: "+", l: "PACIENTES ATENDIDOS" },
    { end: 18, suffix: "", l: "TRATAMIENTOS DISPONIBLES" },
    { end: 100, suffix: "%", l: "ATENCIÓN PERSONALIZADA" },
];

export const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export const STEPS = [
    {
        t: "Reserva tu valoración",
        d: "Elige día y hora por la web o por teléfono. Toma menos de un minuto.",
    },
    {
        t: "Conoce tu plan",
        d: "Cuarenta minutos con tu médico, fotos de referencia y un plan escrito para llevarte.",
    },
    {
        t: "Empieza cuando quieras",
        d: "No hay compromiso de iniciar ese día. Agendas el tratamiento solo si te convence.",
    },
];

export const FAQ = [
    [
        "¿Cuánto cuesta la primera valoración?",
        "S/ 90. Si decides empezar un tratamiento, ese monto se descuenta de tu primera sesión.",
    ],
    [
        "¿Cuánto dura la consulta?",
        "Cuarenta minutos. Incluye la revisión de tu piel, fotos de referencia y un plan por escrito.",
    ],
    [
        "¿Los tratamientos duelen?",
        "La mayoría usa anestesia tópica. Sentirás una molestia leve que dura unos segundos.",
    ],
    [
        "¿Cuándo veré resultados?",
        "Depende del tratamiento. Con ácido hialurónico se nota al terminar. Con bioestimuladores, entre 8 y 12 semanas.",
    ],
    [
        "¿Quién realiza los procedimientos?",
        "Siempre un médico del equipo. Los procedimientos inyectables no se delegan.",
    ],
    [
        "¿Puedo cancelar o reprogramar mi cita?",
        "Sí, sin costo hasta 24 horas antes de la hora reservada.",
    ],
    [
        "¿Pueden atenderme si estoy embarazada?",
        "Algunos tratamientos no se recomiendan durante el embarazo o la lactancia. Lo revisamos juntos en la valoración.",
    ],
];

export const POINTS = [
    "Valoración médica de 40 minutos",
    "Plan por escrito el mismo día",
    "Dosis conservadoras y resultados naturales",
    "El mismo equipo de principio a fin",
];