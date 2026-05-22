"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureItem } from "@/types/landing";

interface FeatureGridProps {
  features: FeatureItem[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section id="features" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Core Capabilities"
          title="Voice-first booking and AI doctor context in one flow."
          description="CD4 AI combines voice appointment booking, AI history snapshot delivery, and follow-up continuity in a single premium experience."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              key={feature.title}
              className="group premium-card rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]"
            >
              <div className="inline-flex rounded-lg bg-white/10 p-2 ring-1 ring-white/15">
                <Sparkles className="h-4 w-4 text-cyan-200" />
              </div>
              <h3 className="mt-4 font-heading text-xl text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
