"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Script from "next/script";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqegvdyk";

interface FormState {
  name: string;
  phone: string;
  message: string;
}

const initial: FormState = { name: "", phone: "", message: "" };

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState> & { captcha?: string }>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileReady || !turnstileRef.current || widgetIdRef.current != null) return;
    const w = window.turnstile;
    if (w && turnstileRef.current) {
      widgetIdRef.current = w.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setCaptchaToken(token),
      });
    }
    return () => {
      if (widgetIdRef.current != null && window.turnstile?.reset) {
        window.turnstile.reset(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [turnstileReady]);

  const validate = (values: FormState): Partial<FormState> & { captcha?: string } => {
    const e: Partial<FormState> & { captcha?: string } = {};
    if (!values.name.trim()) e.name = "נא למלא את השם";
    if (!values.phone.trim()) e.phone = "נא למלא מספר טלפון";
    else if (!/^[\d\s\-+()]+$/.test(values.phone)) e.phone = "מספר טלפון לא תקין";
    if (!values.message.trim()) e.message = "נא למלא את ההודעה";
    if (TURNSTILE_SITE_KEY && !captchaToken) e.captcha = "נא לאמת שאינך רובוט";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const e2 = validate(form);
    setErrors(e2);
    setTouched({ name: true, phone: true, message: true });
    setSubmitStatus("idle");
    if (Object.keys(e2).length > 0) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("phone", form.phone.trim());
      payload.append("message", form.message.trim());

      if (captchaToken) {
        payload.append("cf-turnstile-response", captchaToken);
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitStatus("success");
      setForm(initial);
      setErrors({});
      setTouched({});
      setCaptchaToken(null);
      if (widgetIdRef.current != null && window.turnstile?.reset) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
      aria-label="טופס צור קשר"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-warm-charcoal">
          שם
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          className="mt-1.5 w-full rounded-xl border border-warm-stone/80 bg-white px-4 py-3 text-warm-black shadow-sm transition focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
          autoComplete="name"
          aria-required="true"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-warm-charcoal">
          טלפון
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
          className="ltr-inline mt-1.5 w-full rounded-xl border border-warm-stone/80 bg-white px-4 py-3 text-warm-black shadow-sm transition focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
          autoComplete="tel"
          aria-required="true"
          aria-invalid={touched.phone && !!errors.phone}
          aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
        />
        {touched.phone && errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-warm-charcoal">
          הודעה
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          onBlur={() => setTouched((p) => ({ ...p, message: true }))}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-warm-stone/80 bg-white px-4 py-3 text-warm-black shadow-sm transition focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
          aria-required="true"
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
        />
        {touched.message && errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            onLoad={() => setTurnstileReady(true)}
          />
          <div className="flex flex-col gap-1">
            <div ref={turnstileRef} className="[&_.cf-turnstile]:inline-block" />
            {errors.captcha && (
              <p className="text-sm text-red-600" role="alert">
                {errors.captcha}
              </p>
            )}
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-accent-gold px-4 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(184,134,11,0.95)] transition hover:-translate-y-0.5 hover:bg-accent-gold-dark focus-ring disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-accent-gold"
      >
        {isSubmitting ? "שולח..." : "שליחת הודעה"}
      </button>

      {submitStatus === "success" && (
        <p className="text-center text-sm font-medium text-green-700" role="status">
          ההודעה נשלחה בהצלחה
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-center text-sm font-medium text-red-600" role="alert">
          אירעה שגיאה, נסו שוב
        </p>
      )}
    </form>
  );
}
