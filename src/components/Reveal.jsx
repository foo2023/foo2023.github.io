import useInView from 'src/hooks/useInView'

// Fades content up gently the first time it scrolls into view.
export default function Reveal({ as: Tag = 'div', className = '', children }) {
  const [ref, inView] = useInView({ once: true, rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
