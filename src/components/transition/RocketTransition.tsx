"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import WarpBackground from "./WarpBackground";
import RocketModel from "./RocketModel";

export default function RocketTransition({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Background Fade/Flash */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ times: [0, 0.2, 0.8, 1], duration: 3 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Cinematic Light Streaks (CSS) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-1/2 left-0 w-full h-[1px] bg-primary shadow-[0_0_20px_#06b6d4] origin-left"
            />
          </div>

          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
              <Suspense fallback={null}>
                <WarpBackground active={isActive} />
                <RocketModel active={isActive} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
              </Suspense>
            </Canvas>
          </div>

          {/* Navigation HUD Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 1, 0] }}
              transition={{ times: [0, 0.1, 0.9], duration: 3 }}
              className="font-mono text-primary/40 text-xs tracking-[0.3em] uppercase"
            >
              Initializing Hyperspace Jump
              <div className="mt-2 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-1 h-1 bg-primary"
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
