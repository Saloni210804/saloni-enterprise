import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FaqAccordion({ faqs }) {
 const [openId, setOpenId] = useState(null)

 const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

 return (
 <div className="faq__list">
 {faqs.map((faq) => {
 const isOpen = openId === faq.id
 return (
 <div className={`faq__item${isOpen ? ' open' : ''}`} key={faq.id}>
 <button
 className="faq__question"
 onClick={() => toggle(faq.id)}
 aria-expanded={isOpen}
 >
 <span>{faq.question}</span>
 <span className="faq__icon">+</span>
 </button>
 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 key="answer"
 className="faq__answer"
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
 >
 <p style={{ paddingBottom: '20px', fontSize: '15px', color: 'var(--color-text)', lineHeight: '1.8' }}>
 {faq.answer}
 </p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )
 })}
 </div>
 )
}
