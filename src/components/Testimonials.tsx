"use client";

import { motion } from "framer-motion";

const clientImpressions = [
  {
    quote:
      "הליווי היה מדויק ורגיש לאורך כל הדרך. קיבלנו בית יפיפה ופונקציונלי, הרבה מעבר למה שדמיינו.",
    label: "פרויקט מגורים",
  },
  {
    quote:
      "היכולת לשלב אסתטיקה, תכנון ותקציב בצורה מאוזנת יצרה תוצאה אלגנטית ונעימה מאוד לחיים יומיומיים.",
    label: "עיצוב פנים",
  },
  {
    quote:
      "התהליך היה ברור, מקצועי ונעים. כל החלטה התקבלה בביטחון בזכות הירידה לפרטים והחשיבה המערכתית.",
    label: "ליווי מלא",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-shell scroll-mt-24 bg-warm-beige px-4"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker text-center">Client Impressions</p>
        <motion.h2
          id="testimonials-heading"
          className="section-title mt-3 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          מה אומרים עלינו
        </motion.h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clientImpressions.map((item, i) => (
            <motion.blockquote
              key={item.label}
              className="glass-card h-full p-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <p className="text-base text-warm-charcoal">“{item.quote}”</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                {item.label}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
