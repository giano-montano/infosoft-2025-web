import type { EventType } from "./schedule"

export interface Speaker {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  talks: {
    title: string
    type: EventType
  }[]
}

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: "1",
    name: "Dr. Carlos Mendoza",
    role: "Director de Investigación",
    company: "TechLab PUCP",
    avatar: "/professional-scientist.png",
    talks: [
      { title: "IA Generativa en la Industria", type: "conference" },
      { title: "Panel: El Futuro del Trabajo Tech", type: "panel" },
    ],
  },
  {
    id: "2",
    name: "Ing. María López",
    role: "Lead Security Engineer",
    company: "CyberDefense Corp",
    avatar: "/professional-woman-engineer.png",
    talks: [{ title: "Ciberseguridad en 2025", type: "conference" }],
  },
  {
    id: "3",
    name: "José García",
    role: "Senior Software Architect",
    company: "CloudScale Inc",
    avatar: "/professional-man-developer.png",
    talks: [{ title: "Workshop: Cloud Architecture", type: "workshop" }],
  },
  {
    id: "4",
    name: "Ana Torres",
    role: "Full Stack Developer",
    company: "Vercel",
    avatar: "/professional-woman-developer.png",
    talks: [{ title: "Workshop: Desarrollo con Next.js 15", type: "workshop" }],
  },
]
