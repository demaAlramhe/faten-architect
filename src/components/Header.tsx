"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [activeSection, setActiveSection] = useState<string>("#about");

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.2, 0.35, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-warm-sand/25 bg-warm-charcoal shadow-[0_10px_24px_-16px_rgba(26,24,22,0.8)]"
      role="banner"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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
            className="h-14 w-auto max-w-[190px] object-contain sm:h-16 sm:max-w-[220px]"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-warm-sand/20 bg-warm-black/20 px-1.5 py-1 md:flex"
          aria-label="ניווט ראשי"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-2.5 py-1.5 text-[13px] transition-all duration-200 focus-ring focus-visible:ring-offset-warm-charcoal ${
                activeSection === link.href
                  ? "border border-accent-gold/40 bg-accent-gold/85 text-white shadow-[0_8px_16px_-12px_rgba(184,134,11,0.65)]"
                  : "text-warm-beige/90 hover:bg-warm-black/30 hover:text-white"
              }`}
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
            className="hidden rounded-full bg-accent-gold px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(184,134,11,0.95)] focus-ring focus-visible:ring-offset-warm-charcoal sm:inline-block"
            whileHover={{ y: -1.5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {business.ctaPrimary}
          </motion.a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-sand/35 text-warm-beige hover:bg-warm-black/40 focus-ring focus-visible:ring-offset-warm-charcoal md:hidden"
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
            className="overflow-hidden border-t border-warm-sand/20 bg-warm-charcoal md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="ניווט נייד">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    activeSection === link.href
                      ? "bg-accent-gold/15 text-accent-gold-light"
                      : "text-warm-beige/90 hover:bg-warm-black/30"
                  }`}
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
