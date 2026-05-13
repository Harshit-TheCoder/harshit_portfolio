"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Trail, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "@/data";

// Flatten and randomize skills
const allSkills = Object.values(skillsData).flat().sort(() => Math.random() - 0.5);

function Cannon({ onFire }: { onFire: (pos: THREE.Vector3, dir: THREE.Vector3) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const barrelRef = useRef<THREE.Mesh>(null);
  const lastFireTime = useRef(0);
  const recoilOffset = useRef(0);

  useFrame((state) => {
    if (!groupRef.current || !barrelRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth random aiming
    groupRef.current.rotation.y = Math.sin(t * 0.5) * Math.PI;
    groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.5;

    // Handle recoil recovery
    if (recoilOffset.current > 0) {
      recoilOffset.current = THREE.MathUtils.lerp(recoilOffset.current, 0, 0.1);
      barrelRef.current.position.z = recoilOffset.current;
    }

    // Fire mechanism (every 3 seconds)
    if (t - lastFireTime.current > 3) {
      lastFireTime.current = t;
      recoilOffset.current = 1.5; // Kick back

      // Calculate world direction of the barrel
      const direction = new THREE.Vector3(0, 0, -1);
      direction.applyQuaternion(groupRef.current.quaternion).normalize();
      
      const position = new THREE.Vector3();
      barrelRef.current.getWorldPosition(position);
      // Spawn slightly ahead of the barrel
      position.add(direction.clone().multiplyScalar(2));

      onFire(position, direction);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} floatIntensity={0.5} rotationIntensity={0.2}>
        {/* Cannon Base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1, 1.5, 1, 32]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Glowing Core */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#000" emissive="#06b6d4" emissiveIntensity={2} />
        </mesh>

        {/* Barrel Group */}
        <group ref={barrelRef}>
          <mesh position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.5, 3, 32]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Barrel rings */}
          <mesh position={[0, 0, -2.8]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.05, 16, 32]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Represents a fireball traveling -> bursting -> skill text
function SkillProjectile({ 
  id, 
  startPos, 
  direction, 
  skill, 
  onComplete 
}: { 
  id: number; 
  startPos: THREE.Vector3; 
  direction: THREE.Vector3; 
  skill: string; 
  onComplete: (id: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [phase, setPhase] = useState<"traveling" | "burst" | "orbit">("traveling");
  const travelDist = useRef(0);
  const orbitAngle = useRef(Math.random() * Math.PI * 2);
  const targetDist = 10 + Math.random() * 5; // Distance to burst

  // Random color per skill
  const isCyan = Math.random() > 0.5;
  const color = isCyan ? "#06b6d4" : "#a855f7";

  useFrame((state, delta) => {
    if (!ref.current) return;

    if (phase === "traveling") {
      // Move along direction
      const speed = 15;
      const step = direction.clone().multiplyScalar(speed * delta);
      ref.current.position.add(step);
      travelDist.current += speed * delta;

      if (travelDist.current > targetDist) {
        setPhase("burst");
        setTimeout(() => setPhase("orbit"), 500); // 0.5s burst phase
      }
    } else if (phase === "orbit") {
      // Gentle orbital floating
      orbitAngle.current += delta * 0.2;
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 2 + id) * 0.01;
    }
  });

  return (
    <group ref={ref} position={startPos}>
      {phase === "traveling" && (
        <Trail width={1} color={color} length={10} decay={1}>
          <Sphere args={[0.2, 16, 16]}>
            <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={5} />
          </Sphere>
        </Trail>
      )}

      {phase === "burst" && (
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} distort={0.6} speed={10} />
        </Sphere>
      )}

      {phase === "orbit" && (
        <Float speed={2} floatIntensity={1}>
          <mesh>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe />
          </mesh>
        </Float>
      )}
    </group>
  );
}

export default function ArtillerySystem() {
  const [projectiles, setProjectiles] = useState<any[]>([]);
  const skillIndex = useRef(0);

  const handleFire = (position: THREE.Vector3, direction: THREE.Vector3) => {
    if (skillIndex.current >= allSkills.length) {
      skillIndex.current = 0; // Loop skills if we run out
    }
    
    const newProj = {
      id: Date.now(),
      startPos: position.clone(),
      direction: direction.clone(),
      skill: allSkills[skillIndex.current],
    };
    
    skillIndex.current++;
    
    setProjectiles(prev => {
      // Keep max 15 skills on screen for performance
      const updated = [...prev, newProj];
      if (updated.length > 15) return updated.slice(updated.length - 15);
      return updated;
    });
  };

  const removeProjectile = (id: number) => {
    // We actually just let them overwrite via the length limit to avoid complex state jumping,
    // but this func is here if we want explicit cleanup.
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        
        {/* Environment Effects */}
        <fog attach="fog" args={["#030014", 10, 50]} />
        
        {/* Holographic Grid Floor */}
        <gridHelper args={[100, 50, "#06b6d4", "#1e3a8a"]} position={[0, -10, 0]} />

        <Cannon onFire={handleFire} />
        
        {projectiles.map((p) => (
          <SkillProjectile
            key={p.id}
            id={p.id}
            startPos={p.startPos}
            direction={p.direction}
            skill={p.skill}
            onComplete={removeProjectile}
          />
        ))}
      </Canvas>
    </div>
  );
}
