"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "@/data";

// Extract all skills into a flat array
const allSkills = Object.values(skillsData).flat();

function SkillNode({ position, skill, index }: { position: [number, number, number]; skill: { name: string; icon: string }; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a consistent random color per node (cyan or purple)
  const isPrimary = index % 2 === 0;
  const color = isPrimary ? "#06b6d4" : "#a855f7"; // Tailwind cyan-500 and purple-500

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.8}
        />
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.2}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {skill.name}
        </Text>
      </mesh>
    </Float>
  );
}

function Galaxy() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Arrange nodes in a spherical spiral or random orbital positions
  const nodes = useMemo(() => {
    const count = allSkills.length;
    const items = [];
    const radius = 5;
    
    for (let i = 0; i < count; i++) {
      // Golden ratio spiral distribution on a sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      items.push({
        position: [x, y, z] as [number, number, number],
        skill: allSkills[i]
      });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Slow global rotation
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <SkillNode key={i} position={node.position} skill={node.skill} index={i} />
      ))}
      
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#000" emissive="#ffffff" emissiveIntensity={0.1} wireframe={true} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={10} color="#06b6d4" distance={20} />
    </group>
  );
}

export default function TechUniverse() {
  return (
    <div className="w-full h-full relative cursor-move touch-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} frameloop="demand">
        <ambientLight intensity={0.2} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <Galaxy />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-black/40 px-4 py-1 rounded-full backdrop-blur-md border border-white/10">
        Drag to explore universe
      </div>
    </div>
  );
}
