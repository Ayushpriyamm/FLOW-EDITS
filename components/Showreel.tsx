'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="showreel" className="relative py-24 md:py-40 overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs text-blue-300 tracking-widest uppercase font-mono">Featured Showreel</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            Watch the{' '}
            <span className="gradient-text">Magic</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A curated look at the stories, brands, and moments I&apos;ve helped bring to life.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group mx-auto max-w-5xl"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

          {/* Video container */}
          <div className="relative rounded-2xl overflow-hidden bg-surface-2 aspect-video">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black/80 to-blue-950/50">
                  {/* Fake film grain */}
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%221%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3CfeColorMatrix%20type%3D%22saturate%22%20values%3D%220%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
                </div>

                {/* Grid decoration */}
                <div className="absolute inset-0 grid-bg opacity-30" />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Title text in the player */}
                  <div className="text-center mb-10">
                    <div className="text-white/30 text-xs tracking-widest uppercase font-mono mb-3">2024 Showreel</div>
                    <div className="font-display font-black text-3xl md:text-5xl text-white">
                      Alex Reeves
                    </div>
                  </div>

                  {/* Play button */}
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative group/btn"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl">
                      <svg className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </motion.button>

                  <p className="mt-6 text-white/30 text-sm font-medium">Click to play</p>
                </div>

                {/* Time code decoration */}
                <div className="absolute bottom-4 left-4 font-mono text-xs text-white/20">
                  00:00 / 03:24
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-xs text-white/30">HD</span>
                </div>
              </>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Alex Reeves Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>

          {/* Film strip decoration below */}
          <div className="flex mt-4 gap-1 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-8 rounded-sm border border-white/20 bg-white/5"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
