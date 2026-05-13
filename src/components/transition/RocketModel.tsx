"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function RocketModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const engineRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (active) {
      // High-speed acceleration
      groupRef.current.position.z += delta * 50;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * 0.05;
      
      // Vertical sway
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 10) * 0.02;
      
      // Engine Pulse
      if (engineRef.current) {
        engineRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 25) * 0.3);
      }
    } else {
      groupRef.current.position.z = -15;
      groupRef.current.position.y = isMobile ? -1 : -2;
    }
  });

  return (
    <group ref={groupRef} position={[0, isMobile ? -1 : -2, -15]}>
      <Float speed={8} rotationIntensity={0.2} floatIntensity={0.2}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={isMobile ? 0.7 : 1}>
          {/* Main Body - Sleek Needle Shape */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.3, 3, 16]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} />
          </mesh>
          
          {/* Cockpit - Glowing Blue */}
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={3} transparent opacity={0.9} />
          </mesh>

          {/* Wings - Razor Sharp */}
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[2.5, 0.05, 0.6]} />
            <meshStandardMaterial color="#ffffff" metalness={1} />
          </mesh>

          {/* Engine - Intense Plasma */}
          <mesh ref={engineRef} position={[0, -1.6, 0]}>
            <cylinderGeometry args={[0.3, 0.05, 0.3, 16]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={15} />
          </mesh>

          {/* Plasma Exhaust Trail */}
          <mesh position={[0, -3, 0]}>
            <cylinderGeometry args={[0.25, 0, 3, 12]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>

      <pointLight position={[0, -2, 0]} intensity={10} color="#a855f7" distance={8} />
    </group>
  );
}
