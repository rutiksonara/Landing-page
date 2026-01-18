
export default function Enterprise() {
  return (
    <section id="enterprise" className="py-24 bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
            Enterprise Solutions
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-text-primary)] mb-4">
            Enterprise
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-[600px] mx-auto">
            Powerful solutions for large-scale engineering teams
          </p>
        </div>

        {/* Coming Soon - Simple centered layout */}
        <div className="flex flex-col items-center justify-center py-8">
          <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
            Coming soon...
          </h3>
          
          {/* Skeleton bar loading effect */}
          <div className="w-full max-w-[500px] space-y-4">
            <div className="h-4 bg-[var(--color-border)] rounded-full w-full animate-pulse" />
            <div className="h-4 bg-[var(--color-border)] rounded-full w-4/5 animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="h-4 bg-[var(--color-border)] rounded-full w-3/5 animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
