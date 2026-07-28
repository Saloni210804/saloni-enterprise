import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { QuoteModalProvider } from './context/QuoteModalContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingBar from './components/FloatingBar'
import QuoteModal from './components/QuoteModal'
import Toast from './components/Toast'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import ServicePage from './pages/ServicePage'

function ScrollToTop() {
 const { pathname } = useLocation()
 useEffect(() => {
 window.scrollTo({ top: 0, behavior: 'smooth' })
 }, [pathname])
 return null
}

function AppInner() {
 return (
 <>
 <ScrollToTop />
 <Navbar />
 <main>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/products" element={<Products />} />
 <Route path="/about" element={<About />} />
 <Route path="/gallery" element={<Gallery />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/services/:serviceId" element={<ServicePage />} />
 </Routes>
 </main>
 <Footer />
 <FloatingBar />
 {/* Global modal + toast, rendered once, controlled via context */}
 <QuoteModal />
 <Toast />
 </>
 )
}

function App() {
 return (
 <BrowserRouter>
 <QuoteModalProvider>
 <AppInner />
 </QuoteModalProvider>
 </BrowserRouter>
 )
}

export default App
