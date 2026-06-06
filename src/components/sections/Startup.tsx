"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Eye, Leaf, Shield } from "lucide-react";
import { useTransition } from "@/components/transition/PageTransitionProvider";

export default function Startup() {
  const { startTransition } = useTransition();

  const domains = [
    {
      title: "Acoustic Intelligence",
      description: "Continuous autonomous bioacoustic anomaly detection using AudioUNet and WavLM.",
      icon: <Shield className="w-8 h-8 text-primary" />
    },
    {
      title: "Vision Engine",
      description: "Visual verification of pest infestations using advanced YOLO-based computer vision.",
      icon: <Eye className="w-8 h-8 text-primary" />
    },
    {
      title: "Environmental Forecasting",
      description: "Physics-based biological simulation for predicting grain outbreak probabilities weeks in advance.",
      icon: <Leaf className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section id="startup" className="py-16 md:py-24 relative overflow-hidden bg-background/50">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AnnDrishti
            </span>{" "}
            Acoustech
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            A comprehensive storage intelligence platform addressing catastrophic post-harvest grain losses through autonomous acoustic monitoring, visual verification, and environmental forecasting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto relative z-10">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors group"
            >
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {domain.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{domain.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <button
            onClick={() => startTransition("/startup")}
            className="relative group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] text-sm md:text-base font-semibold tracking-wide cursor-pointer"
          >
            <span>Explore The Technology</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
