import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot lleno → probablemente un bot. Se responde éxito igual
  // (para no confirmarle al bot que fue detectado) pero no se procesa.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  // [PENDIENTE — INTEGRACIÓN DE ENVÍO REAL]
  // Aquí falta conectar un proveedor de correo (p. ej. Resend o
  // SendGrid) para reenviar `parsed.data` a una bandeja real. Requiere
  // una API key como variable de entorno, que no existe todavía.
  // Por ahora solo se valida y se registra en el log del servidor,
  // para que el formulario sea funcional de punta a punta salvo esa
  // última pieza.
  console.log("[contacto] nuevo mensaje validado:", {
    name: parsed.data.name,
    email: parsed.data.email,
    messageLength: parsed.data.message.length,
  });

  return NextResponse.json({ ok: true });
}
