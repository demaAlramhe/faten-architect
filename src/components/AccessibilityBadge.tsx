"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "faten-a11y";

type ReadingMode = "default" | "light" | "dark";

interface A11yState {
  fontScale: number;
  highContrast: boolean;
  readingMode: ReadingMode;
  underlineLinks: boolean;
  bigCursor: boolean;
  highlightHeadings: boolean;
  highlightClickable: boolean;
}

const defaultState: A11yState = {
  fontScale: 100,
  highContrast: false,
  readingMode: "default",
  underlineLinks: false,
  bigCursor: false,
  highlightHeadings: false,
  highlightClickable: false,
};

function loadState(): A11yState {
  if (typeof window === "undefined") return defaultState;
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      const parsed = JSON.parse(s) as Partial<A11yState>;
      return { ...defaultState, ...parsed };
    }
  } catch {}
  return defaultState;
}

function saveState(state: A11yState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function applyState(state: A11yState) {
  const root = document.documentElement;
  root.setAttribute("data-a11y-font-scale", String(state.fontScale));
  root.setAttribute("data-a11y-contrast", state.highContrast ? "high" : "normal");
  root.setAttribute("data-a11y-reading", state.readingMode);
  root.setAttribute("data-a11y-links", state.underlineLinks ? "on" : "off");
  root.setAttribute("data-a11y-cursor", state.bigCursor ? "large" : "normal");
  root.setAttribute("data-a11y-headings", state.highlightHeadings ? "on" : "off");
  root.setAttribute("data-a11y-clickable", state.highlightClickable ? "on" : "off");
}

const accessibilitySvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6 sm:h-7 sm:w-7"
    aria-hidden
  >
    <circle cx="10" cy="6" r="2.2" />
    <path d="M10 8.5v1.2l-2.8 1v2.6h1.2v-1.8l1.6-.6v5.4h1.2v-5.2l2 .7v1.8h1.2v-2.6l-3.2-1.2V8.5H10Z" />
    <circle cx="7.2" cy="17.2" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.2" cy="17.2" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7.2 17.2h8M9 14.8l5.2 1v1.4L9 16.2v-1.4z" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

/**
 * עיגול נגישות קבוע – לחיצה פותחת תפריט עם הגדרות נגישות.
 * חייב להיות מחוץ ל-Footer (ב-layout) כדי שיהיה תמיד גלוי.
 */
export function AccessibilityFloatingBadge() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(defaultState);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const s = loadState();
    setState(s);
    applyState(s);
  }, []);

  const updateState = useCallback((next: Partial<A11yState>) => {
    setState((prev) => {
      const newState = { ...prev, ...next };
      saveState(newState);
      applyState(newState);
      return newState;
    });
  }, []);

  const adjustFont = (delta: number) => {
    const next = Math.max(90, Math.min(130, state.fontScale + delta));
    updateState({ fontScale: next });
  };

  const toggle = (key: keyof Omit<A11yState, "fontScale" | "readingMode">) =>
    updateState({ [key]: !state[key] } as Partial<A11yState>);

  const cycleReadingMode = () => {
    const nextMode: ReadingMode =
      state.readingMode === "default"
        ? "light"
        : state.readingMode === "light"
          ? "dark"
          : "default";
    updateState({ readingMode: nextMode });
  };

  const resetAll = () => {
    setState(defaultState);
    saveState(defaultState);
    applyState(defaultState);
  };

  useEffect(() => {
    if (!open) return;
    firstControlRef.current?.focus();

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onOutsideClick = (event: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [open]);

  const readingLabel =
    state.readingMode === "default"
      ? "רגיל"
      : state.readingMode === "light"
        ? "קריאה בהירה"
        : "קריאה כהה";

  const optionButtonClass =
    "rounded-xl border border-warm-sand/70 bg-white/70 px-3 py-2 text-xs font-medium text-warm-charcoal transition hover:border-accent-gold/45 hover:bg-white focus-ring";
  const toggleClass =
    "rounded-xl border px-3 py-2 text-xs font-medium transition focus-ring";

  return (
    <div className="a11y-widget fixed bottom-6 left-6 z-[9999] flex flex-col items-end gap-2">
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          className="a11y-widget w-[min(92vw,360px)] rounded-2xl border border-warm-sand/70 bg-warm-beige/95 p-4 shadow-[0_26px_45px_-22px_rgba(26,24,22,0.45)] backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="false"
          aria-label="הגדרות נגישות"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wide text-warm-charcoal">הגדרות נגישות</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-warm-sand/80 px-2 py-1 text-xs text-warm-charcoal transition hover:bg-white/70 focus-ring"
              aria-label="סגירת תפריט נגישות"
            >
              סגור
            </button>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border border-warm-sand/70 bg-white/45 p-3 sm:col-span-2">
              <p className="mb-2 text-xs font-semibold text-warm-charcoal/85">גודל טקסט ({state.fontScale}%)</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  ref={firstControlRef}
                  onClick={() => adjustFont(-6)}
                  className={optionButtonClass}
                >
                  הקטן טקסט
                </button>
                <button
                  type="button"
                  onClick={() => adjustFont(6)}
                  className={optionButtonClass}
                >
                  הגדל טקסט
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggle("highContrast")}
              className={`${toggleClass} ${
                state.highContrast
                  ? "border-accent-gold/60 bg-accent-gold/15 text-accent-gold"
                  : "border-warm-sand/70 bg-white/55 text-warm-charcoal"
              }`}
              aria-pressed={state.highContrast}
            >
              ניגודיות גבוהה
            </button>

            <button
              type="button"
              onClick={cycleReadingMode}
              className={optionButtonClass}
              aria-label="שינוי מצב קריאה"
            >
              מצב קריאה: {readingLabel}
            </button>

            <button
              type="button"
              onClick={() => toggle("underlineLinks")}
              className={`${toggleClass} ${
                state.underlineLinks
                  ? "border-accent-gold/60 bg-accent-gold/15 text-accent-gold"
                  : "border-warm-sand/70 bg-white/55 text-warm-charcoal"
              }`}
              aria-pressed={state.underlineLinks}
            >
              קו תחתון לקישורים
            </button>

            <button
              type="button"
              onClick={() => toggle("bigCursor")}
              className={`${toggleClass} ${
                state.bigCursor
                  ? "border-accent-gold/60 bg-accent-gold/15 text-accent-gold"
                  : "border-warm-sand/70 bg-white/55 text-warm-charcoal"
              }`}
              aria-pressed={state.bigCursor}
            >
              סמן עכבר גדול
            </button>

            <button
              type="button"
              onClick={() => toggle("highlightHeadings")}
              className={`${toggleClass} ${
                state.highlightHeadings
                  ? "border-accent-gold/60 bg-accent-gold/15 text-accent-gold"
                  : "border-warm-sand/70 bg-white/55 text-warm-charcoal"
              }`}
              aria-pressed={state.highlightHeadings}
            >
              הדגשת כותרות
            </button>

            <button
              type="button"
              onClick={() => toggle("highlightClickable")}
              className={`${toggleClass} ${
                state.highlightClickable
                  ? "border-accent-gold/60 bg-accent-gold/15 text-accent-gold"
                  : "border-warm-sand/70 bg-white/55 text-warm-charcoal"
              }`}
              aria-pressed={state.highlightClickable}
            >
              הדגשת כפתורים וקישורים
            </button>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={resetAll}
              className="flex-1 rounded-xl border border-warm-sand/75 bg-white/65 px-3 py-2 text-xs font-semibold text-warm-charcoal transition hover:bg-white focus-ring"
            >
              איפוס נגישות
            </button>
            <a
              href="#main"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl bg-accent-gold px-3 py-2 text-center text-xs font-semibold text-white no-underline transition hover:bg-accent-gold-dark focus-ring focus-visible:ring-offset-warm-beige"
            >
              דלג לתוכן
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="a11y-widget flex h-14 w-14 items-center justify-center rounded-full border border-accent-gold/75 bg-warm-beige/95 text-accent-gold shadow-[0_16px_28px_-14px_rgba(26,24,22,0.55)] transition hover:-translate-y-0.5 hover:border-accent-gold hover:bg-white focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
        aria-label={open ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="הגדרות נגישות"
      >
        {accessibilitySvg}
      </button>
    </div>
  );
}

/**
 * תג נגישות בתוך Footer (עיגול + טקסט נגיש).
 */
/** תג נגישות להצגה ב-Footer בלבד (ללא העיגול הקבוע). */
export function AccessibilityBadge() {
  return (
    <div
        className="a11y-widget inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-accent-gold bg-warm-beige/95 px-3 py-2.5 text-accent-gold shadow-sm"
        role="img"
        aria-label="האתר תומך בנגישות ובאנשים עם מוגבלות"
        title="נגישות – האתר מותאם לאנשים עם מוגבלות"
      >
        {accessibilitySvg}
        <span className="text-sm font-semibold text-warm-charcoal">נגיש</span>
      </div>
  );
}
