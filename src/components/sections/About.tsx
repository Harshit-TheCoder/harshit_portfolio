"use client";

import { motion } from "framer-motion";
import { personalData, educationData } from "@/data";
import { Code, Cpu, Globe, Zap, GraduationCap } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Initialize
            </span>{" "}
            Profile
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="p-6 rounded-2xl glass box-glow relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {personalData.headline}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {personalData.about}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 rounded-2xl glass relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="text-accent w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Education</h3>
              </div>
              <h4 className="text-base font-semibold text-foreground mb-1">{educationData.degree}</h4>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{educationData.institution}</span>
                <span className="font-mono text-accent">CGPA: {educationData.cgpa}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-8">
              <FeatureCard icon={<Code className="text-primary" />} title="Full Stack" desc="Scalable Systems" />
              <FeatureCard icon={<Cpu className="text-secondary" />} title="AI/ML" desc="Intelligent Models" />
              <FeatureCard icon={<Zap className="text-accent" />} title="DSA" desc="Optimized Solutions" />
              <FeatureCard icon={<Globe className="text-primary" />} title="Startups" desc="Visionary Tech" />
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[400px] flex justify-center items-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
              <motion.div
                animate={{ rotateY: 360, rotateX: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-2 border-primary/30 rounded-full absolute"
              />
              <motion.div
                animate={{ rotateY: -360, rotateZ: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-2 border-secondary/30 rounded-full absolute scale-110"
              />
              <motion.div
                animate={{ rotateX: 360, rotateZ: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-2 border-accent/20 rounded-full absolute scale-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 blur-xl animate-pulse" />
                <Cpu className="absolute w-12 h-12 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl glass border border-white/5 hover:border-primary/30 transition-colors group">
      <div className="mb-3 p-2 rounded-lg bg-white/5 w-fit group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
