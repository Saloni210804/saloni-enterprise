import { motion } from 'framer-motion'

/* ─── Feather-style inline SVG icons (22×22, 1.8 stroke) ─── */
const ChatIcon = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </svg>
)
const MapPinIcon = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
 <circle cx="12" cy="10" r="3" />
 </svg>
)
const DocumentIcon = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
 <polyline points="14 2 14 8 20 8" />
 <line x1="16" y1="13" x2="8" y2="13" />
 <line x1="16" y1="17" x2="8" y2="17" />
 <line x1="10" y1="9" x2="8" y2="9" />
 </svg>
)
const GearIcon = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="3" />
 <path d="M19.07 4.93l-1.41 1.41M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M19.07 19.07l-1.41-1.41M20 12h2" />
 </svg>
)
const WrenchIcon = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
 </svg>
)
const ShieldCheckIcon = () => (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
 <polyline points="9 12 11 14 15 10" />
 </svg>
)

/* ─── Step data ───────────────────────────────────────────── */
const STEPS = [
 { id: 1, num: '01', title: 'Consultation', desc: 'Tell us about your project and requirements.', Icon: ChatIcon },
 { id: 2, num: '02', title: 'Site Visit & Measurement', desc: 'Our team visits your location for accurate measurements.', Icon: MapPinIcon },
 { id: 3, num: '03', title: 'Quotation', desc: 'Receive a clear and transparent quotation.', Icon: DocumentIcon },
 { id: 4, num: '04', title: 'Material & Fabrication', desc: 'We source quality materials and fabricate to your specifications.', Icon: GearIcon },
 { id: 5, num: '05', title: 'Professional Installation', desc: 'Our skilled team completes installation efficiently and safely.', Icon: WrenchIcon },
 { id: 6, num: '06', title: 'Quality Check & Support', desc: 'Final inspection followed by dependable after-sales support.', Icon: ShieldCheckIcon },
]

/* ─── Animation variants ─────────────────────────────────── */
const fadeUp = {
 hidden: { opacity: 0, y: 26 },
 visible: (d = 0) => ({
 opacity: 1, y: 0,
 transition: { duration: 0.62, delay: d, ease: [0.25, 0.1, 0.25, 1] },
 }),
}

const cardEnter = {
 hidden: { opacity: 0, y: 22, scale: 0.97 },
 visible: (i) => ({
 opacity: 1, y: 0, scale: 1,
 transition: { duration: 0.55, delay: 0.3 + i * 0.09, ease: [0.25, 0.1, 0.25, 1] },
 }),
}

/* ─── Main export ─────────────────────────────────────────── */
export default function ProcessSection() {
 return (
 <section className="ps-section" id="process" aria-label="Our Work Process">
 <div className="ps-bg-texture" aria-hidden="true" />

 <div className="ps-container">

 {/* ── Section Header ── */}
 <motion.div
 className="ps-header"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.4 }}
 >
 <motion.div className="ps-eyebrow" variants={fadeUp} custom={0}>
 <span className="ps-eyebrow__line" aria-hidden="true" />
 HOW WE WORK
 <span className="ps-eyebrow__line ps-eyebrow__line--r" aria-hidden="true" />
 </motion.div>

 <motion.h2 className="ps-title" variants={fadeUp} custom={0.08}>
 Our Process
 </motion.h2>
 </motion.div>

 {/* ── Stage: connector line + card grid ── */}
 <div className="ps-stage">

 {/* Animated gold connector, desktop only (hidden in CSS at tablet/mobile) */}
 <div className="ps-connector-track" aria-hidden="true">
 <motion.div
 className="ps-connector"
 initial={{ scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
 style={{ transformOrigin: 'left center' }}
 />
 </div>

 {/* Step cards */}
 <motion.div
 className="ps-grid"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.12 }}
 >
 {STEPS.flatMap((step, i) => [
 /* ── Card ── */
 <motion.div
 key={`card-${step.id}`}
 className="ps-card"
 custom={i}
 variants={cardEnter}
 whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
 >
 {/* Icon ring, CSS :hover handles rotate/scale via.ps-card:hover.ps-card__icon */}
 <div className="ps-card__icon" aria-hidden="true">
 <step.Icon />
 </div>

 <div className="ps-card__num">{step.num}</div>
 <h3 className="ps-card__title">{step.title}</h3>
 <p className="ps-card__desc">{step.desc}</p>
 </motion.div>,

 /* ── Mobile-only vertical connector between cards ── */
 i < STEPS.length - 1 && (
 <div key={`mconn-${i}`} className="ps-mobile-conn" aria-hidden="true" />
 ),
 ]).filter(Boolean)}
 </motion.div>
 </div>
 </div>
 </section>
 )
}
