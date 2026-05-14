"use client";

import { motion } from "framer-motion";
import { achievementsData } from "@/data";
import Image from "next/image";
import { Award, Star, ExternalLink, ArrowRight } from "lucide-react";
import { useTransition } from "@/components/transition/PageTransitionProvider";

export default function Achievements() {
  const displayAchievements = achievementsData.slice(0, 3);
  const { startTransition } = useTransition();

  return (
    <section id="certifications" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              Legendary
            </span>{" "}
            Achievements
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
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
              className="relative p-6 rounded-xl glass border border-primary/20 hover:border-primary/50 group overflow-hidden block magical-border"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="text-primary w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors border border-primary/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <Award className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">
                {achievement.title}
              </h3>

              {(achievement as any).image && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-white/10">
                  <Image 
                    src={(achievement as any).image} 
                    alt={achievement.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{achievement.issuer}</span>
                <span className="text-xs bg-white/5 px-2 py-1 rounded-md">{achievement.date}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* See All Button with Rocket Transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <button
            onClick={() => startTransition("/certifications")}
            className="relative group flex items-center gap-2 px-8 py-4 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-black transition-all duration-300 glass cursor-pointer magical-border shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            <span className="font-semibold tracking-wide">Explore All Certifications</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
