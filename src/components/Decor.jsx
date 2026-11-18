// Small, lightweight vector decorations for the sunny beach / plant theme.

export function Sun({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="h-full w-full rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 shadow-[0_0_90px_35px_rgba(253,224,71,0.45)]" />
    </div>
  )
}

export function Cloud({ className = '' }) {
  return (
    <svg viewBox="0 0 200 80" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path
        d="M30 70h140a26 26 0 0 0 0-52 34 34 0 0 0-62-6 26 26 0 0 0-44 14A26 26 0 0 0 30 70z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  )
}

// A simple palm / fern frond.
export function Frond({ className = '', color = '#4ade80' }) {
  const leaves = [-60, -40, -20, 0, 20, 40, 60]
  return (
    <svg viewBox="0 0 200 200" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path d="M100 200 C100 150 100 110 100 30" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      {leaves.map((deg, i) => (
        <g key={i} transform={`translate(100 ${170 - i * 20}) rotate(${deg})`}>
          <path d="M0 0 C-14 -20 -14 -48 0 -62 C14 -48 14 -20 0 0z" fill={color} opacity={0.75 + (i % 2) * 0.2} />
        </g>
      ))}
    </svg>
  )
}

// A round monstera-ish leaf.
export function Leaf({ className = '', color = '#22c55e' }) {
  return (
    <svg viewBox="0 0 120 140" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path d="M60 135 C60 115 60 100 60 80" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M60 85 C10 85 0 40 20 18 C35 2 50 8 60 20 C70 8 85 2 100 18 C120 40 110 85 60 85z"
        fill={color}
      />
      <path d="M60 80 L60 24 M60 60 L35 40 M60 60 L85 40 M60 45 L42 28 M60 45 L78 28" stroke="white" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// Soft wave divider. `back` is the drifting wave behind, `fill` the colour below.
export function Waves({ fill = '#fdf8ec', back = '#7dd3fc', className = '' }) {
  return (
    <div className={`pointer-events-none relative h-20 w-full overflow-hidden sm:h-28 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%] animate-sway">
        <path d="M0 60 Q360 20 720 60 T1440 60 T2160 60 T2880 60 L2880 120 L0 120z" fill={back} opacity="0.6" />
      </svg>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 h-3/4 w-full">
        <path d="M0 70 C240 30 480 30 720 70 S1200 110 1440 70 L1440 120 L0 120z" fill={fill} />
      </svg>
    </div>
  )
}
