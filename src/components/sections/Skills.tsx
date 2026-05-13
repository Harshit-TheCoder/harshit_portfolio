"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { skillsData } from "@/data";
import Image from "next/image";
import SkillArtilleryScene from "../canvas/SkillArtilleryScene";

export default function Skills() {
  const [showGrid, setShowGrid] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={containerRef} className="py-12 md:py-24 relative overflow-hidden min-h-screen">
      <div className="container px-4 mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16 w-full"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Engineering
            </span>{" "}
            Arsenal
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="mt-4 md:mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            A strategic deployment of advanced technologies engineered for high-performance AI systems.
          </p>
        </motion.div>

        {/* Cinematic Skill Artillery Section */}
        <AnimatePresence mode="wait">
          {!showGrid && (
            <motion.div 
              key="artillery"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full mb-8 md:mb-12"
            >
              <SkillArtilleryScene start={isInView} onComplete={() => setShowGrid(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categorized Tech Stack Grid */}
        <AnimatePresence>
          {showGrid && (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {Object.entries(skillsData).map(([category, skills], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 md:p-6 rounded-2xl glass border border-white/5 box-glow group"
                >
                  <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 md:mb-6 capitalize tracking-wider">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full bg-white/5 border border-white/10 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-all duration-300"
                      >
                        {skill.icon && (
                          <div className="relative w-4 h-4 md:w-5 md:h-5 flex-shrink-0">
                            <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                          </div>
                        )}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
