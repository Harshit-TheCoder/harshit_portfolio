"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data";
import { ArrowLeft, FlipHorizontal } from "lucide-react";
import Link from "next/link";
import { ProjectFlipCard } from "@/components/shared/ProjectFlipCard";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            All{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Projects
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A complete archive of my engineering work — from scalable AI systems and
            competitive programming tools to futuristic web experiences.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground text-sm mb-12 flex items-center gap-2"
        >
          <FlipHorizontal className="w-4 h-4 text-primary/60" />
          Click any card to see full project details
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectFlipCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
