"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { motion } from "motion/react";

type SubmitState = "idle" | "success" | "error";

export function Contacto() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("https://formspree.io/f/TU_ID_DE_FORMSPREE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
      setServerError(
        "No se pudo enviar el mensaje. Intenta de nuevo o escribe directo por correo.",
      );
    }
  };

  return (
    <section id="contacto" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Left column: info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {"// 04"}
            </p>
            <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
              Contacto
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              Abierto a nuevas oportunidades en análisis de datos y ciencia de
              datos. ¡Escríbeme!
            </p>

            <div className="mt-8 flex flex-col gap-3 font-mono text-sm">
              <a
                href="mailto:correo@ejemplo.com"
                className="text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                correo@ejemplo.com
              </a>
              <a
                href="https://github.com/Nei44"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/neider-arenas-de-la-cruz-163439308?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right column: form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[var(--radius-lg)] border border-border bg-surface/60 p-6 backdrop-blur-sm sm:p-8"
          >
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">No llenar</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("company")}
              />
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-wider text-text-tertiary"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="mt-2 w-full rounded-[var(--radius-sm)] border border-border-strong bg-bg-elevated px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-200 focus:border-accent"
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-negative">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-text-tertiary"
                >
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="mt-2 w-full rounded-[var(--radius-sm)] border border-border-strong bg-bg-elevated px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-200 focus:border-accent"
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-negative">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-text-tertiary"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className="mt-2 w-full resize-y rounded-[var(--radius-sm)] border border-border-strong bg-bg-elevated px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-200 focus:border-accent"
                  {...register("message")}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1.5 text-xs text-negative"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-[var(--radius-md)] bg-accent px-5 py-3 font-mono text-sm font-medium text-bg transition-all duration-200 hover:bg-accent-dim hover:shadow-[var(--glow-accent)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Enviando…" : "Enviar mensaje"}
              </button>

              <div
                role="status"
                aria-live="polite"
                className="min-h-[1.25rem] text-sm"
              >
                {submitState === "success" && (
                  <p className="text-positive">
                    Mensaje enviado. Gracias por escribir.
                  </p>
                )}
                {submitState === "error" && serverError && (
                  <p className="text-negative">{serverError}</p>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
