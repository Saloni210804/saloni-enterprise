import { useQuoteModal } from '../context/QuoteModalContext'

const PHONE = '+918013363204'
const WHATSAPP_LINK = 'https://wa.me/918013363204?text=Hi%2C+I%27d+like+to+enquire+about+your+services.'

export default function FloatingBar() {
 const { openModal } = useQuoteModal()

 return (
 <div className="floating-bar">
 <a href={`tel:${PHONE}`} className="floating-bar__btn floating-bar__call">
 ?? Call
 </a>
 <button
 className="floating-bar__btn floating-bar__whatsapp"
 onClick={() =>
 openModal({ product: '', sourceButton: 'Mobile Floating Bar, WhatsApp', pageUrl: window.location.href })
 }
 >
 ?? Get Quote
 </button>
 </div>
 )
}
