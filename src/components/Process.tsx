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
      className="scroll-mt-20 bg-warm-beige px-4 py-16 sm:py-20 md:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          id="process-heading"
          className="text-2xl font-semibold text-warm-black sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          תהליך העבודה
        </motion.h2>
        <motion.ol
          className="mt-10 space-y-6"
          role="list"
          aria-label="שלבי התהליך"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {processSteps.map((step, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-4"
              variants={item}
            >
              <motion.span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent-gold bg-warm-beige text-sm font-semibold text-accent-gold"
                aria-hidden
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "rgba(184, 134, 11, 0.15)",
                  borderColor: "rgba(184, 134, 11, 0.9)",
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                {i + 1}
              </motion.span>
              <motion.span
                className="pt-1.5 text-lg text-warm-charcoal"
                whileHover={{ x: 4 }}
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
