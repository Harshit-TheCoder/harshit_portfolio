"use client";

import { motion } from "framer-motion";

export function FloatingRunes() {
  const runes = ["∑", "∫", "∇", "Δ", "Ω", "π", "λ", "μ", "Φ", "Ψ", "θ", "α", "β", "γ"];
  
  // Creates an orbital ring of runes
  const RuneRing = ({ radius, duration, reverse = false, opacity = 0.5 }: { radius: number, duration: number, reverse?: boolean, opacity?: number }) => {
    return (
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full border border-primary/10 pointer-events-none"
        style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, opacity }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {runes.slice(0, 8).map((rune, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={i}
              className="absolute text-primary/40 text-xs md:text-sm font-mono drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${-angle}rad)`,
              }}
            >
              {rune}
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
      {/* Background magical circles */}
      <RuneRing radius={200} duration={40} opacity={0.3} />
      <RuneRing radius={300} duration={60} reverse opacity={0.2} />
      <RuneRing radius={450} duration={80} opacity={0.15} />

      {/* Engineering diagrams/Constellations */}
      <motion.div
        className="absolute inset-0 opacity-20 mix-blend-screen"
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexGrid" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path d="M30 0l30 17.32v34.641L30 69.282 0 51.961V17.32z" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
      </motion.div>
    </div>
  );
}
