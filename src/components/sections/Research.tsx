"use client";

import { motion } from "framer-motion";
import { researchData } from "@/data";
import { BookOpen, ChevronRight } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Publications
            </span>{" "}
            & Research
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchData.map((research, index) => (
            <motion.a
              href={research.link}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl glass border border-white/5 hover:border-secondary/50 transition-all duration-300 relative overflow-hidden block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <BookOpen className="text-secondary w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-secondary group-hover:text-black transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors relative z-10">
                {research.title}
              </h3>
              <p className="text-xs font-mono text-accent mb-4 relative z-10 uppercase tracking-wider">
                {research.domain}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {research.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
