import type React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground", className)}>
      {children}
    </h2>
  )
}
