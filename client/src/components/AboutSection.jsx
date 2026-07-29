import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuoteModal } from '../context/QuoteModalContext'

/* ─── Magnetic CTA Button ─────────────────────────────────── */
function MagneticBtn({ className, onClick, children, type = 'button' }) {
 const [pos, setPos] = useState({ x: 0, y: 0 })
 return (
 <motion.button
 type={type}
 className={className}
 animate={{ x: pos.x, y: pos.y }}
 transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.5 }}
 onMouseMove={(e) => {
 const r = e.currentTarget.getBoundingClientRect()
 setPos({ x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28 })
 }}
 onMouseLeave={() => setPos({ x: 0, y: 0 })}
 onClick={onClick}
 >
 {children}
 </motion.button>
 )
}

/* ─── Inline check icon ───────────────────────────────────── */
const CheckIcon = () => (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <polyline points="20 6 9 17 4 12" />
 </svg>
)

/* ─── Highlight cards data ────────────────────────────────── */
const HIGHLIGHTS = [
 { id: 1, title: 'End-to-End Solutions', desc: 'Material sourcing to installation.' },
 { id: 2, title: 'Custom Fabrication', desc: 'Built exactly to your requirements.' },
 { id: 3, title: 'Skilled Workforce', desc: 'Experienced fabrication professionals.' },
 { id: 4, title: 'Transparent Pricing', desc: 'Clear quotations with no hidden surprises.' },
]

/* ─── Material brand logos (5 brands, full colour, no marquee) ── */
const MATERIAL_BRANDS = [
  {
    id: 'jsw',
    name: 'JSW Steel',
    logo: <img src="/jsw steel.png" alt="JSW Steel" style={{ width: '130px', height: '60px', objectFit: 'contain' }} />,
  },
  {
    id: 'tata-steel',
    name: 'Tata Steel',
    logo: <img src="/tatasteel.png" alt="Tata Steel" style={{ width: '130px', height: '60px', objectFit: 'contain' }} />,
  },
  {
    id: 'sail',
    name: 'SAIL Steel',
    logo: <img src="/sailsteel.png" alt="SAIL Steel" style={{ width: '130px', height: '60px', objectFit: 'contain' }} />,
  },
  {
    id: 'jindal',
    name: 'Jindal Steel',
    logo: <img src="/jindal.png" alt="Jindal Steel" style={{ width: '130px', height: '60px', objectFit: 'contain' }} />,
  },
  {
    id: 'saint-gobain',
    name: 'Saint-Gobain',
    logo: <img src="/saint.png" alt="Saint-Gobain" style={{ width: '130px', height: '60px', objectFit: 'contain' }} />,
  },
]

/* ─── Animation helpers ───────────────────────────────────── */
const fadeUp = {
 hidden: { opacity: 0, y: 24 },
 visible: (d = 0) => ({
 opacity: 1, y: 0,
 transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
 }),
}

const slideIn = (dir) => ({
 hidden: { opacity: 0, x: dir === 'left' ? -50 : 50 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
})

/* ─── Main export ─────────────────────────────────────────── */
export default function AboutSection() {
 const { openModal } = useQuoteModal()

 const handleExploreProjects = () => {
 const el = document.getElementById('projects')
 if (el) el.scrollIntoView({ behavior: 'smooth' })
 }

 return (
 <>
 {/* ================================================================
 SECTION 2, ABOUT SALONI ENTERPRISE
 ================================================================ */}
 <section className="ab-section" id="about" aria-label="About Saloni Enterprise">
 <div className="ab-bg-texture" aria-hidden="true" />
 <div className="ab-container">

 <div className="ab-grid">

 {/* ── Left: Owner Portrait ── */}
 <motion.div
 className="ab-image-col"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={slideIn('left')}
 >
 {/* Gold accent behind image */}
 <div className="ab-img-accent" aria-hidden="true" />

 {/* Floating image container */}
 <div className="ab-img-float">
 <div className="ab-img-frame">
 <img
 src="/ranjit.new.jpeg"
 alt="Ranjit Kumar Shaw, Founder of Saloni Enterprise"
 className="ab-img"
 loading="lazy"
 />
 {/* Founder label on image */}
 <div className="ab-img-founder-tag">
 <span className="ab-img-founder-tag__name">Ranjit Kumar Shaw</span>
 <span className="ab-img-founder-tag__role">Founder</span>
 </div>
 </div>
 </div>
 </motion.div>

 {/* ── Right: Content ── */}
 <motion.div
 className="ab-content-col"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.25 }}
 variants={slideIn('right')}
 >
 {/* Label */}
 <div className="ab-eyebrow" aria-label="Section label">
 <span className="ab-eyebrow__line" aria-hidden="true" />
 Know Saloni Enterprise
 <span className="ab-eyebrow__line ab-eyebrow__line--r" aria-hidden="true" />
 </div>

 <h2 className="ab-title">
 About Us
 </h2>

 <div className="ab-body">
 <p>
 Established in 2012, Saloni Enterprise is a trusted name in fabrication and rolling shutter
 solutions, committed to delivering quality workmanship and dependable service.
 </p>
 <p>
 From rolling shutters and steel railings to custom metal fabrication and
 toughened glass work, we provide complete end-to-end solutions, from material
 procurement and fabrication to professional installation.
 </p>
 <p>
 With skilled craftsmanship, premium materials, and a customer-first approach,
 we create durable solutions for residential, commercial, and industrial projects.
 Every project is executed with precision, transparency, and attention to
 detail, ensuring results that stand the test of time.
 </p>
 </div>

 {/* Highlight cards, 2 × 2 */}
 <motion.div
 className="ab-highlights"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 >
 {HIGHLIGHTS.map((h, i) => (
 <motion.div
 key={h.id}
 className="ab-highlight"
 variants={fadeUp}
 custom={i * 0.07}
 whileHover={{ y: -3, transition: { duration: 0.2 } }}
 >
 <div className="ab-highlight__icon"><CheckIcon /></div>
 <div>
 <div className="ab-highlight__title">{h.title}</div>
 <div className="ab-highlight__desc">{h.desc}</div>
 </div>
 </motion.div>
 ))}
 </motion.div>

 {/* CTA Buttons */}
 <div className="ab-buttons">
 <MagneticBtn
 className="ab-btn ab-btn--gold"
 onClick={() => openModal('', 'About Page, Request Quote')}
 >
 Request Free Quote
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
 </MagneticBtn>

 <MagneticBtn
 className="ab-btn ab-btn--outline"
 onClick={handleExploreProjects}
 >
 Explore Projects
 </MagneticBtn>
 </div>

 {/* Owner signature */}
 <div className="ab-owner" aria-label="Founder information">
 <div className="ab-owner__divider" aria-hidden="true" />
 <div className="ab-owner__row">
 <div className="ab-owner__avatar" aria-hidden="true">
 <img
 src="/bijeta.jpeg"
 alt="Bijeta Shaw, Proprietor of Saloni Enterprise"
 loading="lazy"
 />
 </div>
 <div className="ab-owner__text">
 <div className="ab-owner__name">Bijeta Shaw</div>
 <div className="ab-owner__role">Proprietor, Saloni Enterprise</div>
 </div>
 <div className="ab-owner__sig" aria-hidden="true">
 {/* Decorative signature lines */}
 <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
 <path d="M4 20 C12 8, 22 24, 30 12 S50 4, 60 14 S78 22, 86 14" stroke="#c8a24d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
 <line x1="4" y1="24" x2="86" y2="24" stroke="#c8a24d" strokeWidth="0.8" opacity="0.4" />
 </svg>
 </div>
 </div>
 </div>

 </motion.div>
 </div>
 </div>
 </section>

 {/* ================================================================
 SECTION 3, QUALITY MATERIALS FROM TRUSTED BRANDS
 ================================================================ */}
 <section className="mb-section" id="materials" aria-label="Quality Materials from Trusted Brands">
 <div className="mb-container">

 <motion.div
 className="mb-header"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.4 }}
 >
 <motion.h2 className="mb-title" variants={fadeUp} custom={0}>
 Quality Materials from Trusted Brands
 </motion.h2>
 <motion.p className="mb-desc" variants={fadeUp} custom={0.08}>
 We source premium-quality materials from trusted manufacturers to ensure
 strength, durability, and long-lasting performance.
 </motion.p>
 </motion.div>

 {/* 5-brand static grid */}
 <motion.div
 className="mb-grid"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 >
 {MATERIAL_BRANDS.map((brand, i) => (
 <motion.div
 key={brand.id}
 className="mb-card"
 variants={fadeUp}
 custom={i * 0.08}
 whileHover={{ y: -5, transition: { duration: 0.2 } }}
 >
 <div className="mb-card__logo">
 {brand.logo}
 </div>
 <div className="mb-card__name">{brand.name}</div>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 </>
 )
}
