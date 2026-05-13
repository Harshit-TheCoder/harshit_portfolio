"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Trail, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

export default function ArtillerySystem() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} floatIntensity={0.5} rotationIntensity={0.2}>
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#000" emissive="#06b6d4" emissiveIntensity={2} />
          </mesh>
          
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={5} transparent opacity={0.6} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
