import { useState } from 'react'
import { useQuoteModal } from '../context/QuoteModalContext'

// Pricing logic (per sq ft):
// Manual GI: ₹350
// Manual MS: ₹320
// Motorised GI: ₹550
// Motorised MS: ₹520
// Perforated: Manual GI + 15%
// Range: ±10% of calculated value

const RATES = {
 'Manual GI': 350,
 'Manual MS': 320,
 'Motorised GI': 550,
 'Motorised MS': 520,
 'Perforated': null, // computed below
}

const SHUTTER_TYPES = [
 'Manual GI',
 'Manual MS',
 'Motorised GI',
 'Motorised MS',
 'Perforated',
]

function formatINR(n) {
 return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function ShutterEstimator() {
 const { openModal } = useQuoteModal()

 const [width, setWidth] = useState('')
 const [height, setHeight] = useState('')
 const [type, setType] = useState('Manual GI')
 const [result, setResult] = useState(null)
 const [error, setError] = useState('')

 const calculate = () => {
 const w = parseFloat(width)
 const h = parseFloat(height)
 if (!w || !h || w <= 0 || h <= 0) {
 setError('Please enter valid width and height in feet.')
 setResult(null)
 return
 }
 setError('')

 const area = w * h
 const baseRate = type === 'Perforated'
 ? RATES['Manual GI'] * 1.15
 : RATES[type]

 const mid = area * baseRate
 const low = mid * 0.9
 const high = mid * 1.1

 setResult({ low, high, area: `${w} ft × ${h} ft`, type })
 }

 const handleKey = (e) => { if (e.key === 'Enter') calculate() }

 const handleConfirmedQuote = () => {
 if (!result) return
 const prefillMsg = `Shutter size: ${result.area} | Type: ${result.type} | Estimated range: ${formatINR(result.low)} – ${formatINR(result.high)}`
 openModal({
 product: 'Rolling Shutters',
 sourceButton: `Shutter Estimator, Confirmed Quote (${result.type}, ${result.area})`,
 pageUrl: window.location.href,
 })
 }

 return (
 <div className="estimator__box">
 <div className="estimator__form">
 <div className="form-group">
 <label htmlFor="shutter-width">Width (in feet)</label>
 <input
 id="shutter-width"
 type="number"
 min="1"
 max="100"
 placeholder="e.g. 10"
 value={width}
 onChange={(e) => setWidth(e.target.value)}
 onKeyDown={handleKey}
 />
 </div>
 <div className="form-group">
 <label htmlFor="shutter-height">Height (in feet)</label>
 <input
 id="shutter-height"
 type="number"
 min="1"
 max="50"
 placeholder="e.g. 8"
 value={height}
 onChange={(e) => setHeight(e.target.value)}
 onKeyDown={handleKey}
 />
 </div>
 <div className="form-group form-group--full">
 <label htmlFor="shutter-type">Shutter Type</label>
 <select
 id="shutter-type"
 value={type}
 onChange={(e) => setType(e.target.value)}
 >
 {SHUTTER_TYPES.map((t) => (
 <option key={t} value={t}>{t}</option>
 ))}
 </select>
 </div>
 </div>

 {error && (
 <p style={{ color: 'var(--color-error)', fontSize: '14px', marginBottom: '12px' }}>
 ⚠️ {error}
 </p>
 )}

 <button
 className="btn btn--primary w-full"
 onClick={calculate}
 style={{ justifyContent: 'center' }}
 >
 Calculate Estimate
 </button>

 {result && (
 <div className="estimator__result" style={{ marginTop: '20px' }}>
 <div className="estimator__result-range">
 Estimated range: {formatINR(result.low)} – {formatINR(result.high)}
 </div>
 <p className="estimator__result-note">
 This is indicative only. Actual price depends on site conditions and finishing.
 </p>
 <button
 className="btn btn--primary"
 onClick={handleConfirmedQuote}
 style={{ marginTop: '16px', justifyContent: 'center', width: '100%' }}
 >
 📋 Get a Confirmed Quote for This Size
 </button>
 </div>
 )}
 </div>
 )
}
