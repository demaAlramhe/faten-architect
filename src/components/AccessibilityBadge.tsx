"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "faten-a11y";

type FontSize = "normal" | "large" | "x-large";
type Contrast = "normal" | "high";

interface A11yState {
  font: FontSize;
  contrast: Contrast;
}

const defaultState: A11yState = { font: "normal", contrast: "normal" };

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
  root.setAttribute("data-a11y-font", state.font);
  root.setAttribute("data-a11y-contrast", state.contrast);
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
 */
function AccessibilityFloatingBadge() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(defaultState);

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

  const handleFont = (font: FontSize) => updateState({ font });
  const toggleContrast = () => updateState({ contrast: state.contrast === "high" ? "normal" : "high" });

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="rounded-xl border-2 border-accent-gold bg-warm-beige p-4 shadow-xl min-w-[200px]"
          role="dialog"
          aria-label="הגדרות נגישות"
        >
          <p className="mb-3 text-sm font-bold text-warm-charcoal">הגדרות נגישות</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-warm-charcoal">גודל טקסט</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleFont("normal")}
                  className="rounded px-2 py-1 text-xs font-medium transition bg-warm-sand text-warm-charcoal hover:bg-warm-stone data-[active]:bg-accent-gold data-[active]:text-white"
                  data-active={state.font === "normal"}
                  aria-pressed={state.font === "normal"}
                >
                  רגיל
                </button>
                <button
                  type="button"
                  onClick={() => handleFont("large")}
                  className="rounded px-2 py-1 text-xs font-medium transition bg-warm-sand text-warm-charcoal hover:bg-warm-stone data-[active]:bg-accent-gold data-[active]:text-white"
                  data-active={state.font === "large"}
                  aria-pressed={state.font === "large"}
                >
                  גדול
                </button>
                <button
                  type="button"
                  onClick={() => handleFont("x-large")}
                  className="rounded px-2 py-1 text-xs font-medium transition bg-warm-sand text-warm-charcoal hover:bg-warm-stone data-[active]:bg-accent-gold data-[active]:text-white"
                  data-active={state.font === "x-large"}
                  aria-pressed={state.font === "x-large"}
                >
                  גדול+
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-warm-charcoal">ניגודיות גבוהה</span>
              <button
                type="button"
                onClick={toggleContrast}
                className="rounded px-2 py-1 text-xs font-medium transition bg-warm-sand text-warm-charcoal hover:bg-warm-stone data-[active]:bg-accent-gold data-[active]:text-white"
                data-active={state.contrast === "high"}
                aria-pressed={state.contrast === "high"}
              >
                {state.contrast === "high" ? "כבוי" : "הפעל"}
              </button>
            </div>
          </div>
          <a
            href="#main"
            onClick={() => setOpen(false)}
            className="mt-3 block w-full rounded-lg bg-accent-gold px-3 py-2 text-center text-sm font-semibold text-white no-underline transition hover:bg-accent-gold-dark focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
          >
            דלג לתוכן הראשי
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-gold bg-warm-beige text-accent-gold shadow-lg transition hover:scale-105 hover:border-accent-gold-light hover:bg-warm-cream focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
        aria-label={open ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        aria-expanded={open}
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
export function AccessibilityBadge() {
  return (
    <>
      <AccessibilityFloatingBadge />
      <div
        className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-accent-gold bg-warm-beige/95 px-3 py-2.5 text-accent-gold shadow-sm"
        role="img"
        aria-label="האתר תומך בנגישות ובאנשים עם מוגבלות"
        title="נגישות – האתר מותאם לאנשים עם מוגבלות"
      >
        {accessibilitySvg}
        <span className="text-sm font-semibold text-warm-charcoal">נגיש</span>
      </div>
    </>
  );
}
