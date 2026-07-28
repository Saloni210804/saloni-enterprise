import { useQuoteModal } from '../context/QuoteModalContext'
import ScrollReveal from '../components/ScrollReveal'
import SectionLabel from '../components/SectionLabel'
import GalleryGrid from '../components/GalleryGrid'
import { galleryItems } from '../data/gallery'

export default function Gallery() {
 const { openModal } = useQuoteModal()

 const quote = (source) =>
 openModal({ product: '', sourceButton: source, pageUrl: window.location.href })

 return (
 <>
 <section className="page-hero">
 <span className="page-hero__eyebrow">OUR WORK</span>
 <h1 className="page-hero__headline">Projects We're Proud Of</h1>
 <p className="page-hero__sub">
  Real installations. Real customers. Real results.
 </p>
 </section>

 <section className="section">
 <div className="container">
 <ScrollReveal>
 <div className="section-header section-header--center">
 <SectionLabel text="OUR WORK" />
 <h2 className="section-headline">Projects We're Proud Of</h2>
 <p className="section-sub">Real installations. Real customers. Real results.</p>
 </div>
 </ScrollReveal>

 <ScrollReveal><GalleryGrid /></ScrollReveal>

 {/* Project details */}
 <div style={{ marginTop: '48px' }}>
 <ScrollReveal>
 <div className="section-header section-header--center">
 <SectionLabel text="PROJECT DETAILS" />
 <h2 className="section-headline">Every Job, Done Right</h2>
 </div>
 </ScrollReveal>
 <div className="grid-2">
 {galleryItems.map((item, i) => (
 <ScrollReveal key={item.id} delay={i * 0.08}>
 <div className="feature-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
 <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
 {item.emoji}
 </div>
 <div>
 <h3 className="feature-card__title" style={{ fontSize: '16px' }}>{item.caption}</h3>
 <p className="feature-card__desc" style={{ fontSize: '13px', marginTop: '4px' }}>Installation completed. Customer satisfied.</p>
 </div>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>

 <ScrollReveal>
 <div style={{ textAlign: 'center', marginTop: '48px' }}>
 <p style={{ fontSize: '16px', color: 'var(--color-muted)', marginBottom: '20px' }}>
 These could be your premises next.
 </p>
 <button
 className="btn btn--primary"
 onClick={() => quote('Gallery Page, Get a Free Quote CTA')}
 >
 Get a Free Quote
 </button>
 </div>
 </ScrollReveal>
 </div>
 </section>
 </>
 )
}
