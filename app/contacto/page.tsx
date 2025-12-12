"use client"

import type React from "react"

import { useState } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Note: metadata cannot be exported from client components
// Consider creating a layout.tsx in this folder or converting to server component

export default function Contact() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <SectionTitle className="mb-12 text-center">Contacto</SectionTitle>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nombre
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Correo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                Consulta
              </Label>
              <Textarea
                id="message"
                placeholder="Escribe tu mensaje aquí..."
                rows={6}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="subscribe"
                checked={isSubscribed}
                onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                className="border-border data-[state=checked]:bg-neon-yellow data-[state=checked]:border-neon-yellow data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor="subscribe" className="text-sm text-muted-foreground cursor-pointer">
                Quiero recibir noticias y actualizaciones sobre INFOSOFT
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-neon-yellow text-primary-foreground hover:bg-neon-yellow/90 font-semibold text-lg py-6"
            >
              ENVIAR
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
