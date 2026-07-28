import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const variants = {
 hidden: { opacity: 0, y: 28 },
 visible: { opacity: 1, y: 0 },
}

export default function ScrollReveal({
 children,
 delay = 0,
 duration = 0.55,
 className = '',
}) {
 const ref = useRef(null)
 const isInView = useInView(ref, { once: true, margin: '-60px' })

 return (
 <motion.div
 ref={ref}
 className={className}
 initial="hidden"
 animate={isInView ? 'visible' : 'hidden'}
 variants={variants}
 transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
 >
 {children}
 </motion.div>
 )
}
