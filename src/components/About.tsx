"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about, logoPath } from "@/content/siteContent";

export function About() {
  return (
    <section
      id="about"
      className="section-shell scroll-mt-24 bg-warm-beige px-4"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <motion.div
          className="flex items-center justify-center rounded-2xl border border-warm-sand/35 bg-warm-charcoal p-8 shadow-[0_20px_44px_-20px_rgba(26,24,22,0.6)] sm:p-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={logoPath}
            alt=""
            width={320}
            height={220}
            className="h-auto w-full max-w-[240px] object-contain"
          />
        </motion.div>

        <motion.div
          className="glass-card p-6 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        >
          <p className="section-kicker">Studio Profile</p>
          <h2 id="about-heading" className="section-title mt-3">
            אודות הסטודיו
          </h2>
          <div className="mt-6 whitespace-pre-line text-base text-warm-charcoal sm:text-lg">
            {about}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
