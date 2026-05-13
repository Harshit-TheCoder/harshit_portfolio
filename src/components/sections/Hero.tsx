"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "@/data";
import { Download, Mail, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image";

const ArtillerySystem = dynamic(() => import("@/components/canvas/ArtillerySystem"), { ssr: false });

const titles = personalData.titles;

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Profile Image with Glowing Rings */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="relative mb-8 group"
        >
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
          <div className="absolute inset-[-4px] rounded-full border border-primary/30 animate-[spin_4s_linear_infinite]"></div>
          <div className="absolute inset-[-8px] rounded-full border border-secondary/20 animate-[spin_6s_linear_infinite_reverse]"></div>
          
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/50 bg-background/50 backdrop-blur-md">
            <Image
              src="/avatar.svg"
              alt={personalData.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name Reveal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{personalData.name}</span>
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
              className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-2"
            >
              <span className="text-muted-foreground font-normal">&gt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {titles[titleIndex]}
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-3 h-6 bg-cyan-400 ml-1 align-middle"
              />
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <a href="#projects" className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              View Projects <ChevronRight size={18} />
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <a href="#contact" className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 transition-colors glass">
              Contact Me <Mail size={18} />
            </a>
          </MagneticButton>
          
          <div className="flex gap-4 ml-0 md:ml-4">
            <MagneticButton>
              <a href={personalData.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-muted/50 border border-muted hover:border-primary/50 hover:text-primary transition-colors glass">
                <FaGithub size={20} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="/resume.pdf" target="_blank" className="p-3 rounded-full bg-muted/50 border border-muted hover:border-primary/50 hover:text-primary transition-colors glass">
                <Download size={20} />
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* 3D Artillery Background */}
      <ArtillerySystem />
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
    >
      {children}
    </motion.div>
  );
}




