import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuoteModal } from '../context/QuoteModalContext'

/* ─── Constants ──────────────────────────────────────────── */
const WA_NUMBER = '918013363204'
const API_URL = '/api/leads'

const SERVICES = [
  'Rolling Shutters',
  'Motorised Shutters',
  'Metal Fabrication',
  'Toughened Glass Work',
  'Steel Railings & Grilles',
  'Retractable Awnings',
  'Repair & Maintenance',
  'General Enquiry',
]

/* ─── Build WhatsApp message ─────────────────────────────── */
function buildWAUrl({ name, phone, email, company, service, message }) {
  const lines = [
    `New Quote Request - Saloni Enterprise`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    company ? `Company: ${company}` : null,
    service ? `Service: ${service}` : null,
    message ? `Details: ${message}` : null,
  ].filter(Boolean).join('\n')
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
}

/* ─── Main Modal ─────────────────────────────────────────── */
export default function QuoteModal() {
  const { isOpen, config, closeModal } = useQuoteModal()

  const [form, setForm] = useState({
    name: '', phone: '', email: '', company: '', service: '', message: '',
  })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  /* Reset on open */
  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', phone: '', email: '', company: '', service: config.product || '', message: '' })
      setError('')
      setDone(false)
    }
  }, [isOpen, config.product])

  /* Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleChange = (e) =>
    setForm(prev => ({...prev, [e.target.name]: e.target.value }))

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const digits = form.phone.trim().replace(/\D/g, '')
    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }
    setError('')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      service: form.service || 'General Enquiry',
      message: form.message.trim(),
      sourceButton: config.sourceButton || 'Quote Form',
      pageUrl: config.pageUrl || window.location.href,
    }

    // Open WhatsApp instantly (must be synchronous to avoid popup blockers)
    window.open(buildWAUrl(payload), '_blank', 'noopener,noreferrer')

    // Show success screen
    setDone(true)

    // Save to backend silently
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {})

  }, [form, config])

  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div
      className="qm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={e => { if (e.target === e.currentTarget) closeModal() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qm-heading"
      >
      <motion.div
        className="qm-modal"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ── Header ── */}
        <div className="qm-header">
        <div className="qm-header__left">
          <div className="qm-header__eyebrow">
          <span className="qm-header__dot" aria-hidden="true" />
          FREE QUOTE REQUEST
          </div>
          <h2 className="qm-header__title" id="qm-heading">
          {done ? 'Thank You' : 'Get a Free Quote'}
          </h2>
          {!done && (
          <p className="qm-header__sub">
            Fill in your details and we will get back to you promptly.
          </p>
          )}
        </div>
        <button className="qm-header__close" onClick={closeModal} aria-label="Close dialog">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        </div>

        {/* ── Body ── */}
        <AnimatePresence mode="wait">
        {done ? (
          /* ── Professional Thank-You ── */
          <motion.div
          key="done"
          className="qm-body qm-success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          >
          <div className="qm-success__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 className="qm-success__title">Your request has been received.</h3>
          <p className="qm-success__sub">
            Our team will review your enquiry and reach out to you shortly. We appreciate you considering Saloni Enterprise.
          </p>
          <button className="qm-close-success" onClick={closeModal}>
            Close
          </button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
          key="form"
          className="qm-body"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          >
          {/* Service */}
          <div className="qm-field qm-field--full">
            <label htmlFor="qm-service" className="qm-label">
            Service Needed <span className="qm-optional">(optional)</span>
            </label>
            <select
            id="qm-service"
            name="service"
            className="qm-input qm-input--select"
            value={form.service}
            onChange={handleChange}
            >
            <option value="">Select a service</option>
            {SERVICES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
            </select>
          </div>

          {/* Name + Phone */}
          <div className="qm-field-row">
            <div className="qm-field">
            <label htmlFor="qm-name" className="qm-label">
              Full Name <span className="qm-required">*</span>
            </label>
            <input
              id="qm-name" name="name" type="text"
              className="qm-input"
              placeholder="e.g. Ramesh Kumar"
              value={form.name} onChange={handleChange}
              autoComplete="name" autoFocus
            />
            </div>
            <div className="qm-field">
            <label htmlFor="qm-phone" className="qm-label">
              Phone <span className="qm-required">*</span>
            </label>
            <input
              id="qm-phone" name="phone" type="tel"
              className="qm-input"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => {
                // Only allow digits, max 10
                const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                setForm(prev => ({ ...prev, phone: val }))
              }}
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
            />
            </div>
          </div>

          {/* Email + Company */}
          <div className="qm-field-row">
            <div className="qm-field">
            <label htmlFor="qm-email" className="qm-label">
              Email <span className="qm-optional">(optional)</span>
            </label>
            <input
              id="qm-email" name="email" type="email"
              className="qm-input"
              placeholder="you@email.com"
              value={form.email} onChange={handleChange}
              autoComplete="email"
            />
            </div>
            <div className="qm-field">
            <label htmlFor="qm-company" className="qm-label">
              Business <span className="qm-optional">(optional)</span>
            </label>
            <input
              id="qm-company" name="company" type="text"
              className="qm-input"
              placeholder="Company name"
              value={form.company} onChange={handleChange}
              autoComplete="organization"
            />
            </div>
          </div>

          {/* Message */}
          <div className="qm-field qm-field--full">
            <label htmlFor="qm-message" className="qm-label">
            Project Details <span className="qm-optional">(optional)</span>
            </label>
            <textarea
            id="qm-message" name="message"
            className="qm-input qm-input--textarea"
            placeholder="Size, quantity, timeline, any specific requirements..."
            rows={3} value={form.message} onChange={handleChange}
            style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>

          {error && (
            <div className="qm-error" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
            </div>
          )}

          {/* Submit */}
          <div className="qm-submit-row">
            <button type="submit" className="qm-submit-btn qm-submit-btn--full">
            Send Enquiry
            </button>
            <p className="qm-footer-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Your details are private and never shared.
            </p>
          </div>
          </motion.form>
        )}
        </AnimatePresence>
      </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  )
}
