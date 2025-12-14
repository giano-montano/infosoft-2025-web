import { SectionTitle } from "@/components/ui/section-title"
import { PersonCard } from "@/components/ui/person-card"
import { getOrganization, resolveOrganizationAvatarUrl } from "@/lib/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Organización",
  description: "Conoce al equipo organizador de INFOSOFT 2025. Estudiantes y profesionales de PUCP comprometidos con crear el mejor evento de tecnología.",
  openGraph: {
    title: "Organización | INFOSOFT 2025",
    description: "El equipo detrás de INFOSOFT 2025: estudiantes y profesionales comprometidos con la innovación.",
  },
};

export default async function Organization() {
  const organizationData = await getOrganization();
  
  // Resolve avatar URLs server-side (parallel)
  const withAvatars = await Promise.all(
    organizationData.map(async (m) => {
      const avatar = await resolveOrganizationAvatarUrl(m.avatar);
      console.log("Resolved avatar for member:", m.name, "->", avatar);
      return {
        ...m,
        avatar,
      };
    })
  );
  
  // Get unique areas maintaining order
  const areas = Array.from(new Set(withAvatars.map(m => m.area)));

  return (
    <section id="organization" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle className="mb-12">Organización</SectionTitle>

        <div className="space-y-12">
          {areas.map((area) => {
            const members = withAvatars.filter((m) => m.area === area)
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
