"use client";

import React, { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface TechConstellationProps {
  icons: { position: THREE.Vector3; visible: boolean }[];
  active: boolean;
}

export default function TechConstellation({ icons, active }: TechConstellationProps) {
  const visibleIcons = useMemo(() => icons.filter(icon => icon.visible), [icons]);

  if (!active || visibleIcons.length < 2) return null;

  return (
    <group>
      {/* Orbital Paths */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} transparent opacity={0.1} />
      </mesh>

      {/* Network Lines */}
      {visibleIcons.map((icon, idx) => {
        // Connect each icon to the next one and to the center
        const nextIcon = visibleIcons[(idx + 1) % visibleIcons.length];
        return (
          <group key={idx}>
            {/* Connection to center */}
            <Line
              points={[new THREE.Vector3(0, 0, 0), icon.position]}
              color="#06b6d4"
              lineWidth={0.5}
              transparent
              opacity={0.2}
            />
            {/* Connection to next icon */}
            <Line
              points={[icon.position, nextIcon.position]}
              color="#a855f7"
              lineWidth={0.3}
              transparent
              opacity={0.15}
            />
          </group>
        );
      })}
    </group>
  );
}
