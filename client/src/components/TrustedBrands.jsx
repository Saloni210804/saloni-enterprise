import { motion } from 'framer-motion'

/* ============================================================
 TRUSTED BRANDS — tb-
 Infinite scrolling logo strip with real brand PNGs
 ============================================================ */

const BRANDS = [
  {
    id: 'sail',
    name: 'SAIL Steel',
    logo: <img src="/sailsteel.png" alt="SAIL Steel" style={{ width: '130px', height: '55px', objectFit: 'contain' }} />,
  },
  {
    id: 'tata-steel',
    name: 'Tata Steel',
    logo: <img src="/tatasteel.png" alt="Tata Steel" style={{ width: '130px', height: '55px', objectFit: 'contain' }} />,
  },
  {
    id: 'jsw',
    name: 'JSW Steel',
    logo: <img src="/jsw steel.png" alt="JSW Steel" style={{ width: '130px', height: '55px', objectFit: 'contain' }} />,
  },
  {
    id: 'jindal',
    name: 'Jindal Steel',
    logo: <img src="/jindal.png" alt="Jindal Steel" style={{ width: '130px', height: '55px', objectFit: 'contain' }} />,
  },
  {
    id: 'saint-gobain',
    name: 'Saint-Gobain',
    logo: <img src="/saint.png" alt="Saint-Gobain" style={{ width: '130px', height: '55px', objectFit: 'contain' }} />,
  },
]

/* ─── Animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

/* ─── Main section ───────────────────────────────────────── */
export default function TrustedBrands() {
  // Triplicate for a seamless infinite scroll with only 5 brands
  const duplicated = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <section className="tb-section" aria-label="Trusted Brands We Work With">
      <div className="tb-surface" aria-hidden="true" />

      <div className="tb-container">
        <motion.div
          className="tb-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div className="tb-eyebrow" variants={fadeUp} custom={0}>
            <span className="tb-eyebrow__line" aria-hidden="true" />
            TRUSTED BRANDS
            <span className="tb-eyebrow__line tb-eyebrow__line--r" aria-hidden="true" />
          </motion.div>

          <motion.h2 className="tb-title" variants={fadeUp} custom={0.08}>
            Powered by Industry-Leading Brands
          </motion.h2>

          <motion.p className="tb-desc" variants={fadeUp} custom={0.16}>
            We work with trusted manufacturers and quality material suppliers to deliver
            durable, reliable, and long-lasting fabrication and shutter solutions.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="tb-marquee-outer"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="tb-marquee" role="list" aria-label="Brand logos">
          <div className="tb-track">
            {duplicated.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="tb-logo-item"
                title={brand.name}
                role="listitem"
                aria-label={brand.name}
              >
                <div className="tb-logo-inner">{brand.logo}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="tb-shine" aria-hidden="true" />
      </motion.div>
    </section>
  )
}
