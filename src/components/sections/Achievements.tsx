"use client";

import { motion } from "framer-motion";
import { achievementsData } from "@/data";
import { Award, Star, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Achievements() {
  const displayAchievements = achievementsData.slice(0, 3);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
              Achievements
            </span>{" "}
            & Recognitions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAchievements.map((achievement, index) => (
            <motion.a
              href={achievement.link}
              target="_blank"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl glass border border-white/5 hover:border-accent/40 group relative overflow-hidden block"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="text-accent w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Award className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                {achievement.title}
              </h3>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{achievement.issuer}</span>
                <span className="text-xs bg-white/5 px-2 py-1 rounded-md">{achievement.date}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link 
            href="/certifications" 
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 glass"
          >
            <span className="font-semibold tracking-wide">Explore All Certifications</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
