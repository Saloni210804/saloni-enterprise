import { useState, useEffect, useCallback } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getService, getAllServices, getRelatedServices } from '../data/servicesData'
import { useQuoteModal } from '../context/QuoteModalContext'

const WA_NUMBER = '91XXXXXXXXXX'

/* ─── Micro-animation variants ──────────────────────────── */
const fadeUp = {
 hidden: { opacity: 0, y: 28 },
 visible: (d = 0) => ({
 opacity: 1, y: 0,
 transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
 }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const cardAnim = {
 hidden: { opacity: 0, y: 24 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

/* ─── Icon set ───────────────────────────────────────────── */
function Icon({ name, size = 22, className = '' }) {
 const s = { width: size, height: size, flexShrink: 0 }
 const icons = {
 shield: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
 gear: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0.33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
 ruler: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l18-4v4M3 7v10l18 4V7"/></svg>,
 diamond: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/></svg>,
 wrench: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/></svg>,
 clock: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
 precision: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>,
 truck: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
 palette: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01a1.5 1.5 0 0 1 1.13-2.49H16c3.31 0 6-2.69 6-6C22 6.48 17.52 2 12 2z"/></svg>,
 star: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
 leaf: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.5c1.46 1.46 5.18 1.18 8.18-1.82C15 14 17 8 17 8z"/><path d="M2 20l3-3"/></svg>,
 check: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
 zap: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
 sun: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
 sound: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
 /* Application icons */
 shop: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
 warehouse: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v18H2z"/><path d="M12 3v18"/><path d="M2 12h20"/></svg>,
 factory: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20V10l7-7h6l7 7v10H2z"/><path d="M9 20V12h6v8"/><path d="M12 3v7"/></svg>,
 showroom: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18"/><path d="M16 3v18"/><path d="M2 9h20"/></svg>,
 garage: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M9 14h6"/></svg>,
 hospital: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>,
 school: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6H3V6l9-4z"/><path d="M3 12v8h18v-8"/><path d="M9 22v-6h6v6"/></svg>,
 office: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 6h2"/><path d="M7 10h2"/><path d="M7 14h2"/><path d="M15 6h2"/><path d="M15 10h2"/><path d="M15 14h2"/></svg>,
 home: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
 hotel: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V5l9-3 9 3v17"/><path d="M9 22V12h6v10"/></svg>,
 restaurant: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
 bridge: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M4 20V10a8 8 0 0 1 16 0v10"/><path d="M9 20v-5a3 3 0 0 1 6 0v5"/></svg>,
 stair: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h4v-4h4v-4h4v-4h4V4h4"/><path d="M2 20V4"/></svg>,
 terrace: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h20"/><path d="M2 12h20"/><path d="M4 6v6"/><path d="M20 6v6"/></svg>,
 corridor: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>,
 sport: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>,
 pool: <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M2 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/></svg>,
 arrow: <svg style={s} className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8h12M9 4l4 4-4 4"/></svg>,
 }
 return icons[name] || icons.check
}

/* ─── Shared arrow button ────────────────────────────────── */
function ArrowRight({ size = 14, className = '' }) {
 return <Icon name="arrow" size={size} className={className} />
}

/* ─── Common data ────────────────────────────────────────── */
const PROCESS_STEPS = [
 { num: '01', label: 'Consultation', desc: 'Understand requirements and recommend the right solution.' },
 { num: '02', label: 'Site Visit', desc: 'On-site measurement and detailed assessment.' },
 { num: '03', label: 'Design & Quote', desc: 'Custom design proposal with transparent pricing.' },
 { num: '04', label: 'Fabrication', desc: 'In-house manufacturing to exact specifications.' },
 { num: '05', label: 'Installation', desc: 'Professional site installation by our trained team.' },
 { num: '06', label: 'Quality Check', desc: 'Rigorous testing and final inspection before handover.' },
 { num: '07', label: 'After-Sales', desc: 'Ongoing support, AMC and emergency service.' },
]

const WHY_SALONI = [
 { icon: 'check', title: 'End-to-End Solutions', desc: 'From material procurement to final installation, we manage every step.' },
 { icon: 'ruler', title: 'Custom Fabrication', desc: 'Built according to your exact requirements, dimensions and specifications.' },
 { icon: 'gear', title: 'Experienced Workforce', desc: 'Projects handled by trained, skilled and certified professionals.' },
 { icon: 'diamond', title: 'Quality Materials', desc: 'Premium materials sourced from reputed, trusted suppliers for every project.' },
 { icon: 'star', title: 'Transparent Pricing', desc: 'Clear, written quotations with no hidden charges or surprises.' },
 { icon: 'clock', title: 'Reliable After-Sales', desc: 'Professional support, AMC and emergency service after installation.' },
]

/* ─── Section header helper ──────────────────────────────── */
function SectionHeader({ eyebrow, title, desc, center = true }) {
 return (
 <motion.div
 className={`sp-header${center ? ' sp-header--center' : ''}`}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 >
 {eyebrow && (
 <motion.div className="sp-eyebrow" variants={fadeUp} custom={0}>
 <span className="sp-eyebrow__line" />
 {eyebrow}
 <span className="sp-eyebrow__line sp-eyebrow__line--r" />
 </motion.div>
 )}
 <motion.h2 className="sp-heading" variants={fadeUp} custom={0.07}>{title}</motion.h2>
 {desc && <motion.p className="sp-desc" variants={fadeUp} custom={0.14}>{desc}</motion.p>}
 </motion.div>
 )
}

/* ═══════════════ SECTION 1, SERVICE BANNER ══════════════ */
function ServiceHeader({ service, onQuote, onWhatsApp }) {
 return (
  <section className="sp-banner">
  <div
   className="sp-banner__bg"
   style={{ backgroundImage: `url(${service.heroImage})` }}
   aria-hidden="true"
  />
  <div className="sp-banner__overlay" aria-hidden="true" />
  <div className="sp-banner__content">
   {/* Breadcrumb */}
   <nav className="sp-banner__breadcrumb" aria-label="Breadcrumb">
   <Link to="/" className="sp-banner__bc-link">Home</Link>
   <span aria-hidden="true">›</span>
   <Link to="/" className="sp-banner__bc-link">Services</Link>
   <span aria-hidden="true">›</span>
   <span className="sp-banner__bc-current">{service.title}</span>
   </nav>

   <motion.div
   className="sp-banner__body"
   initial={{ opacity: 0, y: 22 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
   >
   <div className="sp-banner__label">OUR SERVICES</div>
   <h1 className="sp-banner__title">{service.heroTitle}</h1>
   <p className="sp-banner__sub">{service.heroSub}</p>

   <div className="sp-banner__actions">
    <button className="sp-btn sp-btn--gold" onClick={onQuote}>
    Request Free Quote <ArrowRight />
    </button>
    <button className="sp-btn sp-btn--ghost" onClick={onWhatsApp}>
    Chat on WhatsApp
    </button>
   </div>
   </motion.div>
  </div>
  </section>
 )
}

/* ═══════════════ SECTION 4, WHY CHOOSE ═════════════════ */
function ServiceWhyChoose({ service }) {
 return (
 <section className="sp-section sp-section--alt">
 <div className="sp-container">
 <SectionHeader
 eyebrow="WHY CHOOSE THIS SERVICE"
 title={`Why Choose Our ${service.title}`}
 desc="Every project deserves expert attention. Here is what sets our service apart from the competition."
 />
 <motion.div
 className="sp-why-grid"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 {service.whyChoose.map((item) => (
 <motion.div className="sp-why-card" key={item.title} variants={cardAnim}>
 <div className="sp-why-icon">
 <Icon name={item.icon} size={24} />
 </div>
 <h3 className="sp-why-title">{item.title}</h3>
 <p className="sp-why-desc">{item.desc}</p>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ SECTION 5, TYPES AVAILABLE ════════════ */
function ServiceTypes({ service, onQuote }) {
 return (
 <section className="sp-section">
 <div className="sp-container">
 <SectionHeader
 eyebrow="TYPES AVAILABLE"
 title="Choose the Right Variant"
 desc="We offer multiple configurations to match your specific application, budget and operational requirements."
 />
 <motion.div
 className="sp-types-grid"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 {service.types.map((type) => (
 <motion.div className="sp-type-card" key={type.title} variants={cardAnim}>
 <div className="sp-type-img-wrap">
 <img src={type.image} alt={type.title} className="sp-type-img" loading="lazy" />
 </div>
 <div className="sp-type-body">
 <h3 className="sp-type-title">{type.title}</h3>
 <p className="sp-type-desc">{type.desc}</p>
 <div className="sp-type-best">
 <span className="sp-type-best__label">Best for:</span>
 <span className="sp-type-best__val">{type.bestFor}</span>
 </div>
 <button
 className="sp-type-cta"
 onClick={() => onQuote(type.title)}
 >
 Request Quote <ArrowRight size={13} className="sp-type-cta__arrow" />
 </button>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ SECTION 6, APPLICATIONS ════════════════ */
function ServiceApplications({ service }) {
 return (
 <section className="sp-section sp-section--alt">
 <div className="sp-container">
 <SectionHeader eyebrow="APPLICATIONS" title="Perfect For" />
 <motion.div
 className="sp-apps-grid"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 >
 {service.applications.map((app) => (
 <motion.div className="sp-app-card" key={app.label} variants={cardAnim}>
 <div className="sp-app-icon">
 <Icon name={app.icon} size={26} />
 </div>
 <span className="sp-app-label">{app.label}</span>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ SECTION 7, PROCESS ════════════════════ */
function ServiceProcess() {
 return (
 <section className="sp-section">
 <div className="sp-container">
 <SectionHeader
 eyebrow="HOW WE WORK"
 title="Our Work Process"
 desc="A structured, professional approach from first contact to final handover, so you always know what to expect."
 />
 <motion.div
 className="sp-process"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 >
 {PROCESS_STEPS.map((step, i) => (
 <motion.div
 className="sp-process__step"
 key={step.num}
 variants={cardAnim}
 >
 <div className="sp-process__num">{step.num}</div>
 {i < PROCESS_STEPS.length - 1 && <div className="sp-process__connector" aria-hidden="true" />}
 <div className="sp-process__info">
 <div className="sp-process__label">{step.label}</div>
 <div className="sp-process__sdesc">{step.desc}</div>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ SECTION 8, GALLERY ════════════════════ */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
 const img = images[index]

 useEffect(() => {
 const handleKey = (e) => {
 if (e.key === 'Escape') onClose()
 if (e.key === 'ArrowLeft') onPrev()
 if (e.key === 'ArrowRight') onNext()
 }
 window.addEventListener('keydown', handleKey)
 const prev = document.body.style.overflow
 document.body.style.overflow = 'hidden'
 return () => {
 window.removeEventListener('keydown', handleKey)
 document.body.style.overflow = prev
 }
 }, [onClose, onPrev, onNext])

 return (
 <motion.div
 className="sp-lightbox"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 onClick={onClose}
 >
 <button className="sp-lightbox__close" onClick={onClose} aria-label="Close">✕</button>

 <button className="sp-lightbox__nav sp-lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous">‹</button>

 <motion.div
 className="sp-lightbox__content"
 key={index}
 initial={{ opacity: 0, scale: 0.94 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.25 }}
 onClick={(e) => e.stopPropagation()}
 >
 <img src={img.src} alt={img.project} className="sp-lightbox__img" />
 <div className="sp-lightbox__caption">
 <span className="sp-lightbox__project">{img.project}</span>
 <span className="sp-lightbox__type">{img.type}</span>
 </div>
 </motion.div>

 <button className="sp-lightbox__nav sp-lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next">›</button>
 </motion.div>
 )
}

function ServiceGallery({ service }) {
 const [lightboxIndex, setLightboxIndex] = useState(null)

 const open = useCallback((i) => setLightboxIndex(i), [])
 const close = useCallback(() => setLightboxIndex(null), [])
 const prev = useCallback(() => setLightboxIndex((i) => (i > 0 ? i - 1 : service.gallery.length - 1)), [service.gallery.length])
 const next = useCallback(() => setLightboxIndex((i) => (i < service.gallery.length - 1 ? i + 1 : 0)), [service.gallery.length])

 return (
 <>
 <section className="sp-section sp-section--alt">
 <div className="sp-container">
 <SectionHeader
 eyebrow="PROJECT GALLERY"
 title="Our Work"
 desc="Explore a selection of completed projects. All images are representative placeholders, to be replaced with actual project photographs."
 />
 <motion.div
 className="sp-gallery-grid"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 {service.gallery.map((item, i) => (
 <motion.button
 key={i}
 className="sp-gallery-item"
 variants={cardAnim}
 onClick={() => open(i)}
 aria-label={`View project: ${item.project}`}
 >
 <img src={item.src} alt={item.project} className="sp-gallery-img" loading="lazy" />
 <div className="sp-gallery-overlay">
 <div className="sp-gallery-overlay__inner">
 <div className="sp-gallery-overlay__project">{item.project}</div>
 <div className="sp-gallery-overlay__type">{item.type}</div>
 <div className="sp-gallery-overlay__cta">View Project →</div>
 </div>
 </div>
 </motion.button>
 ))}
 </motion.div>
 </div>
 </section>

 <AnimatePresence>
 {lightboxIndex !== null && (
 <Lightbox
 images={service.gallery}
 index={lightboxIndex}
 onClose={close}
 onPrev={prev}
 onNext={next}
 />
 )}
 </AnimatePresence>
 </>
 )
}

/* ═══════════════ SECTION 9, WHY SALONI ════════════════ */
function ServiceWhySaloni() {
 return (
 <section className="sp-section">
 <div className="sp-container">
 <SectionHeader
 eyebrow="WHY SALONI ENTERPRISE"
 title="Why Choose Saloni Enterprise"
 desc="We are not just a supplier. We are a complete fabrication and installation partner you can trust."
 />
 <motion.div
 className="sp-why-grid"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 {WHY_SALONI.map((item) => (
 <motion.div className="sp-why-card" key={item.title} variants={cardAnim}>
 <div className="sp-why-icon">
 <Icon name={item.icon} size={24} />
 </div>
 <h3 className="sp-why-title">{item.title}</h3>
 <p className="sp-why-desc">{item.desc}</p>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ SECTION 10, FAQs ═════════════════════ */
function FaqItem({ q, a }) {
 const [open, setOpen] = useState(false)
 return (
 <div className={`sp-faq__item${open ? ' sp-faq__item--open' : ''}`}>
 <button
 className="sp-faq__q"
 onClick={() => setOpen((o) => !o)}
 aria-expanded={open}
 >
 <span>{q}</span>
 <svg
 className="sp-faq__chevron"
 width="18"
 height="18"
 viewBox="0 0 18 18"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 aria-hidden="true"
 >
 <polyline points="4 7 9 12 14 7" />
 </svg>
 </button>
 <div className="sp-faq__a-wrap">
 <p className="sp-faq__a">{a}</p>
 </div>
 </div>
 )
}

function ServiceFAQ({ service }) {
 return (
 <section className="sp-section sp-section--alt">
 <div className="sp-container sp-container--narrow">
 <SectionHeader
 eyebrow="FREQUENTLY ASKED QUESTIONS"
 title="Common Questions"
 desc="Everything you need to know before making your decision."
 />
 <motion.div
 className="sp-faq"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 {service.faqs.map((faq, i) => (
 <motion.div key={i} variants={cardAnim}>
 <FaqItem q={faq.q} a={faq.a} />
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ SECTION 11, FINAL CTA ════════════════ */
function ServiceFinalCTA({ onQuote, onWhatsApp }) {
 return (
 <motion.section
 className="sp-final-cta"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.4 }}
 variants={fadeUp}
 >
 <div className="sp-container">
 <div className="sp-final-cta__inner">
 <h2 className="sp-final-cta__title">Let's Build the Right Solution for Your Project</h2>
 <p className="sp-final-cta__desc">
 Whether you need a new installation, custom fabrication or professional repair, our team is ready to help.
 </p>
 <div className="sp-final-cta__buttons">
 <button className="sp-btn sp-btn--gold" onClick={onQuote}>
 Request Free Quote <ArrowRight />
 </button>
 <button className="sp-btn sp-btn--ghost" onClick={onWhatsApp}>
 Chat on WhatsApp
 </button>
 </div>
 </div>
 </div>
 </motion.section>
 )
}

/* ═══════════════ SECTION 12, RELATED SERVICES ══════════ */
function ServiceRelated({ service }) {
 const related = getRelatedServices(service.related)
 if (!related.length) return null
 return (
 <section className="sp-section">
 <div className="sp-container">
 <SectionHeader
 eyebrow="EXPLORE MORE"
 title="You May Also Be Interested In"
 />
 <motion.div
 className="sp-related-grid"
 variants={stagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 >
 {related.map((rel) => (
 <motion.div key={rel.id} variants={cardAnim}>
 <Link to={`/services/${rel.id}`} className="sp-related-card">
 <div className="sp-related-img-wrap">
 <img src={rel.heroImage} alt={rel.title} className="sp-related-img" loading="lazy" />
 </div>
 <div className="sp-related-body">
 <h3 className="sp-related-title">{rel.title}</h3>
 <p className="sp-related-desc">{rel.heroSub.slice(0, 80)}…</p>
 <span className="sp-related-cta">
 View Details <ArrowRight size={12} className="sp-related-cta__arrow" />
 </span>
 </div>
 </Link>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 )
}

/* ═══════════════ STICKY QUOTE BUTTON ════════════════════ */
function StickyQuote({ visible, onQuote }) {
 return (
 <div className={`sp-sticky${visible ? ' sp-sticky--visible' : ''}`} aria-hidden={!visible}>
 <button className="sp-sticky__btn" onClick={onQuote} tabIndex={visible ? 0 : -1}>
 Request Quote
 </button>
 </div>
 )
}

/* ═══════════════ MAIN PAGE ══════════════════════════════ */
export default function ServicePage() {
 const { serviceId } = useParams()
 const service = getService(serviceId)
 const { openModal } = useQuoteModal()
 const [isSticky, setIsSticky] = useState(false)

 // If service not found, redirect home
 if (!service) return <Navigate to="/" replace />

 // SEO updates
 useEffect(() => {
 const prevTitle = document.title
 document.title = service.metaTitle
 const metaDesc = document.querySelector('meta[name="description"]')
 const prevDesc = metaDesc?.content
 if (metaDesc) metaDesc.content = service.metaDesc
 return () => {
 document.title = prevTitle
 if (metaDesc && prevDesc) metaDesc.content = prevDesc
 }
 }, [service])

 // Sticky button
 useEffect(() => {
 const onScroll = () => setIsSticky(window.scrollY > 520)
 window.addEventListener('scroll', onScroll, { passive: true })
 return () => window.removeEventListener('scroll', onScroll)
 }, [])

 const handleQuote = useCallback((product) => {
 openModal({
 product: product || service.title,
 sourceButton: `Service Page, ${service.title}`,
 pageUrl: window.location.href,
 })
 }, [service, openModal])

 const handleWhatsApp = useCallback(() => {
 const msg = encodeURIComponent(
 `Hi! I'm interested in your ${service.title} service and would like a free quote.`
 )
 window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
 }, [service])

 return (
 <div className="sp-page">
 <ServiceHeader service={service} onQuote={() => handleQuote()} onWhatsApp={handleWhatsApp} />
 <ServiceTypes service={service} onQuote={(type) => handleQuote(type)} />
  {/* Hide "Perfect For" on repair & maintenance — not applicable */}
  {service.applications && service.id !== 'repair-maintenance' && (
    <ServiceApplications service={service} />
  )}
 <ServiceFinalCTA onQuote={() => handleQuote()} onWhatsApp={handleWhatsApp} />
 <ServiceRelated service={service} />
 <StickyQuote visible={isSticky} onQuote={() => handleQuote()} />
 </div>
 )
}
