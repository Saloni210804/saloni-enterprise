import { useQuoteModal } from '../context/QuoteModalContext'

export default function ProductCard({ product }) {
 const { name, emoji, color, description, specs, btnLabel } = product
 const { openModal } = useQuoteModal()

 const handleQuote = () => {
 openModal({
 product: name,
 sourceButton: `Product Card, ${btnLabel}`,
 pageUrl: window.location.href,
 })
 }

 return (
 <div className="product-card">
 <div className="product-card__image" style={{ background: color }}>
 <span style={{ fontSize: '52px' }}>{emoji}</span>
 </div>
 <div className="product-card__body">
 <h3 className="product-card__title">{name}</h3>
 <p className="product-card__desc">{description}</p>
 <div className="product-card__specs">{specs}</div>
 <button
 onClick={handleQuote}
 className="btn btn--primary w-full"
 style={{ justifyContent: 'center', marginTop: 'auto' }}
 >
 {btnLabel}
 </button>
 </div>
 </div>
 )
}
