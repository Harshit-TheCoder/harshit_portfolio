"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PointMaterial, Points } from "@react-three/drei";

export default function Starfield() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x * 20;
      pos[i * 3 + 1] = y * 20;
      pos[i * 3 + 2] = z * 20;
    }
    /* eslint-enable react-hooks/purity */
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Drift upward and slowly rotate to simulate floating embers/magic dust
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y += delta / 30;
      ref.current.position.y += delta / 5;
      
      // Reset position to loop
      if (ref.current.position.y > 10) {
        ref.current.position.y = -10;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4AF37" // Gold/Parchment magic
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
