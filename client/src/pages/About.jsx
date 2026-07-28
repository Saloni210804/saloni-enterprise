import { useQuoteModal } from '../context/QuoteModalContext'
import ScrollReveal from '../components/ScrollReveal'
import SectionLabel from '../components/SectionLabel'

const YEAR = '[YEAR]'
const GSTIN = '[Your GSTIN]'

export default function About() {
 const { openModal } = useQuoteModal()

 const quote = (source) =>
 openModal({ product: '', sourceButton: source, pageUrl: window.location.href })

 return (
 <>
 <section className="page-hero">
 <span className="page-hero__eyebrow">WHO WE ARE</span>
 <h1 className="page-hero__headline">A Steel Business Built on Trust</h1>
 <p className="page-hero__sub">
 Serving contractors, builders, and shop owners for over 15 years.
 </p>
 </section>

 {/* About Main */}
 <section className="section">
 <div className="container">
 <div className="about__inner">
 <ScrollReveal>
 <div className="about__text">
 <SectionLabel text="WHO WE ARE" />
 <h2 className="section-headline">
 A Steel Business Built on Trust, Not Just Transactions
 </h2>
 <p>
 [Your Business Name] was founded in {YEAR} with one belief: that contractors,
 builders, and business owners in deserve a steel supplier they can
 actually rely on. One that picks up the phone, delivers when promised, and
 doesn't cut corners on quality.
 </p>
 <p>
 From a single shop in , we've grown into one of '
 most trusted steel stockists, serving over 1,200 customers.
 We stock products from India's top steel mills and have a team experienced in
 rolling shutter fabrication, shed construction, and site delivery logistics.
 </p>
 <div className="about__pills">
 <span className="pill">Est. {YEAR}</span>
 <span className="pill">GST Registered: {GSTIN}</span>
 <span className="pill">✓ Authorised Stockist</span>
 </div>
 </div>
 </ScrollReveal>

 <ScrollReveal delay={0.15}>
 <div className="about__visual">
 {[
 { num: '15+', lbl: 'Years of trusted steel supply' },
 { num: '1,200+', lbl: 'Happy customers served' },
 { num: '8', lbl: 'Districts ' },
 { num: '5,000+', lbl: 'Tonnes of steel supplied' },
 ].map((s, i) => (
 <div key={i}>
 <div className="about__stat-num">{s.num}</div>
 <div className="about__stat-lbl">{s.lbl}</div>
 {i < 3 && <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '20px' }} />}
 </div>
 ))}
 </div>
 </ScrollReveal>
 </div>
 </div>
 </section>

 {/* Values */}
 <section className="section section--surface">
 <div className="container">
 <ScrollReveal>
 <div className="section-header section-header--center">
 <SectionLabel text="OUR VALUES" />
 <h2 className="section-headline">What We Stand For</h2>
 </div>
 </ScrollReveal>

 <div className="grid-3">
 {[
 { icon: '🤝', title: 'Reliability First', desc: 'We do what we say. When we commit to a delivery date or a price, we honour it, no excuses.' },
 { icon: '🏆', title: 'Quality Without Compromise', desc: 'Every product we supply is sourced from certified mills. No sub-standard material leaves our yard.' },
 { icon: '📞', title: 'Always Reachable', desc: "We answer our phones and WhatsApp messages. You won't be left waiting for a response when your project is on the line." },
 { icon: '💡', title: 'Expert Guidance', desc: 'Our team helps you pick the right product for your project, not just the most expensive one.' },
 { icon: '🌍', title: 'Local Knowledge', desc: "We know's terrain, climate, and construction needs better than any distant supplier." },
 { icon: '📄', title: 'Full Documentation', desc: 'Mill test certificates, GST invoices, and delivery challans, all provided as standard.' },
 ].map((v, i) => (
 <ScrollReveal key={i} delay={i * 0.07}>
 <div className="feature-card">
 <div className="feature-card__icon">{v.icon}</div>
 <h3 className="feature-card__title">{v.title}</h3>
 <p className="feature-card__desc">{v.desc}</p>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="section section--navy" style={{ textAlign: 'center' }}>
 <div className="container">
 <ScrollReveal>
 <SectionLabel text="GET STARTED" />
 <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
 Ready to Work With Us?
 </h2>
 <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
 Call us, WhatsApp us, or fill in our quick quote form. We respond fast, your
 project won't wait.
 </p>
 <button
 className="btn btn--accent"
 onClick={() => quote('About Page, Ready to Work With Us CTA')}
 >
 📋 Request a Free Quote
 </button>
 </ScrollReveal>
 </div>
 </section>
 </>
 )
}
