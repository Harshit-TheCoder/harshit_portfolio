"use client";

import { motion } from "framer-motion";
import { experienceTimeline } from "@/data";
import { Briefcase, Award, Trophy } from "lucide-react";

type TimelineData = {
  title: string;
  company: string;
  date: string;
  description: string;
};

export default function Timeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Experience
            </span>{" "}
            Timeline
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-12">
            {experienceTimeline.map((item: TimelineData, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: TimelineData; index: number }) {
  const isEven = index % 2 === 0;

  const getIcon = () => {
    switch (item.type) {
      case "internship":
        return <Briefcase className="w-5 h-5 text-primary" />;
      case "certification":
        return <Award className="w-5 h-5 text-secondary" />;
      case "competition":
        return <Trophy className="w-5 h-5 text-accent" />;
      default:
        return <Briefcase className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center md:justify-between flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Connector Icon */}
      <div className="absolute left-[29px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 box-glow">
        {getIcon()}
      </div>

      {/* Content Card */}
      <div className={`ml-16 md:ml-0 w-full md:w-[45%] ${isEven ? "md:pl-8 text-left" : "md:pr-8 md:text-right"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl glass border border-white/10 hover:border-primary/50 transition-colors relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-3">
            {item.date}
          </span>
          <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
          <h4 className="text-sm font-medium text-secondary mb-3">{item.organization}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
