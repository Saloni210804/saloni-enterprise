import { motion, AnimatePresence } from 'framer-motion'
import { useQuoteModal } from '../context/QuoteModalContext'

export default function Toast() {
 const { toast, dismissToast } = useQuoteModal()

 return (
 <div className="toast-container">
 <AnimatePresence>
 {toast && (
 <motion.div
 className={`toast toast--${toast.type}`}
 initial={{ opacity: 0, x: 60, scale: 0.9 }}
 animate={{ opacity: 1, x: 0, scale: 1 }}
 exit={{ opacity: 0, x: 60, scale: 0.9 }}
 transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
 role="alert"
 >
 <div className="toast__icon">
 {toast.type === 'success' ? '✅' : '❌'}
 </div>
 <div className="toast__body">
 <div className="toast__title">{toast.title}</div>
 {toast.msg && <div className="toast__msg">{toast.msg}</div>}
 </div>
 <button
 onClick={dismissToast}
 style={{
 background: 'none',
 border: 'none',
 color: 'rgba(255,255,255,0.5)',
 cursor: 'pointer',
 fontSize: '14px',
 padding: '4px',
 flexShrink: 0,
 }}
 aria-label="Dismiss notification"
 >
 ✕
 </button>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )
}
