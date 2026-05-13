"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import WarpBackground from "./WarpBackground";
import RocketModel from "./RocketModel";

export default function RocketTransition({ isActive }: { isActive: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] pointer-events-none touch-none"
        >
          {/* Background Fade/Flash - More opaque on mobile for better visibility */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0] }}
            transition={{ times: [0, 0.2, 0.8, 1], duration: 3 }}
            className="absolute inset-0 bg-background/95 md:bg-background/80 backdrop-blur-md"
          />

          {/* Cinematic Light Streaks */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-1/2 left-0 w-full h-[2px] bg-primary shadow-[0_0_30px_#06b6d4] origin-left"
            />
          </div>

          <div className="absolute inset-0 w-full h-full">
            <Canvas 
              camera={{ position: [0, 0, 20], fov: 60 }}
              dpr={[1, 2]} // Performance optimization for mobile
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <WarpBackground active={isActive} />
                <RocketModel active={isActive} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
              </Suspense>
            </Canvas>
          </div>

          {/* Navigation HUD Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 1, 0] }}
              transition={{ times: [0, 0.1, 0.9], duration: 3 }}
              className="font-mono text-primary/60 text-[10px] md:text-xs tracking-[0.3em] uppercase text-center"
            >
              Initializing Hyperspace Jump
              <div className="mt-4 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#06b6d4]"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
