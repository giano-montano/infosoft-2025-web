import { SectionTitle } from "@/components/ui/section-title"
import { PersonCard } from "@/components/ui/person-card"
import { ORGANIZATION_DATA, ORGANIZATION_AREAS } from "@/lib/data/organization"

export default function Organization() {
  return (
    <section id="organization" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle className="mb-12">Organización</SectionTitle>

        <div className="space-y-12">
          {ORGANIZATION_AREAS.map((area) => {
            const members = ORGANIZATION_DATA.filter((m) => m.area === area)
            return (
              <div key={area}>
                <h3 className="text-xl font-semibold mb-6 text-foreground">{area}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <PersonCard
                      key={member.id}
                      name={member.name}
                      role={member.role}
                      avatar={member.avatar}
                      linkedin={member.linkedin}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
