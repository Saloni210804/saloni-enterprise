import { useEffect, useRef, useState } from 'react'

const stats = [
 { value: 20, suffix: '+', label: 'Years in Business' },
 { value: 100, suffix: '%', label: 'Customer Satisfaction Focused' },
 { value: 8, suffix: '+', label: 'Districts Served' },
 { value: 10, suffix: '+', label: 'Specialized Solutions' },
]

export default function TrustBar() {
 const [counts, setCounts] = useState(stats.map(() => 0))
 const [started, setStarted] = useState(false)
 const sectionRef = useRef(null)

 useEffect(() => {
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting && !started) {
 setStarted(true)
 }
 },
 { threshold: 0.4 }
 )

 if (sectionRef.current) {
 observer.observe(sectionRef.current)
 }

 return () => observer.disconnect()
 }, [started])

 useEffect(() => {
 if (!started) return

 stats.forEach((stat, index) => {
 let start = 0
 const duration = 1800
 const increment = stat.value / (duration / 16)

 const timer = setInterval(() => {
 start += increment

 if (start >= stat.value) {
 start = stat.value
 clearInterval(timer)
 }

 setCounts(prev => {
 const updated = [...prev]
 updated[index] = Math.floor(start)
 return updated
 })
 }, 16)
 })
 }, [started])

 return (
 <section className="trust-bar" ref={sectionRef}>
 <div className="trust-bar__grid">
 {stats.map((stat, index) => (
 <div className="trust-bar__item" key={index}>
 <div className="trust-bar__number">
 {counts[index]}
 {stat.suffix}
 </div>
 <div className="trust-bar__label">
 {stat.label}
 </div>
 </div>
 ))}
 </div>
 </section>
 )
}