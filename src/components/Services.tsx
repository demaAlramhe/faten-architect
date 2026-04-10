"use client";

import { motion } from "framer-motion";
import { services } from "@/content/siteContent";

export function Services() {
  return (
    <section
      id="services"
      className="section-shell scroll-mt-24 bg-warm-cream px-4"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="section-kicker text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.4 }}
        >
          What We Do
        </motion.p>
        <motion.h2
          id="services-heading"
          className="section-title mt-3 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          שירותים
        </motion.h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {services.map((text, i) => (
            <motion.li
              key={i}
              className="glass-card group flex gap-3 p-5 sm:p-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ type: "spring", stiffness: 120, damping: 22, delay: i * 0.07 }}
              whileHover={{
                y: -4,
                boxShadow: "0 18px 30px -16px rgba(26, 24, 22, 0.18)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.span
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-gold"
                aria-hidden
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              />
              <span className="text-sm text-warm-charcoal sm:text-base">{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
