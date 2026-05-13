"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "@/data";
import Image from "next/image";
import SkillArtilleryScene from "../canvas/SkillArtilleryScene";

export default function Skills() {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <section id="skills" className="py-24 relative overflow-hidden min-h-screen">
      <div className="container px-4 mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Engineering
            </span>{" "}
            Arsenal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            A strategic deployment of advanced technologies engineered for high-performance AI systems.
          </p>
        </motion.div>

        {/* Cinematic Skill Artillery Section */}
        <AnimatePresence mode="wait">
          {!showGrid && (
            <motion.div 
              key="artillery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full mb-12"
            >
              <SkillArtilleryScene onComplete={() => setShowGrid(true)} />
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
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Object.entries(skillsData).map(([category, skills], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl glass border border-white/5 box-glow group"
                >
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 capitalize tracking-wider">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-all duration-300"
                      >
                        {skill.icon && (
                          <div className="relative w-5 h-5 flex-shrink-0">
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
