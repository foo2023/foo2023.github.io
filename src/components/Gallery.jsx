import { useEffect, useState } from 'react'
import useInView from 'src/hooks/useInView'
import { GALLERY_INTERVAL } from 'src/config'

const SLIDE_MS = 900
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Square frame that shows one image at a time and slides to the next every
// few seconds. It loops forward seamlessly and pauses when off screen,
// hovered, or when the browser tab is hidden.
export default function Gallery({ images, title }) {
  const count = images.length
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  const playing = count > 1 && inView && !hovered && tabVisible && !prefersReducedMotion()

  // Advance to the next slide.
  useEffect(() => {
    if (!playing || index >= count) return
    const t = setTimeout(() => setIndex((i) => i + 1), GALLERY_INTERVAL)
    return () => clearTimeout(t)
  }, [playing, index, count])

  // After sliding onto the cloned first image, jump back to the real one
  // without animation so the loop looks endless.
  useEffect(() => {
    if (index !== count || count < 2) return
    const t = setTimeout(() => {
      setAnimate(false)
      setIndex(0)
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, count])

  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [animate])

  if (count === 0) return null

  const slides = count > 1 ? [...images, images[0]] : images
  const active = index % count

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-sky-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : 'none',
        }}
      >
        {slides.map((img, i) => (
          <div key={i} className="flex h-full w-full shrink-0 items-center justify-center p-4">
            <img
              src={img.src}
              alt={img.alt || `${title} screenshot ${(i % count) + 1}`}
              loading="lazy"
              decoding="async"
              draggable="false"
              className="max-h-full max-w-full rounded-2xl object-contain shadow-sm"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => {
                setAnimate(true)
                setIndex(i)
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? 'w-6 bg-sky-500' : 'w-2 bg-sky-200 hover:bg-sky-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
