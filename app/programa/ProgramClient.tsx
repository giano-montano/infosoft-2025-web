// app/programa/ProgramClient.tsx
"use client";

import { useState, useMemo } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { ColorTag } from "@/components/ui/color-tag";
import type { DaySchedule, ScheduleEvent, Speaker } from "@/lib/types";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Linkedin } from "lucide-react";

export const FORMAT_OPTIONS = [
  { value: "all", label: "Todos los formatos" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conferencia" },
  { value: "panel", label: "Panel" },
  { value: "networking", label: "Networking" },
];

export default function ProgramClient({ schedule, speakers }: { schedule: DaySchedule[]; speakers: Speaker[] }) {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");

  // Create speaker lookup map for O(1) access
  const speakerMap = useMemo(() => {
    const map = new Map<string, Speaker>();
    speakers.forEach((speaker) => map.set(speaker.id, speaker));
    return map;
  }, [speakers]);

  const filteredSchedule = schedule
    .filter((day) => (selectedDay !== "all" && day.date !== selectedDay ? false : true))
    .map((day) => ({
      ...day,
      events: day.events.filter((event) => (selectedFormat !== "all" && event.type !== selectedFormat ? false : true)),
    }));

  return (
    <section id="program" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle className="mb-12">Programa</SectionTitle>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[180px] bg-secondary border-border">
              <SelectValue placeholder="Seleccionar día" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los días</SelectItem>
              {schedule.map((day) => (
                <SelectItem key={day.date} value={day.date}>
                  {day.dayLabel ?? day.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-[180px] bg-secondary border-border">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              {FORMAT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-12">
          {filteredSchedule.map((day) => (
            <div key={day.date}>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-foreground">{day.dayLabel}</h3>
              <div className="grid gap-4">
                {day.events.length > 0 ? (
                  day.events.map((event) => <EventCard key={event.id} event={event} speakerMap={speakerMap} />)
                ) : (
                  <p className="text-muted-foreground py-8 text-center">No hay eventos que coincidan con los filtros seleccionados.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, speakerMap }: { event: ScheduleEvent; speakerMap: Map<string, Speaker> }) {
  const speaker = event.speakerId ? speakerMap.get(event.speakerId) : null;

  return (
    <div className="flex gap-4 p-4 md:p-6 bg-secondary/50 rounded-lg border border-border hover:border-muted transition-colors">
      <ColorTag type={event.type} className="mt-1.5" />
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-medium text-foreground mb-2">{event.title}</h4>
        {speaker && (
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-muted-foreground">{speaker.name}</p>
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                title={`Ver perfil de LinkedIn de ${speaker.name}`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {event.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {event.time}
          </span>
        </div>
      </div>
    </div>
  );
}
