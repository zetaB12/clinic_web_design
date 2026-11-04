// Datos de contacto únicos de la web. Cambia el número aquí y se actualizan
// todos los botones de reserva (Hero usa el mismo número en su enlace tel:).
export const PHONE = "51900000000"; // formato internacional, sin "+"

export const telHref = `tel:+${PHONE}`;

/** Enlace de WhatsApp con un mensaje prellenado. */
export const whatsappHref = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

export const bookingMessage = (treatment: string) =>
  `Hola, quiero reservar una valoración para ${treatment}.`;
