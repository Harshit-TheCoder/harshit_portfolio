"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import TechSphere from "./TechSphere";
import LaserBeam from "./LaserBeam";
import OrbitingIcon from "./OrbitingIcon";
import TechConstellation from "./TechConstellation";

const coreTechs = [
  { name: "Data Structure & Algorithms", icon: "" },
  { name: "System Design", icon: "" },
  { name: "CS Fundamentals", icon: "" },
  { name: "Frontend Design", icon: "" },
  { name: "Backend Design", icon: "" },
  { name: "Machine Learning", icon: "" },
  { name: "Deep Learning", icon: "" },
  { name: "Agentic AI", icon: "" },
  { name: "Natural Language Processing", icon: "" },
  { name: "Generative AI", icon: "" },
  { name: "Docker", icon: "/skills/docker.png" },
  { name: "Version Control", icon: "/skills/git.png" },
];

function SceneContent({ 
  phase, 
  setPhase, 
  onComplete 
}: { 
  phase: number; 
  setPhase: (p: number) => void; 
  onComplete: () => void 
}) {
  const [deployedCount, setDeployedCount] = useState(0);
  const [activeLaser, setActiveLaser] = useState<number | null>(null);
  const lastDeployTime = useRef(0);
  const completedRef = useRef(false);

  const iconTargets = useMemo(() => {
    const radius = 10; // Increased radius for better spacing
    return coreTechs.map((_, i) => {
      const angle = (i / coreTechs.length) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (phase === 1 && t > 1) setPhase(2);
    if (phase === 2 && t > 2) setPhase(3);

    if (phase === 3) {
      if (deployedCount < coreTechs.length) {
        if (t - lastDeployTime.current > 0.5) {
          setActiveLaser(deployedCount);
          setTimeout(() => {
            setDeployedCount(prev => prev + 1);
            setActiveLaser(null);
          }, 150);
          lastDeployTime.current = t;
        }
      } else {
        setPhase(4);
        setTimeout(() => setPhase(5), 2000); // reduced wait to 2s
      }
    }

    if (phase === 5 && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {phase >= 2 && <TechSphere />}
      {activeLaser !== null && <LaserBeam target={iconTargets[activeLaser]} active={true} />}
      {coreTechs.map((tech, i) => (
        <OrbitingIcon key={tech.name} index={i} name={tech.name} icon={tech.icon} position={iconTargets[i]} visible={i < deployedCount} />
      ))}
      <TechConstellation active={phase >= 4} icons={iconTargets.map((pos, i) => ({ position: pos, visible: i < deployedCount }))} />
      <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={50} />
    </>
  );
}

export default function SkillArtilleryScene({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1);

  return (
    <div className="w-full h-[700px] relative overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-primary/30 rounded-tl-3xl" />
        <div className="absolute top-10 right-10 w-40 h-40 border-r border-t border-primary/30 rounded-tr-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 border-l border-b border-primary/30 rounded-bl-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border-r border-b border-primary/30 rounded-br-3xl" />
      </div>

      <div className="w-full h-full">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <SceneContent phase={phase} setPhase={setPhase} onComplete={onComplete} />
        </Canvas>
      </div>
    </div>
  );
}
