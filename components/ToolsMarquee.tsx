'use client'

const tools = [
  'Adobe Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'Final Cut Pro',
  'Cinema 4D',
  'Capcut Pro',
  'Figma',
  'Adobe Audition',
]

export default function ToolsMarquee() {
  const doubled = [...tools, ...tools]

  return (
    <div className="relative py-6 bg-[#070707] border-y border-white/5 overflow-hidden marquee-fade">
      <div className="flex gap-8 marquee-track whitespace-nowrap">
        {doubled.map((tool, i) => (
          <span key={i} className="flex items-center gap-3 text-white/20 text-sm font-medium font-mono shrink-0">
            <span className="w-1 h-1 rounded-full bg-purple-500/40" />
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}
