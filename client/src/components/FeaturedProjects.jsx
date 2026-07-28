import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Project data ────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    type: 'image',
    title: 'Toughened Glass Installation',
    category: 'Toughened Glass',
    image: '/glass project.jpeg',
  },
  {
    id: 2,
    type: 'image',
    title: 'Manual Rolling Shutter',
    category: 'Rolling Shutters',
    image: '/shutter project.jpeg',
  },
  {
    id: 3,
    type: 'video',
    title: 'Automatic Rolling Shutter',
    category: 'Rolling Shutters',
    video: '/Automatic rolling shutter project.mp4',
    image: '/card rolling.jpg', // poster frame
  },
  {
    id: 4,
    type: 'image',
    title: 'Retractable Awning',
    category: 'Retractable Awnings',
    image: '/awning project.jpeg',
  },
  {
    id: 5,
    type: 'image',
    title: 'Repair & Maintenance',
    category: 'Repair & Maintenance',
    image: '/repair project.jpeg',
  },
]

/* ─── Animation variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const cardFade = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

/* ─── Lightbox ────────────────────────────────────────────── */
function Lightbox({ item, allItems, onClose }) {
  const imageItems = allItems.filter((p) => p.type === 'image')
  const isImage = item.type === 'image'
  const imageIndex = isImage ? imageItems.findIndex((p) => p.id === item.id) : -1

  const [currentIdx, setCurrentIdx] = useState(imageIndex >= 0 ? imageIndex : 0)
  const canPrev = isImage && currentIdx > 0
  const canNext = isImage && currentIdx < imageItems.length - 1

  /* Lock scroll */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* Keyboard navigation */
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && canPrev) setCurrentIdx((i) => i - 1)
      if (e.key === 'ArrowRight' && canNext) setCurrentIdx((i) => i + 1)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose, canPrev, canNext])

  const current = isImage ? imageItems[currentIdx] : item

  return (
    <motion.div
      className="fp-lb"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="fp-lb__panel"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="fp-lb__close" onClick={onClose} aria-label="Close">✕</button>

        {/* Media */}
        <div className="fp-lb__media">
          <AnimatePresence mode="wait">
            {isImage ? (
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                className="fp-lb__img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <video
                key={current.id}
                className="fp-lb__video"
                src={current.video}
                controls
                autoPlay
                playsInline
              />
            )}
          </AnimatePresence>

          {/* Prev / Next arrows — only for images */}
          {isImage && imageItems.length > 1 && (
            <>
              <button
                className={`fp-lb__nav fp-lb__nav--prev${!canPrev ? ' fp-lb__nav--off' : ''}`}
                onClick={() => canPrev && setCurrentIdx((i) => i - 1)}
                aria-label="Previous"
                disabled={!canPrev}
              >‹</button>
              <button
                className={`fp-lb__nav fp-lb__nav--next${!canNext ? ' fp-lb__nav--off' : ''}`}
                onClick={() => canNext && setCurrentIdx((i) => i + 1)}
                aria-label="Next"
                disabled={!canNext}
              >›</button>
            </>
          )}
        </div>

        {/* Caption */}
        <div className="fp-lb__caption">
          <span className="fp-lb__cat">{current.category}</span>
          <span className="fp-lb__title">{current.title}</span>
          {isImage && imageItems.length > 1 && (
            <span className="fp-lb__count">{currentIdx + 1} / {imageItems.length}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── ProjectCard ─────────────────────────────────────────── */
function ProjectCard({ project, onSelect }) {
  const isVideo = project.type === 'video'
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  const toggleMute = (e) => {
    e.stopPropagation()
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m
      return !m
    })
  }

  return (
    <motion.div
      className="fp-card"
      variants={cardFade}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
      aria-label={`Open ${project.title}`}
    >
      <div className="fp-card__img-wrap">

        {isVideo ? (
          /* ── Autoplay muted inline video ── */
          <video
            ref={videoRef}
            className="fp-card__img"
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="fp-card__img"
            loading="lazy"
          />
        )}

        {/* Hover overlay — zoom icon for images, expand icon for video */}
        <div className="fp-card__hover-overlay">
          {isVideo ? (
            <svg className="fp-card__zoom-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          ) : (
            <svg className="fp-card__zoom-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
            </svg>
          )}
        </div>

        {/* Category badge */}
        <span className="fp-card__badge">{project.category}</span>

        {/* Mute toggle — only for video cards */}
        {isVideo && (
          <button
            className="fp-card__mute-btn"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              /* Muted icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              /* Unmuted icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            )}
          </button>
        )}
      </div>

      <div className="fp-card__info">
        <h3 className="fp-card__title">{project.title}</h3>
      </div>
    </motion.div>
  )
}


/* ═══════════════ MAIN EXPORT ════════════════════════════════ */
export default function FeaturedProjects() {
  const [selected, setSelected] = useState(null)

  const handleSelect = useCallback((project) => setSelected(project), [])
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      <section className="fp-section" id="projects" aria-label="Our Projects">
        <div className="fp-container">

          {/* Header */}
          <motion.div
            className="fp-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="fp-eyebrow" variants={fadeUp} custom={0}>
              <span className="fp-eyebrow__line" aria-hidden="true" />
              Quality Craftmanship
              <span className="fp-eyebrow__line fp-eyebrow__line--r" aria-hidden="true" />
            </motion.div>
            <motion.h2 className="fp-h2" variants={fadeUp} custom={0.08}>
              Our Projects
            </motion.h2>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="fp-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={handleSelect} />
            ))}
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox
            key="lb"
            item={selected}
            allItems={PROJECTS}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}
