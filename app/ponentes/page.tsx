// app/ponentes/page.tsx
import { SectionTitle } from "@/components/ui/section-title"
import { PersonCard } from "@/components/ui/person-card"
import { SPEAKERS_DATA } from "@/lib/data/speakers"
import { getSpeakers, resolveSpeakerAvatarUrl } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ponentes",
  description: "Conoce a los expertos líderes en tecnología e innovación que compartirán su conocimiento en INFOSOFT 2025. Speakers destacados de la industria tech.",
  openGraph: {
    title: "Ponentes | INFOSOFT 2025",
    description: "Expertos líderes en tecnología e innovación que transforman la industria. Conoce a nuestros speakers.",
  },
};

export  default async function Speakers() {

  const speakers = await getSpeakers();

   // resolve avatar urls server-side (parallel)
  const withAvatars = await Promise.all(
    speakers.map(async (s) => {
      const avatar = await resolveSpeakerAvatarUrl(s.avatar);
      
      console.log("Resolved avatar for speaker:", s.name, "->", avatar);
      return {
        ...s,
        avatar,
      };
    })
  );

  return (
    <section id="speakers" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle className="mb-12">Ponentes</SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {withAvatars.map((speaker) => (
            <PersonCard
              key={speaker.id}
              name={speaker.name}
              role={speaker.role ?? ""}
              subtitle={speaker.company ?? ""}
              avatar={speaker.avatar ?? "/professional-placeholder.png" }
              talks={speaker.talks ?? []}
              linkedin={speaker.linkedin}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
