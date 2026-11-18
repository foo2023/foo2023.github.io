import Reveal from 'src/components/Reveal'

export default function Section({ id, eyebrow, title, className = '', children }) {
  return (
    <section id={id} className={`relative overflow-hidden px-5 py-16 sm:py-24 ${className}`}>
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center sm:mb-14">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600/80">{eyebrow}</p>}
          <h2 className="mt-2 text-3xl font-extrabold text-slate-800 sm:text-4xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
