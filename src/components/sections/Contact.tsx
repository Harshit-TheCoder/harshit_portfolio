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
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              Send
            </span>{" "}
            Owl Post
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-5 sm:p-8 md:p-12 rounded-3xl glass border border-primary/20 overflow-hidden magical-border"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Left Column: Contact Info */}
          <div className="relative z-10 flex flex-col justify-center space-y-6 md:space-y-8 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Reach Out</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Feel free to connect with me for collaborations, research opportunities, or just to say hi!
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm md:font-medium text-white truncate">{personalData.contact.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{personalData.contact.email2}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary-foreground transition-colors shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm md:font-medium text-white truncate">{personalData.contact.email2}</p>
                  <p className="text-xs text-muted-foreground">Academic Email</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm md:font-semibold text-white mb-4">Social & Coding Profiles</h4>
              <div className="flex flex-wrap gap-2 md:gap-4">
                <ProfileLink href={personalData.contact.linkedin} icon={<FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#0077b5" />
                <ProfileLink href={personalData.contact.github} icon={<FaGithub className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#333" />
                <ProfileLink href={personalData.contact.leetcode} icon={<Code className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#FFA116" />
                <ProfileLink href={personalData.contact.codeforces} icon={<Trophy className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#1f8ACB" />
                <ProfileLink href={personalData.contact.codolio} icon={<ChartBar className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="var(--secondary)" />
                <ProfileLink href={personalData.contact.youtube} icon={<FaYoutube className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#FF0000" />
                <ProfileLink href={personalData.contact.instagram} icon={<FaInstagram className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#E1306C" />
                <ProfileLink href={personalData.contact.facebook} icon={<FaFacebook className="w-4 h-4 md:w-5 md:h-5" />} hoverColor="#1877F2" />
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative z-10 flex flex-col justify-center mt-8 lg:mt-0">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-emerald-500 mb-6" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Message Transmitted</h3>
              <p className="text-sm text-muted-foreground">
                Your connection request has been securely logged. I will respond shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2 relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-black/40 transition-all peer text-sm"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-xs md:text-sm text-muted-foreground transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-primary"
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
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary/50 focus:bg-black/40 transition-all peer text-sm"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-xs md:text-sm text-muted-foreground transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-secondary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-secondary"
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
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent/50 focus:bg-black/40 transition-all peer resize-none text-sm"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-5 text-xs md:text-sm text-muted-foreground transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-4 peer-valid:text-xs peer-valid:text-accent"
                >
                  Payload (Message)
                </label>
              </div>

              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity box-glow disabled:opacity-60 disabled:cursor-not-allowed text-sm md:text-base magical-border relative"
              >
                {isLoading ? "Casting..." : <><span>Cast Spell</span> <Send className="w-4 h-4 md:w-5 md:h-5" /></>}
              </motion.button>
            </form>
          )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProfileLink({ href, icon, hoverColor }: { href: string; icon: React.ReactNode; hoverColor: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors hover:text-white"
      style={{ '--hover-bg': hoverColor } as React.CSSProperties}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
    >
      {icon}
    </a>
  );
}
