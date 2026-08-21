import type { Metadata } from "next";
import { Outfit, Inter, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { GlobalCanvas } from "@/components/canvas/GlobalCanvas";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Neider Arenas De La Cruz — Físico & Analista de Datos",
  description:
    "Portafolio de Neider Arenas De La Cruz: proyectos de análisis de datos, ciencia de datos y finanzas cuantitativas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-text-primary">
        <GlobalCanvas />
        <ScrollProgressBar />
        <Nav />
        {children}
      </body>
    </html>
  );
}
