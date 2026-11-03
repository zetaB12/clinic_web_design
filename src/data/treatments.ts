import type { Icon } from "@phosphor-icons/react";
import { Drop, Flower, Leaf, Lightning, Syringe } from "@phosphor-icons/react";

export type Treatment = {
  slug: string;
  icon: Icon;
  name: string;
  description: string;
  /** Foto superior (provisional: recortes de la referencia, reemplazar por fotos propias). */
  image?: string;
  alt?: string;
  /** object-position de la foto dentro del recuadro. */
  pos?: string;
  /** Zoom de la foto (1 = sin zoom) para variar recortes. */
  zoom?: number;
};

// Cada slug corresponde a la ruta /tratamientos/<slug>.
export const TREATMENTS: Treatment[] = [
  {
    slug: "toxina-botulinica",
    icon: Syringe,
    name: "Toxina botulínica",
    description:
      "Suaviza las líneas de expresión de la frente y el contorno de ojos con un resultado natural.",
    image: "/image/tratamientos/piel.jpg",
    alt: "Cuidado avanzado de la piel del rostro",
    pos: "80% 40%",
  },
  {
    slug: "acido-hialuronico",
    icon: Drop,
    name: "Ácido hialurónico",
    description:
      "Devuelve volumen, definición e hidratación en labios, pómulos y ojeras.",
    image: "/image/tratamientos/facial.jpg",
    alt: "Tratamiento de hidratación y volumen facial",
    pos: "85% 70%",
  },
  {
    slug: "pink-glow",
    icon: Leaf,
    name: "Pink Glow",
    description:
      "Protocolo de luminosidad que unifica el tono y aporta una piel fresca y radiante.",
    image: "/image/tratamientos/piel.jpg",
    alt: "Piel luminosa tras un tratamiento de glow",
    pos: "85% 55%",
    zoom: 1.7,
  },
  {
    slug: "depilacion-laser",
    icon: Lightning,
    name: "Depilación láser",
    description:
      "Reducción progresiva y duradera del vello con tecnología segura para tu tipo de piel.",
    image: "/image/tratamientos/cuerpo.jpg",
    alt: "Tratamiento corporal con tecnología médica",
    pos: "50% 50%",
  },
  {
    slug: "limpieza-facial",
    icon: Flower,
    name: "Limpieza facial",
    description:
      "Limpieza profunda médica que purifica, renueva y prepara la piel para cualquier tratamiento.",
    image: "/image/tratamientos/facial.jpg",
    alt: "Limpieza facial profesional",
    pos: "30% 50%",
  },
];
