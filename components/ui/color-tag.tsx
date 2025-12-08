import { cn } from "@/lib/utils"
import type { EventType } from "@/lib/data/schedule"
import { EVENT_TYPE_COLORS } from "@/lib/data/schedule"

interface ColorTagProps {
  type: EventType
  className?: string
}

export function ColorTag({ type, className }: ColorTagProps) {
  return <div className={cn("w-3 h-3 rounded-sm shrink-0", EVENT_TYPE_COLORS[type], className)} />
}
