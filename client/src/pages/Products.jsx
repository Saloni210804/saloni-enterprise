import { useQuoteModal } from '../context/QuoteModalContext'
import ScrollReveal from '../components/ScrollReveal'
import SectionLabel from '../components/SectionLabel'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Products() {
 const { openModal } = useQuoteModal()

 const quote = (product, source) =>
 openModal({ product, sourceButton: source, pageUrl: window.location.href })

 return (
 <>
 <section className="page-hero">
 <span className="page-hero__eyebrow">WHAT WE SUPPLY</span>
 <h1 className="page-hero__headline">Our Complete Product Range</h1>
 <p className="page-hero__sub">
 Everything your construction, fabrication, or commercial project needs, sourced from
 India's best steel mills and delivered.
 </p>
 </section>

 {/* Products Grid */}
 <section className="section">
 <div className="container">
 <ScrollReveal>
 <div className="section-header section-header--center">
 <SectionLabel text="WHAT WE SUPPLY" />
 <h2 className="section-headline">A Complete Range of Steel Products</h2>
 <p className="section-sub">
 Everything your construction, fabrication, or commercial project needs, sourced
 from India's best steel mills.
 </p>
 </div>
 </ScrollReveal>

 <div className="grid-3">
 {products.map((p, i) => (
 <ScrollReveal key={p.id} delay={i * 0.07}>
 <ProductCard product={p} />
 </ScrollReveal>
 ))}
 </div>

 <ScrollReveal>
 <div style={{
 textAlign: 'center',
 marginTop: '56px',
 padding: '32px',
 background: 'var(--color-bg)',
 border: '1px solid var(--color-border)',
 borderRadius: 'var(--card-radius)',
 }}>
 <SectionLabel text="BULK ORDERS" />
 <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '12px' }}>
 Need Wholesale Pricing?
 </h3>
 <p style={{ fontSize: '16px', color: 'var(--color-secondary)', marginBottom: '20px', maxWidth: '560px', margin: '0 auto 20px' }}>
 All products available in custom sizes and lengths. Wholesale pricing for bulk
 orders. Dealer enquiries welcome.
 </p>
 <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
 <button
 className="btn btn--outline-gold"
 onClick={() => quote('Bulk / Wholesale Order', 'Products Page, Bulk Pricing Enquiry')}
 >
 Enquire About Bulk Pricing
 </button>
 <button
 className="btn btn--primary"
 onClick={() => quote('', 'Products Page, Get a Quote')}
 >
 Get a Quote
 </button>
 </div>
 </div>
 </ScrollReveal>
 </div>
 </section>

 {/* Shutter Spotlight */}
 <section className="section section--surface">
 <div className="container">
 <ScrollReveal>
 <div className="section-header">
 <SectionLabel text="SPOTLIGHT" />
 <h2 className="section-headline">Rolling Shutters, Our Specialty</h2>
 <p className="section-sub">
 We design, fabricate, supply, and install rolling shutters for every application.
 Manual, motorised, and perforated options, custom-made to your exact opening.
 </p>
 </div>
 </ScrollReveal>

 <div className="grid-3" style={{ marginBottom: '32px' }}>
 {[
 { title: 'Manual GI Shutters', desc: 'Galvanised iron shutters ideal for shops, small godowns, and areas with high moisture. Cost-effective and rust-resistant.', specs: 'From ₹350/sq ft' },
 { title: 'Motorised Shutters', desc: 'Electric motor-operated shutters for convenience and security. Remote control and auto-stop features available.', specs: 'From ₹520/sq ft (MS) · ₹550/sq ft (GI)' },
 { title: 'Perforated Shutters', desc: 'Ventilated shutters with perforations, ideal for storefronts where visibility and airflow are required.', specs: 'Manual GI + 15% premium' },
 ].map((item, i) => (
 <ScrollReveal key={i} delay={i * 0.1}>
 <div className="feature-card">
 <h3 className="feature-card__title">{item.title}</h3>
 <p className="feature-card__desc" style={{ marginBottom: '12px' }}>{item.desc}</p>
 <span style={{
 display: 'inline-block',
 fontSize: '12px',
 fontWeight: '600',
 color: 'var(--color-accent)',
 background: 'var(--color-accent-light)',
 border: '1px solid rgba(184,134,11,0.2)',
 padding: '4px 10px',
 borderRadius: '4px',
 }}>
 {item.specs}
 </span>
 </div>
 </ScrollReveal>
 ))}
 </div>

 <ScrollReveal>
 <div style={{ textAlign: 'center' }}>
 <button
 className="btn btn--primary"
 onClick={() => quote('Rolling Shutters', 'Products Page, Shutter Spotlight CTA')}
 >
 Get Shutter Quote
 </button>
 </div>
 </ScrollReveal>
 </div>
 </section>
 </>
 )
}
