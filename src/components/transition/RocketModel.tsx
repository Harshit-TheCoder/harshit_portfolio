"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function RocketModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const engineRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (active) {
      // Acceleration & Camera Drift
      groupRef.current.position.z += delta * 40;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Engine Pulse
      if (engineRef.current) {
        engineRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 20) * 0.2);
      }
    } else {
      groupRef.current.position.z = -10;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -10]}>
      <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Main Body - Sleek Needle Shape */}
          <mesh>
            <cylinderGeometry args={[0.05, 0.4, 4, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Cockpit - Glowing Glass */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} transparent opacity={0.8} />
          </mesh>

          {/* Wings - Angular & Minimalist */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[3, 0.1, 0.8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} />
          </mesh>

          {/* Engine - Plasma Glow */}
          <mesh ref={engineRef} position={[0, -2.1, 0]}>
            <cylinderGeometry args={[0.4, 0.1, 0.4, 32]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={10} />
          </mesh>

          {/* Energy Trail */}
          <mesh ref={trailRef} position={[0, -4, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.3, 0, 4, 16]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Point lights on the rocket */}
      <pointLight position={[0, 0, 1]} intensity={2} color="#06b6d4" distance={5} />
      <pointLight position={[0, -3, 0]} intensity={5} color="#a855f7" distance={10} />
    </group>
  );
}
