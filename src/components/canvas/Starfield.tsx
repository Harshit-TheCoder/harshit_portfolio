"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PointMaterial, Points } from "@react-three/drei";

export default function Starfield() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const count = 5000;
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
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6" // Purple tone
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
