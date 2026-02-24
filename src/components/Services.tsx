"use client";

import { motion } from "framer-motion";
import { services } from "@/content/siteContent";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-warm-cream px-4 py-16 sm:py-20 md:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h2
          id="services-heading"
          className="text-2xl font-semibold text-warm-black sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          שירותים
        </motion.h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2" role="list">
          {services.map((text, i) => (
            <motion.li
              key={i}
              className="flex gap-3 rounded-lg border border-warm-sand/60 bg-warm-beige/80 p-4 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 120, damping: 22, delay: i * 0.07 }}
              whileHover={{
                y: -2,
                boxShadow: "0 8px 24px -8px rgba(26, 24, 22, 0.12)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold"
                aria-hidden
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              />
              <span className="text-warm-charcoal">{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
