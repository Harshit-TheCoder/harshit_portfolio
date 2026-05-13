"use client";

import { motion } from "framer-motion";
import { personalData, educationData } from "@/data";
import { Code, Cpu, Globe, Zap, GraduationCap, Award, CheckCircle2, User, ExternalLink } from "lucide-react";
import { useTransition } from "@/components/transition/PageTransitionProvider";

export default function About() {
  const { startTransition } = useTransition();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Initialize
            </span>{" "}
            Profile
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Left Side: Bio & Skills Overview */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Bio Card */}
            <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-3xl glass box-glow relative overflow-hidden group border border-white/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <User className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Mission Briefing</h3>
              </div>
              <div className="space-y-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                <p className="text-foreground font-medium text-lg italic border-l-2 border-primary/30 pl-4 mb-6">
                  "Turning complex logic into elegant, scalable solutions since I first wrote 'Hello World' in 8th grade."
                </p>
                <p>
                  I'm a Pre-Final Year CS student currently bridging the gap between Kolkata and Chennai. My journey is fueled by a lifelong obsession with puzzles and Rubik&apos;s cubes, which naturally evolved into a mastery of **Competitive Programming**.
                </p>
                <p>
                  With over **1000+ problems solved**, I don&apos;t just write code—I engineer efficiency. My expertise spans from building AI-powered architectures with **TensorFlow** to deploying high-traffic web applications.
                </p>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <FeatureCard icon={<Code className="text-primary" />} title="1000+" desc="DSA Problems" />
              <FeatureCard icon={<Cpu className="text-secondary" />} title="AI/ML" desc="TF & PyTorch" />
              <FeatureCard icon={<Zap className="text-accent" />} title="Full Stack" desc="MERN Specialist" />
              <FeatureCard icon={<Globe className="text-primary" />} title="Scalability" desc="High Performance" />
            </motion.div>
          </motion.div>

          {/* Right Side: Education & Certs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Education Card */}
            <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-3xl glass relative overflow-hidden border border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Academic Status</h3>
              </div>
              <div className="space-y-2">
                <h4 className="text-base md:text-lg font-semibold text-foreground">{educationData.degree}</h4>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <span className="text-primary/80">{educationData.institution}</span>
                  <div className="flex items-center justify-between mt-2 py-2 px-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-mono text-xs uppercase tracking-tighter">Current Standing</span>
                    <span className="font-mono text-accent font-bold">CGPA: {educationData.cgpa}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-3xl glass relative overflow-hidden border border-white/5 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Endorsements</h3>
              </div>
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {(personalData as any).certifications.slice(0, 5).map((cert: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 group/cert">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0 group-hover/cert:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-foreground leading-tight">{cert.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => startTransition("/certifications")}
                className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glass text-xs font-bold uppercase tracking-wider"
              >
                View Full Dossier <ExternalLink size={14} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-4 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all duration-300 group text-center flex flex-col items-center">
      <div className="mb-3 p-2.5 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xs md:text-sm font-bold text-foreground mb-1">{title}</h3>
      <p className="text-[10px] text-muted-foreground leading-tight">{desc}</p>
    </div>
  );
}
