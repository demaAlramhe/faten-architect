"use client";

import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-warm-beige px-4 py-16 sm:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          id="testimonials-heading"
          className="text-2xl font-semibold text-warm-black sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          מה אומרים עלינו
        </motion.h2>
        <motion.p
          className="mt-4 text-warm-charcoal"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.1 }}
        >
          מקום להמלצות ולסיפורי הצלחה —{" "}
          <motion.span
            className="inline-block font-medium text-accent-gold"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            בקרוב.
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
}
