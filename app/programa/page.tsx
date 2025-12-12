// app/programa/page.tsx  (Server Component)
import { getSchedule, getSpeakers } from "@/lib/content";
import ProgramClient from "./ProgramClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programa",
  description: "Descubre el programa completo de INFOSOFT 2025: workshops, conferencias, paneles y sesiones de networking. 17-19 de Diciembre, Campus PUCP.",
  openGraph: {
    title: "Programa | INFOSOFT 2025",
    description: "Workshops, conferencias y paneles con expertos en tecnología e innovación. 17-19 de Diciembre 2025.",
  },
};

export default async function ProgramPage() {
  const [schedule, speakers] = await Promise.all([getSchedule(), getSpeakers()]);

  return <ProgramClient schedule={schedule} speakers={speakers} />;
}
