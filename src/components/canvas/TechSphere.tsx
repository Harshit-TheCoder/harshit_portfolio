"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function TechSphere() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shell1Ref = useRef<THREE.Group>(null);
  const shell2Ref = useRef<THREE.Group>(null);
  const shell3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.z = t * 0.2;
    }

    if (shell1Ref.current) {
      shell1Ref.current.rotation.y = -t * 0.3;
      shell1Ref.current.rotation.x = t * 0.1;
    }

    if (shell2Ref.current) {
      shell2Ref.current.rotation.z = t * 0.4;
      shell2Ref.current.rotation.y = t * 0.2;
    }

    if (shell3Ref.current) {
      shell3Ref.current.rotation.x = -t * 0.5;
      shell3Ref.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core Glowing Energy */}
        <Sphere ref={coreRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={2}
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </Sphere>

        {/* Outer Holographic Shells */}
        <group ref={shell1Ref}>
          <mesh>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={5} transparent opacity={0.6} />
          </mesh>
        </group>

        <group ref={shell2Ref}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.015, 16, 100]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={3} transparent opacity={0.4} />
          </mesh>
        </group>

        <group ref={shell3Ref}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <sphereGeometry args={[2.2, 32, 32]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#3b82f6" 
              emissiveIntensity={1} 
              wireframe 
              transparent 
              opacity={0.1} 
            />
          </mesh>
        </group>

        {/* Mechanical Ring Segments */}
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <mesh position={[2.5, 0, 0]}>
              <boxGeometry args={[0.2, 0.5, 0.1]} />
              <meshStandardMaterial color="#111" metalness={1} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </Float>

      {/* Ambient Particle Energy */}
      <pointLight intensity={2} color="#06b6d4" distance={10} />
    </group>
  );
}
