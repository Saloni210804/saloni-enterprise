import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useQuoteModal } from '../context/QuoteModalContext'

const PHONE_DISPLAY = '+91 80133 63204'
const PHONE_RAW = '+918013363204'

const NAV_LINKS = [
  { to: '/',          label: 'Home',     hash: '' },
  { to: '/#about',    label: 'About Us', hash: 'about' },
  { to: '/#services', label: 'Services', hash: 'services' },
  { to: '/#projects', label: 'Projects', hash: 'projects' },
  { to: '/#faq',      label: 'FAQ',      hash: 'faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { openModal }             = useQuoteModal()
  const navigate                  = useNavigate()
  const location                  = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => { if (!e.target.closest('.navbar-px')) setMenuOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  const handleQuote = () => {
    setMenuOpen(false)
    openModal({
      product: '',
      sourceButton: 'Navbar, Get a Quote',
      pageUrl: window.location.href,
    })
  }

  /**
   * Smart nav click:
   * – On home page   → smooth scroll to section
   * – On other pages → navigate to /#hash, then scroll after render
   */
  const handleNavClick = (e, link) => {
    setMenuOpen(false)
    if (!link.hash) return // plain home link — let router handle it

    e.preventDefault()
    const isHome = location.pathname === '/'

    if (isHome) {
      const el = document.getElementById(link.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate home then scroll
      navigate('/')
      // Use a brief timeout so the page mounts before scrolling
      setTimeout(() => {
        const el = document.getElementById(link.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    }
  }

  return (
    <header className={`navbar-px${scrolled ? ' navbar-px--scrolled' : ''}`}>
    <div className="navbar-px__inner">

      {/* ── Logo ──────────────────────────────────────────── */}
      <Link to="/" className="navbar-px__logo" onClick={() => setMenuOpen(false)}>
      <img
        src="/logo-full.png"
        alt="Saloni Enterprise"
        className="navbar-px__logo-img"
      />
      </Link>

      {/* ── Desktop Nav ───────────────────────────────────── */}
      <nav className="navbar-px__nav" aria-label="Main navigation">
      <ul className="navbar-px__links">
        {NAV_LINKS.map((l) => (
        <li key={l.to}>
          <a
          href={l.to}
          className="navbar-px__link"
          onClick={(e) => handleNavClick(e, l)}
          >
          {l.label}
          </a>
        </li>
        ))}
      </ul>
      </nav>

      {/* ── Right actions ─────────────────────────────────── */}
      <div className="navbar-px__right">
      <a href={`tel:${PHONE_RAW}`} className="navbar-px__phone">
        {PHONE_DISPLAY}
      </a>
      <button className="navbar-px__cta" onClick={handleQuote}>
        Get a Quote
      </button>

      {/* Hamburger */}
      <button
        className={`navbar-px__hamburger${menuOpen ? ' navbar-px__hamburger--open' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      </div>
    </div>

    {/* ── Mobile drawer ─────────────────────────────────────── */}
    {menuOpen && (
      <nav className="navbar-px__drawer" aria-label="Mobile navigation">
      {NAV_LINKS.map((l) => (
        <a
        key={l.to}
        href={l.to}
        className="navbar-px__drawer-link"
        onClick={(e) => handleNavClick(e, l)}
        >
        {l.label}
        </a>
      ))}
      <button className="navbar-px__cta navbar-px__cta--drawer" onClick={handleQuote}>
        Get a Quote
      </button>
      </nav>
    )}
    </header>
  )
}
