import { motion } from 'framer-motion'

const CLIENTS = [
  { name: 'GKW Limited',              logo: '/gkw.png'                   },
  { name: 'CDE Asia Ltd.',            logo: '/cde.png'                   },
  { name: 'Cflo World Limited',       logo: '/cflo.png'                  },
  { name: 'South Eastern Railway',    logo: '/south eastern railway.png' },
  { name: 'Shalimar Construction',    logo: '/shalimar.png'              },
  { name: 'Ascon Infrastructure Ltd.',logo: '/ascon.png'                 },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function ClientsSection() {
  return (
    <section className="cs-section" aria-label="Our Clients">
      <div className="cs-container">

        {/* Header */}
        <motion.div
          className="cs-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="cs-eyebrow" variants={fadeUp} custom={0}>
            TRUSTED BY
          </motion.div>
          <motion.h2 className="cs-heading" variants={fadeUp} custom={0.07}>
            Companies That Trust Us
          </motion.h2>
          <motion.p className="cs-desc" variants={fadeUp} custom={0.14}>
            Leading organisations across India rely on Saloni Enterprise for quality fabrication and installation.
          </motion.p>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          className="cs-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              className="cs-card"
              variants={fadeUp}
              custom={i * 0.06}
            >
              <div className="cs-card__img-wrap">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="cs-card__img"
                  loading="lazy"
                />
              </div>
              <p className="cs-card__name">{client.name}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
