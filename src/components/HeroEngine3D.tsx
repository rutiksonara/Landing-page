import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Float,
    Cylinder,
    Box,
    Torus
} from '@react-three/drei';
import * as THREE from 'three';

// Hook to detect mobile/touch devices
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                window.matchMedia('(max-width: 768px)').matches ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return isMobile;
}

// Engine Block - Creates a stylized V8 engine using primitives
function EngineBlock({ simplified = false }: { simplified?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    // Simplified version for mobile
    const segments = simplified ? 8 : 16;

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={groupRef} scale={0.8}>
                {/* Main Engine Block */}
                <Box args={[2, 1.5, 1.5]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
                </Box>

                {/* Cylinder Bank Left (V-shape) */}
                {[0, 1, 2, 3].map((i) => (
                    <group key={`left-${i}`} position={[-0.6 + i * 0.4, 0.9, -0.3]} rotation={[0.3, 0, 0]}>
                        <Cylinder args={[0.12, 0.12, 0.8, segments]}>
                            <meshStandardMaterial color="#404040" metalness={0.95} roughness={0.15} />
                        </Cylinder>
                        {/* Piston heads */}
                        <Cylinder args={[0.1, 0.1, 0.15, segments]} position={[0, 0.45, 0]}>
                            <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} emissive="#3b82f6" emissiveIntensity={0.3} />
                        </Cylinder>
                    </group>
                ))}

                {/* Cylinder Bank Right (V-shape) */}
                {[0, 1, 2, 3].map((i) => (
                    <group key={`right-${i}`} position={[-0.6 + i * 0.4, 0.9, 0.3]} rotation={[-0.3, 0, 0]}>
                        <Cylinder args={[0.12, 0.12, 0.8, segments]}>
                            <meshStandardMaterial color="#404040" metalness={0.95} roughness={0.15} />
                        </Cylinder>
                        {/* Piston heads */}
                        <Cylinder args={[0.1, 0.1, 0.15, segments]} position={[0, 0.45, 0]}>
                            <meshStandardMaterial color="#22d3ee" metalness={0.9} roughness={0.1} emissive="#22d3ee" emissiveIntensity={0.3} />
                        </Cylinder>
                    </group>
                ))}

                {/* Intake Manifold */}
                <Box args={[1.8, 0.3, 0.6]} position={[0, 1.4, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
                </Box>

                {/* Throttle Body */}
                <Cylinder args={[0.2, 0.2, 0.4, segments]} position={[0, 1.7, 0]}>
                    <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
                </Cylinder>

                {/* Oil Pan */}
                <Box args={[1.8, 0.4, 1.2]} position={[0, -1, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.5} />
                </Box>

                {/* Exhaust Headers Left - Skip on mobile for performance */}
                {!simplified && [0, 1, 2, 3].map((i) => (
                    <group key={`exhaust-left-${i}`}>
                        <Torus args={[0.15, 0.04, 8, 16, Math.PI / 2]} position={[-0.6 + i * 0.4, 0.3, -0.9]} rotation={[0, Math.PI / 2, 0]}>
                            <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.3} />
                        </Torus>
                    </group>
                ))}

                {/* Exhaust Headers Right - Skip on mobile for performance */}
                {!simplified && [0, 1, 2, 3].map((i) => (
                    <group key={`exhaust-right-${i}`}>
                        <Torus args={[0.15, 0.04, 8, 16, Math.PI / 2]} position={[-0.6 + i * 0.4, 0.3, 0.9]} rotation={[0, -Math.PI / 2, 0]}>
                            <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.3} />
                        </Torus>
                    </group>
                ))}

                {/* Glowing accent ring */}
                <Torus args={[1.3, 0.02, simplified ? 8 : 16, simplified ? 32 : 64]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.6} />
                </Torus>
            </group>
        </Float>
    );
}

// Loading fallback
function LoadingFallback() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[0.5, 0.15, 64, 16]} />
            <meshStandardMaterial
                color="#3b82f6"
                metalness={0.8}
                roughness={0.2}
                wireframe
            />
        </mesh>
    );
}

// Main exported component
export default function HeroEngine3D() {
    const isMobile = useIsMobile();
    
    return (
        <div 
            className="w-full h-full min-h-[400px]"
            style={{ touchAction: 'pan-y' }} // Allow vertical scrolling on touch devices
        >
            <Canvas
                camera={{ position: [4, 2, 4], fov: 40 }}
                gl={{
                    antialias: !isMobile, // Disable antialiasing on mobile for performance
                    alpha: true,
                    powerPreference: isMobile ? 'low-power' : 'high-performance'
                }}
                dpr={isMobile ? 1 : [1, 2]} // Lower DPR on mobile
                style={{ 
                    background: 'transparent',
                    touchAction: 'pan-y' // Critical: allow vertical scrolling
                }}
                frameloop={isMobile ? 'demand' : 'always'} // Reduce frame updates on mobile
            >
                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                {!isMobile && (
                    <>
                        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#3b82f6" />
                        <pointLight position={[5, 5, 5]} intensity={0.3} color="#22d3ee" />
                    </>
                )}
                <spotLight
                    position={[0, 8, 0]}
                    angle={0.4}
                    penumbra={1}
                    intensity={0.8}
                    color="#ffffff"
                />

                {/* The 3D Engine Model */}
                <Suspense fallback={<LoadingFallback />}>
                    <EngineBlock simplified={isMobile} />
                    {!isMobile && <Environment preset="city" />}
                </Suspense>

                {/* Camera controls - Disabled on mobile to allow scrolling */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={!isMobile} // Disable touch rotation on mobile
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    );
}
