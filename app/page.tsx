import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Program } from "@/components/sections/program"
import { Speakers } from "@/components/sections/speakers"
import { Organization } from "@/components/sections/organization"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Program />
        <Speakers />
        <Organization />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
