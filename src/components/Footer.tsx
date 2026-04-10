"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { business, logoPath } from "@/content/siteContent";

export function Footer() {
  return (
    <footer
      className="border-t border-warm-sand/35 bg-warm-charcoal px-4 pb-8 pt-12 text-warm-beige"
      role="contentinfo"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="grid items-start justify-items-center gap-10 text-center md:grid-cols-2 md:gap-12">
          <div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
              <Link
                href="#main"
                className="mx-auto flex w-fit shrink-0 rounded-xl border border-warm-sand/35 bg-warm-charcoal px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-charcoal"
                aria-label={`${business.name} - דף הבית`}
              >
                <Image
                  src={logoPath}
                  alt=""
                  width={190}
                  height={90}
                  className="h-16 w-auto max-w-[240px] object-contain"
                />
              </Link>
            </motion.div>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-warm-beige/80">
              אדריכלות ועיצוב פנים בגישה נקייה, מדויקת ואלגנטית. תכנון חכם, חומריות מאוזנת וירידה לפרטים עד לתוצאה הרמונית ומרשימה.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-gold-light/90">
              Contact
            </p>
            <nav
              className="grid gap-2 text-sm"
              aria-label="קישורי צור קשר"
            >
              <a
                href={business.whatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-2 py-1.5 text-warm-beige/90 transition hover:bg-warm-black/35 hover:text-accent-gold-light focus-ring"
              >
                וואטסאפ
              </a>
              <a
                href={business.call}
                className="ltr-inline rounded-lg px-2 py-1.5 text-warm-beige/90 transition hover:bg-warm-black/35 hover:text-accent-gold-light focus-ring"
              >
                {business.phoneDisplay}
              </a>
              <a
                href={business.emailMailto}
                className="ltr-inline break-all rounded-lg px-2 py-1.5 text-warm-beige/90 transition hover:bg-warm-black/35 hover:text-accent-gold-light focus-ring"
              >
                {business.email}
              </a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-2 py-1.5 text-warm-beige/90 transition hover:bg-warm-black/35 hover:text-accent-gold-light focus-ring"
              >
                Instagram
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-warm-sand/25 pt-5 text-center">
          <p className="text-[11px] text-warm-beige/60">
            <a
              href="https://demadigitalsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-1 transition hover:text-accent-gold-light focus-ring"
            >
              בניית האתר: Dema Digital Solutions
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
