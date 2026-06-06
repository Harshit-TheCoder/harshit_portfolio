"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, Shield, Eye, Leaf, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StartupPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-1/2 -left-[20%] w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 -right-[20%] w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container px-4 mx-auto relative z-10 max-w-7xl">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/#startup"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider">
            AGRICULTURAL STORAGE INTELLIGENCE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            AnnDrishti{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Acoustech
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A comprehensive three-layer defense stack for agricultural silos: Autonomous Acoustic Monitoring, Visual Verification, and Physics-based Environmental Forecasting.
          </p>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          
          {/* SECTION 1: ACOUSTIC */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <Shield size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Acoustic Intelligence Engine</h2>
              <p className="text-primary font-bold tracking-widest uppercase mb-8">Layer 2 Defense</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div variants={fadeInUp} className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold flex items-center gap-3"><ChevronRight className="text-primary w-8 h-8" /> The Fundamental Problem</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Unlike visual image classification—where an insect is bounded by pixels—bioacoustics suffers from extreme mathematical superposition. A single microphone captures the hum of a ventilation fan, the rattling of a tractor, and the microscopic high-frequency stridulation of a pest simultaneously. Because sound is an additive wave, all of these signals physically overlap. We had to build an open-set system capable of mathematically rejecting unknown noises before identifying pests.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold flex items-center gap-3"><ChevronRight className="text-primary w-8 h-8" /> Acoustic Archetype Discovery</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    A critical philosophical shift occurred: <strong>Nature does not organize sound by taxonomy.</strong> Biological taxonomy is defined by genetics and physical morphology, which has almost zero correlation with the frequency at which an insect vibrates its wings.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    By clustering the audio data purely by its mathematical texture, we mathematically proved via Silhouette Scores the existence of 5 universal <strong>Acoustic Archetypes</strong>. Retraining the classifier on Archetypes yielded an astonishing <strong>98% accuracy</strong>.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-3xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-primary">MVP Pipeline Architecture</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>AudioUNet:</strong> Subtracts continuous tractor/fan noise.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>WavLM Foundation Model:</strong> Extracts deep mathematical features from cleaned audio.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>FAISS Cosine Similarity:</strong> Solves the OOD (Out of Distribution) problem by rejecting unknown anomalies.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group bg-black/40">
                  <Image
                    src="/images/startup/acoustic_pca.png"
                    alt="Acoustic Archetype PCA"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-sm md:text-base font-medium text-white/90 drop-shadow-md">WavLM Archetype PCA: Perfect clustering separating the 5 acoustic families using 768-D deep semantic vectors.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION 2: VISION */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <Eye size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Vision Intelligence Engine</h2>
              <p className="text-primary font-bold tracking-widest uppercase mb-8">Layer 3 Defense</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div variants={fadeInUp} className="order-1 lg:order-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group bg-black/40">
                  <Image
                    src="/images/startup/vision_yolo.png"
                    alt="Vision YOLO Detection"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-sm md:text-base font-medium text-white/90 drop-shadow-md">YOLO Model Results: Pinpoint bounding box detections mapped directly onto complex agricultural textures.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-10 order-2 lg:order-2">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold flex items-center gap-3"><ChevronRight className="text-primary w-8 h-8" /> Visual Verification</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Once the Environmental Engine forecasts a risk and the Acoustic Engine detects anomalies, the Vision Intelligence Engine acts as the final confirmation layer. Because physical grain environments are chaotic—featuring immense dust, overlapping shadows, and varied lighting—visual verification must be highly robust to occlusion.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold flex items-center gap-3"><ChevronRight className="text-primary w-8 h-8" /> Deep Learning Detection</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    We deployed state-of-the-art YOLO architectures fine-tuned specifically for warehouse pests. The system uses high-resolution bounding boxes to pinpoint precise pest locations on the grain surface, identifying both isolated stragglers and high-density clusters.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-3xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-primary">Core Visual Capabilities</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>YOLO Validation:</strong> Real-time bounded detection with exact coordinate tracking.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>Cluster Density Mapping:</strong> Identifies localized swarm areas vs isolated sightings.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>False Positive Rejection:</strong> UMAP projection analysis to separate morphological noise from valid pests.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION 3: ENVIRONMENTAL */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <Leaf size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Environmental Intelligence Engine</h2>
              <p className="text-primary font-bold tracking-widest uppercase mb-8">Layer 1 Defense</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div variants={fadeInUp} className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold flex items-center gap-3"><ChevronRight className="text-primary w-8 h-8" /> The Forecasting Philosophy</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Traditional systems wait until damage becomes visible. By the time insects are seen or grain quality drops, the economic loss has already occurred. This engine focuses on the signals that appear <strong>before</strong> visible damage: Grain moisture accumulation, CO2 buildup from microbial respiration, and regional climate pressure.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold flex items-center gap-3"><ChevronRight className="text-primary w-8 h-8" /> Biological Simulation</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    We developed a physics-based simulation powered by 10 years of NASA POWER API weather data covering 33 Indian cities (over 22 million hourly rows). Grain moisture is modeled as an Infinite Impulse Response (IIR) filter. CO2 dynamics are mapped using state-space equations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    When SHAP analysis was run on the trained gradient boosting models, the model <strong>independently rediscovered</strong> that `grain_moisture` and `co2` were the top predictors—proving our simulation's biological fidelity without data leakage.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-3xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-primary">Deployment Architecture</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>Regional Specialist Routing:</strong> 6 specialized models predicting outbreaks based on India's distinct agro-climatic zones.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>Severity Regression:</strong> Predicting 30-day target deltas via ExtraTrees Regressors.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg"><strong>Numba JIT Optimization:</strong> Simulation pipeline processes 22M rows in under 6 minutes.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group bg-black/40">
                  <Image
                    src="/images/startup/env_shap.png"
                    alt="SHAP Feature Importance"
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-sm md:text-base font-medium text-white/90 drop-shadow-md">SHAP Validation: The model independently proves that grain moisture and CO2 are the primary biological drivers of infestations.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
