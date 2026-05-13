"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data";
import { ExternalLink, Play, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

type ProjectType = {
  id: number;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  links: { github?: string; demo?: string; youtube?: string; live?: string };
};

// Reusing the ProjectCard logic for the dedicated page
function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group rounded-2xl glass overflow-hidden border border-white/10 hover:border-primary/40 transition-colors flex flex-col h-full relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Image Placeholder */}
      <div className="relative w-full h-48 md:h-64 bg-muted/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
           <div className="text-muted-foreground/50 font-mono text-xl tracking-widest text-center px-4">{project.title.toUpperCase()}</div>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.links.github && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.links.github}
              target="_blank"
              className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 hover:text-primary transition-colors text-white"
            >
              <FaGithub size={20} />
            </motion.a>
          )}
          {project.links.demo && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.links.demo}
              target="_blank"
              className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 hover:text-primary transition-colors text-white"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {project.links.youtube && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.links.youtube}
              target="_blank"
              className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 hover:text-red-400 transition-colors text-white"
            >
              <Play size={20} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="mb-4">
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {project.features.slice(0, 3).map((feature: string, i: number) => (
              <li key={i}>{feature}</li>
            ))}
            {project.features.length > 3 && (
              <li className="text-primary/70 italic">And more...</li>
            )}
          </ul>
        </div>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium rounded-md bg-secondary/10 text-secondary border border-secondary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A complete archive of my engineering work, from scalable AI systems and competitive programming tools to futuristic web experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
