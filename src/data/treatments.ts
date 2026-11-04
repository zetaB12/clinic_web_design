import type { Icon } from "@phosphor-icons/react";
import { Drop, Flower, Leaf, Lightning, Syringe } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ *
 * Fuente única de los tratamientos.
 *
 * - Los campos de nivel superior alimentan las tarjetas del carrusel.
 * - `detail` alimenta la página /tratamientos/<slug>.
 * - `detail.sections` es una lista ORDENADA de bloques: la página muestra
 *   solo los bloques que existan y en el orden indicado, así cada
 *   tratamiento tiene su propia composición.
 * ------------------------------------------------------------------ */

const B = import.meta.env.BASE_URL;
const img = (path: string) => `${B}image/${path}`;

type Tone = "bone" | "sand" | "dark";

export type Section =
  | { type: "intro"; title: string; body: string[]; highlight?: string; tone?: Tone }
  | { type: "zones"; title: string; lead?: string; items: { name: string; text: string }[]; tone?: Tone }
  | { type: "benefits"; title: string; items: { title: string; text: string }[]; tone?: Tone }
  | { type: "indications"; title: string; forTitle?: string; for: string[]; notForTitle?: string; notFor?: string[]; tone?: Tone }
  | { type: "procedure"; title: string; lead?: string; steps: { title: string; text: string; time?: string }[]; tone?: Tone }
  | { type: "plan"; title: string; lead?: string; rows: { label: string; value: string; text?: string }[]; note?: string; tone?: Tone }
  | { type: "results"; title: string; lead?: string; pairs: { before: string; after: string; alt: string; caption?: string }[]; note?: string; tone?: Tone }
  | { type: "aftercare"; title: string; dos: string[]; donts?: string[]; note?: string; tone?: Tone }
  | { type: "faq"; title: string; items: { q: string; a: string }[]; tone?: Tone };

export type TreatmentDetail = {
  /** Etiqueta sobre el título (categoría). */
  category: string;
  /** Frase de apertura bajo el título. */
  lead: string;
  /** Datos rápidos del tratamiento (duración, resultado…). */
  facts: { label: string; value: string }[];
  /** object-position de la imagen principal. */
  heroPos?: string;
  sections: Section[];
};

export type Treatment = {
  slug: string;
  icon: Icon;
  name: string;
  description: string;
  /** Imagen principal (tarjeta y cabecera de la página). */
  image?: string;
  alt?: string;
  /** object-position de la foto dentro de la tarjeta. */
  pos?: string;
  /** Zoom de la foto en la tarjeta (1 = sin zoom). */
  zoom?: number;
  detail: TreatmentDetail;
};

// Cada slug corresponde a la ruta /tratamientos/<slug>.
export const TREATMENTS: Treatment[] = [
  /* ============================ TOXINA ============================ */
  {
    slug: "toxina-botulinica",
    icon: Syringe,
    name: "Toxina botulínica",
    description:
      "Suaviza las líneas de expresión de la frente y el contorno de ojos con un resultado natural.",
    image: img("tratamientos/botox.png"),
    alt: "Cuidado avanzado de la piel del rostro",
    pos: "80% 40%",
    detail: {
      category: "Rejuvenecimiento facial",
      lead: "Relaja la musculatura que marca el gesto para que tu rostro se vea descansado, sin perder expresión.",
      facts: [
        { label: "Duración", value: "15–20 min" },
        { label: "Resultado visible", value: "3 a 7 días" },
        { label: "Efecto", value: "4 a 6 meses" },
        { label: "Recuperación", value: "Inmediata" },
      ],
      heroPos: "78% 40%",
      sections: [
        {
          type: "intro",
          title: "Qué es la toxina botulínica",
          body: [
            "Es una proteína purificada que, en dosis muy pequeñas, reduce de forma temporal la contracción de los músculos que producen las arrugas de expresión.",
            "No rellena ni cambia tus rasgos: actúa solo sobre el movimiento. Por eso el objetivo no es la cara inmóvil, sino un gesto más suave y una mirada más descansada.",
          ],
          highlight: "Dosis conservadoras, mapa de inyección diseñado según tu musculatura.",
        },
        {
          type: "zones",
          title: "Zonas de aplicación",
          lead: "Cada zona se trata por separado y en la dosis que tu músculo necesita.",
          items: [
            { name: "Frente", text: "Suaviza las líneas horizontales cuidando no bajar la ceja." },
            { name: "Entrecejo", text: "Atenúa el «ceño fruncido» y la expresión de cansancio o enfado." },
            { name: "Patas de gallo", text: "Relaja las líneas laterales del contorno de ojos al sonreír." },
            { name: "Mirada y cejas", text: "Un leve efecto de elevación para abrir la mirada." },
            { name: "Bruxismo y masetero", text: "Reduce la tensión mandibular y afina el tercio inferior del rostro." },
          ],
        },
        {
          type: "benefits",
          title: "Lo que notarás",
          items: [
            { title: "Expresión natural", text: "Mantienes tu gesto; solo desaparece la tensión que lo endurece." },
            { title: "Prevención", text: "Menos movimiento repetido significa que las líneas profundas tardan más en formarse." },
            { title: "Sin tiempo de baja", text: "Retomas tu día tras la sesión, evitando solo esfuerzos intensos esa tarde." },
          ],
        },
        {
          type: "results",
          title: "Resultados reales",
          lead: "Casos de pacientes tratadas en la clínica, con su autorización.",
          tone: "sand",
          pairs: [
            { before: img("casos/toxina/botox-antes1.png"), after: img("casos/toxina/botox-despues1.png"), alt: "Zona de la frente antes y después de toxina botulínica", caption: "Frente · 14 días después" },
            { before: img("casos/toxina/botox-antes.png"), after: img("casos/toxina/botox-despues.png"), alt: "Perfil del rostro antes y después de toxina botulínica", caption: "Entrecejo · 14 días después" },
          ],
          note: "Los resultados varían según cada persona y no constituyen una garantía.",
        },
        {
          type: "procedure",
          title: "Cómo es tu sesión",
          tone: "dark",
          steps: [
            { title: "Valoración y mapa", text: "Observamos tu gesto en reposo y en movimiento y marcamos los puntos de aplicación.", time: "10 min" },
            { title: "Limpieza de la piel", text: "Se desinfecta la zona; no suele requerir anestesia.", time: "2 min" },
            { title: "Aplicación", text: "Microinyecciones con aguja ultrafina, en dosis medidas por punto.", time: "5 min" },
            { title: "Revisión a los 14 días", text: "Comprobamos el efecto y, si hace falta, ajustamos con un retoque.", time: "Control" },
          ],
        },
        {
          type: "aftercare",
          title: "Cuidados posteriores",
          tone: "bone",
          dos: [
            "Mantén la cabeza erguida las primeras 4 horas.",
            "Contrae suavemente la zona tratada en las primeras horas, si te lo indicamos.",
            "Usa protector solar a diario.",
          ],
          donts: [
            "No masajees ni presiones la zona 24 horas.",
            "Evita ejercicio intenso, sauna y calor excesivo el primer día.",
            "No te tumbes boca abajo durante 4 horas.",
          ],
          note: "Puede aparecer un pequeño enrojecimiento o punto de inyección que se resuelve en pocas horas.",
        },
        {
          type: "faq",
          title: "Preguntas frecuentes",
          tone: "sand",
          items: [
            { q: "¿Me quedaré con la cara «congelada»?", a: "No si la dosis es la adecuada. Trabajamos con cantidades conservadoras para que conserves expresión; siempre es más fácil reforzar que corregir." },
            { q: "¿Duele?", a: "Es una molestia leve y muy breve, comparable a un pinchazo pequeño. Si lo necesitas, aplicamos anestesia tópica." },
            { q: "¿Cuándo veo el resultado?", a: "El efecto empieza entre el tercer y el séptimo día y se estabiliza hacia las dos semanas." },
            { q: "¿Cada cuánto debo repetirlo?", a: "Normalmente cada 4 a 6 meses. Con el tiempo, muchas pacientes espacian más las sesiones." },
            { q: "¿Quién no debe hacérselo?", a: "No se aplica durante el embarazo o la lactancia, ni en personas con ciertas enfermedades neuromusculares. Lo revisamos en la valoración." },
          ],
        },
      ],
    },
  },

  /* ============================ ÁCIDO HIALURÓNICO ============================ */
  {
    slug: "acido-hialuronico",
    icon: Drop,
    name: "Ácido hialurónico",
    description:
      "Devuelve volumen, definición e hidratación en labios, pómulos y ojeras.",
    image: img("tratamientos/acido.png"),
    alt: "Tratamiento de hidratación y volumen facial",
    pos: "85% 70%",
    detail: {
      category: "Volumen y definición",
      lead: "Repone volumen, perfila y aporta hidratación profunda allí donde el rostro lo ha ido perdiendo.",
      facts: [
        { label: "Duración", value: "30–45 min" },
        { label: "Resultado", value: "Inmediato" },
        { label: "Efecto", value: "6 a 18 meses" },
        { label: "Reversible", value: "Sí, con hialuronidasa" },
      ],
      heroPos: "85% 65%",
      sections: [
        {
          type: "intro",
          title: "Qué es el ácido hialurónico",
          body: [
            "Es una sustancia que tu piel produce de forma natural y que retiene agua. Con los años su cantidad disminuye y aparecen flacidez, pérdida de volumen y sequedad.",
            "El hialurónico médico es un gel biocompatible y totalmente reabsorbible. Según su densidad, sirve para hidratar, dar soporte o perfilar, siempre respetando las proporciones de tu rostro.",
          ],
          highlight: "Es reabsorbible y reversible: no es un cambio definitivo.",
        },
        {
          type: "zones",
          title: "Dónde se aplica y qué logra",
          lead: "Elegimos la textura del gel según la zona y el efecto que buscas.",
          tone: "sand",
          items: [
            { name: "Labios", text: "Hidratación, perfilado del contorno y volumen proporcionado, sin efecto «pato»." },
            { name: "Pómulos", text: "Recupera el soporte del tercio medio y la proyección que se pierde con la edad." },
            { name: "Ojeras y surco lagrimal", text: "Suaviza la sombra del párpado inferior con una textura muy fina." },
            { name: "Surco nasogeniano", text: "Atenúa el pliegue entre nariz y boca restituyendo apoyo." },
            { name: "Mentón y mandíbula", text: "Define el óvalo y equilibra el perfil." },
          ],
        },
        {
          type: "results",
          title: "Un ejemplo de resultado",
          lead: "Labios antes y después de la sesión: más hidratación y volumen discreto.",
          tone: "bone",
          pairs: [
            { before: img("casos/labios/labios-01-antes.jpg"), after: img("casos/labios/labios-01-despues.jpg"), alt: "Labios antes y después de ácido hialurónico", caption: "Labios · resultado inmediato" },
          ],
          note: "Imagen real con autorización de la paciente. Los resultados varían entre personas.",
        },
        {
          type: "indications",
          title: "¿Es para ti?",
          tone: "sand",
          forTitle: "Suele indicarse si…",
          for: [
            "Notas pérdida de volumen en pómulos o ángulo mandibular.",
            "Quieres labios más hidratados y definidos.",
            "Tienes ojeras de tipo estructural, no solo de color.",
            "Buscas armonizar el perfil con cambios sutiles.",
          ],
          notForTitle: "No se recomienda si…",
          notFor: [
            "Estás embarazada o en periodo de lactancia.",
            "Hay infección activa o herpes en la zona.",
            "Tienes antecedentes de alergia a alguno de los componentes.",
          ],
        },
        {
          type: "procedure",
          title: "Tu sesión paso a paso",
          tone: "dark",
          steps: [
            { title: "Diseño del plan", text: "Fotografías, análisis de proporciones y acuerdo del objetivo antes de pinchar.", time: "15 min" },
            { title: "Anestesia tópica", text: "Crema anestésica para que la sesión sea cómoda.", time: "15 min" },
            { title: "Aplicación gradual", text: "Con cánula o aguja fina, depositando el gel en pequeñas cantidades y evaluando en cada paso.", time: "20 min" },
            { title: "Moldeado y revisión", text: "Ajustamos la forma y revisamos la simetría antes de que te vayas.", time: "5 min" },
          ],
        },
        {
          type: "aftercare",
          title: "Cuidados posteriores",
          tone: "bone",
          dos: [
            "Aplica frío suave si hay inflamación, sin presionar.",
            "Duerme con la cabeza ligeramente elevada la primera noche.",
            "Hidrátate bien y usa protector solar.",
          ],
          donts: [
            "No masajees la zona salvo indicación médica.",
            "Evita calor intenso, sauna y ejercicio fuerte 48 horas.",
            "Pospón cualquier tratamiento dental o facial durante 2 semanas.",
          ],
          note: "Es normal una inflamación leve o algún pequeño hematoma durante unos días.",
        },
        {
          type: "faq",
          title: "Preguntas frecuentes",
          tone: "sand",
          items: [
            { q: "¿Cuánto dura el resultado?", a: "Depende de la zona y del producto: desde 6 meses en labios hasta 18 meses en pómulos." },
            { q: "¿Se puede deshacer?", a: "Sí. Existe una enzima, la hialuronidasa, que disuelve el hialurónico si no te convence el resultado." },
            { q: "¿Se notará que me he hecho algo?", a: "Nuestro criterio es la proporción. Se nota que estás descansada, no que has sido tratada." },
            { q: "¿Cuándo veré el resultado final?", a: "Ves el efecto al momento; la forma definitiva se asienta en unas 2 semanas, cuando baja la inflamación." },
          ],
        },
      ],
    },
  },

  /* ============================ DEPILACIÓN LÁSER ============================ */
  {
    slug: "depilacion-laser",
    icon: Lightning,
    name: "Depilación láser",
    description:
      "Reducción progresiva y duradera del vello con tecnología segura para tu tipo de piel.",
    image: img("tratamientos/depilacion.png"),
    alt: "Tratamiento corporal con tecnología médica",
    pos: "50% 50%",
    detail: {
      category: "Cuerpo · Tecnología médica",
      lead: "Un plan de sesiones para reducir el vello de forma progresiva y duradera, con parámetros adaptados a tu piel y a tu tipo de vello.",
      facts: [
        { label: "Sesiones", value: "6 a 8" },
        { label: "Intervalo", value: "4 a 8 semanas" },
        { label: "Por sesión", value: "10–60 min" },
        { label: "Resultado", value: "Reducción duradera" },
      ],
      heroPos: "50% 50%",
      sections: [
        {
          type: "intro",
          title: "Cómo funciona",
          body: [
            "El láser emite una luz que es absorbida por la melanina del vello. La energía llega al folículo y lo debilita, de modo que cada vez crece menos vello y más fino.",
            "Actúa solo sobre los folículos en fase de crecimiento, y por eso se necesitan varias sesiones espaciadas: en cada una se alcanza un grupo distinto.",
          ],
          highlight: "Se reduce el vello de forma duradera; no se promete la eliminación total.",
        },
        {
          type: "benefits",
          title: "Por qué elegirla",
          items: [
            { title: "Constancia, no repetición", text: "Cada sesión reduce más el vello; con el tiempo se acaban las afeitadas y la cera." },
            { title: "Menos irritación", text: "Disminuyen los vellos enquistados y la irritación típica del afeitado." },
            { title: "Precisión", text: "Trabaja folículo a folículo, sin dañar la piel de alrededor." },
            { title: "Piel más uniforme", text: "Menos puntos oscuros y mejor textura en las zonas tratadas." },
          ],
        },
        {
          type: "plan",
          title: "Sesiones orientativas por zona",
          lead: "La valoración fija el número exacto según tu vello, tus hormonas y la zona.",
          tone: "sand",
          rows: [
            { label: "Axilas", value: "6 sesiones", text: "Cada 5–6 semanas" },
            { label: "Piernas completas", value: "6–8 sesiones", text: "Cada 6–8 semanas" },
            { label: "Ingles / bikini", value: "6–8 sesiones", text: "Cada 6 semanas" },
            { label: "Labio superior", value: "6–8 sesiones", text: "Cada 4–5 semanas" },
            { label: "Espalda y pecho", value: "7–9 sesiones", text: "Cada 6–8 semanas" },
          ],
          note: "Las cifras son orientativas y varían de una persona a otra.",
        },
        {
          type: "indications",
          title: "Tu tipo de piel y de vello",
          tone: "bone",
          forTitle: "Funciona mejor con…",
          for: [
            "Vello oscuro y grueso, el que más energía absorbe.",
            "Piel de clara a media; en pieles más oscuras se ajusta la tecnología y los parámetros.",
            "Piel sin bronceado reciente.",
          ],
          notForTitle: "Menos indicado en…",
          notFor: [
            "Vello rubio, blanco o muy fino (poca melanina).",
            "Embarazo.",
            "Bronceado reciente o uso de fármacos fotosensibilizantes.",
          ],
        },
        {
          type: "procedure",
          title: "Antes y durante la sesión",
          tone: "dark",
          steps: [
            { title: "Preparación en casa", text: "Rasura la zona 24 horas antes. No arranques el vello con cera ni pinzas durante el tratamiento.", time: "24 h antes" },
            { title: "Test y parámetros", text: "Valoramos tu fototipo y hacemos un disparo de prueba antes de empezar.", time: "5 min" },
            { title: "Disparos con enfriamiento", text: "El láser se aplica con el sistema de enfriamiento activo para proteger la piel.", time: "10–60 min" },
            { title: "Calmar y proteger", text: "Aplicamos un gel calmante y un protector solar al terminar.", time: "5 min" },
          ],
        },
        {
          type: "aftercare",
          title: "Después de la sesión",
          tone: "bone",
          dos: [
            "Hidrata con crema calmante las primeras 48 horas.",
            "Usa protector solar SPF 50 en las zonas expuestas.",
            "Rasura, si lo necesitas, con maquinilla; el vello caerá solo en 1 a 2 semanas.",
          ],
          donts: [
            "Evita el sol directo y las cabinas de bronceado 15 días.",
            "No uses cera ni pinzas entre sesiones.",
            "Evita sauna, piscina y ejercicio intenso 48 horas.",
          ],
          note: "Un enrojecimiento leve, parecido al sol, es normal y desaparece en horas.",
        },
        {
          type: "faq",
          title: "Preguntas frecuentes",
          tone: "sand",
          items: [
            { q: "¿Duele?", a: "Se siente como un pequeño calor o un chasquido. El sistema de enfriamiento lo hace muy tolerable." },
            { q: "¿Es definitiva?", a: "Es una reducción duradera. Algunas personas necesitan una sesión de mantenimiento al año." },
            { q: "¿Puedo hacerla en verano?", a: "Sí, siempre que no haya bronceado en la zona y uses protección solar estricta." },
            { q: "¿Es segura para pieles oscuras?", a: "Sí, con la tecnología y los parámetros adecuados. Lo evaluamos en la valoración." },
          ],
        },
      ],
    },
  },

  /* ============================ PINK GLOW ============================ */
  {
    slug: "pink-glow",
    icon: Leaf,
    name: "Pink Glow",
    description:
      "Protocolo de luminosidad que unifica el tono y aporta una piel fresca y radiante.",
    image: img("tratamientos/pink.png"),
    alt: "Piel luminosa tras un tratamiento de glow",
    pos: "85% 55%",
    zoom: 1.7,
    detail: {
      category: "Luminosidad · Calidad de piel",
      lead: "Un protocolo en tres fases que renueva, nutre e ilumina la piel para un efecto glow visible desde la primera sesión.",
      facts: [
        { label: "Protocolo", value: "3 fases" },
        { label: "Duración", value: "50 min" },
        { label: "Sesiones", value: "3 a 4" },
        { label: "Recuperación", value: "Sin baja" },
      ],
      heroPos: "85% 50%",
      sections: [
        {
          type: "intro",
          title: "El efecto glow, con método",
          body: [
            "Pink Glow combina exfoliación suave, activos bioestimulantes y una mascarilla calmante en una sola sesión, para mejorar a la vez la textura, la hidratación y el tono de la piel.",
            "No es un tratamiento agresivo ni deja la piel descamada: es una cura de luz pensada para llegar a un evento, o para mantener la piel en forma durante el año.",
          ],
          highlight: "Resultados visibles desde la primera sesión, acumulativos con el protocolo.",
        },
        {
          type: "plan",
          title: "Las tres fases del protocolo",
          lead: "Cada fase prepara a la siguiente.",
          tone: "sand",
          rows: [
            { label: "Fase 1 · Renovar", value: "Exfoliación", text: "Retira células muertas y deja la piel receptiva a los activos." },
            { label: "Fase 2 · Nutrir", value: "Activos glow", text: "Vitaminas, péptidos y ácido hialurónico de baja densidad para hidratar y unificar el tono." },
            { label: "Fase 3 · Iluminar", value: "Mascarilla rosa", text: "Calma, deja una luminosidad inmediata y sella la hidratación." },
          ],
          note: "Se recomiendan 3 o 4 sesiones, una cada 2 o 3 semanas.",
        },
        {
          type: "benefits",
          title: "Lo que mejora",
          tone: "bone",
          items: [
            { title: "Luminosidad", text: "Una piel más fresca y reflectante desde la primera visita." },
            { title: "Tono uniforme", text: "Atenúa manchas leves y apagamiento." },
            { title: "Hidratación profunda", text: "Más confort, menos sensación de tirantez." },
            { title: "Textura fina", text: "Poros menos marcados y superficie más lisa." },
          ],
        },
        {
          type: "indications",
          title: "Quién se beneficia",
          tone: "sand",
          forTitle: "Ideal si tu piel…",
          for: [
            "Se ve apagada, cansada o deshidratada.",
            "Tiene manchas leves o un tono desigual.",
            "Necesita un «reinicio» antes de un evento o una estación.",
            "Quieres una opción suave, sin periodo de recuperación.",
          ],
          notForTitle: "Conviene posponer si…",
          notFor: [
            "Hay una infección o dermatitis activa en la piel.",
            "Estás embarazada o en lactancia.",
            "Has tomado sol intenso en los últimos días.",
          ],
        },
        {
          type: "aftercare",
          title: "Mantén el glow",
          tone: "dark",
          dos: [
            "Protector solar de amplio espectro cada mañana.",
            "Hidratante y limpiador suave durante 3 días.",
            "Bebe agua y descansa para prolongar el efecto.",
          ],
          donts: [
            "Evita exfoliantes y ácidos en casa 3 días.",
            "No tomes sol directo ni uses cabinas 72 horas.",
            "No te maquilles las primeras 6 horas si es posible.",
          ],
          note: "Es normal un leve tono rosado los primeros minutos; se disipa en pocas horas.",
        },
        {
          type: "faq",
          title: "Preguntas frecuentes",
          tone: "bone",
          items: [
            { q: "¿Puedo maquillarme después?", a: "Sí, tras unas 6 horas. El efecto de luminosidad suele permitir un maquillaje más ligero." },
            { q: "¿Cuándo es mejor hacerlo antes de un evento?", a: "Entre 3 y 7 días antes, para que la piel esté en su mejor momento." },
            { q: "¿Se puede combinar con otros tratamientos?", a: "Sí. Funciona muy bien antes o después de toxina botulínica y de ácido hialurónico, siempre pautado por el médico." },
          ],
        },
      ],
    },
  },

  /* ============================ LIMPIEZA FACIAL ============================ */
  {
    slug: "limpieza-facial",
    icon: Flower,
    name: "Limpieza facial",
    description:
      "Limpieza profunda médica que purifica, renueva y prepara la piel para cualquier tratamiento.",
    image: img("tratamientos/facial.jpg"),
    alt: "Limpieza facial profesional",
    pos: "30% 50%",
    detail: {
      category: "Cuidado de la piel",
      lead: "Un ritual médico paso a paso que purifica los poros, renueva la superficie de la piel y la deja preparada para todo lo demás.",
      facts: [
        { label: "Duración", value: "60 min" },
        { label: "Frecuencia", value: "Cada 4–6 semanas" },
        { label: "Recuperación", value: "Inmediata" },
        { label: "Para", value: "Todo tipo de piel" },
      ],
      heroPos: "30% 50%",
      sections: [
        {
          type: "intro",
          title: "Más que una limpieza",
          body: [
            "A diferencia de una limpieza de cabina, aquí cada paso lo decide un profesional sanitario según el estado real de tu piel: se elige la técnica, los activos y la intensidad.",
            "El resultado es una piel limpia, oxigenada y más receptiva, que absorbe mejor el cuidado que haces en casa y los tratamientos posteriores.",
          ],
          highlight: "Protocolo personalizado según tu tipo de piel, no un paquete cerrado.",
        },
        {
          type: "procedure",
          title: "El ritual, paso a paso",
          lead: "Una hora pensada para que además puedas desconectar.",
          tone: "dark",
          steps: [
            { title: "Diagnóstico de piel", text: "Observamos hidratación, sebo y sensibilidad para elegir el protocolo.", time: "5 min" },
            { title: "Doble limpieza", text: "Retiramos maquillaje, protector y suciedad superficial.", time: "8 min" },
            { title: "Exfoliación enzimática", text: "Elimina células muertas sin agredir la piel.", time: "10 min" },
            { title: "Extracción suave", text: "Vaciado de comedones con vapor y técnica manual, sin dejar marcas.", time: "20 min" },
            { title: "Alta frecuencia y sérum", text: "Efecto purificante y calmante, con activos según tu piel.", time: "10 min" },
            { title: "Mascarilla y protección", text: "Hidratación, calma y protector solar para salir lista.", time: "10 min" },
          ],
        },
        {
          type: "indications",
          title: "Se adapta a tu piel",
          tone: "bone",
          forTitle: "Tipos de piel y objetivos",
          for: [
            "Piel grasa o con tendencia acneica: control del sebo y los poros.",
            "Piel mixta: equilibrio entre zona T y mejillas.",
            "Piel seca o sensible: versión hidratante y calmante.",
            "Preparación antes de peeling, láser o inyectables.",
          ],
          notForTitle: "Se pospone si hay…",
          notFor: [
            "Acné inflamatorio muy activo, herpes o infección en la zona.",
            "Quemadura solar reciente.",
            "Tratamiento con isotretinoína reciente (consultar antes).",
          ],
        },
        {
          type: "benefits",
          title: "Qué consigues",
          tone: "sand",
          items: [
            { title: "Poros limpios", text: "Menos puntos negros y textura más fina." },
            { title: "Piel que respira", text: "Mejor luminosidad y tacto al tocarla." },
            { title: "Mejor absorción", text: "Tus cremas y tratamientos hacen más efecto." },
          ],
        },
        {
          type: "plan",
          title: "Con qué frecuencia",
          tone: "bone",
          rows: [
            { label: "Piel grasa / acneica", value: "Cada 3–4 semanas", text: "Mantenimiento y control del sebo." },
            { label: "Piel mixta", value: "Cada 4–6 semanas", text: "Equilibrio del ciclo natural de renovación." },
            { label: "Piel seca / sensible", value: "Cada 6–8 semanas", text: "Versión suave, con foco en la hidratación." },
          ],
        },
        {
          type: "aftercare",
          title: "En los días posteriores",
          tone: "sand",
          dos: [
            "Protector solar SPF 30 o más, cada mañana.",
            "Limpiador suave y crema hidratante.",
            "Lava las brochas y toallas que uses en el rostro.",
          ],
          donts: [
            "No manipules ni extraigas granitos por tu cuenta.",
            "Evita exfoliantes, retinoides y ácidos 48 horas.",
            "Evita sauna y ejercicio intenso el primer día.",
          ],
          note: "Un ligero enrojecimiento durante unas horas es normal.",
        },
        {
          type: "faq",
          title: "Preguntas frecuentes",
          tone: "bone",
          items: [
            { q: "¿Duele?", a: "No. Puede haber alguna molestia puntual durante la extracción, siempre controlada." },
            { q: "¿Puedo maquillarme después?", a: "Es preferible esperar unas horas; si tienes un evento, lo planificamos con maquillaje ligero." },
            { q: "¿Se puede hacer junto a otro tratamiento?", a: "Es el mejor primer paso antes de Pink Glow, peelings o inyectables, previa indicación médica." },
          ],
        },
      ],
    },
  },
];

export const findTreatment = (slug: string) => TREATMENTS.find((t) => t.slug === slug);
