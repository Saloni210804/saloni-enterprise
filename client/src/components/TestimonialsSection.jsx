import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useQuoteModal } from '../context/QuoteModalContext'

/* ─── Arrow icons ────────────────────────────────────────── */
const ChevronLeft = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M15 18l-6-6 6-6"/>
 </svg>
)
const ChevronRight = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M9 18l6-6-6-6"/>
 </svg>
)

/* ─── Star ───────────────────────────────────────────────── */
const Star = () => (
 <svg width="14" height="14" viewBox="0 0 24 24" fill="#c8a24d" aria-hidden="true">
 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
 </svg>
)

/* ─── Quote mark ─────────────────────────────────────────── */
const QuoteMark = () => (
 <svg width="42" height="34" viewBox="0 0 60 48" fill="none" aria-hidden="true">
 <path d="M0 48V29.6C0 20.267 1.867 12.933 5.6 7.6C9.333 2.267 15.2 0 23.2 0H24V9.6C19.467 9.6 16.267 10.933 14.4 13.6C12.533 16.267 11.6 19.733 11.6 24H24V48H0ZM36 48V29.6C36 20.267 37.867 12.933 41.6 7.6C45.333 2.267 51.2 0 59.2 0H60V9.6C55.467 9.6 52.267 10.933 50.4 13.6C48.533 16.267 47.6 19.733 47.6 24H60V48H36Z" fill="currentColor"/>
 </svg>
)

/* ─── Data ───────────────────────────────────────────────── */
const TESTIMONIALS = [
 {
 id: 1,
 quote: 'Saloni Enterprise fabricated and installed rolling shutters for all three of my shops in ahead of schedule. The quality is excellent, sturdy mechanism, smooth operation, and a clean powder-coated finish. Their team handled everything professionally.',
 name: 'Prasun Bhattacharya',
 role: 'Civil Contractor',
 location: '',
 initials: 'PB',
 avatarBg: '#1e3a5f',
 tag: 'Rolling Shutters',
 },
 {
 id: 2,
 quote: 'We needed large industrial shutters for three factory gate openings at our Uluberia facility. Saloni Enterprise delivered exactly what we needed, on time, within budget, and with zero defects. The shutters have been operating perfectly without any issues.',
 name: 'Mohammed Irshad',
 role: 'Factory Owner',
 location: 'Uluberia, ',
 initials: 'MI',
 avatarBg: '#1a5c36',
 tag: 'Industrial Shutters',
 },
 {
 id: 3,
 quote: 'Got a motorised rolling shutter for my showroom, the entire process from site visit to final installation was seamless. The team explained everything clearly, arrived on time, and the quality is far superior to what other suppliers quoted at the same price.',
 name: 'Sunita Dey',
 role: 'Showroom Owner',
 location: '',
 initials: 'SD',
 avatarBg: '#5c1a2e',
 tag: 'Motorised Shutter',
 },
 {
 id: 4,
 quote: 'Excellent fabrication work for the steel railings and toughened glass panels throughout my residential project. The finish quality matched exactly what was shown in the samples, welds were clean and properly ground. Will use them again.',
 name: 'Rajesh Kumar Gupta',
 role: 'Builder & Developer',
 initials: 'RG',
 avatarBg: '#2d1a5c',
 tag: 'Metal Fabrication & Glass',
 },
 {
 id: 5,
 quote: 'Needed custom metal door frames and decorative window grilles for a commercial project in. Saloni Enterprise delivered precise fabrication with proper finishing and accurate dimensions. The work quality was consistent throughout.',
 name: 'Aniket Sharma',
 role: 'Contractor',
 initials: 'AS',
 avatarBg: '#1a3c5c',
 tag: 'Custom Fabrication',
 },
 {
 id: 6,
 quote: 'Had a 24-foot wide godown entrance that needed a heavy-duty industrial shutter. Ranjit bhai\'s team came, measured professionally, fabricated a robust shutter, and installed it without any issues. The shutter quality and service were both top-notch.',
 name: 'Debasish Mondal',
 role: 'Godown Owner',
 initials: 'DM',
 avatarBg: '#5c3a1a',
 tag: 'Heavy-Duty Shutter',
 },
]

const GAP = 20 // px gap between cards
const AUTOPLAY_MS = 4500

export default function TestimonialsSection() {
 const { openModal } = useQuoteModal()
 const viewportRef = useRef(null)
 const [current, setCurrent] = useState(0)
 const [visible, setVisible] = useState(3) // cards visible at once
 const [cardW, setCardW] = useState(0) // px width of one card
 const [paused, setPaused] = useState(false)
 const timerRef = useRef(null)

 const TOTAL = TESTIMONIALS.length
 const maxIdx = Math.max(0, TOTAL - visible)

 /* ── Measure container → compute card pixel width ────── */
 const measure = useCallback(() => {
 if (!viewportRef.current) return
 const vw = viewportRef.current.clientWidth
 const v = vw < 640 ? 1 : vw < 1024 ? 2 : 3
 setVisible(v)
 setCardW((vw - GAP * (v - 1)) / v)
 }, [])

 useEffect(() => {
 measure()
 const ro = new ResizeObserver(measure)
 if (viewportRef.current) ro.observe(viewportRef.current)
 return () => ro.disconnect()
 }, [measure])

 /* ── Keep current in-bounds when visible changes ──────── */
 useEffect(() => {
 setCurrent(c => Math.min(c, Math.max(0, TOTAL - visible)))
 }, [visible, TOTAL])

 /* ── Autoplay ──────────────────────────────────────────── */
 const goNext = useCallback(() => {
 setCurrent(c => (c >= TOTAL - visible ? 0 : c + 1))
 }, [TOTAL, visible])

 const goPrev = useCallback(() => {
 setCurrent(c => (c <= 0 ? TOTAL - visible : c - 1))
 }, [TOTAL, visible])

 useEffect(() => {
 if (paused || cardW === 0) return
 timerRef.current = setInterval(goNext, AUTOPLAY_MS)
 return () => clearInterval(timerRef.current)
 }, [paused, goNext, cardW])

 /* ── Translate offset (px) ─────────────────────────────── */
 const translateX = cardW > 0 ? current * (cardW + GAP) : 0

 /* ── Animation ─────────────────────────────────────────── */
 const fadeUp = {
 hidden: { opacity: 0, y: 24 },
 visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] } }),
 }

 return (
 <section
 className="ts-section"
 id="testimonials"
 aria-label="Client Testimonials"
 onMouseEnter={() => setPaused(true)}
 onMouseLeave={() => setPaused(false)}
 >
 <div className="ts-bg" aria-hidden="true" />

 <div className="ts-container">

 {/* ── Section header ── */}
 <motion.div
 className="ts-header"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.4 }}
 >
 <motion.div className="ts-eyebrow" variants={fadeUp} custom={0}>
 <span className="ts-eyebrow__line" aria-hidden="true" />
 TESTIMONIALS
 <span className="ts-eyebrow__line ts-eyebrow__line--r" aria-hidden="true" />
 </motion.div>
 <motion.h2 className="ts-title" variants={fadeUp} custom={0.08}>
 Trusted by Businesses 
 </motion.h2>
 </motion.div>

 {/* ── Carousel ─────────────────────────────────────── */}
 <div className="ts-carousel-outer">

 {/* ← Prev */}
 <button
 className="ts-arrow ts-arrow--left"
 onClick={goPrev}
 aria-label="Previous testimonials"
 >
 <ChevronLeft />
 </button>

 {/* Viewport (clips the track) */}
 <div className="ts-viewport" ref={viewportRef} aria-live="polite">
 {/* Track (slides left/right) */}
 <div
 className="ts-track"
 style={{
 transform: `translateX(-${translateX}px)`,
 gap: `${GAP}px`,
 }}
 >
 {TESTIMONIALS.map((t) => (
 <article
 key={t.id}
 className="ts-card"
 style={{ width: cardW > 0 ? `${cardW}px` : undefined }}
 aria-label={`Testimonial from ${t.name}`}
 >
 {/* Decorative quote mark */}
 <div className="ts-card__quote-wrap" aria-hidden="true">
 <QuoteMark />
 </div>

 {/* Stars */}
 <div className="ts-stars">
 {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
 </div>

 {/* Tag */}
 <div className="ts-card__tag">{t.tag}</div>

 {/* Quote */}
 <p className="ts-card__text">&ldquo;{t.quote}&rdquo;</p>

 {/* Divider */}
 <div className="ts-card__divider" aria-hidden="true" />

 {/* Author */}
 <div className="ts-card__author">
 <div className="ts-card__avatar" style={{ background: t.avatarBg }} aria-hidden="true">
 {t.initials}
 </div>
 <div className="ts-card__author-text">
 <div className="ts-card__name">{t.name}</div>
 <div className="ts-card__role">{t.role}</div>
 </div>
 </div>
 </article>
 ))}
 </div>
 </div>

 {/* → Next */}
 <button
 className="ts-arrow ts-arrow--right"
 onClick={goNext}
 aria-label="Next testimonials"
 >
 <ChevronRight />
 </button>
 </div>

 {/* ── Dots ─────────────────────────────────────────── */}
 <div className="ts-dots" role="tablist" aria-label="Carousel navigation">
 {Array.from({ length: maxIdx + 1 }, (_, i) => (
 <button
 key={i}
 className={`ts-dot${current === i ? ' ts-dot--active' : ''}`}
 onClick={() => setCurrent(i)}
 aria-label={`Go to slide ${i + 1}`}
 aria-selected={current === i}
 role="tab"
 />
 ))}
 </div>

 {/* ── CTA ──────────────────────────────────────────── */}
 <motion.div
 className="ts-cta"
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.5 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 >
 <button
 className="ts-cta__btn"
 onClick={() => openModal('', 'Testimonials Section, Request a Quote')}
 >
 Request a Free Quote
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M5 12h14M12 5l7 7-7 7"/>
 </svg>
 </button>
 </motion.div>

 </div>
 </section>
 )
}
