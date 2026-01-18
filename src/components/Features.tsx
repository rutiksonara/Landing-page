import { useRef, useMemo, Suspense, useEffect, useCallback, type JSX } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  RoundedBox,
  Environment
} from "@react-three/drei";
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
import * as THREE from "three";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    id: "ai-geometry",
    icon: Sparkles,
    title: "AI Geometry Generation",
    description:
      "Transform natural language descriptions into precise 3D models. Simply describe what you need, and watch AI bring your vision to life with geometric accuracy.",
    color: "#3b82f6",
  },
  {
    id: "direct-modeling",
    icon: Move3D,
    title: "Direct Modeling",
    description:
      "Push, pull, and manipulate geometry directly without complex feature trees. Intuitive direct editing gives you immediate feedback and complete creative freedom.",
    color: "#8b5cf6",
  },
  {
    id: "collaboration",
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with cloud-based design sessions. Multiple engineers can iterate on the same model simultaneously, accelerating your workflow.",
    color: "#06b6d4",
  },
  {
    id: "export",
    icon: FileOutput,
    title: "Multi-format Export",
    description:
      "Export your designs in industry-standard formats including STEP, BREP, and STL. Compatible with your existing manufacturing and simulation toolchain.",
    color: "#10b981",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat-driven Modeling",
    description:
      "Conversational design interface that understands engineering intent. Modify, refine, and perfect your models through natural dialogue.",
    color: "#f59e0b",
  },
  {
    id: "cross-platform",
    icon: Globe,
    title: "Cross-platform Access",
    description:
      "Browser-based accessibility means you can design from anywhere. No installation required—just open your browser and start creating.",
    color: "#ec4899",
  },
  {
    id: "rapid-prototyping",
    icon: Zap,
    title: "AI-Driven Rapid Prototyping",
    description:
      "Reduce engineering iterations dramatically with AI-assisted design validation. Go from concept to production-ready designs in a fraction of the time.",
    color: "#ef4444",
  },
];

// 3D Model Components for each feature
function AIGeometryModel({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Orbiting particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 3) * 2,
          Math.sin(i * Math.PI / 3) * 0.5,
          Math.sin(i * Math.PI / 3) * 2
        ]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </Float>
  );
}

function DirectModelingModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </RoundedBox>
        <Box args={[0.8, 2.5, 0.8]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} transparent opacity={0.6} />
        </Box>
      </group>
    </Float>
  );
}

function CollaborationModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <group ref={groupRef}>
        {[0, 1, 2].map((i) => (
          <Sphere key={i} args={[0.5, 32, 32]} position={[
            Math.cos(i * Math.PI * 2 / 3) * 1.2,
            0,
            Math.sin(i * Math.PI * 2 / 3) * 1.2
          ]}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </Sphere>
        ))}
        <Torus args={[1.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} transparent opacity={0.5} />
        </Torus>
      </group>
    </Float>
  );
}

function ExportModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.9}>
      <group ref={groupRef}>
        <RoundedBox args={[2, 0.3, 1.5]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </RoundedBox>
        <RoundedBox args={[1.8, 0.3, 1.3]} radius={0.05} smoothness={4} position={[0, 0.35, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} transparent opacity={0.8} />
        </RoundedBox>
        <RoundedBox args={[1.6, 0.3, 1.1]} radius={0.05} smoothness={4} position={[0, 0.7, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} transparent opacity={0.6} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function ChatModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={groupRef}>
        <RoundedBox args={[2, 1.2, 0.3]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </RoundedBox>
        {/* Chat bubbles */}
        <Sphere args={[0.15, 16, 16]} position={[-0.5, -0.8, 0]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[-0.8, -1, 0]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </Sphere>
      </group>
    </Float>
  );
}

function CrossPlatformModel({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.7}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function RapidPrototypingModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.5}>
      <group ref={groupRef}>
        <mesh>
          <coneGeometry args={[0.8, 1.5, 6]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Lightning effect */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, -0.5 - i * 0.4, 0]} rotation={[0, i * 0.5, 0]}>
            <torusGeometry args={[0.6 + i * 0.2, 0.03, 8, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7 - i * 0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Model selector based on feature ID
function FeatureModel({ featureId, color }: { featureId: string; color: string }) {
  const models: Record<string, JSX.Element> = {
    "ai-geometry": <AIGeometryModel color={color} />,
    "direct-modeling": <DirectModelingModel color={color} />,
    "collaboration": <CollaborationModel color={color} />,
    "export": <ExportModel color={color} />,
    "chat": <ChatModel color={color} />,
    "cross-platform": <CrossPlatformModel color={color} />,
    "rapid-prototyping": <RapidPrototypingModel color={color} />,
  };

  return models[featureId] || <AIGeometryModel color={color} />;
}

// 3D Scene Component
function Scene3D({ featureId, color }: { featureId: string; color: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

      <Suspense fallback={null}>
        <FeatureModel featureId={featureId} color={color} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

interface FeatureSectionProps {
  feature: Feature;
  index: number;
  progress: number;
}

function FeatureSection({ feature, index, progress }: FeatureSectionProps) {
  const isEven = index % 2 === 0;

  // Calculate opacity and transform based on scroll progress
  const sectionProgress = useMemo(() => {
    const sectionStart = index / features.length;
    const sectionEnd = (index + 1) / features.length;
    const sectionRange = sectionEnd - sectionStart;
    const midPoint = (sectionStart + sectionEnd) / 2;
    const isLastFeature = index === features.length - 1;

    // Extend the "in focus" zone - features stay fully visible for longer
    const focusZone = sectionRange * 0.6; // 60% of section is in full focus
    
    // For the last feature, keep it in full focus when scrolled to the bottom
    let distanceFromMid: number;
    if (isLastFeature && progress >= sectionStart) {
      // Last feature stays in focus once we've scrolled into its section
      distanceFromMid = progress < midPoint 
        ? midPoint - progress 
        : 0; // Don't fade when past midpoint (scrolled to bottom)
    } else {
      distanceFromMid = Math.abs(progress - midPoint);
    }
    
    // Only start fading outside the focus zone
    const fadeDistance = Math.max(0, distanceFromMid - focusZone / 2);
    const maxFadeDistance = sectionRange / 2 - focusZone / 2;
    const normalizedDistance = maxFadeDistance > 0 ? Math.min(fadeDistance / maxFadeDistance, 1) : 0;

    return {
      opacity: 1 - normalizedDistance * 0.5,
      scale: 1 - normalizedDistance * 0.05,
      translateY: normalizedDistance * 15,
    };
  }, [index, progress]);

  return (
    <div
      className="min-h-screen flex items-center py-16 will-change-transform"
      style={{
        opacity: sectionProgress.opacity,
        transform: `translateY(${sectionProgress.translateY}px) scale(${sectionProgress.scale})`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
      }}
      data-feature-id={feature.id}
    >
      <div
        className={`flex items-center gap-12 max-w-[1400px] mx-auto px-8 w-full max-lg:flex-col max-lg:gap-8 max-lg:text-center ${!isEven ? 'flex-row-reverse' : ''}`}
      >
        {/* Text Content */}
        <div className="flex-[0_0_45%] max-w-[560px] max-lg:flex-none max-lg:max-w-full max-lg:w-full">
          <div className="flex flex-col gap-5 max-lg:items-center">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              style={{
                backgroundColor: `${feature.color}20`,
                color: feature.color,
              }}
            >
              <feature.icon size={22} />
            </div>
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-[var(--color-text-primary)]">
              {feature.title}
            </h3>
            <p className="text-[17px] leading-[1.8] text-[var(--color-text-secondary)] max-w-[480px] max-lg:text-center">
              {feature.description}
            </p>
          </div>
        </div>

        {/* 3D Model */}
        <div className="flex-1 flex items-center justify-center min-h-[400px] max-lg:w-full max-lg:min-h-[300px] max-sm:min-h-[250px]">
          <div
            className="w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden"
            style={{
              background: `radial-gradient(circle at center, ${feature.color}10 0%, transparent 70%)`,
            }}
          >
            <Scene3D featureId={feature.id} color={feature.color} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  // Use requestAnimationFrame for buttery smooth scroll tracking
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerHeight = container.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;

    scrollProgress.current = Math.max(0, Math.min(1, scrolled / containerHeight));

    // Force re-render with smooth interpolation
    const sections = container.querySelectorAll('[data-feature-id]');
    sections.forEach((section, index) => {
      const sectionStart = index / features.length;
      const sectionEnd = (index + 1) / features.length;
      const sectionRange = sectionEnd - sectionStart;
      const midPoint = (sectionStart + sectionEnd) / 2;
      const isLastFeature = index === features.length - 1;

      // Extend the "in focus" zone - features stay fully visible for longer
      const focusZone = sectionRange * 0.6;
      
      // For the last feature, keep it in full focus when scrolled to the bottom
      let distanceFromMid: number;
      if (isLastFeature && scrollProgress.current >= sectionStart) {
        // Last feature stays in focus once we've scrolled into its section
        distanceFromMid = scrollProgress.current < midPoint 
          ? midPoint - scrollProgress.current 
          : 0; // Don't fade when past midpoint (scrolled to bottom)
      } else {
        distanceFromMid = Math.abs(scrollProgress.current - midPoint);
      }
      
      const fadeDistance = Math.max(0, distanceFromMid - focusZone / 2);
      const maxFadeDistance = sectionRange / 2 - focusZone / 2;
      const normalizedDistance = maxFadeDistance > 0 ? Math.min(fadeDistance / maxFadeDistance, 1) : 0;

      const opacity = 1 - normalizedDistance * 0.5;
      const scale = 1 - normalizedDistance * 0.05;
      const translateY = normalizedDistance * 15;

      (section as HTMLElement).style.opacity = String(opacity);
      (section as HTMLElement).style.transform = `translateY(${translateY}px) scale(${scale})`;
    });
  }, []);

  // Optimized scroll listener with requestAnimationFrame
  const rafRef = useRef<number | undefined>(undefined);

  const onScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(handleScroll);
  }, [handleScroll]);

  // Mount scroll listener in useEffect
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onScroll]);

  return (
    <section id="features" className="bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="py-20 pb-8 text-center border-t border-[var(--color-border)]">
        <div className="container">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
            Capabilities
          </span>
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
            progress={0}
          />
        ))}
      </div>
    </section>
  );
}
