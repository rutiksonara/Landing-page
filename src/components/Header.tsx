import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FullCloud from '../assets/Full-Cloud.png';

// Animated Logo Component - Cursor clicks cloud, cloud rotates on Y-axis
function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-12 h-12 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '400px' }}
    >
      {/* Cloud - rotates 360° on Y-axis when hovered */}
      <motion.img
        src={FullCloud}
        alt="Cloud"
        className="absolute inset-0 w-full h-full object-contain"
        animate={{
          rotateY: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      />
      
      {/* Cursor - clicking animation when hovered */}
      <motion.img
        src="/Cursor.png"
        alt="Cursor"
        className="absolute object-contain pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          zIndex: 10,
          transformOrigin: 'center center',
        }}
        animate={{
          scale: isHovered ? [1, 0.92, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        }}
      />
    </motion.div>
  );
}

interface HeaderProps {
  onAuthClick: () => void;
}

const navSections = [
  { id: 'features', label: 'Features' },
  { id: 'demo', label: 'Demo' },
  { id: 'product-tour', label: 'Product Tour' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'about', label: 'About' },
];

export default function Header({ onAuthClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for visual changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sections = [{ id: 'hero' }, ...navSections].map(s => document.getElementById(s.id)).filter(Boolean);
    const scrollPosition = window.scrollY + 150;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]?.id || 'hero');
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    const frameId = requestAnimationFrame(updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      cancelAnimationFrame(frameId);
    };
  }, [updateActiveSection]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[calc(100%-2rem)] max-w-[900px]
          px-2 py-2
          rounded-full
          backdrop-blur-2xl
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(59,130,246,0.15)]'
            : 'shadow-[0_4px_24px_rgba(0,0,0,0.15)]'}
        `}
        style={{
          backgroundColor: isScrolled ? 'var(--color-nav-bg-scrolled)' : 'var(--color-nav-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center justify-between h-11 px-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="shrink-0 bg-transparent border-none cursor-pointer flex items-center gap-2"
          >
            <AnimatedLogo />
            <span className="text-lg font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Cloud<span className="text-[var(--color-accent)]">Cad</span>
              <span style={{ color: 'var(--color-text-muted)' }}>.ai</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="relative px-4 py-2 text-sm font-medium bg-transparent border-none cursor-pointer transition-colors duration-200"
                  style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{section.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <button
            onClick={onAuthClick}
            className="
              hidden md:flex items-center gap-2
              px-5 py-2 text-sm font-medium text-white
              bg-gradient-to-r from-[#3b82f6] to-[#2563eb]
              rounded-full border-none cursor-pointer
              shadow-[0_0_20px_rgba(59,130,246,0.3)]
              hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            Get Started
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer rounded-full"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[76px] left-4 right-4 z-40 p-4 rounded-2xl backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:hidden"
            style={{
              backgroundColor: 'var(--color-nav-bg-scrolled)',
              border: '1px solid var(--color-border)',
            }}
          >
            <nav className="flex flex-col gap-1">
              {navSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="px-4 py-3 text-left text-sm font-medium bg-transparent border-none cursor-pointer rounded-xl transition-all duration-200"
                    style={{
                      color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      backgroundColor: isActive ? 'var(--color-bg-tertiary)' : 'transparent',
                    }}
                  >
                    {section.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={onAuthClick}
                className="
                  w-full flex items-center justify-center gap-2
                  px-5 py-3 text-sm font-medium text-white
                  bg-gradient-to-r from-[#3b82f6] to-[#2563eb]
                  rounded-xl border-none cursor-pointer
                  shadow-[0_0_20px_rgba(59,130,246,0.3)]
                "
              >
                Get Started
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
