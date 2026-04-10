"use client";

import { motion } from "framer-motion";
import { business } from "@/content/siteContent";

export function CtaStrip() {
  return (
    <section className="section-shell bg-warm-beige px-4">
      <motion.div
        className="mx-auto max-w-6xl rounded-3xl border border-warm-sand/70 bg-warm-charcoal px-6 py-10 text-center text-warm-beige shadow-[0_20px_45px_-22px_rgba(26,24,22,0.65)] sm:px-10"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.45 }}
      >
        <p className="section-kicker text-accent-gold-light">Ready To Start</p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          בואו נבנה יחד חלל שמרגיש מדויק ונכון
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-warm-beige/85">
          שיחת ייעוץ ממוקדת תעזור להגדיר כיוון ברור לפרויקט, עם תכנון חכם ושפה עיצובית מאוזנת.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={business.whatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-gold-dark focus-ring focus-visible:ring-offset-warm-charcoal"
          >
            קביעת שיחת ייעוץ
          </a>
          <a
            href="#projects"
            className="rounded-full border border-warm-sand/60 bg-transparent px-6 py-3 text-sm font-semibold text-warm-beige transition hover:border-accent-gold/80 hover:text-accent-gold-light focus-ring focus-visible:ring-offset-warm-charcoal"
          >
            צפייה בפרויקטים
          </a>
        </div>
      </motion.div>
    </section>
  );
}
