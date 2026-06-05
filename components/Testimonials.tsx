'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'YouTube Creator',
    handle: '@sarahcreates',
    avatar: 'SK',
    rating: 5,
    text: "Alex transformed my raw footage into something I'm genuinely proud to post. My watch time increased 60% after switching to his editing. The attention to pacing is insane.",
    color: 'from-purple-600/20 to-violet-600/10',
  },
  {
    name: 'Marcus Thompson',
    role: 'Brand Founder',
    handle: '@marcusthompson',
    avatar: 'MT',
    rating: 5,
    text: "We hired Alex for our product launch ad and it performed 3x better than our previous campaigns. He understood our brand voice immediately without a lengthy brief.",
    color: 'from-blue-600/20 to-cyan-600/10',
  },
  {
    name: 'Priya Sharma',
    role: 'Podcast Host',
    handle: '@priyatalks',
    avatar: 'PS',
    rating: 5,
    text: "My podcast episodes went from amateur to professional overnight. The captions, the cuts, the sound quality — everything is just *chef's kiss*. Absolute game-changer.",
    color: 'from-pink-600/20 to-purple-600/10',
  },
  {
    name: 'Jake Rivera',
    role: 'Fitness Coach',
    handle: '@jakefit',
    avatar: 'JR',
    rating: 5,
    text: "Alex edited all my reels for 3 months. My Instagram went from 8K to 50K followers. The pacing he brings to short-form content is genuinely unmatched.",
    color: 'from-orange-600/20 to-red-600/10',
  },
  {
    name: 'Luna Park',
    role: 'Creative Director',
    handle: '@lunapark_',
    avatar: 'LP',
    rating: 5,
    text: "Worked with Alex on a brand film for a luxury client. The color grading and motion work elevated the entire project. Clients were blown away. Already booking him for next quarter.",
    color: 'from-teal-600/20 to-green-600/10',
  },
  {
    name: 'Dev Patel',
    role: 'Tech Reviewer',
    handle: '@devreviews',
    avatar: 'DP',
    rating: 5,
    text: "My video retention went from 38% to 71% average. Alex knows exactly how to hook viewers and keep them watching. Best investment I've made for my channel.",
    color: 'from-indigo-600/20 to-blue-600/10',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

const AVATAR_COLORS = [
  'bg-purple-600',
  'bg-blue-600',
  'bg-pink-600',
  'bg-orange-600',
  'bg-teal-600',
  'bg-indigo-600',
]

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Duplicate for infinite marquee
  const allCards = [...testimonials, ...testimonials]

  return (
    <section className="relative py-24 md:py-40 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-xs text-yellow-300 tracking-widest uppercase font-mono">Client Love</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              What Clients{' '}
              <span className="gradient-text">Say</span>
            </h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto">
              Real words from real creators and brands who leveled up their content.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee testimonials — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="relative marquee-fade"
      >
        <div className="flex gap-5 marquee-track">
          {allCards.map((t, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-80 md:w-96 glass rounded-2xl p-6 border border-white/5 bg-gradient-to-br ${t.color}`}
            >
              {/* Quote mark */}
              <div className="text-5xl leading-none text-white/10 font-serif mb-3">&ldquo;</div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {t.text}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-xs font-bold text-white font-display`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role}</div>
                  </div>
                </div>
                <StarRating count={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
