export type EventType = "workshop" | "conference" | "panel" | "networking"

export interface ScheduleEvent {
  id: string
  title: string
  location: string
  time: string
  type: EventType
  speaker?: string
}

export interface DaySchedule {
  date: string
  dayLabel: string
  events: ScheduleEvent[]
}

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  workshop: "bg-neon-cyan",
  conference: "bg-neon-green",
  panel: "bg-neon-yellow",
  networking: "bg-neon-magenta",
}

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    date: "2025-12-17",
    dayLabel: "Miércoles 17",
    events: [
      {
        id: "1",
        title: "Ceremonia de Apertura",
        location: "Auditorio Principal",
        time: "09:00 - 10:00",
        type: "conference",
      }
      
    ],
  },
  {
    date: "2025-12-18",
    dayLabel: "Jueves 18",
    events: [
      {
        id: "1",
        title: "Ceremonia de Apertura",
        location: "Auditorio Principal",
        time: "09:00 - 10:00",
        type: "conference",
      },
      {
        id: "2",
        title: "IA Generativa en la Industria",
        location: "Sala A",
        time: "10:30 - 12:00",
        type: "conference",
        speaker: "Dr. Carlos Mendoza",
      },
      {
        id: "3",
        title: "Workshop: Desarrollo con Next.js 15",
        location: "Laboratorio 1",
        time: "14:00 - 17:00",
        type: "workshop",
      },
      {
        id: "4",
        title: "Panel: El Futuro del Trabajo Tech",
        location: "Auditorio Principal",
        time: "17:30 - 19:00",
        type: "panel",
      },
    ],
  },
  {
    date: "2025-12-19",
    dayLabel: "Viernes 19",
    events: [
      {
        id: "5",
        title: "Ciberseguridad en 2025",
        location: "Auditorio Principal",
        time: "09:00 - 10:30",
        type: "conference",
        speaker: "Ing. María López",
      },
      {
        id: "6",
        title: "Workshop: Cloud Architecture",
        location: "Laboratorio 2",
        time: "11:00 - 13:00",
        type: "workshop",
      },
      {
        id: "7",
        title: "Networking Lunch",
        location: "Cafetería Central",
        time: "13:00 - 14:30",
        type: "networking",
      },
      {
        id: "8",
        title: "Ceremonia de Clausura",
        location: "Auditorio Principal",
        time: "18:00 - 19:30",
        type: "conference",
      },
    ],
  },
]

export const FORMAT_OPTIONS = [
  { value: "all", label: "Todos los formatos" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conferencia" },
  { value: "panel", label: "Panel" },
  { value: "networking", label: "Networking" },
]

export const TOPIC_OPTIONS = [
  { value: "all", label: "Todas las temáticas" },
  { value: "ai", label: "Inteligencia Artificial" },
  { value: "web", label: "Desarrollo Web" },
  { value: "security", label: "Ciberseguridad" },
  { value: "cloud", label: "Cloud Computing" },
]
