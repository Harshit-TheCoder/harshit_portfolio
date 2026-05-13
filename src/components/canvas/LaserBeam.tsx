"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface LaserBeamProps {
  target: THREE.Vector3;
  active: boolean;
  color?: string;
}

export default function LaserBeam({ target, active, color = "#06b6d4" }: LaserBeamProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { position, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(0, 0, 0);
    const direction = new THREE.Vector3().subVectors(target, start);
    const len = direction.length();
    const pos = new THREE.Vector3().addVectors(start, target).multiplyScalar(0.5);
    
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(up, direction.clone().normalize());
    
    const rot = new THREE.Euler().setFromQuaternion(quaternion);
    
    return { position: pos, rotation: rot, length: len };
  }, [target]);

  useFrame((state) => {
    if (!meshRef.current) return;
    if (active) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.2);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.2);
    } else {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 0, 0.3);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 0, 0.3);
    }
  });

  if (!active) return null;

  return (
    <group>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <cylinderGeometry args={[0.05, 0.2, length, 12]} />
        <meshStandardMaterial 
          color="#fff" 
          emissive={color} 
          emissiveIntensity={10} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      {/* Outer Glow */}
      <mesh position={position} rotation={rotation}>
        <cylinderGeometry args={[0.2, 0.4, length, 12]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2} 
          transparent 
          opacity={0.2} 
        />
      </mesh>

      {/* Impact Point */}
      <mesh position={target}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <MeshDistortMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={5} 
          distort={0.6} 
          speed={5} 
        />
      </mesh>
    </group>
  );
}
