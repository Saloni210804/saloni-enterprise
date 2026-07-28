import HeroSection from '../components/HeroSection'
import ProcessSection from '../components/ProcessSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import FeaturedProjects from '../components/FeaturedProjects'
import ClientsSection from '../components/ClientsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FaqSection from '../components/FaqSection'

export default function Home() {
 return (
 <>
 {/* 1. Hero */}
 <HeroSection />

 {/* 2. How We Work, 6-step process with animated gold connector */}
 <ProcessSection />

 {/* 3. About Saloni Enterprise + Quality Materials */}
 <AboutSection />

 {/* 4. Our Services */}
 <ServicesSection />

 {/* 5. Featured Projects */}
 <FeaturedProjects />

 {/* 6. Trusted By — Client logos */}
 <ClientsSection />

 {/* 7. Testimonials, horizontal carousel */}
 <TestimonialsSection />

 {/* 7. FAQ, 8 SEO-optimised questions */}
 <FaqSection />
 </>
 )
}
