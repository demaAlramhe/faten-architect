"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { logoPath } from "@/content/siteContent";

export function Hero() {
  return (
    <section
      className="section-shell relative overflow-hidden bg-warm-cream px-4"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-warm-sand/35 to-transparent" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-warm-stone/30 blur-3xl" />

      <div className="mx-auto grid max-w-5xl items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="text-center">
          <motion.p
            className="text-sm font-medium tracking-[0.18em] text-accent-gold/90 sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            אדריכלות ועיצוב פנים
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="mt-4 text-3xl font-semibold leading-[1.35] text-warm-black sm:text-4xl lg:text-[2.7rem]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            תכנון ועיצוב שמדייק את החיים שלך
          </motion.h1>
          <motion.p
            className="mt-5 text-base font-medium tracking-[0.08em] text-warm-charcoal/85 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            פונקציונלי • אלגנטי • מרשים
          </motion.p>

          <motion.div
            className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-warm-charcoal sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
          >
            היי, אני פאתן אל רמחי חליפה, אדריכלית ומעצבת פנים. בעלות תואר ראשון באדריכלות, עם 4 שנות ניסיון בתכנון מבני ציבור ומגורים. מלווה פרויקטים בהתאמה אישית — מהבנת הצרכים ועד תכנון חכם וניצול מקסימלי של החלל, עם שפה עיצובית הרמונית וירידה לפרטים.
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <a
              href="#contact"
              className="rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(184,134,11,0.95)] transition hover:-translate-y-0.5 hover:bg-accent-gold-dark focus-ring"
            >
              לתיאום שיחת ייעוץ
            </a>
            <a
              href="#projects"
              className="rounded-full border border-warm-stone bg-white/70 px-6 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-accent-gold/50 hover:bg-white focus-ring"
            >
              לצפייה בפרויקטים
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center overflow-hidden rounded-full border border-warm-sand/35 bg-warm-charcoal p-7 shadow-[0_20px_44px_-20px_rgba(26,24,22,0.6)] sm:h-[330px] sm:w-[330px] sm:p-9"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.55,
            delay: 0.18,
            ease: "easeOut",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,168,75,0.16),transparent_50%)]" />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full"
          >
            <Image
              src={logoPath}
              alt=""
              width={420}
              height={300}
              className="mx-auto h-auto w-full max-w-[220px] object-contain sm:max-w-[260px]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
