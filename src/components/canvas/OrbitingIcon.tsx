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
          <Html distanceFactor={14} center>
            <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-black/70 backdrop-blur-xl border border-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] group transition-all duration-500 scale-100 opacity-100 min-w-[100px] md:min-w-[120px]">
              {icon ? (
                icon.startsWith("devicon") ? (
                  <div className="flex items-center justify-center mb-2 md:mb-2.5">
                    <i className={`${icon} text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${icon.includes('github') || icon.includes('nextjs') || icon.includes('flask') ? 'text-white' : ''}`}></i>
                  </div>
                ) : (
                  <div className="relative w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-2.5">
                    <Image src={icon} alt={name} fill className="object-contain filter brightness-125" />
                  </div>
                )
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-primary/10 rounded-full mb-2 md:mb-2.5 border border-primary/20">
                  <span className="text-primary font-bold text-base md:text-lg">{name[0]}</span>
                </div>
              )}
              <span className="text-[10px] md:text-sm text-white font-bold tracking-tight text-center whitespace-nowrap">{name}</span>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}
