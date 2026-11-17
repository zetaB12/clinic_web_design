// Datos de contacto únicos de la web. Cambia el número aquí y se actualizan
// todos los botones de reserva (Hero usa el mismo número en su enlace tel:).
export const PHONE = "51900000000"; // formato internacional, sin "+"

export const telHref = `tel:+${PHONE}`;

/** Enlace de WhatsApp con un mensaje prellenado. */
export const whatsappHref = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

export const bookingMessage = (treatment: string) =>
  `Hola, quiero reservar una valoración para ${treatment}.`;

/** Teléfono para mostrar en pantalla (+51 900 000 000), derivado de PHONE. */
export const phoneDisplay = `+${PHONE.slice(0, 2)} ${PHONE.slice(2, 5)} ${PHONE.slice(5, 8)} ${PHONE.slice(8)}`;
