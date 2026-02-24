"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero, logoPath } from "@/content/siteContent";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-warm-cream px-4 py-16 sm:py-20 md:py-24 lg:py-28"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* טקסט – נשאר בצד ימין ב-RTL */}
        <div className="flex-1 text-center lg:text-right">
          <motion.h1
            id="hero-heading"
            className="whitespace-pre-line text-3xl font-semibold leading-tight text-warm-black sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-relaxed text-warm-charcoal sm:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {hero.subheadline}
          </motion.p>
        </div>
        {/* לוגו גדול בתוך עיגול כהה – אנימציה דינמית */}
        <motion.div
          className="relative flex h-52 w-52 shrink-0 items-center justify-center rounded-full bg-warm-charcoal p-5 shadow-xl sm:h-60 sm:w-60 sm:p-6 md:h-64 md:w-64 md:p-6 lg:h-72 lg:w-72 lg:p-7 xl:h-80 xl:w-80 xl:p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: [1, 1.03, 1],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.15 },
            scale: {
              duration: 2.5,
              delay: 0.15,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.3,
            },
          }}
        >
          <motion.div
            className="flex h-full w-full items-center justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src={logoPath}
                alt=""
                width={280}
                height={280}
                className="h-full w-full object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
