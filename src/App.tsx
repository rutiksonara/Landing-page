import { useRef } from 'react';
import Header from './components/Header';
import Hero, { type HeroRef } from './components/Hero';
import Features from './components/Features';
import ProductDemo from './components/ProductDemo';
import Enterprise from './components/Enterprise';
import Footer from './components/Footer';
import HackathonBanner from './components/HackathonBanner';
import './index.css';

export default function App() {
  const heroRef = useRef<HeroRef>(null);

  const handleGetStarted = () => {
    // Scroll to hero section and focus email input
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Focus email input after scroll animation
    setTimeout(() => {
      heroRef.current?.focusEmailInput();
    }, 500);
  };

  return (
    <div className="app">
      <HackathonBanner />
      <Header onAuthClick={handleGetStarted} />
      <main>
        <Hero ref={heroRef} onDemoClick={() => {}} />
        <Features />
        <ProductDemo />
        <Enterprise />
      </main>
      <Footer />
      {/* AuthModal removed - signup now happens inline in Hero */}
    </div>
  );
}
