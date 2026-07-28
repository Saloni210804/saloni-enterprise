import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── SEO-optimised FAQ data ─────────────────────────────── */
const FAQS = [
 {
 id: 1,
 q: 'What types of rolling shutters does Saloni Enterprise supply and install?',
 a: 'We supply and install a full range of rolling shutters including manual rolling shutters, motorised (automatic) rolling shutters with remote control, perforated rolling shutters for ventilation, and powder-coated shutters in custom colours. All shutters are custom-fabricated to your exact opening dimensions and are suitable for shops, showrooms, godowns, factories, warehouses, and residential garages.',
 },
 {
 id: 2,
 q: 'Do you provide a free site visit and measurement before quoting?',
 a: 'Yes. For all rolling shutter, fabrication, and glass work projects, we offer a completely free site visit and measurement service. Our team comes to your location, takes accurate measurements, assesses the site conditions, and then prepares a detailed quotation. There is no charge for the site visit, and no obligation to proceed. Simply call or WhatsApp us at +91 80133 63204 to schedule.',
 },
 {
 id: 3,
 q: 'What metal fabrication services does Saloni Enterprise offer?',
 a: 'We offer a comprehensive range of custom metal fabrication services including stainless steel and mild steel railing fabrication, steel gate and grille fabrication, window and ventilation grilles, roof trusses and shed structures, mezzanine floors and industrial platforms, staircase railings, decorative metalwork, and general structural steel fabrication. We work with mild steel, stainless steel, and aluminium for residential, commercial, and industrial applications.',
 },
 {
 id: 4,
 q: 'Do you handle toughened glass work and glass door installation?',
 a: 'Yes. We supply and install toughened safety glass for glass doors, glass partitions, frameless glass balcony railings, storefronts, glass canopies, and glass stair railings. All glass used meets applicable safety standards for strength and impact resistance. Toughened glass is available in clear, frosted, and tinted finishes, and in custom sizes.',
 },
 {
 id: 5,
 q: 'What is the difference between a manual and a motorised rolling shutter?',
 a: 'A manual rolling shutter is operated by hand using a push-pull mechanism or a side-mounted gearbox handle, making it cost-effective and reliable with very low maintenance. A motorised rolling shutter is powered by an electric motor and operated via remote control or wall switch, ideal for larger openings (above 12 feet wide), high-frequency use, or where convenience is a priority. We supply and install both types. Motorised shutters can also be retrofitted to existing manual shutters.',
 },
 {
 id: 6,
 q: 'Which areas does Saloni Enterprise serve?',
 a: 'We serve clients across a wide region for both residential and commercial projects. For rolling shutter fabrication, metal works, glass installations and related services, we travel to client sites based on project requirements. Contact us to confirm availability for your specific location.',
 },
 {
 id: 7,
 q: 'What brands and quality materials do you use for fabrication and shutters?',
 a: 'We source materials from India\'s most trusted manufacturers, JSW Steel, Tata Steel, SAIL, Jindal Steel, and Saint-Gobain Glass. All materials are sourced from reputed mills and meet applicable quality standards. For shutters, we use high-quality galvanized steel and mild steel shutter profiles with appropriate gauge and coating. We can provide material quality documentation and specifications upon request.',
 },
 {
 id: 8,
 q: 'How do I get a quotation or enquire about a project?',
 a: 'Getting a quote is simple. You can call or WhatsApp us directly at +91 80133 63204 or +91 82408 11311, we respond as soon as possible during working hours (Monday to Saturday, 9 AM to 7 PM). You can also fill in the enquiry form on our website by clicking any "Get a Quote" button. For rolling shutters and fabrication work, we\'ll arrange a free site visit to take accurate measurements before finalising your quotation.',
 },
]

/* ─── Plus / Minus icons ─────────────────────────────────── */
const PlusIcon = () => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
 <line x1="12" y1="5" x2="12" y2="19" />
 <line x1="5" y1="12" x2="19" y2="12" />
 </svg>
)
const MinusIcon = () => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
 <line x1="5" y1="12" x2="19" y2="12" />
 </svg>
)

/* ─── Single FAQ item ────────────────────────────────────── */
function FaqItem({ faq, isOpen, onToggle, index }) {
 return (
 <motion.div
 className={`fq-item${isOpen ? ' fq-item--open' : ''}`}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.5, delay: 0.06 * index, ease: [0.25, 0.1, 0.25, 1] }}
 >
 <button
 className="fq-question"
 onClick={onToggle}
 aria-expanded={isOpen}
 aria-controls={`faq-answer-${faq.id}`}
 id={`faq-question-${faq.id}`}
 >
 <span className="fq-question__num" aria-hidden="true">
 {String(faq.id).padStart(2, '0')}
 </span>
 <span className="fq-question__text">{faq.q}</span>
 <motion.div
 className="fq-icon"
 animate={{ rotate: isOpen ? 180 : 0 }}
 transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
 >
 {isOpen ? <MinusIcon /> : <PlusIcon />}
 </motion.div>
 </button>

 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 id={`faq-answer-${faq.id}`}
 role="region"
 aria-labelledby={`faq-question-${faq.id}`}
 className="fq-answer"
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
 style={{ overflow: 'hidden' }}
 >
 <div className="fq-answer__inner">
 <p>{faq.a}</p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 )
}

/* ─── Animation helpers ──────────────────────────────────── */
const fadeUp = {
 hidden: { opacity: 0, y: 22 },
 visible: (d = 0) => ({
 opacity: 1, y: 0,
 transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
 }),
}

/* ─── Main export ────────────────────────────────────────── */
export default function FaqSection() {
 const [openId, setOpenId] = useState(1)

 const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

 return (
 <section className="fq-section" id="faq" aria-label="Frequently Asked Questions">
 <div className="fq-container">

 {/* ── Section Header ── */}
 <motion.div
 className="fq-header"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.4 }}
 >
 <motion.div className="fq-eyebrow" variants={fadeUp} custom={0}>
 <span className="fq-eyebrow__line" aria-hidden="true" />
 FAQ
 <span className="fq-eyebrow__line fq-eyebrow__line--r" aria-hidden="true" />
 </motion.div>
 <motion.h2 className="fq-title" variants={fadeUp} custom={0.08}>
 Frequently Asked Questions
 </motion.h2>
 <motion.p className="fq-desc" variants={fadeUp} custom={0.16}>
 Everything you need to know about our rolling shutter, fabrication, and glass
 services. Can't find your answer?{' '}
 <a href="tel:+918013363204" className="fq-desc__link">
 Call us directly.
 </a>
 </motion.p>
 </motion.div>

 {/* ── Two-column layout: left stats | right accordion ── */}
 <div className="fq-body">

 {/* Left: quick-fact panel */}
 <motion.aside
 className="fq-aside"
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
 aria-label="Why choose Saloni Enterprise"
 >
 <div className="fq-aside__inner">
 <div className="fq-aside__badge" aria-label="Established in 2010">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
 <polyline points="9 12 11 14 15 10" />
 </svg>
 Trusted Since 2010
 </div>
 <h3 className="fq-aside__heading">Why choose Saloni Enterprise?</h3>
 <ul className="fq-aside__list">
 {[
 'Free site visit & measurement',
 'Fabrication + installation under one roof',
 'Materials from JSW, Tata Steel, SAIL',
 'Custom sizes for every project',
 'Transparent quotations, no hidden costs',
 'Prompt response, dedicated service team',
 ].map((point, i) => (
 <li key={i} className="fq-aside__point">
 <span className="fq-aside__point-dot" aria-hidden="true" />
 {point}
 </li>
 ))}
 </ul>

 {/* Contact CTAs */}
 <div className="fq-aside__ctas">
 <a
 href="tel:+918013363204"
 className="fq-aside__btn fq-aside__btn--primary"
 aria-label="Call Saloni Enterprise"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.88-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z" />
 </svg>
 +91 80133 63204
 </a>
 <a
 href="https://wa.me/918013363204?text=Hi%2C+I+have+a+question+about+your+services."
 target="_blank"
 rel="noopener noreferrer"
 className="fq-aside__btn fq-aside__btn--whatsapp"
 aria-label="Chat on WhatsApp"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
 </svg>
 WhatsApp Us
 </a>
 </div>
 </div>
 </motion.aside>

 {/* Right: accordion */}
 <div
 className="fq-accordion"
 role="list"
 aria-label="Frequently Asked Questions accordion"
 >
 {FAQS.map((faq, i) => (
 <div key={faq.id} role="listitem">
 <FaqItem
 faq={faq}
 isOpen={openId === faq.id}
 onToggle={() => toggle(faq.id)}
 index={i}
 />
 </div>
 ))}
 </div>

 </div>
 </div>
 </section>
 )
}
