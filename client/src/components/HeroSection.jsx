import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuoteModal } from '../context/QuoteModalContext'

function CheckMark() {
 return (
 <svg className="hero-v2__check-svg" viewBox="0 0 12 12" fill="none" aria-hidden="true">
 <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 )
}
function ArrowRight() {
 return (
 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
 <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 )
}

const TRUST_ITEMS = [
 'Professional Installation',
 'Fast Service & Support',
 'Quality Materials Guaranteed',
]

/* ═══════════════════════════════════════════════════════════
 REFINED 3D CANVAS, subtle, blendable, premium
 Monochromatic palette · low opacity · no glow
 Fast alpha-clear → very short trails
 ═══════════════════════════════════════════════════════════ */
function HeroCanvas() {
 const ref = useRef(null)

 useEffect(() => {
 const canvas = ref.current
 if (!canvas) return
 const ctx = canvas.getContext('2d')
 let W = 0, H = 0, cx = 0, cy = 0
 let running = true

 /* ── Resize ─────────────────────────────────────────── */
 function resize() {
 const el = canvas.parentElement
 W = el.clientWidth; H = el.clientHeight
 canvas.width = W * window.devicePixelRatio
 canvas.height = H * window.devicePixelRatio
 canvas.style.width = W + 'px'
 canvas.style.height = H + 'px'
 ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
 cx = W / 2; cy = H / 2
 }
 resize()
 const ro = new ResizeObserver(resize)
 ro.observe(canvas.parentElement)

 /* ── 3D perspective ─────────────────────────────────── */
 const FOV = 500
 function project(x, y, z, camRY, camRX) {
 const cosY = Math.cos(camRY), sinY = Math.sin(camRY)
 let rx = x * cosY + z * sinY
 let rz = -x * sinY + z * cosY
 const cosX = Math.cos(camRX), sinX = Math.sin(camRX)
 let ry = y * cosX - rz * sinX
 let rzz = y * sinX + rz * cosX
 const dz = rzz + 650
 if (dz <= 0) return null
 const scale = FOV / dz
 return { sx: cx + rx * scale, sy: cy + ry * scale, scale, dz }
 }

 /* ── 1. DRIFT PARTICLES (slow, depth-based) ─────────── */
 // Only 70 particles, very low opacity, mostly near-grey
 const PART_N = 70
 const parts = Array.from({ length: PART_N }, () => {
 const angle = Math.random() * Math.PI * 2
 const dist = 40 + Math.random() * 320
 return {
 ox: Math.cos(angle) * dist,
 oy: Math.sin(angle) * dist,
 z: Math.random() * 800 - 100,
 speed: 0.8 + Math.random() * 1.8, // slower
 r: 0.6 + Math.random() * 1.0,
 // mostly slate, tiny fraction warm
 warm: Math.random() > 0.82,
 prevSx: null, prevSy: null,
 }
 })

 /* ── 2. ONE slim wireframe ring (torus) ─────────────── */
 // Just one, very thin, barely visible
 function makeTorus(R, r, segsR, segsr) {
 const verts = []
 for (let i = 0; i < segsR; i++)
 for (let j = 0; j < segsr; j++) {
 const u = (i / segsR) * Math.PI * 2
 const v = (j / segsr) * Math.PI * 2
 verts.push({
 bx: (R + r * Math.cos(v)) * Math.cos(u),
 by: (R + r * Math.cos(v)) * Math.sin(u),
 bz: r * Math.sin(v),
 })
 }
 return { verts, segsR, segsr, R, r, rx: 0, ry: 0, rz: 0 }
 }

 const tor = {...makeTorus(110, 20, 32, 10), speedX: 0.004, speedY: 0.007, speedZ: 0.003 }

 function getTorusVert(t, idx) {
 let { bx, by, bz } = t.verts[idx]
 let tmp
 // X rotation
 tmp = by * Math.cos(t.rx) - bz * Math.sin(t.rx)
 bz = by * Math.sin(t.rx) + bz * Math.cos(t.rx)
 by = tmp
 // Y rotation
 tmp = bx * Math.cos(t.ry) + bz * Math.sin(t.ry)
 bz = -bx * Math.sin(t.ry) + bz * Math.cos(t.ry)
 bx = tmp
 // Z rotation
 tmp = bx * Math.cos(t.rz) - by * Math.sin(t.rz)
 by = bx * Math.sin(t.rz) + by * Math.cos(t.rz)
 bx = tmp
 // Offset to top-right area (behind text)
 return { x: bx - 80, y: by - 60, z: bz - 40 }
 }

 /* ── 3. PERSPECTIVE GRID (sparse, very dim) ─────────── */
 const GCOLS = 14, GROWS = 9
 const GSPREAD_X = 1000, GSPREAD_Z = 700

 /* ── Animation loop ─────────────────────────────────── */
 let t = 0
 let camRY = 0, camRX = 0

 function tick() {
 if (!running) return
 t++
 camRY += 0.0015 // very slow camera orbit
 camRX = Math.sin(t * 0.006) * 0.07 // gentle bob

 /* Fast alpha clear → very short trails, clean look */
 ctx.fillStyle = 'rgba(248,250,252,0.40)'
 ctx.fillRect(0, 0, W, H)

 /* ── GRID ── */
 const gridT = t * 0.012
 ctx.save()
 ctx.strokeStyle = 'rgba(100,116,139,0.07)' // slate-500 very dim
 ctx.lineWidth = 0.7

 // horizontal passes
 for (let row = 0; row <= GROWS; row++) {
 const fRow = row / GROWS
 const worldY = 200
 const worldZ = (fRow - 0.5) * GSPREAD_Z
 ctx.beginPath(); let fp = true
 for (let col = 0; col <= GCOLS; col++) {
 const fCol = col / GCOLS
 const wX = (fCol - 0.5) * GSPREAD_X
 const wY = worldY + Math.sin(fCol * 3.5 + gridT) * 20 + Math.sin(fRow * 2.5 + gridT * 0.6) * 12
 const p = project(wX, wY, worldZ, camRY, camRX)
 if (!p) { fp = true; continue }
 fp ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)
 fp = false
 }
 ctx.stroke()
 }

 // vertical passes
 for (let col = 0; col <= GCOLS; col++) {
 const fCol = col / GCOLS
 const wX = (fCol - 0.5) * GSPREAD_X
 ctx.beginPath(); let fp = true
 for (let row = 0; row <= GROWS; row++) {
 const fRow = row / GROWS
 const wZ = (fRow - 0.5) * GSPREAD_Z
 const wY = 200 + Math.sin(fCol * 3.5 + gridT) * 20 + Math.sin(fRow * 2.5 + gridT * 0.6) * 12
 const p = project(wX, wY, wZ, camRY, camRX)
 if (!p) { fp = true; continue }
 fp ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)
 fp = false
 }
 ctx.stroke()
 }
 ctx.restore()

 /* ── TORUS ── */
 tor.rx += tor.speedX; tor.ry += tor.speedY; tor.rz += tor.speedZ
 const { segsR, segsr } = tor
 ctx.save()
 for (let i = 0; i < segsR; i++) {
 for (let j = 0; j < segsr; j++) {
 const iA = i * segsr + j
 const iB = ((i + 1) % segsR) * segsr + j
 const iC = i * segsr + (j + 1) % segsr
 const vA = getTorusVert(tor, iA)
 const vB = getTorusVert(tor, iB)
 const vC = getTorusVert(tor, iC)
 const pA = project(vA.x, vA.y, vA.z, camRY, camRX)
 const pB = project(vB.x, vB.y, vB.z, camRY, camRX)
 const pC = project(vC.x, vC.y, vC.z, camRY, camRX)
 if (!pA || !pB || !pC) continue
 const a = Math.min(0.10, 60 / pA.dz) // very dim
 ctx.globalAlpha = a
 ctx.strokeStyle = '#94a3b8' // slate-400 neutral
 ctx.lineWidth = 0.6
 ctx.beginPath(); ctx.moveTo(pA.sx, pA.sy); ctx.lineTo(pB.sx, pB.sy); ctx.stroke()
 ctx.beginPath(); ctx.moveTo(pA.sx, pA.sy); ctx.lineTo(pC.sx, pC.sy); ctx.stroke()
 }
 }
 ctx.globalAlpha = 1
 ctx.restore()

 /* ── PARTICLES ── */
 for (const p of parts) {
 p.z -= p.speed
 if (p.z < -300) { p.z = 800; p.prevSx = null; p.prevSy = null }

 const proj = project(p.ox, p.oy, p.z, camRY, camRX)
 if (!proj) { p.prevSx = null; continue }

 const { sx, sy, scale } = proj
 const depthFade = Math.max(0, Math.min(1, (1 - p.z / 800)))
 const alpha = depthFade * 0.18 // very low opacity

 // Short trail line
 if (p.prevSx !== null) {
 ctx.save()
 ctx.globalAlpha = alpha * 0.5
 ctx.strokeStyle = p.warm ? 'rgba(180,145,60,1)' : 'rgba(71,85,105,1)' // warm gold or slate-600
 ctx.lineWidth = p.r * scale * 1.8
 ctx.lineCap = 'round'
 ctx.beginPath()
 ctx.moveTo(p.prevSx, p.prevSy)
 ctx.lineTo(sx, sy)
 ctx.stroke()
 ctx.restore()
 }

 // Dot
 ctx.save()
 ctx.globalAlpha = alpha
 ctx.fillStyle = p.warm ? 'rgba(180,145,60,1)' : 'rgba(71,85,105,1)'
 ctx.beginPath()
 ctx.arc(sx, sy, Math.max(0.4, p.r * scale * 2), 0, Math.PI * 2)
 ctx.fill()
 ctx.restore()

 p.prevSx = sx; p.prevSy = sy
 }

 ctx.globalAlpha = 1
 requestAnimationFrame(tick)
 }

 requestAnimationFrame(tick)
 return () => { running = false; ro.disconnect() }
 }, [])

 return (
 <canvas
 ref={ref}
 aria-hidden="true"
 style={{
 position: 'absolute',
 inset: 0,
 width: '100%',
 height: '100%',
 pointerEvents: 'none',
 zIndex: 0,
 }}
 />
 )
}

/* ─── Count-up hook ──────────────────────────────────────── */
function useCountUp(target, duration = 1600, started = false) {
 const [count, setCount] = useState(0)
 const raf = useRef(null)
 useEffect(() => {
 if (!started) return
 const t0 = performance.now()
 const step = (now) => {
 const p = Math.min((now - t0) / duration, 1)
 setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
 if (p < 1) raf.current = requestAnimationFrame(step)
 else setCount(target)
 }
 raf.current = requestAnimationFrame(step)
 return () => cancelAnimationFrame(raf.current)
 }, [target, duration, started])
 return count
}

function StatCard({ target, suffix, label, className, initial, animate, transition, started }) {
 const display = useCountUp(target, 1600, started)
 return (
 <motion.div className={`stat-glass ${className}`} initial={initial} animate={animate} transition={transition}>
 <div className="stat-glass__number">{display.toLocaleString('en-IN')}<span className="stat-glass__suffix">{suffix}</span></div>
 <div className="stat-glass__label">{label}</div>
 </motion.div>
 )
}

const fadeUp = {
 hidden: { opacity: 0, y: 24 },
 visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] } }),
}
const fadeRight = {
 hidden: { opacity: 0, x: 36 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function HeroSection() {
 const { openModal } = useQuoteModal()
 const [statsStarted, setStatsStarted] = useState(false)

 useEffect(() => {
 const t = setTimeout(() => setStatsStarted(true), 500)
 return () => clearTimeout(t)
 }, [])

 const handleQuote = () =>
 openModal({ product: '', sourceButton: 'Hero, Request a Quote', pageUrl: window.location.href })

 return (
 <section className="hero-v2" id="home" aria-label="Hero Section">
 <HeroCanvas />

 <div className="hero-v2__container">
 <div className="hero-v2__content">
 <motion.h1 className="hero-v2__headline" initial="hidden" animate="visible" custom={0} variants={fadeUp}>
 Bengal's Trusted
 <br />Solutions for
 <br /><span className="hero-v2__headline-accent">Shutter &amp; Fabrication</span>
 </motion.h1>

 <motion.p className="hero-v2__sub" initial="hidden" animate="visible" custom={0.12} variants={fadeUp}>
 At Saloni Enterprise, we deliver durable, premium-quality sales and service of all types of fabrication for residential, commercial, and industrial projects.
 </motion.p>

 <motion.div className="hero-v2__actions" initial="hidden" animate="visible" custom={0.22} variants={fadeUp}>
 <button className="btn-hero-primary" onClick={handleQuote}>
 Request a Quote <ArrowRight />
 </button>
 <a href="#services" className="btn-hero-secondary"
 onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>
 Explore Services
 </a>
 </motion.div>

 <motion.div className="hero-v2__trust" initial="hidden" animate="visible" custom={0.32} variants={fadeUp}>
 {TRUST_ITEMS.map(item => (
 <div className="hero-v2__trust-item" key={item}>
 <span className="hero-v2__trust-check"><CheckMark /></span>
 <span className="hero-v2__trust-label">{item}</span>
 </div>
 ))}
 </motion.div>
 </div>

 <motion.div className="hero-v2__visual" initial="hidden" animate="visible" variants={fadeRight}>
 <div className="hero-v2__image-wrap">
<img
  src="/homepage.png"
  alt="Premium steel fabrication facility"
  className="hero-v2__image"
  loading="eager"
/>
 <div className="hero-v2__image-overlay" aria-hidden="true" />
 </div>
 <StatCard target={14} suffix="+" label="Years of Experience" className="stat-glass--tl"
 initial={{ opacity: 0, scale: 0.85, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
 transition={{ duration: 0.55, delay: 0.5 }} started={statsStarted} />
 <StatCard target={2200} suffix="+" label="Projects Delivered" className="stat-glass--br"
 initial={{ opacity: 0, scale: 0.85, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
 transition={{ duration: 0.55, delay: 0.62 }} started={statsStarted} />
 <StatCard target={1500} suffix="+" label="Happy Customers" className="stat-glass--bl"
 initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
 transition={{ duration: 0.55, delay: 0.74 }} started={statsStarted} />
 </motion.div>
 </div>
 </section>
 )
}
