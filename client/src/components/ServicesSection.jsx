import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuoteModal } from '../context/QuoteModalContext'

/* ─── WhatsApp number ───────────────────────────────────── */
const WA_NUMBER = '91XXXXXXXXXX'

/* ─── Service data ──────────────────────────────────────── */
const SERVICES = [
 {
 id: 'rolling-shutters',
 title: 'Rolling Shutters',
 description:
 'Secure, durable, and custom-built shutter solutions designed for shops, warehouses, garages, and industries.',
 image: '/card rolling.jpg',
 badges: ['Manual', 'Motorized', 'Gear & Chain'],
 },
 {
 id: 'metal-fabrication',
 title: 'Custom Metal Fabrication',
 description:
 'Precision-engineered metal fabrication tailored to your exact residential, commercial, and industrial requirements.',
 image: '/metal fabrication card.jpg',
 badges: ['Gates & Grilles', 'Custom Sheds'],
 },
 {
 id: 'glass-works',
 title: 'Toughened Glass Works',
 description:
 'Elegant and durable glass solutions that combine safety, functionality, and modern aesthetics.',
 image: '/glass card.jpg',
 badges: ['Glass Doors', 'Partitions', 'Shop Fronts'],
 },
 {
 id: 'steel-railings',
 title: 'Steel Railings',
 description:
 'Stylish stainless steel railings crafted for strength, safety, and long-lasting performance.',
 image: '/railing card.jpg',
 badges: ['Balcony', 'Staircase', 'Terrace'],
 },
 {
 id: 'upvc-doors-windows',
 title: 'UPVC Doors & Windows',
 description:
 'Premium UPVC doors and windows offering thermal insulation, sound reduction, and zero-maintenance elegance for homes and offices.',
 image: '/upvc card.jpg',
 badges: ['Thermal Insulated', 'Sound Proof'],
 },
 {
 id: 'retractable-awnings',
 title: 'Retractable Awnings',
 description:
 'Premium weather protection solutions designed for outdoor comfort and elegant spaces.',
 image: '/awming card.jpg',
 badges: [ 'Weather Resistant', 'Custom Size'],
 },
 {
 id: 'repair-maintenance',
 title: 'Repair & Maintenance',
 description:
 'Reliable repair, servicing, and maintenance to ensure smooth and long-lasting performance.',
 image: '/repair hero.jpg',
 badges: ['Repairs', 'Maintenance'],
 },
]

/* ─── Inline SVGs (no emoji) ────────────────────────────── */
function ArrowRight({ className }) {
 return (
 <svg
 className={className}
 width="14"
 height="14"
 viewBox="0 0 14 14"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 aria-hidden="true"
 >
 <path
 d="M2 7H12M8.5 3.5L12 7L8.5 10.5"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 )
}

function WhatsAppIcon() {
 return (
 <svg
 width="18"
 height="18"
 viewBox="0 0 24 24"
 fill="currentColor"
 aria-hidden="true"
 >
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
 </svg>
 )
}

/* ─── Framer Motion variants ────────────────────────────── */
const headerVariants = {
 hidden: { opacity: 0, y: 24 },
 visible: (delay = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] },
 }),
}

const gridVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
 },
}

const ctaVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
 },
}

/* ─── ServiceCard ────────────────────────────────────────── */
function ServiceCard({ service }) {
 return (
 <motion.div variants={cardVariants}>
 {/* Entire card navigates to the dedicated service page */}
 <Link
 to={`/services/${service.id}`}
 className="svc-card"
 aria-label={`Learn more about ${service.title}`}
 >
 {/* Image */}
 <div className="svc-card__image-wrap">
 <img
 src={service.image}
 alt={`${service.title}, Saloni Enterprise`}
 className="svc-card__image"
 loading="lazy"
 />
 </div>

 {/* Body */}
 <div className="svc-card__body">
 <h3 className="svc-card__title">{service.title}</h3>
 <p className="svc-card__desc">{service.description}</p>

 {/* Feature badges */}
 <div className="svc-card__badges">
 {service.badges.map((b) => (
 <span className="svc-card__badge" key={b}>{b}</span>
 ))}
 </div>

 {/* CTA, always at bottom */}
 <div className="svc-card__cta">
 <span>Explore Service</span>
 <ArrowRight className="svc-card__cta-arrow" />
 </div>
 </div>
 </Link>
 </motion.div>
 )
}

/* ─── Main Section ───────────────────────────────────────── */
export default function ServicesSection() {
 const { openModal } = useQuoteModal()

 const handleQuote = () =>
 openModal({
 product: '',
 sourceButton: 'Services Section, Request a Free Quote CTA',
 pageUrl: window.location.href,
 })

 const handleWhatsApp = () => {
 const msg = encodeURIComponent(
 "Hi! I'm interested in your services and would like a custom quote."
 )
 window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
 }

 return (
 <section className="svc-section" id="services" aria-label="Our Services">
 <div className="svc-section__container">

 {/* ── Section Header ──────────────────────────── */}
 <motion.div
 className="svc-section__header"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 >
 <motion.div className="svc-section__eyebrow" variants={headerVariants} custom={0}>
 <span className="svc-section__eyebrow-line" aria-hidden="true" />
 Fabrication & Shutter Solutions
 <span className="svc-section__eyebrow-line" aria-hidden="true" />
 </motion.div>

 <motion.h2 className="svc-section__title" variants={headerVariants} custom={0.1}>
 Our Services
 </motion.h2>
 </motion.div>

 {/* ── Services Grid ───────────────────────────── */}
 <motion.div
 className="svc-grid"
 variants={gridVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 {SERVICES.map((service) => (
 <ServiceCard key={service.id} service={service} />
 ))}
 </motion.div>

 {/* ── Bottom CTA block ────────────────────────── */}
 <motion.div
 className="svc-cta-block"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.4 }}
 variants={ctaVariants}
 >
 {/* Metal-texture pattern overlay handled in CSS */}
 <div className="svc-cta-block__inner">
 <h3 className="svc-cta-block__title">
 Looking for a Custom Fabrication Solution?
 </h3>
 <p className="svc-cta-block__desc">
 Every project is unique. Let's discuss your requirements and provide a
 solution tailored specifically for your space.
 </p>
 <div className="svc-cta-block__buttons">
 <button className="btn-svc-quote" onClick={handleQuote}>
 Request a Free Quote
 <ArrowRight />
 </button>
 <button className="btn-svc-wa" onClick={handleWhatsApp}>
 <WhatsAppIcon />
 Chat on WhatsApp
 </button>
 </div>
 </div>
 </motion.div>

 </div>
 </section>
 )
}
