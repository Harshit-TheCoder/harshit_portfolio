"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => setIsSubmitted(true), 1000);
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
          className="p-8 md:p-12 rounded-3xl glass border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity box-glow"
              >
                Transmit <Send className="w-5 h-5" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
