"use client";

import { useState, FormEvent } from "react";
import { business } from "@/content/siteContent";

interface FormState {
  name: string;
  phone: string;
  message: string;
}

const initial: FormState = { name: "", phone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const validate = (values: FormState): Partial<FormState> => {
    const e: Partial<FormState> = {};
    if (!values.name.trim()) e.name = "נא למלא את השם";
    if (!values.phone.trim()) e.phone = "נא למלא מספר טלפון";
    else if (!/^[\d\s\-+()]+$/.test(values.phone)) e.phone = "מספר טלפון לא תקין";
    if (!values.message.trim()) e.message = "נא למלא את ההודעה";
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const e2 = validate(form);
    setErrors(e2);
    setTouched({ name: true, phone: true, message: true });
    if (Object.keys(e2).length > 0) return;

    const subject = encodeURIComponent(`פניה מאתר – ${form.name}`);
    const body = encodeURIComponent(
      `שם: ${form.name}\nטלפון: ${form.phone}\n\nהודעה:\n${form.message}`
    );
    window.location.href = `${business.emailMailto}?subject=${subject}&body=${body}`;
    setForm(initial);
    setErrors({});
    setTouched({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
      aria-label="טופס צור קשר"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-warm-charcoal">
          שם
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          className="mt-1 w-full rounded-lg border border-warm-stone bg-white px-3 py-2 text-warm-black focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
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
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
          className="ltr-inline mt-1 w-full rounded-lg border border-warm-stone bg-white px-3 py-2 text-warm-black focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
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
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          onBlur={() => setTouched((p) => ({ ...p, message: true }))}
          rows={4}
          className="mt-1 w-full rounded-lg border border-warm-stone bg-white px-3 py-2 text-warm-black focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
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
      <button
        type="submit"
        className="w-full rounded-lg bg-accent-gold px-4 py-3 font-medium text-white transition-colors hover:bg-accent-gold-dark focus-ring"
      >
        שליחת הודעה
      </button>
    </form>
  );
}
