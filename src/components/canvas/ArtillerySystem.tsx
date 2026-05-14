"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function ArcaneCore() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Crystal Core */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} wireframe />
      </mesh>
      
      {/* Distorted Magical Aura */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} distort={0.4} speed={2} transparent opacity={0.3} />
      </mesh>
      
      {/* Spell Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={4} transparent opacity={0.8} />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function ArtillerySystem() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#D4AF37" />
        
        {/* Magical Stars/Sparks */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
        
        <Float speed={2} floatIntensity={0.5} rotationIntensity={0.2}>
          <group position={[0, 8, -10]}>
            <ArcaneCore />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
