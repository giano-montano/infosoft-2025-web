export interface TeamMember {
  id: string
  name: string
  role: string
  area: string
  avatar: string
  linkedin?: string
}

export const ORGANIZATION_DATA: TeamMember[] = [
  {
    id: "1",
    name: "Roberto Sánchez",
    role: "Director General",
    area: "Dirección",
    avatar: "/professional-man-director.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "2",
    name: "Patricia Vega",
    role: "Coordinadora Académica",
    area: "Dirección",
    avatar: "/professional-woman-coordinator.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Luis Fernández",
    role: "Jefe de Logística",
    area: "Logística",
    avatar: "/professional-man-logistics.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Carmen Ruiz",
    role: "Coordinadora de Eventos",
    area: "Logística",
    avatar: "/professional-woman-events.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "5",
    name: "Diego Morales",
    role: "Lead Developer",
    area: "Web",
    avatar: "/professional-man-web-developer.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "6",
    name: "Sofía Castro",
    role: "UI/UX Designer",
    area: "Web",
    avatar: "/professional-woman-designer.png",
    linkedin: "https://linkedin.com",
  },
]

export const ORGANIZATION_AREAS = ["Dirección", "Logística", "Web"]
