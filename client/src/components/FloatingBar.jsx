import { useQuoteModal } from '../context/QuoteModalContext'

const PHONE = '[Your Phone Number]'
const WHATSAPP_LINK = 'https://wa.me/91XXXXXXXXXX'

export default function FloatingBar() {
 const { openModal } = useQuoteModal()

 return (
 <div className="floating-bar">
 <a href={`tel:${PHONE}`} className="floating-bar__btn floating-bar__call">
 📞 Call
 </a>
 <button
 className="floating-bar__btn floating-bar__whatsapp"
 onClick={() =>
 openModal({ product: '', sourceButton: 'Mobile Floating Bar, WhatsApp', pageUrl: window.location.href })
 }
 >
 💬 Get Quote
 </button>
 </div>
 )
}
