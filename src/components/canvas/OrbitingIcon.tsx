"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

interface TechIconProps {
  name: string;
  icon: string;
  position: THREE.Vector3;
  visible: boolean;
  index: number;
}

export default function OrbitingIcon({ name, icon, position, visible, index }: TechIconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [showHtml, setShowHtml] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowHtml(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowHtml(false);
    }
  }, [visible]);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;
    const t = state.clock.getElapsedTime();
    
    // Gentle orbital drift
    groupRef.current.position.y = position.y + Math.sin(t + index) * 0.2;
    groupRef.current.position.x = position.x + Math.cos(t * 0.5 + index) * 0.1;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* 3D Placeholder/Background */}
        <mesh>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#06b6d4" 
            emissiveIntensity={2} 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>

        {/* Tech Icon / Label */}
        {showHtml && (
          <Html distanceFactor={15} center>
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-primary/40 shadow-[0_0_30px_rgba(6,182,212,0.4)] group transition-all duration-500 scale-100 opacity-100 min-w-[120px]">
              {icon ? (
                <div className="relative w-12 h-12 mb-2">
                  <Image src={icon} alt={name} fill className="object-contain filter brightness-125" />
                </div>
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mb-2 border border-primary/30">
                  <span className="text-primary font-bold text-xl">{name[0]}</span>
                </div>
              )}
              <span className="text-sm text-white font-bold tracking-wide text-center whitespace-nowrap">{name}</span>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}
