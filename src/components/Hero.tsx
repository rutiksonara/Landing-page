import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onAuthClick: () => void;
  onDemoClick: () => void;
}

export default function Hero({ onAuthClick, onDemoClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1200px] mx-auto py-16 px-6 relative z-10">
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 py-1 px-4 bg-[var(--color-accent-muted)] border border-[var(--color-accent)] rounded-full text-[13px] font-medium text-[var(--color-accent)] mb-8">
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full" />
            AI-Powered PLM Platform
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6">
            Design Faster.
            <br />
            Iterate Less.
          </h1>

          <p className="text-[17px] leading-[1.7] max-w-[520px] mb-12 text-[var(--color-text-secondary)]">
            CloudCadAI is a complete PLM solution with AI at the forefront.
            Enable rapid prototyping, reduce engineering iterations, and
            accelerate your path from concept to production.
          </p>

          <div className="flex flex-wrap gap-2 mb-16">
            <button onClick={onAuthClick} className="btn btn-primary py-2 px-6">
              Start Designing
              <ArrowRight size={16} />
            </button>
            <button onClick={onDemoClick} className="btn btn-secondary py-2 px-6">
              <Play size={16} />
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[var(--color-border)] max-sm:gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">10x</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">Faster Prototyping</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)] max-sm:hidden" />
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">60%</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">Fewer Iterations</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)] max-sm:hidden" />
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">24/7</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">Cloud Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
