import { profile } from 'src/config'
import { Cloud, Frond, Leaf, Sun, Waves } from 'src/components/Decor'

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100">
      <Sun className="absolute right-[10%] top-14 h-24 w-24 sm:h-36 sm:w-36" />
      <Cloud className="absolute left-[6%] top-16 w-32 animate-drift sm:w-44" />
      <Cloud className="absolute right-[28%] top-40 w-24 animate-drift-slow opacity-80 sm:w-32" />

      <Frond className="absolute -bottom-6 -left-10 w-44 rotate-12 sm:w-64" color="#34d399" />
      <Leaf className="absolute -bottom-4 right-2 w-24 -rotate-12 sm:w-36" color="#22c55e" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-3xl flex-col items-center justify-center px-6 pb-24 pt-20 text-center">
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-36 w-36 rounded-[2rem] object-cover shadow-lg ring-4 ring-white/80 sm:h-44 sm:w-44 animate-fade"
        />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-sky-700/80">{profile.greeting}</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-800 sm:text-6xl">{profile.name}</h1>
        <p className="mt-3 text-base font-medium text-emerald-700 sm:text-lg">{profile.tagline}</p>

        <div className="mt-8 space-y-4 rounded-3xl bg-white/55 px-6 py-6 text-left text-slate-700 shadow-sm backdrop-blur-sm sm:px-8 sm:text-lg">
          {profile.about.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>

      <Waves fill="#fdf8ec" back="#38bdf8" className="-mt-20 sm:-mt-28" />
    </header>
  )
}
