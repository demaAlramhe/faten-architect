"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { business, contactIcons, faq } from "@/content/siteContent";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="section-shell scroll-mt-24 bg-warm-cream px-4"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Contact</p>
        <motion.h2
          id="contact-heading"
          className="section-title mt-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          צור קשר
        </motion.h2>
        <p className="mt-3 max-w-2xl text-warm-charcoal">
          נשמח לתכנן יחד את הפרויקט הבא שלך ולבנות חלל מדויק, אלגנטי ונכון עבורך.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <motion.div
            className="glass-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-warm-black">שלחו הודעה</h3>
            <div className="mt-5">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center sm:p-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 }}
          >
            <h3 className="text-xl font-semibold text-warm-black">דרכי התקשרות</h3>
            <ul className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-4" role="list">
              {[
                { href: business.whatsApp, icon: contactIcons.whatsapp, label: `וואטסאפ – ${business.ctaPrimary}`, external: true },
                { href: business.call, icon: contactIcons.phone, label: `טלפון ${business.phoneDisplay}`, external: false },
                { href: business.emailMailto, icon: contactIcons.email, label: `אימייל ${business.email}`, external: false },
                { href: business.instagram, icon: contactIcons.instagram, label: "Instagram", external: true },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.05 + i * 0.05 }}
                >
                  <motion.a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex h-full min-h-[76px] items-center justify-center rounded-xl border border-accent-gold/35 bg-white/60 p-3 transition hover:border-accent-gold hover:bg-white focus-ring"
                    aria-label={item.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <Image src={item.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            <div className="mx-auto mt-7 max-w-sm space-y-3">
              <div className="rounded-xl border border-warm-sand/60 bg-white/55 p-4 text-center">
                <p className="text-xs font-semibold tracking-wide text-warm-charcoal/80">טלפון ישיר</p>
                <a
                  href={business.call}
                  className="ltr-inline mt-1.5 block text-center text-lg font-semibold text-warm-black transition hover:text-accent-gold focus-ring rounded"
                >
                  {business.phoneDisplay}
                </a>
              </div>
              <div className="rounded-xl border border-warm-sand/60 bg-white/55 p-4 text-center">
                <p className="text-xs font-semibold tracking-wide text-warm-charcoal/80">אימייל</p>
                <a
                  href={business.emailMailto}
                  className="ltr-inline mt-1.5 block break-all text-center text-base font-medium text-warm-black transition hover:text-accent-gold focus-ring rounded"
                >
                  {business.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 border-t border-warm-sand/60 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-warm-black">שאלות נפוצות</h3>
          <dl className="mt-5 grid gap-4 md:grid-cols-3">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 24, delay: i * 0.06 }}
                className="glass-card p-5"
              >
                <dt className="font-medium text-warm-charcoal">{item.question}</dt>
                <dd className="mt-1 text-warm-charcoal/90">{item.answer}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
