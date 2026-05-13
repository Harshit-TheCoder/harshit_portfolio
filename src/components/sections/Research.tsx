"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { researchData } from "@/data";
import { BookOpen, FlipHorizontal, RotateCcw } from "lucide-react";

type ResearchPoint = {
  text: string;
  keywords: string[];
};

type ResearchItem = {
  title: string;
  domain: string;
  description: string;
  points: ResearchPoint[];
  link: string;
};

/** Highlights keywords inside a bullet point text */
function HighlightedText({
  text,
  keywords,
}: {
  text: string;
  keywords: string[];
}) {
  if (!keywords.length) return <>{text}</>;

  const escaped = keywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isKw = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
        return isKw ? (
          <span
            key={i}
            className="text-cyan-400 font-semibold"
            style={{ textShadow: "0 0 6px rgba(6,182,212,0.35)" }}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export default function Research() {
  return (
    <section id="research" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Publications
            </span>{" "}
            & Research
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-sm mb-12 flex items-center justify-center gap-2"
        >
          <FlipHorizontal className="w-4 h-4 text-secondary/60" />
          Click any card to read key findings
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchData.map((research, index) => (
            <ResearchFlipCard
              key={index}
              research={research as ResearchItem}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchFlipCard({
  research,
  index,
}: {
  research: ResearchItem;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      /* perspective wrapper — height is auto so both faces can size naturally */
      className="relative cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={
        flipped
          ? `Flip back: ${research.title}`
          : `Read findings: ${research.title}`
      }
    >
      {/*
        We use a fixed min-height so the card doesn't collapse,
        but both faces are position:absolute so they overlap.
        The outer div takes the height of whichever face is taller
        via a hidden spacer.
      */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT ── */}
        <div
          className="w-full rounded-2xl glass border border-white/5 hover:border-secondary/40 transition-colors duration-300 overflow-hidden group"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          <div className="relative z-10 flex flex-col p-6 md:p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                <BookOpen className="text-secondary w-5 h-5" />
              </div>
              <span className="text-[10px] text-secondary/50 flex items-center gap-1 mt-1">
                <RotateCcw className="w-3 h-3" /> flip for findings
              </span>
            </div>

            {/* Domain */}
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">
              {research.domain}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-secondary transition-colors leading-snug">
              {research.title}
            </h3>

            {/* Short description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {research.description}
            </p>

            {/* Keyword pills from first point */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
              {research.points
                .flatMap((p) => p.keywords)
                .slice(0, 5)
                .map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {kw}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 w-full rounded-2xl border border-secondary/25 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(6,182,212,0.04) 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[#080810]/88 rounded-2xl" />

          <div className="relative z-10 flex flex-col p-6 md:p-7">
            {/* Back header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                  Key Findings
                </span>
              </div>
              <span className="text-[10px] text-secondary/50 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> click to flip back
              </span>
            </div>

            {/* Paper title */}
            <h3 className="text-xs font-bold text-secondary mb-4 leading-snug">
              {research.title}
            </h3>

            {/* Bullet points — no scroll, all visible */}
            <ul className="space-y-2">
              {research.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-[3px] flex-shrink-0 text-xs">▸</span>
                  <span className="text-[11px] md:text-xs leading-relaxed text-muted-foreground">
                    <HighlightedText
                      text={point.text}
                      keywords={point.keywords}
                    />
                  </span>
                </li>
              ))}
            </ul>

            {research.link !== "#" && (
              <a
                href={research.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-4 pt-3 border-t border-white/5 text-[11px] text-secondary hover:text-secondary/80 underline underline-offset-2 transition-colors block"
              >
                View full paper →
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
