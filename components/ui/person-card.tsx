import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ColorTag } from "@/components/ui/color-tag"
import { Linkedin } from "lucide-react"
import type { EventType } from "@/lib/data/schedule"

interface PersonCardProps {
  name: string
  role: string
  subtitle?: string
  avatar: string
  talks?: { title: string; type: EventType }[]
  linkedin?: string
}

export function PersonCard({ name, role, subtitle, avatar, talks, linkedin }: PersonCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <div className="p-6 bg-secondary/50 rounded-lg border border-border">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16 shrink-0 ">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} className="object-cover"/>
          <AvatarFallback className="bg-muted text-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
          {subtitle && <p className="text-sm text-muted-foreground/70">{subtitle}</p>}
        </div>
      </div>

      {/* Talks for speakers */}
      {talks && talks.length > 0 && (
        <div className="mt-4 space-y-2">
          {talks.map((talk, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <ColorTag type={talk.type} />
              <span className="text-muted-foreground truncate">{talk.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* LinkedIn for organization */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      )}
    </div>
  )
}
