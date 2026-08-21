import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo."),
  email: z.string().trim().email("Escribe un correo válido."),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(2000, "El mensaje no puede superar los 2000 caracteres."),
  // Honeypot: un campo que un humano nunca llena porque está oculto
  // visualmente pero un bot de formularios sí. Si llega con contenido,
  // el servidor descarta el envío en silencio.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
