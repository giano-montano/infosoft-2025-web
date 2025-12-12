"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { STATS_DATA } from "@/lib/data/stats"
import { Button } from "@/components/ui/button"

// Note: metadata in layout.tsx since this is a client component

const CAROUSEL_IMAGES = [
  "/tech-conference-2020.jpg",
  "/university-event-speakers.jpg",
  "/innovation-summit-audience.jpg",
  "/technology-workshop-students.jpg",
]

export default function QueEsINFOSOFT() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  }

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <SectionTitle>¿Qué es INFOSOFT?</SectionTitle>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Desde el año 2000, INFOSOFT se ha consolidado como el evento de tecnología e innovación más importante
                de la PUCP.
              </p>
              <p>
                Durante más de dos décadas, hemos reunido a estudiantes, profesionales y líderes de la industria para
                compartir conocimientos, experiencias y visiones sobre el futuro de la tecnología.
              </p>
              <p>
                Cada edición es una oportunidad única para conectar con la comunidad tech, descubrir las últimas
                tendencias y construir el futuro juntos.
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="aspect-[3/2] bg-secondary rounded-lg overflow-hidden relative">
              <img
                src={CAROUSEL_IMAGES[currentSlide] || "/placeholder.svg"}
                alt={`INFOSOFT histórico ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="ml-2 bg-neon-yellow text-primary-foreground hover:bg-neon-yellow/80 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="mr-2 bg-neon-yellow text-primary-foreground hover:bg-neon-yellow/80 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-neon-yellow" : "bg-muted"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 md:mt-24 pt-16 border-t border-border">
          {STATS_DATA.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">{stat.value}</p>
              <p className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
