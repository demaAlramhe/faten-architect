"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { business, logoPath } from "@/content/siteContent";

const navLinks = [
  { href: "#about", label: "אודות" },
  { href: "#services", label: "שירותים" },
  { href: "#process", label: "תהליך" },
  { href: "#projects", label: "פרויקטים" },
  { href: "#contact", label: "צור קשר" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-warm-black/30 bg-warm-charcoal"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link
          href="#main"
          className="flex shrink-0 p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-charcoal"
          aria-label={`${business.name} - דף הבית`}
        >
          <Image
            src={logoPath}
            alt=""
            width={140}
            height={140}
            className="h-14 w-auto max-w-[180px] object-contain sm:h-16 sm:max-w-[220px]"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="ניווט ראשי"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-warm-beige/90 transition-colors hover:bg-warm-black/40 hover:text-white focus-ring focus-visible:ring-offset-warm-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href={business.whatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-accent-gold px-4 py-2 text-sm font-medium text-white shadow-md focus-ring focus-visible:ring-offset-warm-charcoal sm:inline-block"
            animate={{
              scale: [1, 1.04, 1],
              boxShadow: [
                "0 4px 14px 0 rgba(184, 134, 11, 0.35)",
                "0 6px 20px 2px rgba(184, 134, 11, 0.45)",
                "0 4px 14px 0 rgba(184, 134, 11, 0.35)",
              ],
            }}
            transition={{
              scale: {
                duration: 2.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              boxShadow: {
                duration: 2.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 8px 24px 4px rgba(184, 134, 11, 0.5)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            {business.ctaPrimary}
          </motion.a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-warm-beige hover:bg-warm-black/40 focus-ring focus-visible:ring-offset-warm-charcoal md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">{mobileOpen ? "סגור" : "תפריט"}</span>
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-warm-black/30 bg-warm-charcoal md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="ניווט נייד">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-warm-beige/90 hover:bg-warm-black/40"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={business.whatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg bg-accent-gold px-4 py-2.5 text-center font-medium text-white"
              >
                {business.ctaPrimary}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
