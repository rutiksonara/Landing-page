import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-12">
        <div className="shrink-0">
          <span className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
            Cloud<span className="text-[var(--color-accent)]">Cad</span>AI
          </span>
        </div>

        <nav className={`
          flex items-center gap-8
          max-md:fixed max-md:top-[49px] max-md:left-0 max-md:right-0
          max-md:bg-[var(--color-bg-primary)] max-md:flex-col max-md:p-6 max-md:gap-4
          max-md:border-b max-md:border-[var(--color-border)]
          max-md:transition-all max-md:duration-300
          ${isMobileMenuOpen
            ? 'max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto'
            : 'max-md:-translate-y-full max-md:opacity-0 max-md:pointer-events-none'}
        `}>
          <button onClick={() => scrollToSection('features')} className="text-[var(--color-text-secondary)] text-sm font-medium transition-colors hover:text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer">
            Features
          </button>
          <button onClick={() => scrollToSection('demo')} className="text-[var(--color-text-secondary)] text-sm font-medium transition-colors hover:text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer">
            Demo
          </button>
          <button onClick={() => scrollToSection('about')} className="text-[var(--color-text-secondary)] text-sm font-medium transition-colors hover:text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer">
            About
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-md text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={onAuthClick} className="btn btn-primary py-1 px-4 text-[13px] max-md:hidden">
            Get Started
          </button>
          <button
            className="hidden max-md:flex text-[var(--color-text-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
