"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data";
import { ArrowRight, FlipHorizontal } from "lucide-react";
import Link from "next/link";
import { ProjectFlipCard } from "@/components/shared/ProjectFlipCard";

export default function Projects() {
  const displayProjects = projectsData.slice(0, 4);

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Project
            </span>{" "}
            Showcase
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-xs md:text-sm mb-10 md:mb-12 flex items-center justify-center gap-2"
        >
          <FlipHorizontal className="w-3 h-3 md:w-4 md:h-4 text-primary/60" />
          Tap any card to flip for details
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
          {displayProjects.map((project, index) => (
            <ProjectFlipCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glass text-sm md:text-base"
          >
            <span className="font-semibold tracking-wide">Explore All Projects</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
