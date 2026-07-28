import { useState } from 'react'
import { useQuoteModal } from '../context/QuoteModalContext'
import ScrollReveal from '../components/ScrollReveal'
import SectionLabel from '../components/SectionLabel'

const PHONE = '[Your Phone Number]'
const EMAIL = '[Your Email]'
const ADDRESS = '[Full Address], , – [PIN]'
const WHATSAPP = 'https://wa.me/91XXXXXXXXXX'

const SERVICE_AREAS = ['','','','','','Hooghly','Nadia','Burdwan']

const PRODUCTS_LIST = [
 'Rolling Shutters','Roofing Sheets','MS / GI Pipes','HR / CR Sheets',
 'Structural Steel','Shutter Accessories','Abrasive Wheels','Shed Fabrication',
]

export default function Contact() {
 const { openModal } = useQuoteModal()
 const [form, setForm] = useState({ name: '', phone: '', email: '', product: '', message: '' })
 const [status, setStatus] = useState(null)
 const [loading, setLoading] = useState(false)

 const handleChange = (e) => setForm((p) => ({...p, [e.target.name]: e.target.value }))

 const handleSubmit = async (e) => {
 e.preventDefault()
 setLoading(true)
 setStatus(null)
 try {
 const res = await fetch('/api/leads', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
...form,
 sourceButton: 'Contact Page, Direct Form',
 pageUrl: window.location.href,
 }),
 })
 const data = await res.json()
 if (res.ok && data.success) {
 setStatus({ type: 'success', msg: '✅ Message sent! We\'ll get back to you shortly.' })
 setForm({ name: '', phone: '', email: '', product: '', message: '' })
 } else {
 setStatus({ type: 'error', msg: `❌ ${data.message || 'Something went wrong.'}` })
 }
 } catch {
 setStatus({ type: 'error', msg: '❌ Could not connect. Please call us directly.' })
 } finally {
 setLoading(false)
 }
 }

 const quote = (product, source) =>
 openModal({ product, sourceButton: source, pageUrl: window.location.href })

 return (
 <>
 <section className="page-hero">
 <span className="page-hero__eyebrow">GET IN TOUCH</span>
 <h1 className="page-hero__headline">We're Easy to Reach</h1>
 <p className="page-hero__sub">
 Call, WhatsApp, or drop us a message. We respond fast, your project won't wait.
 </p>
 </section>

 <section className="section">
 <div className="container">
 <div className="contact__inner">
 {/* Left, Contact Details */}
 <ScrollReveal>
 <div>
 <SectionLabel text="GET IN TOUCH" />
 <h2 className="section-headline" style={{ marginBottom: '28px' }}>We're Easy to Reach</h2>

 {[
 { icon: '📍', label: 'Address', content: <p>{ADDRESS}</p> },
 { icon: '📞', label: 'Phone', content: <a href={`tel:${PHONE}`}>{PHONE} (click to call)</a> },
 { icon: '💬', label: 'WhatsApp', content: <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">[Your Number], chat now</a> },
 { icon: '✉️', label: 'Email', content: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> },
 { icon: '🕐', label: 'Hours', content: <><p>Monday–Saturday, 9:00 AM – 7:00 PM</p><p>Sunday: 10:00 AM – 2:00 PM (limited)</p></> },
 ].map((d, i) => (
 <div className="contact__detail" key={i}>
 <span className="contact__detail-icon">{d.icon}</span>
 <div className="contact__detail-body">
 <h4>{d.label}</h4>
 {d.content}
 </div>
 </div>
 ))}

 <div className="contact__service-areas" style={{ marginTop: '28px' }}>
 <h4>Service Areas</h4>
 <div className="contact__areas-list">
 {SERVICE_AREAS.map((a) => <span className="area-tag" key={a}>{a}</span>)}
 </div>
 </div>

 <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
 <a href={`tel:${PHONE}`} className="btn btn--primary">📞 Call Now</a>
 <button
 className="btn btn--accent"
 onClick={() => quote('', 'Contact Page, Quick Quote Button')}
 >
 📋 Quick Quote
 </button>
 </div>
 </div>
 </ScrollReveal>

 {/* Right, Form */}
 <ScrollReveal delay={0.15}>
 <div className="contact__form">
 <h3>Send Us a Message</h3>
 <form onSubmit={handleSubmit}>
 <div className="contact__form-grid">
 <div className="form-group">
 <label htmlFor="c-name">Your Name *</label>
 <input id="c-name" name="name" type="text" placeholder="Ramesh Agarwal" value={form.name} onChange={handleChange} required />
 </div>
 <div className="form-group">
 <label htmlFor="c-phone">Phone Number *</label>
 <input id="c-phone" name="phone" type="tel" placeholder="+91 98765 XXXXX" value={form.phone} onChange={handleChange} required />
 </div>
 <div className="form-group form-group--full">
 <label htmlFor="c-email">Email Address</label>
 <input id="c-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
 </div>
 <div className="form-group form-group--full">
 <label htmlFor="c-product">Product / Service</label>
 <select id="c-product" name="product" value={form.product} onChange={handleChange}>
 <option value="">Select a product</option>
 {PRODUCTS_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
 <option value="Other">Other / General Enquiry</option>
 </select>
 </div>
 <div className="form-group form-group--full">
 <label htmlFor="c-msg">Your Message *</label>
 <textarea id="c-msg" name="message" rows="4" placeholder="Tell us your requirement, size, quantity, location, timeline..." value={form.message} onChange={handleChange} required style={{ resize: 'vertical' }} />
 </div>
 </div>

 {status && (
 <div style={{
 marginTop: '16px',
 padding: '12px 16px',
 borderRadius: '8px',
 background: status.type === 'success' ? '#f0faf4' : '#fef8f7',
 border: `1px solid ${status.type === 'success' ? 'var(--color-success)' : 'var(--color-error)'}`,
 color: status.type === 'success' ? '#27ae60' : 'var(--color-error)',
 fontSize: '14px',
 }}>
 {status.msg}
 </div>
 )}

 <button type="submit" className="btn btn--primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }} disabled={loading}>
 {loading ? 'Sending...' : 'Send Message'}
 </button>
 </form>
 </div>
 </ScrollReveal>
 </div>
 </div>
 </section>

 {/* Map */}
 <section className="section section--surface">
 <div className="container">
 <ScrollReveal>
 <div className="section-header section-header--center">
 <SectionLabel text="FIND US" />
 <h2 className="section-headline">Our Location</h2>
 </div>
 </ScrollReveal>
 <ScrollReveal>
 <div className="contact__map" style={{ height: '420px', fontSize: '15px' }}>
 <div>
 <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
 <strong style={{ color: 'var(--color-primary)', fontSize: '16px' }}>Google Map Embed</strong>
 <p style={{ marginTop: '12px', maxWidth: '400px', lineHeight: '1.6', color: 'var(--color-muted)' }}>
 Replace this placeholder with your Google Maps{' '}
 <code style={{ background: 'var(--color-border)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>&lt;iframe&gt;</code>{' '}
 embed code in Contact.jsx.
 </p>
 <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ marginTop: '16px', display: 'inline-flex' }}>
 Open in Google Maps
 </a>
 </div>
 </div>
 </ScrollReveal>
 </div>
 </section>

 {/* Bottom CTA */}
 <ScrollReveal>
 <div style={{ background: 'var(--color-primary)', padding: '40px 24px', textAlign: 'center' }}>
 <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', marginBottom: '20px' }}>
 Need an urgent quote? Contact our sales team directly.
 </p>
 <button
 className="btn btn--accent"
 onClick={() => quote('', 'Contact Page, Bottom Contact Sales CTA')}
 >
 Contact Sales
 </button>
 </div>
 </ScrollReveal>
 </>
 )
}
