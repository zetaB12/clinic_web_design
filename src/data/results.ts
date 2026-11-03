// Tratamientos que aparecen como filtros. Para sumar uno nuevo, agrégalo aquí.
export const TREATMENT_FILTERS = [
  { id: "toxina", label: "Toxina botulínica" },
  { id: "labios", label: "Relleno de labios" },
  { id: "rinomodelacion", label: "Rinomodelación" },
  { id: "hialuronico", label: "Ácido hialurónico" },
  { id: "prp", label: "Plasma rico en plaquetas" },
  { id: "pink-glow", label: "Pink Glow" },
  { id: "mesoterapia", label: "Mesoterapia" },
  { id: "bioestimuladores", label: "Bioestimuladores de colágeno" },
] as const;

export type TreatmentId = (typeof TREATMENT_FILTERS)[number]["id"];

export interface ResultCase {
  id: string;
  treatment: TreatmentId;
  title: string;
  description: string;
  /** Rutas dentro de /public, por ejemplo "/image/casos/labios-01-antes.jpg". */
  before: string;
  after: string;
  /** Texto alternativo opcional para las fotografías. */
  alt?: string;
}

/**
 * Casos publicados. Solo agrega aquí fotografías reales con consentimiento
 * firmado de la paciente. Las cantidades de los filtros salen de esta lista.
 *
 * Ejemplo:
 * {
 *   id: "labios-01",
 *   treatment: "labios",
 *   title: "Volumen natural en labios",
 *   description: "Una sesión, 1 ml de ácido hialurónico.",
 *   before: "/image/casos/labios-01-antes.jpg",
 *   after: "/image/casos/labios-01-despues.jpg",
 * },
 */


export const CASES: ResultCase[] = [
  {
    id: "labios-01",
    treatment: "labios",
    title: "Volumen natural en labios",
    description: "Una sesión, 1 ml de ácido hialurónico.",
    before: "/image/casos/labios/labios-01-antes.jpg",
    after: "/image/casos/labios/labios-01-despues.jpg",
    alt: "Comparación antes y después de relleno de labios",
  },
  {
    id: "labios-02",
    treatment: "labios",
    title: "Volumen natural en labios",
    description: "Una sesión, 1 ml de ácido hialurónico.",
    before: "/image/casos/labios/labios-01-antes.jpg",
    after: "/image/casos/labios/labios-01-despues.jpg",
    alt: "Comparación antes y después de relleno de labios",
  },
  {
    id: "labios-03",
    treatment: "labios",
    title: "Volumen natural en labios",
    description: "Una sesión, 1 ml de ácido hialurónico.",
    before: "/image/casos/labios/labios-01-antes.jpg",
    after: "/image/casos/labios/labios-01-despues.jpg",
    alt: "Comparación antes y después de relleno de labios",
  },
  {
    id: "labios-04",
    treatment: "labios",
    title: "Volumen natural en labios",
    description: "Una sesión, 1 ml de ácido hialurónico.",
    before: "/image/casos/labios/labios-01-antes.jpg",
    after: "/image/casos/labios/labios-01-despues.jpg",
    alt: "Comparación antes y después de relleno de labios",
  },
  {
    id: "toxina-01",
    treatment: "toxina",
    title: "Volumen natural en labios",
    description: "Una sesión, 1 ml de ácido hialurónico.",
    before: "/image/casos/toxina/botox-antes.png",
    after: "/image/casos/toxina/botox-despues.png",
    alt: "Comparación antes y después de relleno de labios",
  },
  {
    id: "toxina-02",
    treatment: "toxina",
    title: "Volumen natural en labios",
    description: "Una sesión, 1 ml de ácido hialurónico.",
    before: "/image/casos/toxina/botox-antes1.png",
    after: "/image/casos/toxina/botox-despues1.png",
    alt: "Comparación antes y después de relleno de labios",
  },
];
