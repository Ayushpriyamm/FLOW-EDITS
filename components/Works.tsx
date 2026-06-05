'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PortfolioItem } from '@/lib/sheets'

interface WorksProps {
  items: PortfolioItem[]
}

const CATEGORY_COLORS: Record<string, string> = {
  'Commercial': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Short Film': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Short Form': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Podcast': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'YouTube': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Motion Graphics': 'bg-green-500/20 text-green-300 border-green-500/30',
}

function getCategoryStyle(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-white/10 text-white/60 border-white/10'
}

function getEmbedUrl(url: string): string {
  try {
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${id}`
    }

    if (url.includes('watch?v=')) {
      const id = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${id}`
    }

    return url
  } catch {
    return url
  }
}

function VideoModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-50" />
        <div className="relative bg-black rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-lg">{item.title}</h3>
              <span className={`mt-1 inline-block text-xs px-2.5 py-0.5 rounded-full border ${getCategoryStyle(item.category)}`}>
                {item.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="aspect-video">
            <iframe
              src={`${getEmbedUrl(item.videoUrl)}?autoplay=1&rel=0`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function WorkCard({ item, index, onClick }: { item: PortfolioItem; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="video-card group relative cursor-pointer"
      onClick={onClick}
    >
      {/* Hover glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/40 group-hover:to-blue-600/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative rounded-2xl overflow-hidden bg-surface-2 border border-white/5 group-hover:border-purple-500/30 transition-all duration-500">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="thumbnail object-cover transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="play-overlay absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 bg-black/30 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 ml-1" fill="white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Category tag */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs px-2.5 py-1 rounded-full border backdrop-blur-md ${getCategoryStyle(item.category)}`}>
              {item.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white/40 text-xs">Click to watch</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Works({ items }: WorksProps) {
  const [activeModal, setActiveModal] = useState<PortfolioItem | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))]
  const filtered = activeFilter === 'All' ? items : items.filter(i => i.category === activeFilter)

  return (
    <>
      <section id="works" className="relative py-24 md:py-40 bg-black">
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div ref={headerRef} className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-xs text-purple-300 tracking-widest uppercase font-mono">Recent Works</span>
                </div>
                <h2 className="font-display font-black text-4xl md:text-6xl text-white">
                  Selected<br />
                  <span className="gradient-text">Projects</span>
                </h2>
              </div>
              <p className="text-white/40 max-w-xs text-base leading-relaxed md:text-right">
                Scroll through the latest work — click any project to watch.
              </p>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeFilter === cat
                      ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <WorkCard
                  key={item.title}
                  item={item}
                  index={i}
                  onClick={() => setActiveModal(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <VideoModal
            item={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
