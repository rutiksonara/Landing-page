import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface HackathonBannerProps {
  onDismiss?: () => void;
}

export default function HackathonBanner({ onDismiss }: HackathonBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 150;
      const fadeEnd = 500;
      
      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
        setTimeout(() => setIsVisible(false), 300);
      } else {
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleRegister = () => {
    window.open('https://forms.google.com', '_blank');
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dark backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: opacity * 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDismiss}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              pointerEvents: opacity < 0.1 ? 'none' : 'auto',
            }}
          />

          {/* Horizontal Banner - Centered with flexbox wrapper */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: opacity, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              pointerEvents: opacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                padding: '24px 32px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                boxShadow: '0 0 60px rgba(59, 130, 246, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)',
                width: '100%',
                maxWidth: '900px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Badge + Text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                {/* Sparkle Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={28} color="#facc15" />
                </div>

                {/* Text Content */}
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.3,
                    }}
                  >
                    Join the CloudCadAI Hackathon
                  </h3>
                  <p
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '14px',
                      color: '#94a3b8',
                      lineHeight: 1.4,
                    }}
                  >
                    Win <span style={{ color: '#facc15', fontWeight: 600 }}>equity partnership</span> & <span style={{ color: '#60a5fa', fontWeight: 600 }}>employment</span> opportunities
                  </p>
                </div>
              </div>

              {/* Right: CTA Button + Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <button
                  onClick={handleRegister}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
                  }}
                >
                  Register Now
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={handleDismiss}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scroll hint */}
            <p
              style={{
                textAlign: 'center',
                marginTop: '16px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Scroll down to continue
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
