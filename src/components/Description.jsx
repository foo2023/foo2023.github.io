import { useState } from 'react'
import Markdown from 'react-markdown'
import { truncateByWord } from 'src/lib/content'
import { DESCRIPTION_LIMIT } from 'src/config'

const linkProps = {
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
}

// Markdown description that collapses after DESCRIPTION_LIMIT characters
// (cut on a whole word) with a quiet "View more" toggle.
export default function Description({ text }) {
  const [expanded, setExpanded] = useState(false)
  const short = truncateByWord(text, DESCRIPTION_LIMIT)
  const shown = expanded || !short ? text : short

  return (
    <div>
      <div key={expanded ? 'full' : 'short'} className="md animate-fade">
        <Markdown components={linkProps}>{shown}</Markdown>
      </div>
      {short && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-800"
        >
          {expanded ? 'View less' : 'View more'}
        </button>
      )}
    </div>
  )
}
