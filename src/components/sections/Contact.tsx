"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Code, Trophy, ChartBar } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { personalData } from "@/data";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Establish
            </span>{" "}
            Connection
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 rounded-3xl glass border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Left Column: Contact Info */}
          <div className="relative z-10 flex flex-col justify-center space-y-8 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Reach Out</h3>
              <p className="text-muted-foreground">
                Feel free to connect with me for collaborations, research opportunities, or just to say hi!
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">{personalData.contact.email}</p>
                  <p className="text-sm text-muted-foreground">{personalData.contact.email2}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary-foreground transition-colors shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">{personalData.contact.email2}</p>
                  <p className="text-sm text-muted-foreground">Academic Email</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Social & Coding Profiles</h4>
              <div className="flex flex-wrap gap-4">
                <a href={personalData.contact.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href={personalData.contact.github} target="_blank" rel="noreferrer" title="GitHub" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#333] hover:text-white transition-colors">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href={personalData.contact.leetcode} target="_blank" rel="noreferrer" title="LeetCode" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFA116] hover:text-white transition-colors">
                  <Code className="w-5 h-5" />
                </a>
                <a href={personalData.contact.codeforces} target="_blank" rel="noreferrer" title="Codeforces" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1f8ACB] hover:text-white transition-colors">
                  <Trophy className="w-5 h-5" />
                </a>
                <a href={personalData.contact.codolio} target="_blank" rel="noreferrer" title="Codolio" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                  <ChartBar className="w-5 h-5" />
                </a>
                <a href={personalData.contact.youtube} target="_blank" rel="noreferrer" title="YouTube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href={personalData.contact.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href={personalData.contact.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative z-10 flex flex-col justify-center">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Message Transmitted</h3>
              <p className="text-muted-foreground">
                Your connection request has been securely logged. I will respond shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/5 transition-colors"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-black/40 transition-all peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-muted-foreground transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-primary"
                  >
                    Identifier (Name)
                  </label>
                </div>
                <div className="space-y-2 relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary/50 focus:bg-black/40 transition-all peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-muted-foreground transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-secondary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-secondary"
                  >
                    Communication Link (Email)
                  </label>
                </div>
              </div>

              <div className="space-y-2 relative group pt-2">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent/50 focus:bg-black/40 transition-all peer resize-none"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-5 text-muted-foreground transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-4 peer-valid:text-xs peer-valid:text-accent"
                >
                  Payload (Message)
                </label>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity box-glow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Transmitting..." : <><span>Transmit</span> <Send className="w-5 h-5" /></>}
              </motion.button>
            </form>
          )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
