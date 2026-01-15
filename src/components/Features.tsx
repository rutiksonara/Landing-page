import { useRef, useEffect, useState } from "react";
import {
  Sparkles,
  Users,
  FileOutput,
  MessageSquare,
  Globe,
  Zap,
  Move3D,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "ai-geometry",
    icon: Sparkles,
    title: "AI Geometry Generation",
    description:
      "Transform natural language descriptions into precise 3D models. Simply describe what you need, and watch AI bring your vision to life with geometric accuracy.",
  },
  {
    id: "direct-modeling",
    icon: Move3D,
    title: "Direct Modeling",
    description:
      "Push, pull, and manipulate geometry directly without complex feature trees. Intuitive direct editing gives you immediate feedback and complete creative freedom.",
  },
  {
    id: "collaboration",
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with cloud-based design sessions. Multiple engineers can iterate on the same model simultaneously, accelerating your workflow.",
  },
  {
    id: "export",
    icon: FileOutput,
    title: "Multi-format Export",
    description:
      "Export your designs in industry-standard formats including STEP, BREP, and STL. Compatible with your existing manufacturing and simulation toolchain.",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat-driven Modeling",
    description:
      "Conversational design interface that understands engineering intent. Modify, refine, and perfect your models through natural dialogue.",
  },
  {
    id: "cross-platform",
    icon: Globe,
    title: "Cross-platform Access",
    description:
      "Browser-based accessibility means you can design from anywhere. No installation required—just open your browser and start creating.",
  },
  {
    id: "rapid-prototyping",
    icon: Zap,
    title: "AI-Driven Rapid Prototyping",
    description:
      "Reduce engineering iterations dramatically with AI-assisted design validation. Go from concept to production-ready designs in a fraction of the time.",
  },
];

interface FeatureSectionProps {
  feature: Feature;
  index: number;
  isActive: boolean;
}

function FeatureSection({ feature, index, isActive }: FeatureSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`min-h-screen flex items-center py-24 border-b border-[var(--color-border)] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
      data-feature-id={feature.id}
    >
      <div
        className={`flex items-center gap-16 max-w-[1400px] mx-auto px-8 w-full max-lg:flex-col max-lg:gap-12 max-lg:text-center ${!isEven ? 'flex-row-reverse' : ''}`}
      >
        {/* Text Content */}
        <div className="flex-[0_0_45%] max-w-[560px] max-lg:flex-none max-lg:max-w-full max-lg:w-full">
          <div className={`flex flex-col gap-6 max-lg:items-center ${isActive ? 'animate-[slideInUp_0.8s_ease_forwards]' : ''}`}>
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-accent-muted)] rounded-lg text-[var(--color-accent)]">
              <feature.icon size={22} />
            </div>
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-[var(--color-text-primary)]">{feature.title}</h3>
            <p className="text-[17px] leading-[1.8] text-[var(--color-text-secondary)] max-w-[480px] max-lg:text-center">
              {feature.description}
            </p>
          </div>
        </div>

        {/* 3D Model Placeholder */}
        <div className="flex-1 flex items-center justify-center min-h-[500px] max-lg:w-full max-lg:min-h-[350px] max-sm:min-h-[280px]">
          <div className="w-full h-full flex items-center justify-center">
            <div className={`w-full max-w-[600px] aspect-[4/3] bg-[var(--color-bg-secondary)] border border-dashed border-[var(--color-border)] rounded-xl flex items-center justify-center relative overflow-hidden max-lg:max-w-full max-sm:aspect-[16/10] ${isActive ? 'animate-[scaleIn_0.8s_ease_0.2s_forwards]' : ''}`}>
              {/* Placeholder indicator */}
              <div className="flex flex-col items-center gap-4 text-[var(--color-text-muted)] text-center">
                <feature.icon size={48} strokeWidth={1} />
                <span className="text-sm font-medium uppercase tracking-wider">3D Model Area</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll("[data-feature-id]");

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;

        // Check if section is near the center of viewport
        if (Math.abs(sectionCenter - viewportCenter) < rect.height / 3) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="features" className="bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="py-24 pb-12 text-center border-t border-[var(--color-border)]">
        <div className="container">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">Capabilities</span>
          <h2 className="max-w-[480px] mx-auto leading-tight">
            Everything you need for
            <br />
            modern product design
          </h2>
        </div>
      </div>

      <div className="flex flex-col" ref={containerRef}>
        {features.map((feature, index) => (
          <FeatureSection
            key={feature.id}
            feature={feature}
            index={index}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}
