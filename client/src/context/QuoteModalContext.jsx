import { createContext, useContext, useState, useCallback, useRef } from 'react'

const QuoteModalContext = createContext(null)

export function QuoteModalProvider({ children }) {
 // Modal state
 const [isOpen, setIsOpen] = useState(false)
 const [config, setConfig] = useState({ product: '', sourceButton: '', pageUrl: '' })

 // Toast state
 const [toast, setToast] = useState(null) // { type: 'success'|'error', title, msg }
 const toastTimer = useRef(null)

 const openModal = useCallback((cfg = {}) => {
 setConfig({
 product: cfg.product || '',
 sourceButton: cfg.sourceButton || 'Unknown CTA',
 pageUrl: cfg.pageUrl || window.location.href,
 })
 setIsOpen(true)
 }, [])

 const closeModal = useCallback(() => {
 setIsOpen(false)
 }, [])

 const showToast = useCallback((toastData) => {
 setToast(toastData)
 if (toastTimer.current) clearTimeout(toastTimer.current)
 toastTimer.current = setTimeout(() => setToast(null), 4500)
 }, [])

 const dismissToast = useCallback(() => {
 setToast(null)
 if (toastTimer.current) clearTimeout(toastTimer.current)
 }, [])

 return (
 <QuoteModalContext.Provider
 value={{ isOpen, config, openModal, closeModal, toast, showToast, dismissToast }}
 >
 {children}
 </QuoteModalContext.Provider>
 )
}

export function useQuoteModal() {
 const ctx = useContext(QuoteModalContext)
 if (!ctx) throw new Error('useQuoteModal must be used within QuoteModalProvider')
 return ctx
}
