"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { personalData } from "@/data";
import { Download, Mail, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FloatingRunes } from "@/components/canvas/FloatingRunes";

const ArtillerySystem = dynamic(() => import("@/components/canvas/ArtillerySystem"), { ssr: false });

const titles = personalData.titles;

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacityScroll = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const yScroll = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#02050A]">
      {/* Hero Entrance Chamber Reveal */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        className="absolute inset-0 bg-[#02050A] z-50 pointer-events-none"
      />

      <motion.div 
        style={{ opacity: opacityScroll, y: yScroll }}
        suppressHydrationWarning
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="container px-4 mx-auto relative z-10 flex flex-col items-center justify-center text-center perspective-[1200px]"
      >
        
        {/* Profile Image with Glowing Rings */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.03, 1], y: [0, -15, 0], opacity: 1 }}
          transition={{ 
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1, type: "spring" } 
          }}
          className="relative mb-8 group"
        >
          {/* Arcane Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-700 group-hover:scale-110"></div>
          
          {/* Inner Rune Ring */}
          <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-primary/40 animate-[spin_8s_linear_infinite]"></div>
          
          {/* Outer Enchanted Ring */}
          <div className="absolute inset-[-12px] rounded-full border border-dotted border-secondary/50 animate-[spin_12s_linear_infinite_reverse]"></div>
          
          {/* Subtle magical glow */}
          <div className="absolute inset-[-20px] rounded-full border border-accent/20 animate-[spin_20s_linear_infinite]"></div>
          
          <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/50 bg-background/50 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] transition-shadow duration-500 z-10">
            <Image
              src="/ProfileImage/image.png"
              alt={personalData.name}
              fill
              className="object-cover"
              priority
            />
            {/* Holographic Scanline */}
            <div className="holographic-scan"></div>
            
            {/* Subtle Magical Energy Pulses simulating interactions */}
            <div className="absolute top-[20%] left-[30%] w-6 h-6 rounded-full bg-cyan-400/40 blur-xl animate-pulse"></div>
            <div className="absolute bottom-[30%] right-[25%] w-8 h-8 rounded-full bg-primary/40 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Floating magical embers around avatar */}
          {[...Array(5)].map((_, i) => {
            // Deterministic pseudo-random values to prevent hydration mismatch
            const seed1 = (i * 13) % 10 / 10; 
            const seed2 = (i * 27) % 10 / 10;
            const seed3 = (i * 7) % 10 / 10;

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#D4AF37]"
                animate={{
                  y: [0, -30 - seed1 * 20],
                  x: [(seed2 - 0.5) * 40, (seed3 - 0.5) * 60],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + seed1 * 2,
                  repeat: Infinity,
                  delay: seed2 * 2,
                  ease: "easeInOut",
                }}
                style={{
                  top: "50%",
                  left: "50%",
                }}
              />
            );
          })}
        </motion.div>

        {/* Name Reveal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight px-2 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span>Hi, I&apos;m</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] pb-2">{personalData.name}</span>
          </h1>
        </motion.div>

        {/* Dynamic Titles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-12 mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-2"
            >
              <span className="text-muted-foreground font-normal">&gt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                {titles[titleIndex]}
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-5 sm:w-3 sm:h-6 bg-primary ml-1 align-middle shadow-[0_0_10px_#D4AF37]"
              />
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <a href="#projects" className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/50 hover:bg-primary hover:text-black font-semibold transition-all w-full sm:w-auto justify-center magical-border shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              View Projects <ChevronRight size={18} />
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <a href="#contact" className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 transition-all glass w-full sm:w-auto justify-center magical-border shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              Contact Me <Mail size={18} />
            </a>
          </MagneticButton>
          
          <div className="flex gap-4 mt-2 sm:mt-0">
            <MagneticButton>
              <a href={personalData.contact.github} target="_blank" rel="noopener noreferrer" className="relative w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 border border-muted hover:border-primary/50 hover:text-primary transition-colors glass magical-border">
                <FaGithub size={20} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="/resume.pdf" target="_blank" className="relative w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 border border-muted hover:border-primary/50 hover:text-primary transition-colors glass magical-border">
                <Download size={20} />
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>


      <motion.div style={{ opacity: opacityScroll }} suppressHydrationWarning className="absolute inset-0 z-0">
        <ArtillerySystem />
        <FloatingRunes />
      </motion.div>
    </section>
  );
}

// Magnetic Button Wrapper Component
function MagneticButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
}
