"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play, RotateCcw } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export type ProjectType = {
  id: string | number;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  links: { github?: string; demo?: string; youtube?: string; live?: string };
  image?: string;
};

export function ProjectFlipCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative cursor-pointer select-none"
      style={{ perspective: "1200px", minHeight: "420px" }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={flipped ? `Flip back: ${project.title}` : `See details: ${project.title}`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", minHeight: "420px" }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl glass border border-white/10 hover:border-primary/40 transition-colors duration-300 overflow-hidden group flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

          {/* Thumbnail */}
          <div className="relative w-full h-48 bg-muted/20 overflow-hidden flex-shrink-0">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
                <span className="text-muted-foreground/40 font-mono text-sm tracking-widest text-center px-4">
                  {project.title.toUpperCase()}
                </span>
              </div>
            )}
            {/* flip hint overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white/80 text-xs flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <RotateCcw className="w-3 h-3" /> Click to see details
              </span>
            </div>
          </div>

          {/* Front content */}
          <div className="relative z-10 p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
              {project.description !== "Description coming soon..."
                ? project.description
                : "Project details coming soon."}
            </p>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-primary/25 overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, rgba(6,182,212,0.07) 0%, rgba(168,85,247,0.04) 100%)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="absolute inset-0 bg-[#080810]/88" />

          <div className="relative z-10 h-full flex flex-col p-6">
            {/* Back header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
                  Project Details
                </span>
              </div>
              <span className="text-[10px] text-primary/50 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> click to flip back
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-primary mb-3 leading-snug flex-shrink-0">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-shrink-0">
              {project.description !== "Description coming soon..."
                ? project.description
                : "Full project details coming soon."}
            </p>

            {/* Features */}
            {project.features.length > 0 && (
              <div
                className="flex-1 overflow-y-auto mb-4"
                onClick={(e) => e.stopPropagation()}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(6,182,212,0.25) transparent",
                }}
              >
                <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">
                  Key Features
                </p>
                <ul className="space-y-1.5">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-1.5 mb-4 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action links */}
            <div
              className="flex items-center gap-3 pt-3 border-t border-white/5 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground hover:text-white hover:border-white/30 transition-colors"
                >
                  <FaGithub size={12} /> GitHub
                </a>
              )}
              {project.links.demo && project.links.demo !== "#" && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
              )}
              {project.links.youtube && (
                <a
                  href={project.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Play size={12} /> Watch
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
