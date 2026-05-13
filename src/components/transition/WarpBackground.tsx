"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WarpBackground({ active }: { active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1000;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Create stars in a cylinder/tunnel
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 15;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = Math.random() * 100 - 50;
      spd[i] = 0.5 + Math.random() * 2;
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Speed up during transition
      const speedMult = active ? 15 : 0.5;
      pos[i * 3 + 2] += speeds[i] * speedMult * delta * 60;

      // Recycle points
      if (pos[i * 3 + 2] > 50) {
        pos[i * 3 + 2] = -50;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slight rotation for cinematic feel
    pointsRef.current.rotation.z += delta * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
