"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

/* ── Soft 3D Card ── */
function Card({
  position,
  color,
  size,
  speed = 1.5,
  floatIntensity = 0.8,
  rotationIntensity = 0.3,
}: {
  position: [number, number, number];
  color: string;
  size: [number, number, number];
  speed?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <RoundedBox args={size} radius={0.14} smoothness={4} position={position}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.25}
          metalness={0.02}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          transparent
          opacity={0.85}
        />
      </RoundedBox>
    </Float>
  );
}

/* ── Soft Particles ── */
function Particles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#94a3b8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ── Accent Sphere ── */
function Sphere({
  position,
  color,
  size = 0.12,
  speed = 2.5,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

/* ── Scene: smooth mouse-tracking → "kayma" (gliding) ── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Ultra-smooth mouse-tracking → gliding feel (low lerp = slow follow)
    const targetRotY = state.mouse.x * 0.15;
    const targetRotX = -state.mouse.y * 0.1;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.025);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.025);

    // Scroll-driven drift
    const scrollTarget = -(scrollRef.current * 0.002);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollTarget, 0.04);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Soft pastel 3D cards */}
      <Card position={[0, 0.3, 0]} color="#b3cfed" size={[1.9, 2.4, 0.12]} speed={1.3} floatIntensity={0.5} />
      <Card position={[2.4, 1, -1.5]} color="#a8ebc6" size={[1.4, 1.8, 0.1]} speed={1.7} floatIntensity={0.7} />
      <Card position={[-1.8, -0.5, -1]} color="#fbcfb7" size={[1.3, 1.6, 0.1]} speed={1.5} floatIntensity={0.6} />
      <Card position={[1.1, -1.4, -2]} color="#ccc2ee" size={[1.5, 1, 0.1]} speed={1.9} floatIntensity={0.8} />
      <Card position={[-1.3, 1.5, -2.2]} color="#ffe9a3" size={[1.2, 1.5, 0.08]} speed={1.2} floatIntensity={0.9} />
      <Card position={[3, -0.3, -2.8]} color="#dae8f6" size={[1, 1.3, 0.08]} speed={2} floatIntensity={0.5} />

      {/* Accent spheres */}
      <Sphere position={[3.5, 2, -1]} color="#ffe9a3" size={0.14} speed={2.8} />
      <Sphere position={[-2.4, -1.6, -0.5]} color="#a8ebc6" size={0.09} speed={2.2} />
      <Sphere position={[0.5, 2.2, -1.5]} color="#ccc2ee" size={0.11} speed={2} />
      <Sphere position={[-0.8, -2, -2]} color="#fbcfb7" size={0.07} speed={2.6} />
      <Sphere position={[2.2, 2.5, -2.5]} color="#b3cfed" size={0.06} speed={3} />

      <Particles count={40} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "auto" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-4, -3, 4]} intensity={0.2} color="#a8ebc6" distance={14} />
      <pointLight position={[4, 3, 3]} intensity={0.15} color="#ccc2ee" distance={14} />
      <Scene />
    </Canvas>
  );
}
