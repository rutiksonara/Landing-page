import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export default function ProductDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // YouTube video ID placeholder - replace with actual video
  const videoId = 'dQw4w9WgXcQ'; // Placeholder

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Auto-play when 50% visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: [0.5] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;

  return (
    <section id="demo" className="section relative bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-[560px] mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">Product Tour</span>
          <h2 className="mb-4">
            See <span className="bg-gradient-to-r from-[var(--color-accent)] to-blue-400 bg-clip-text text-transparent">CloudAICAD</span> in action
          </h2>
          <p className="text-base text-[var(--color-text-secondary)]">
            Watch how AI transforms the way you design. From natural language to production-ready models in minutes.
          </p>
        </div>

        <div className="relative max-w-[900px] mx-auto">
          <div className="relative aspect-video bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden border border-[var(--color-border)] group">
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="CloudAICAD Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-none"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors group-hover:bg-black/20 pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center w-16 h-16 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] cursor-pointer transition-all hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white max-sm:w-12 max-sm:h-12"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] cursor-pointer transition-all hover:bg-[var(--color-bg-tertiary)]"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] cursor-pointer transition-all hover:bg-[var(--color-bg-tertiary)]"
                  aria-label="Open in fullscreen"
                >
                  <Maximize size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-[13px] text-[var(--color-text-muted)]">
          Experience the future of product design. Replace placeholder video ID with your demo.
        </p>
      </div>
    </section>
  );
}
