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
    groupRef.current.position.y = position.y + Math.sin(t + index) * 0.15;
    groupRef.current.position.x = position.x + Math.cos(t * 0.5 + index) * 0.1;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* 3D Placeholder/Background */}
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#06b6d4" 
            emissiveIntensity={2} 
            wireframe 
            transparent 
            opacity={0.2} 
          />
        </mesh>

        {/* Tech Icon / Label */}
        {showHtml && (
          <Html distanceFactor={12} center>
            <div className="flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-black/70 backdrop-blur-xl border border-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] group transition-all duration-500 scale-100 opacity-100 min-w-[80px] md:min-w-[100px]">
              {icon ? (
                <div className="relative w-6 h-6 md:w-9 md:h-9 mb-1 md:mb-1.5">
                  <Image src={icon} alt={name} fill className="object-contain filter brightness-125" />
                </div>
              ) : (
                <div className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center bg-primary/10 rounded-full mb-1 md:mb-1.5 border border-primary/20">
                  <span className="text-primary font-bold text-sm md:text-base">{name[0]}</span>
                </div>
              )}
              <span className="text-[8px] md:text-xs text-white font-bold tracking-tight text-center whitespace-nowrap">{name}</span>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}
