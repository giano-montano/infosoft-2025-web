"use client"

import { useState } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { ColorTag } from "@/components/ui/color-tag"
import { SCHEDULE_DATA, FORMAT_OPTIONS, type EventType } from "@/lib/data/schedule"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock } from "lucide-react"

export function Program() {
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const [selectedFormat, setSelectedFormat] = useState<string>("all")

  const filteredSchedule = SCHEDULE_DATA.filter((day) => {
    if (selectedDay !== "all" && day.date !== selectedDay) return false
    return true
  }).map((day) => ({
    ...day,
    events: day.events.filter((event) => {
      if (selectedFormat !== "all" && event.type !== selectedFormat) return false
      return true
    }),
  }))

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
              {SCHEDULE_DATA.map((day) => (
                <SelectItem key={day.date} value={day.date}>
                  {day.dayLabel}
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
                  <p className="text-muted-foreground py-8 text-center">
                    No hay eventos que coincidan con los filtros seleccionados.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface EventCardProps {
  event: {
    id: string
    title: string
    location: string
    time: string
    type: EventType
    speaker?: string
  }
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex gap-4 p-4 md:p-6 bg-secondary/50 rounded-lg border border-border hover:border-muted transition-colors">
      <ColorTag type={event.type} className="mt-1.5" />
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-medium text-foreground mb-2">{event.title}</h4>
        {event.speaker && <p className="text-sm text-muted-foreground mb-2">{event.speaker}</p>}
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
  )
}
