import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Footer3D from './Footer3D';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="">
      {/* 3D CLOUDAICAD Section */}
      <div className="py-16">
        <Footer3D />
      </div>

      {/* Links and Info Section */}
      <div className="container py-12 border-t border-[var(--color-border)]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16 max-md:grid-cols-2 max-md:gap-12 max-sm:grid-cols-1">
          <div className="max-md:col-span-2 max-sm:col-span-1">
            <div className="text-lg font-semibold tracking-tight mb-2">
              Cloud<span className="text-[var(--color-accent)]">AI</span>Cad
            </div>
            <p className="text-sm max-w-[260px] mb-6 text-[var(--color-text-secondary)]">
              AI-powered PLM platform for rapid prototyping and accelerated product development.
            </p>
            <div className="flex gap-1">
              <a href="#" className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-accent)] hover:text-white" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-accent)] hover:text-white" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-accent)] hover:text-white" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-accent)] hover:text-white" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">Product</h4>
            <a href="#features" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Features</a>
            <a href="#demo" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Demo</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Changelog</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Roadmap</a>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">Resources</h4>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Documentation</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">API Reference</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Tutorials</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Blog</a>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">Company</h4>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">About</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Careers</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Contact</a>
            <a href="#" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">Privacy</a>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex justify-between items-center max-sm:flex-col max-sm:gap-4">
          <p className="text-[13px] text-[var(--color-text-muted)]">
            © {currentYear} CloudAICad. All rights reserved.
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
            v1.0.0 REV A
          </p>
        </div>
      </div>
    </footer>
  );
}
