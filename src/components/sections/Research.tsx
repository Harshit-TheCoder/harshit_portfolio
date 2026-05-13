"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { researchData } from "@/data";
import { BookOpen, RotateCcw, FlipHorizontal } from "lucide-react";

type ResearchItem = {
  title: string;
  domain: string;
  description: string;
  abstract: string;
  keywords?: string[];
  link: string;
};

// Per-paper keyword lists for highlighting
const paperKeywords: Record<string, string[]> = {
  "Lightweight GNN Autoencoder for Multivariate Wearable Time-Series Anomaly Detection": [
    "GNN", "Graph Neural Network", "autoencoder", "anomaly detection", "IoT",
    "wearable", "INT8 quantization", "PAMAP2", "ROC-AUC", "LOSO",
    "leave-one-subject-out", "extreme value theory", "EVT", "unsupervised",
    "reconstruction error", "edge computing", "3.8K parameters",
  ],
  "Cross Channel Threat Detection: Unified Classification of Phishing Emails, URLs, SMS and Web Content": [
    "phishing", "LightGBM", "CNN–Transformer", "CNN–BiLSTM", "TF-IDF",
    "99.46%", "97.69%", "ROC-AUC", "0.9967", "LSTM", "CatBoost",
    "ensemble", "cybercrime", "SMS spam", "URL detection", "deep learning",
  ],
  "Deep Learning-Based Weld Defect Classification: A Comparative Evaluation of Convolutional and Transformer Architectures": [
    "MobileNetV2", "TIG Aluminium 5083", "CNN", "transformer", "weld defect",
    "sequence based data splitting", "burn through", "contamination",
    "deep learning", "residual architectures", "realtime classification",
  ],
  "Financial Fraud Anomaly Detection": [
    "anomaly detection", "ensemble methods", "graph-based", "temporal modeling",
    "fraudulent", "machine learning", "false-positive", "latency",
  ],
};

/** Splits text into plain/highlighted spans based on keyword list */
function HighlightedAbstract({
  text,
  keywords,
}: {
  text: string;
  keywords: string[];
}) {
  if (!keywords.length) return <span>{text}</span>;

  // Build a regex that matches any keyword (case-insensitive, whole-word-ish)
  const escaped = keywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length); // longest first to avoid partial matches
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isKeyword = keywords.some(
          (k) => k.toLowerCase() === part.toLowerCase()
        );
        return isKeyword ? (
          <mark
            key={i}
            className="bg-transparent text-cyan-400 font-semibold not-italic"
            style={{ textShadow: "0 0 8px rgba(6,182,212,0.4)" }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

/** Splits abstract into sentences and renders them as formatted paragraphs */
function FormattedAbstract({
  abstract,
  title,
}: {
  abstract: string;
  title: string;
}) {
  const keywords = paperKeywords[title] ?? [];
  // Split into sentences (keep delimiter)
  const sentences = abstract.match(/[^.!?]+[.!?]+/g) ?? [abstract];
  // Group into paragraphs of ~3 sentences
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join(" ").trim());
  }

  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-[11px] leading-relaxed text-muted-foreground">
          <HighlightedAbstract text={para} keywords={keywords} />
        </p>
      ))}
    </div>
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
          Click any card to read the full abstract
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
  const keywords = paperKeywords[research.title] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative cursor-pointer select-none"
      style={{ perspective: "1200px", minHeight: "320px" }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={
        flipped
          ? `Collapse abstract for ${research.title}`
          : `Read abstract for ${research.title}`
      }
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", minHeight: "320px" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl glass border border-white/5 hover:border-secondary/40 transition-colors duration-300 overflow-hidden group"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col p-7">
            {/* Header row */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                <BookOpen className="text-secondary w-5 h-5" />
              </div>
              <span className="text-[10px] text-secondary/50 flex items-center gap-1 mt-1">
                <RotateCcw className="w-3 h-3" /> flip for abstract
              </span>
            </div>

            {/* Domain badge */}
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3">
              {research.domain}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-secondary transition-colors leading-snug">
              {research.title}
            </h3>

            {/* Short description */}
            <p className="text-muted-foreground text-sm leading-relaxed mt-auto line-clamp-3">
              {research.description}
            </p>

            {/* Keyword pills */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
                {keywords.slice(0, 5).map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-secondary/25 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(6,182,212,0.04) 100%)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* subtle noise overlay */}
          <div className="absolute inset-0 bg-[#080810]/85" />

          <div className="relative z-10 h-full flex flex-col p-7">
            {/* Back header */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                  Abstract
                </span>
              </div>
              <span className="text-[10px] text-secondary/50 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> click to flip back
              </span>
            </div>

            {/* Paper title on back */}
            <h3 className="text-xs font-bold text-secondary mb-4 leading-snug flex-shrink-0 line-clamp-2">
              {research.title}
            </h3>

            {/* Scrollable formatted abstract */}
            <div
              className="flex-1 overflow-y-auto pr-1"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(168,85,247,0.25) transparent",
              }}
            >
              <FormattedAbstract abstract={research.abstract} title={research.title} />
            </div>

            {/* Index terms row */}
            {keywords.length > 0 && (
              <div
                className="mt-4 pt-3 border-t border-white/5 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">
                  Index Terms
                </p>
                <div className="flex flex-wrap gap-1">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-1.5 py-0.5 text-[9px] rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/15"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {research.link !== "#" && (
              <a
                href={research.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-3 text-[11px] text-secondary hover:text-secondary/80 underline underline-offset-2 transition-colors flex-shrink-0"
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
