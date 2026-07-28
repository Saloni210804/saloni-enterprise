import { Link } from 'react-router-dom'
import { useQuoteModal } from '../context/QuoteModalContext'

/* ─── Business constants ─────────────────────────────────── */
const BUSINESS_NAME = 'Saloni Enterprise'
const FOUNDER = 'Ranjit Kumar Shaw'
const PROPRIETOR = 'Bijeta Shaw'
const PHONE_1 = '+91 80133 63204'
const PHONE_1_RAW = '+918013363204'
const PHONE_2 = '+91 82408 11311'
const PHONE_2_RAW = '+918240811311'
const WA_LINK_1 = 'https://wa.me/918013363204?text=Hi%2C+I%27d+like+to+enquire+about+your+services.'
const WA_LINK_2 = 'https://wa.me/918240811311?text=Hi%2C+I%27d+like+to+enquire+about+your+services.'
const ADDRESS_LINE_1 = '53 Adarsh Nagar, P.O. Danesh Sk. Lane'
const ADDRESS_LINE_2 = 'Howrah, 711109'
const EMAIL = 'salonienterprise21@gmail.com'
const HOURS = 'Mon - Sat: 9:00 AM - 7:00 PM'
const HOURS_SUN = 'Sunday: By Appointment'
const GSTIN = '19FUAPS7630P1ZR'
const EST_YEAR = '2012'

/* ─── Google Maps embed ─────────────────────────────────── */
const MAPS_EMBED = 'https://maps.google.com/maps?q=22.5691959,88.2758088&t=&z=17&ie=UTF8&iwloc=&output=embed'
const MAPS_LINK = 'https://www.google.com/maps/place/Saloni+Enterprise/@22.5691959,88.2662816,16z/data=!4m10!1m2!2m1!1s53+Adarsh+Nagar,+Danesh+Sk.+Lane,+,+West+Bengal+711109!3m6!1s0x3a02798750f28b5b:0xd9f54ab468b6179f!8m2!3d22.5691959!4d88.2758088!15sCjw1MyBBZGFyc2ggTmFnYXIsIERhbmVzaCBTay4gTGFuZSwgSG93cmFoLCBXZXN0IEJlbmdhbCA3MTExMDmSARBtZXRhbF9mYWJyaWNhdG9y4AEA!16s%2Fg%2F11fmvjc64r?entry=ttu'

/* ─── Social icon SVGs ───────────────────────────────────── */
const WhatsAppIcon = () => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
 </svg>
)
const InstagramIcon = () => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
 </svg>
)
const FacebookIcon = () => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
 </svg>
)
const YoutubeIcon = () => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
 </svg>
)
const MapPinIcon = () => (
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
 <circle cx="12" cy="10" r="3"/>
 </svg>
)
const PhoneIcon = () => (
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.88-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z"/>
 </svg>
)
const MailIcon = () => (
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M4 4h16c1.1 0 2.9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
 <polyline points="22,6 12,13 2,6"/>
 </svg>
)
const ClockIcon = () => (
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <circle cx="12" cy="12" r="10"/>
 <polyline points="12 6 12 12 16 14"/>
 </svg>
)

/* ─── Service links (scroll-to on homepage or link to service page) ── */
const SERVICES = [
 { label: 'Rolling Shutters', href: '/services/rolling-shutters' },
 { label: 'Metal Fabrication', href: '/services/metal-fabrication' },
 { label: 'Toughened Glass Works', href: '/services/glass-works' },
 { label: 'Steel Railings', href: '/services/steel-railings' },
 { label: 'UPVC Doors & Windows', href: '/services/upvc-doors-windows' },
 { label: 'Retractable Awnings', href: '/services/retractable-awnings' },
 { label: 'Repair & Maintenance', href: '/services/repair-maintenance' },
]

const NAV_LINKS = [
 { label: 'Home', href: '/' },
 { label: 'About Us', href: '/#about' },
 { label: 'Our Services', href: '/#services' },
 { label: 'Featured Projects',href: '/#projects' },
 { label: 'FAQ', href: '/#faq' },
 { label: 'Contact Us', href: 'https://wa.me/918013363204?text=Hi%2C+I%27d+like+to+enquire+about+your+services.' },
]

/* ─── Main export ─────────────────────────────────────────── */
export default function Footer() {
 const { openModal } = useQuoteModal()

 return (
 <footer className="pf-footer" aria-label="Site Footer">

 {/* ── TOP SECTION: columns ─────────────────────────── */}
 <div className="pf-top">
 <div className="pf-container">
 <div className="pf-grid">

 {/* ── Column 1: Brand ── */}
 <div className="pf-brand">
 <div className="pf-logo" aria-label="Saloni Enterprise">
 <img
 src="/logo-icon.png"
 alt="Saloni Enterprise Logo"
 className="pf-logo__img"
 />
 <div className="pf-logo__wordmark">
 <span className="pf-logo__name">Saloni</span>
 <span className="pf-logo__accent">Enterprise</span>
 </div>
 </div>
 <p className="pf-tagline">
 Premium rolling shutter fabrication, metal fabrication, and glass works. Built to last.
 </p>

 {/* Founder chip */}
 <div className="pf-founder">
 <img src="/ranjit.jpeg" alt="Ranjit Kumar Shaw" className="pf-founder__photo" aria-hidden="true" />
 <div>
 <div className="pf-founder__name">{FOUNDER}</div>
 <div className="pf-founder__role">Founder, {BUSINESS_NAME}</div>
 </div>
 </div>

 {/* Proprietor chip */}
 <div className="pf-founder" style={{ marginTop: '8px' }}>
 <img src="/bijeta.jpeg" alt="Bijeta Shaw" className="pf-founder__photo" aria-hidden="true" />
 <div>
 <div className="pf-founder__name">{PROPRIETOR}</div>
 <div className="pf-founder__role">Proprietor, {BUSINESS_NAME}</div>
 </div>
 </div>

 {/* GST */}
 <p className="pf-gst" aria-label={`GST Number: ${GSTIN}`}>GST: <span>{GSTIN}</span></p>

 {/* Social links */}
 <div className="pf-social" role="list" aria-label="Social media links">
 {[
 { href: WA_LINK_1, label: 'WhatsApp', Icon: WhatsAppIcon },
 { href: '#', label: 'Instagram', Icon: InstagramIcon },
 { href: '#', label: 'Facebook', Icon: FacebookIcon },
 ].map(({ href, label, Icon }) => (
 <a
 key={label}
 href={href}
 className="pf-social__link"
 aria-label={label}
 target={href.startsWith('http') ? '_blank' : undefined}
 rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
 role="listitem"
 >
 <Icon />
 </a>
 ))}
 </div>
 </div>

 {/* ── Column 2: Navigation ── */}
 <nav className="pf-nav" aria-label="Footer navigation">
 <h3 className="pf-nav__title">Quick Links</h3>
 <ul className="pf-nav__list" role="list">
 {NAV_LINKS.map(({ label, href }) => (
 <li key={label} role="listitem">
 {href.startsWith('/') && !href.includes('#') ? (
 <Link to={href} className="pf-nav__link">{label}</Link>
 ) : (
 <a 
  href={href} 
  className="pf-nav__link"
  target={href.startsWith('http') ? '_blank' : undefined}
  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
 >{label}</a>
 )}
 </li>
 ))}
 </ul>
 </nav>

 {/* ── Column 3: Services ── */}
 <nav className="pf-nav" aria-label="Services navigation">
 <h3 className="pf-nav__title">Our Services</h3>
 <ul className="pf-nav__list" role="list">
 {SERVICES.map(({ label, href }) => (
 <li key={label} role="listitem">
 <Link to={href} className="pf-nav__link">{label}</Link>
 </li>
 ))}
 </ul>
 </nav>

 {/* ── Column 4: Contact ── */}
 <div className="pf-contact" aria-label="Contact information">
 <h3 className="pf-nav__title">Get In Touch</h3>

 <ul className="pf-contact__list" role="list">
 <li className="pf-contact__item" role="listitem">
 <MapPinIcon />
 <div>
 <a
 href={MAPS_LINK}
 target="_blank"
 rel="noopener noreferrer"
 className="pf-contact__link"
 aria-label="View location on Google Maps"
 >
 {ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}
 </a>
 </div>
 </li>

 <li className="pf-contact__item" role="listitem">
 <PhoneIcon />
 <div>
 <a href={`tel:${PHONE_1_RAW}`} className="pf-contact__link">{PHONE_1}</a>
 <br />
 <a href={`tel:${PHONE_2_RAW}`} className="pf-contact__link">{PHONE_2}</a>
 </div>
 </li>

 <li className="pf-contact__item" role="listitem">
 <MailIcon />
 <a href={`mailto:${EMAIL}`} className="pf-contact__link">{EMAIL}</a>
 </li>

 <li className="pf-contact__item" role="listitem">
 <ClockIcon />
 <div>
 <span className="pf-contact__plain">{HOURS}</span>
 <br />
 <span className="pf-contact__plain">{HOURS_SUN}</span>
 </div>
 </li>
 </ul>

 {/* WhatsApp CTA */}
 <div className="pf-contact__ctas">
 <a
 href={WA_LINK_1}
 target="_blank"
 rel="noopener noreferrer"
 className="pf-contact__wa"
 aria-label="Chat on WhatsApp with Saloni Enterprise"
 >
 <WhatsAppIcon />
 Chat on WhatsApp
 </a>
 <button
 className="pf-contact__quote"
 onClick={() => openModal('', 'Footer, Request a Quote')}
 aria-label="Request a free quote"
 >
 Request a Quote
 </button>
 </div>
 </div>

 </div>
 </div>
 </div>

 {/* ── GOOGLE MAPS EMBED ──────────────────────────────── */}
 <div className="pf-map-section" aria-label="Office location on map">
 <div className="pf-map-header">
 <div className="pf-map-header__inner">
 <MapPinIcon />
 <span>Find Us: {ADDRESS_LINE_1}, {ADDRESS_LINE_2}</span>
 <a
 href={MAPS_LINK}
 target="_blank"
 rel="noopener noreferrer"
 className="pf-map-header__link"
 aria-label="Open location in Google Maps"
 >
 Open in Google Maps
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
 <polyline points="15 3 21 3 21 9"/>
 <line x1="10" y1="14" x2="21" y2="3"/>
 </svg>
 </a>
 </div>
 </div>
 <div className="pf-map-frame">
 <iframe
 title="Saloni Enterprise location, 53 Adarsh Nagar, 711109"
 src={MAPS_EMBED}
 width="100%"
 height="340"
 style={{ border: 0, display: 'block' }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 aria-label="Google Maps showing Saloni Enterprise office location"
 />
 </div>
 </div>

 {/* ── BOTTOM BAR ─────────────────────────────────────── */}
 <div className="pf-bottom">
 <div className="pf-container pf-bottom__inner">
 <p className="pf-copy">
 © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
 <span className="pf-copy__sep" aria-hidden="true">·</span>
 Est. {EST_YEAR}
 <span className="pf-copy__sep" aria-hidden="true">·</span>
 Founder: {FOUNDER}
 <span className="pf-copy__sep" aria-hidden="true">·</span>
 Proprietor: {PROPRIETOR}
 </p>
 <p className="pf-made">
 Made with <span aria-label="love">❤</span> in&nbsp;🇮🇳
 </p>
 </div>
 </div>

 </footer>
 )
}
