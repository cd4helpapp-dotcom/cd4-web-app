"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Calendar, FileText, MapPin, Mic, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { HeroStat } from "@/types/landing";

interface HeroSectionProps {
  appName: string;
  tagline: string;
  description: string;
  stats: HeroStat[];
  highlights: string[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export function HeroSection({
  appName,
  tagline,
  description,
  stats,
  highlights
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="hero-bg">
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="particles-container">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={`particle-${index}`} className="particle" />
          ))}
        </div>
      </div>
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <ShieldCheck className="h-4 w-4" />
            AI + Human Care Flow
          </motion.p>

          <motion.h1 variants={itemVariants} className="mt-6 font-heading text-4xl leading-tight text-white sm:text-6xl">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
              {appName}
            </span>
            <span className="block text-slate-200">{tagline}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{description}</motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:shadow-[0_14px_40px_rgba(139,92,246,0.35)]"
            >
              Download CD4 AI
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-300/55 hover:bg-white/10"
            >
              Explore Features
            </motion.a>
          </motion.div>

          <motion.ul variants={itemVariants} className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-xl bg-white/6 px-3 py-2 text-sm text-slate-200 ring-1 ring-white/10"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 shadow-[0_30px_100px_-30px_rgba(2,6,23,0.95)]">
            <div className="bg-noise" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Live Product Snapshot
                </p>
                <p className="mt-1 font-heading text-2xl text-white">CD4 AI Mobile Suite</p>
              </div>
              <Image
                src="/images/cd4-logo-nav.png"
                alt="CD4 AI logo"
                width={52}
                height={52}
                className="rounded-2xl object-contain shadow-[0_8px_22px_-12px_rgba(0,0,0,0.8)]"
                unoptimized
              />
            </div>

            <div className="relative z-10 mt-6 space-y-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="premium-card rounded-2xl bg-[rgba(5,9,24,0.95)] p-4 text-white ring-1 ring-white/10"
                >
                  <p className="font-heading text-2xl">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="premium-card relative overflow-hidden mt-5 rounded-3xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
            <div className="bg-noise" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Voice Care Orbit
              </p>

            <div className="voice-orbit">
              <div className="voice-orbit-ring voice-orbit-ring-1" />
              <div className="voice-orbit-ring voice-orbit-ring-2" />

              <div className="voice-orbit-core">
                <Mic className="h-5 w-5 text-cyan-200" />
              </div>

              <div className="voice-orbit-node voice-orbit-node-pos-1 voice-orbit-node--voice">
                <Mic className="h-4 w-4 text-[#7cecff]" />
              </div>
              <div className="voice-orbit-node voice-orbit-node-pos-2 voice-orbit-node--community">
                <Users className="h-4 w-4 text-[#8fb8ff]" />
              </div>
              <div className="voice-orbit-node voice-orbit-node-pos-3 voice-orbit-node--appointment">
                <Calendar className="h-4 w-4 text-[#b9a8ff]" />
              </div>
              <div className="voice-orbit-node voice-orbit-node-pos-4 voice-orbit-node--prescription">
                <FileText className="h-4 w-4 text-[#ffd26d]" />
              </div>
              <div className="voice-orbit-node voice-orbit-node-pos-5 voice-orbit-node--doctor">
                <MapPin className="h-4 w-4 text-[#78f0ba]" />
              </div>
            </div>

            <ul className="voice-orbit-list mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-200">
                <Mic className="h-4 w-4 text-cyan-200" />
                Share your concern by voice
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-200">
                <MapPin className="h-4 w-4 text-emerald-200" />
                Connect with your local doctor
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-200">
                <Calendar className="h-4 w-4 text-violet-200" />
                Book with voice appointment assistant
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-200">
                <FileText className="h-4 w-4 text-amber-200" />
                Get prescription by doctor in chat
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-200">
                <Users className="h-4 w-4 text-blue-200" />
                Join healthcare community social feed
              </li>
            </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
