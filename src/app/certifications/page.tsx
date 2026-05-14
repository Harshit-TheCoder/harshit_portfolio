"use client";

import { motion } from "framer-motion";
import { achievementsData } from "@/data";
import { Award, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link 
            href="/#certifications" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-400">Achievements</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A comprehensive list of my competitive programming milestones, professional certifications, and technical recognitions.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement, index) => (
            <motion.a
              key={index}
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
              className="group p-6 rounded-2xl glass border border-white/5 hover:border-secondary/50 transition-all duration-500 box-glow flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                  <Award size={24} />
                </div>
                <ExternalLink size={20} className="text-muted-foreground group-hover:text-secondary transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">
                {achievement.title}
              </h3>

              {achievement.image && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-white/10">
                  <Image 
                    src={achievement.image} 
                    alt={achievement.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
                <span className="font-semibold">{achievement.issuer}</span>
                <span>•</span>
                <span>{achievement.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
