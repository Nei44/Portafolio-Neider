import { Hero } from "@/components/Hero";
import { Proyectos } from "@/components/Proyectos";
import { Habilidades } from "@/components/Habilidades";
import { Experiencia } from "@/components/Experiencia";
import { Contacto } from "@/components/Contacto";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />

      {/* Spacer: gives the sphere→brain transition room to breathe */}
      <div className="h-[30vh]" aria-hidden="true" />

      <Proyectos />

      {/* Spacer: brain→network transition */}
      <div className="h-[20vh]" aria-hidden="true" />

      <Habilidades />

      {/* Spacer: network→stars transition */}
      <div className="h-[15vh]" aria-hidden="true" />

      <Experiencia />
      <Contacto />
    </main>
  );
}
