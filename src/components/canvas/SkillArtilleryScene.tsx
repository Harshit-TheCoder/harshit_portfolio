"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  const { viewport } = useThree();
  const [deployedCount, setDeployedCount] = useState(0);
  const [activeLaser, setActiveLaser] = useState<number | null>(null);
  const lastDeployTime = useRef(0);
  const completedRef = useRef(false);

  // Significantly reduced radius for all screen sizes
  const isMobile = viewport.width < 10;
  const radius = isMobile ? viewport.width * 0.45 : 7; 

  const iconTargets = useMemo(() => {
    return coreTechs.map((_, i) => {
      const angle = (i / coreTechs.length) * Math.PI * 2;
      const xMult = isMobile ? 1.1 : 1; 
      const yMult = isMobile ? 0.8 : 1; 
      return new THREE.Vector3(
        Math.cos(angle) * radius * xMult,
        Math.sin(angle) * radius * yMult,
        0
      );
    });
  }, [radius, isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (phase === 1 && t > 1) setPhase(2);
    if (phase === 2 && t > 2) setPhase(3);

    if (phase === 3) {
      if (deployedCount < coreTechs.length) {
        if (t - lastDeployTime.current > 0.4) {
          setActiveLaser(deployedCount);
          setTimeout(() => {
            setDeployedCount(prev => prev + 1);
            setActiveLaser(null);
          }, 100);
          lastDeployTime.current = t;
        }
      } else {
        setPhase(4);
        setTimeout(() => setPhase(5), 2500);
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
      <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={1} fade speed={2} />
      
      <group position={[0, 0, 0]} scale={isMobile ? 0.8 : 1}>
        {phase >= 2 && <TechSphere />}
        {activeLaser !== null && <LaserBeam target={iconTargets[activeLaser]} active={true} />}
        {coreTechs.map((tech, i) => (
          <OrbitingIcon 
            key={tech.name} 
            index={i} 
            name={tech.name} 
            icon={tech.icon} 
            position={iconTargets[i]} 
            visible={i < deployedCount} 
          />
        ))}
        <TechConstellation active={phase >= 4} icons={iconTargets.map((pos, i) => ({ position: pos, visible: i < deployedCount }))} />
      </group>
      
      <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 25 : 20]} fov={50} />
    </>
  );
}

export default function SkillArtilleryScene({ onComplete, start }: { onComplete: () => void; start: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (start && phase === 0) {
      setPhase(1);
    }
  }, [start, phase]);

  if (phase === 0) return null;

  return (
    <div className="w-full h-[500px] md:h-[650px] relative overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 md:opacity-50">
        <div className="absolute top-5 left-5 md:top-10 md:left-10 w-20 h-20 md:w-32 md:h-32 border-l border-t border-primary/20 rounded-tl-xl md:rounded-tl-2xl" />
        <div className="absolute top-5 right-5 md:top-10 md:right-10 w-20 h-20 md:w-32 md:h-32 border-r border-t border-primary/20 rounded-tr-xl md:rounded-tr-2xl" />
        <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 w-20 h-20 md:w-32 md:h-32 border-l border-b border-primary/20 rounded-bl-xl md:rounded-bl-2xl" />
        <div className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-20 h-20 md:w-32 md:h-32 border-r border-b border-primary/20 rounded-br-xl md:rounded-br-2xl" />
      </div>

      <div className="w-full h-full">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <SceneContent phase={phase} setPhase={setPhase} onComplete={onComplete} />
        </Canvas>
      </div>
    </div>
  );
}
