import { contact, profile } from 'src/config'
import { Frond } from 'src/components/Decor'
import Reveal from 'src/components/Reveal'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Contact() {
  const handle = contact.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')

  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-to-b from-sky-100 to-sky-300">
      <Frond className="absolute -right-8 bottom-0 w-40 -rotate-12 sm:w-56" color="#34d399" />

      <Reveal className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700/80">Say hello</p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-800 sm:text-4xl">Let's connect</h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-3 font-medium text-slate-700 shadow-sm transition-colors hover:bg-white"
          >
            <GitHubIcon />
            {handle}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-3 font-medium text-slate-700 shadow-sm transition-colors hover:bg-white"
          >
            <MailIcon />
            {contact.email}
          </a>
        </div>

        <p className="mt-16 text-sm text-sky-900/60">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
      </Reveal>
    </footer>
  )
}
