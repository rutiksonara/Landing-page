import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import {
    Text3D,
    Center,
    OrbitControls,
    useMatcapTexture,
    Float
} from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
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

// CAD-style colors (based on NX/Onshape)
const CAD_COLORS = {
    default: '#8a8a8a',      // Default gray (like NX)
    faceHover: '#4fc3f7',    // Light blue for face selection
    edgeHover: '#00bcd4',    // Cyan for edge selection  
    objectHover: '#81d4fa',  // Lighter blue for full object
    edge: '#333333',         // Dark edge color
};

// Custom component for each 3D letter with CAD selection
function CADLetter({
    char,
    position,
    isMobile = false
}: {
    char: string;
    position: [number, number, number];
    isMobile?: boolean;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hoverState, setHoverState] = useState<'none' | 'face' | 'edge' | 'object'>('none');

    // Use matcap for realistic CAD-like material (brushed metal look)
    const [matcap] = useMatcapTexture('C7C7D7_4C4E5A_818393_6C6C74', 256);

    // Detect if hovering near edge or on face - only on desktop
    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (isMobile) return; // Skip hover detection on mobile
        event.stopPropagation();

        if (!event.face) return;

        // Calculate distance from UV edge (simplified edge detection)
        const uv = event.uv;
        if (uv) {
            const edgeThreshold = 0.08;
            const nearEdge =
                uv.x < edgeThreshold || uv.x > (1 - edgeThreshold) ||
                uv.y < edgeThreshold || uv.y > (1 - edgeThreshold);

            if (nearEdge) {
                setHoverState('edge');
            } else {
                setHoverState('face');
            }
        } else {
            setHoverState('face');
        }
    };

    const handlePointerEnter = () => {
        if (isMobile) return;
        setHoverState('object');
        document.body.style.cursor = 'pointer';
    };

    const handlePointerLeave = () => {
        if (isMobile) return;
        setHoverState('none');
        document.body.style.cursor = 'default';
    };

    // Get material color based on hover state
    const materialColor = useMemo(() => {
        switch (hoverState) {
            case 'face': return CAD_COLORS.faceHover;
            case 'edge': return CAD_COLORS.edgeHover;
            case 'object': return CAD_COLORS.objectHover;
            default: return CAD_COLORS.default;
        }
    }, [hoverState]);

    // Show edges when in edge hover mode
    const showEdges = hoverState === 'edge' || hoverState === 'object';

    return (
        <group position={position}>
            <Text3D
                ref={meshRef}
                font="/fonts/helvetiker_bold.typeface.json"
                size={1.8}
                height={0.4}
                curveSegments={isMobile ? 6 : 12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={isMobile ? 2 : 5}
                onPointerEnter={isMobile ? undefined : handlePointerEnter}
                onPointerLeave={isMobile ? undefined : handlePointerLeave}
                onPointerMove={isMobile ? undefined : handlePointerMove}
            >
                {char}
                <meshMatcapMaterial
                    matcap={matcap}
                    color={materialColor}
                />
            </Text3D>

            {/* Edge lines overlay - shown on hover (desktop only) */}
            {!isMobile && meshRef.current && showEdges && (
                <lineSegments>
                    <edgesGeometry args={[meshRef.current.geometry, 30]} />
                    <lineBasicMaterial color={CAD_COLORS.edge} linewidth={2} />
                </lineSegments>
            )}
        </group>
    );
}

// The full 3D text "CLOUDAICAD"
function CADText({ isMobile = false }: { isMobile?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const text = 'CLOUDAICAD';

    // Calculate letter positions (manual kerning)
    const letterSpacing = 1.4;
    const totalWidth = text.length * letterSpacing;
    const startX = -totalWidth / 2;

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle floating motion
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                {text.split('').map((char, index) => (
                    <CADLetter
                        key={index}
                        char={char}
                        position={[startX + index * letterSpacing, 0, 0]}
                        isMobile={isMobile}
                    />
                ))}
            </Center>

            {/* Grid floor - simplified on mobile */}
            <gridHelper
                args={[20, isMobile ? 10 : 20, '#333333', '#222222']}
                position={[0, -1.5, 0]}
                rotation={[0, 0, 0]}
            />

            {/* Coordinate axes indicator - hide on mobile for performance */}
            {!isMobile && (
                <group position={[-8, -1, 3]}>
                    {/* X axis - Red */}
                    <mesh position={[0.5, 0, 0]}>
                        <boxGeometry args={[1, 0.05, 0.05]} />
                        <meshBasicMaterial color="#ff4444" />
                    </mesh>
                    {/* Y axis - Green */}
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[0.05, 1, 0.05]} />
                        <meshBasicMaterial color="#44ff44" />
                    </mesh>
                    {/* Z axis - Blue */}
                    <mesh position={[0, 0, 0.5]}>
                        <boxGeometry args={[0.05, 0.05, 1]} />
                        <meshBasicMaterial color="#4444ff" />
                    </mesh>
                </group>
            )}
        </group>
    );
}

// Loading placeholder
function LoadingPlaceholder() {
    return (
        <mesh>
            <boxGeometry args={[3, 1, 0.2]} />
            <meshStandardMaterial color="#333333" wireframe />
        </mesh>
    );
}

// Main Footer3D Component
export default function Footer3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const isMobile = useIsMobile();

    return (
        <motion.div
            ref={containerRef}
            className="w-full h-[500px] relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ touchAction: 'pan-y' }} // Allow vertical scrolling on touch devices
        >
            <Canvas
                camera={{ position: [0, 2, 12], fov: 50 }}
                gl={{ 
                    antialias: !isMobile, 
                    alpha: true,
                    powerPreference: isMobile ? 'low-power' : 'default'
                }}
                dpr={isMobile ? 1 : [1, 2]}
                style={{ 
                    background: 'transparent',
                    touchAction: 'pan-y' // Critical: allow vertical scrolling
                }}
                frameloop={isMobile ? 'demand' : 'always'}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} />
                {!isMobile && <directionalLight position={[-10, -10, -5]} intensity={0.3} />}

                <Suspense fallback={<LoadingPlaceholder />}>
                    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
                        <CADText isMobile={isMobile} />
                    </Float>
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={!isMobile} // Disable touch rotation on mobile
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2.2}
                    minAzimuthAngle={-Math.PI / 6}
                    maxAzimuthAngle={Math.PI / 6}
                />
            </Canvas>

            {/* Hover instruction - hide on mobile */}
            {!isMobile && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[var(--color-text-muted)] text-sm">
                    Hover to select faces, edges, or objects
                </div>
            )}
        </motion.div>
    );
}
