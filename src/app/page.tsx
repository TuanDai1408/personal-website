import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Testimonials } from "@/components/sections/testimonials"
import { Contact } from "@/components/sections/contact"
import { ValueProposition } from "@/components/sections/value-proposition"
import { Stats } from "@/components/sections/stats"
import { Process } from "@/components/sections/process"
import { TechRadar } from "@/components/sections/tech-radar"
import { InteractiveResume } from "@/components/sections/interactive-resume"
import { BirthdayFloatButton } from "@/components/birthday/float-button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <ValueProposition />
      <Stats />
      <About />
      <Process />
      <TechRadar />
      <InteractiveResume />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
      {/* <BirthdayFloatButton /> */}
    </main>
  )
}
