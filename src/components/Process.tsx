"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/content/siteContent";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export function Process() {
  return (
    <section
      id="process"
      className="section-shell scroll-mt-24 bg-warm-beige px-4"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-kicker text-center">Methodology</p>
        <motion.h2
          id="process-heading"
          className="section-title mt-3 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          תהליך העבודה
        </motion.h2>
        <motion.ol
          className="mt-12 grid gap-5 sm:grid-cols-2"
          role="list"
          aria-label="שלבי התהליך"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
        >
          {processSteps.map((step, i) => (
            <motion.li
              key={i}
              className="glass-card flex items-start gap-4 p-5 sm:p-6"
              variants={item}
            >
              <motion.span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-gold/70 bg-accent-gold/10 text-sm font-semibold text-accent-gold"
                aria-hidden
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(184, 134, 11, 0.15)",
                  borderColor: "rgba(184, 134, 11, 0.9)",
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                {i + 1}
              </motion.span>
              <motion.span
                className="pt-1.5 text-base text-warm-charcoal sm:text-lg"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {step}
              </motion.span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
