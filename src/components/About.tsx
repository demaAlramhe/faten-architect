"use client";

import { motion } from "framer-motion";
import { about } from "@/content/siteContent";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-warm-beige px-4 py-16 sm:py-20 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          id="about-heading"
          className="text-2xl font-semibold text-warm-black sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          אודות
        </motion.h2>
        <motion.div
          className="mt-6 whitespace-pre-line text-lg leading-relaxed text-warm-charcoal"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.08 }}
        >
          {about}
        </motion.div>
      </div>
    </section>
  );
}
