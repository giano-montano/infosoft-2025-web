// lib/types.ts
export type EventType = "workshop" | "conference" | "panel" | "networking";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  area: string;
  avatar: string;
  linkedin?: string;
}

export interface Speaker {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string; // ruta relativa dentro de CONTENT_DIR/images/
  talks?: { title: string; type: EventType }[];
  linkedin?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  location?: string;
  time: string;
  type: EventType;
  speakerId?: string; // referencia a Speaker.id
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  dayLabel?: string;
  events: ScheduleEvent[];
}
