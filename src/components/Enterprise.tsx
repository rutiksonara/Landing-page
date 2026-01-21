export default function Enterprise() {
  return (
    <section id="enterprise" className="overflow-hidden">
      <div className="py-20 pb-16 text-center">
        <div className="container">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
            Enterprise
          </span>
          <h2 className="max-w-[480px] mx-auto leading-tight mb-12">
            Powerful solutions for
            <br />
            large-scale teams
          </h2>

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
      </div>
    </section>
  );
}
