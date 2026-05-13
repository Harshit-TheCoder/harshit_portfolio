"use client";

import { motion } from "framer-motion";
import { personalData } from "@/data";
import { Code2, Terminal, TerminalSquare } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Profiles() {
  const profiles = [
    { name: "GitHub", icon: <FaGithub size={24} />, link: personalData.contact.github, color: "hover:border-white hover:text-white" },
    { name: "LinkedIn", icon: <FaLinkedin size={24} />, link: personalData.contact.linkedin, color: "hover:border-blue-500 hover:text-blue-500" },
    { name: "LeetCode", icon: <Code2 size={24} />, link: personalData.contact.leetcode, color: "hover:border-yellow-500 hover:text-yellow-500" },
    { name: "Codeforces", icon: <Terminal size={24} />, link: personalData.contact.codeforces, color: "hover:border-red-500 hover:text-red-500" },
    { name: "Codolio", icon: <TerminalSquare size={24} />, link: personalData.contact.codolio, color: "hover:border-emerald-500 hover:text-emerald-500" },
    { name: "YouTube", icon: <FaYoutube size={24} />, link: personalData.contact.youtube, color: "hover:border-red-600 hover:text-red-600" },
  ];

  return (
    <section id="profiles" className="py-24 relative overflow-hidden">
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
              Coding
            </span>{" "}
            Profiles
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {profiles.map((profile, index) => (
            <motion.a
              key={index}
              href={profile.link}
              target="_blank"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-6 w-32 h-32 rounded-2xl glass border border-white/10 transition-all ${profile.color}`}
            >
              <div className="mb-3">
                {profile.icon}
              </div>
              <span className="text-sm font-medium">{profile.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
