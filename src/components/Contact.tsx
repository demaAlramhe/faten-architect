"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { business, contactIcons, faq } from "@/content/siteContent";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-warm-cream px-4 py-16 sm:py-20 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="contact-heading"
          className="text-2xl font-semibold text-warm-black sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        >
          צור קשר
        </motion.h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-medium text-warm-black">שלחו הודעה</h3>
            <div className="mt-4 max-w-md">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="lg:pt-16"
          >
            <h3 className="text-lg font-medium text-warm-black">דרכי התקשרות</h3>
            <ul className="mt-4 flex flex-wrap gap-4" role="list">
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
                    className="flex items-center justify-center rounded-lg border border-accent-gold/50 bg-warm-beige/50 p-3 transition-colors hover:border-accent-gold hover:bg-warm-sand/30 focus-ring"
                    aria-label={item.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <Image src={item.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 border-t border-warm-sand/60 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-medium text-warm-black">שאלות נפוצות</h3>
          <dl className="mt-4 space-y-4">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 24, delay: i * 0.06 }}
                className="rounded-lg py-1"
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
