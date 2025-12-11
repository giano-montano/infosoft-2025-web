// app/programa/ProgramClient.tsx
"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { ColorTag } from "@/components/ui/color-tag";
import type { DaySchedule, ScheduleEvent } from "@/lib/types";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock } from "lucide-react";

export const FORMAT_OPTIONS = [
  { value: "all", label: "Todos los formatos" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conferencia" },
  { value: "panel", label: "Panel" },
  { value: "networking", label: "Networking" },
];

export default function ProgramClient({ schedule }: { schedule: DaySchedule[] }) {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");

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
                  day.events.map((event) => <EventCard key={event.id} event={event} />)
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

function EventCard({ event }: { event: ScheduleEvent }) {
  return (
    <div className="flex gap-4 p-4 md:p-6 bg-secondary/50 rounded-lg border border-border hover:border-muted transition-colors">
      <ColorTag type={event.type} className="mt-1.5" />
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-medium text-foreground mb-2">{event.title}</h4>
        {event.speakerId && <p className="text-sm text-muted-foreground mb-2">{event.speakerId}</p>}
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
