"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { business, logoPath } from "@/content/siteContent";

export function Footer() {
  return (
    <footer
      className="border-t border-warm-sand/50 bg-warm-charcoal px-4 py-10 text-warm-beige"
      role="contentinfo"
    >
      <motion.div
        className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        >
          <Link
            href="#main"
            className="flex shrink-0 p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-charcoal"
            aria-label={`${business.name} - דף הבית`}
          >
            <Image
              src={logoPath}
              alt=""
              width={160}
              height={80}
              className="h-14 w-auto max-w-[200px] object-contain sm:h-16 sm:max-w-[240px]"
            />
          </Link>
        </motion.div>
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm" aria-label="קישורי צור קשר">
            <a
              href={business.whatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-gold-light focus-ring rounded px-1"
            >
              וואטסאפ
            </a>
            <a href={business.call} className="ltr-inline hover:text-accent-gold-light focus-ring rounded px-1">
              {business.phoneDisplay}
            </a>
            <a href={business.emailMailto} className="ltr-inline break-all hover:text-accent-gold-light focus-ring rounded px-1">
              {business.email}
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-gold-light focus-ring rounded px-1"
            >
              Instagram
            </a>
        </nav>

        <div className="text-sm text-warm-beige/90">
          <p className="font-semibold tracking-wide">FATEN</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-warm-beige/80">
            Architecture & Interior Design
          </p>
        </div>

        <div className="text-center text-xs text-warm-beige/70">
          <p>עוצב ובונה את האתר</p>
          <p className="mt-3">
            <a
              href="tel:+972543223106"
              className="ltr-inline hover:text-accent-gold-light focus-ring rounded px-1"
            >
              demawebapps — 054-322-3106
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
