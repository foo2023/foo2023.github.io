import Gallery from 'src/components/Gallery'
import Description from 'src/components/Description'
import Reveal from 'src/components/Reveal'

// One project or hobby: square gallery on one side, text on the other.
export default function EntryCard({ entry, flip = false }) {
  const hasImages = entry.images.length > 0

  return (
    <Reveal
      as="article"
      className={`grid items-center gap-8 rounded-[2rem] bg-white/70 p-5 shadow-[0_10px_40px_-20px_rgba(14,116,144,0.35)] ring-1 ring-white sm:p-8 ${
        hasImages ? 'md:grid-cols-2' : ''
      }`}
    >
      {hasImages && (
        <div className={flip ? 'md:order-2' : ''}>
          <Gallery images={entry.images} title={entry.title} />
        </div>
      )}

      <div>
        {entry.type && (
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            {entry.type}
          </span>
        )}
        <h3 className="mt-3 text-2xl font-bold text-slate-800 sm:text-3xl">
          {entry.link ? (
            <a href={entry.link} target="_blank" rel="noreferrer" className="transition-colors hover:text-sky-600">
              {entry.title}
            </a>
          ) : (
            entry.title
          )}
        </h3>

        {entry.tech.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {entry.tech.map((t) => (
              <li key={t} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <Description text={entry.description} />
        </div>
      </div>
    </Reveal>
  )
}
