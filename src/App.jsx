import Hero from 'src/components/Hero'
import Section from 'src/components/Section'
import EntryCard from 'src/components/EntryCard'
import Contact from 'src/components/Contact'
import { Leaf } from 'src/components/Decor'
import { hobbies, projects } from 'src/lib/content'

export default function App() {
  return (
    <div className="min-h-screen bg-sand text-slate-700">
      <Hero />

      <main>
        <Section id="projects" eyebrow="What I've built" title="Projects">
          <div className="space-y-10 sm:space-y-14">
            {projects.map((p, i) => (
              <EntryCard key={p.id} entry={p} flip={i % 2 === 1} />
            ))}
          </div>
        </Section>

        <Section
          id="hobbies"
          eyebrow="Away from the screen"
          title="Hobbies"
          className="bg-gradient-to-b from-sand via-emerald-50 to-sky-100"
        >
          <Leaf className="absolute -left-6 top-0 w-24 rotate-[-25deg] opacity-70 sm:w-32" color="#4ade80" />
          <div className="space-y-10 sm:space-y-14">
            {hobbies.map((h, i) => (
              <EntryCard key={h.id} entry={h} flip={i % 2 === 1} />
            ))}
          </div>
        </Section>
      </main>

      <Contact />
    </div>
  )
}
