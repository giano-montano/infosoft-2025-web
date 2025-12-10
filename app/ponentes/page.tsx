import { SectionTitle } from "@/components/ui/section-title"
import { PersonCard } from "@/components/ui/person-card"
import { SPEAKERS_DATA } from "@/lib/data/speakers"

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle className="mb-12">Ponentes</SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEAKERS_DATA.map((speaker) => (
            <PersonCard
              key={speaker.id}
              name={speaker.name}
              role={speaker.role}
              subtitle={speaker.company}
              avatar={speaker.avatar}
              talks={speaker.talks}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
