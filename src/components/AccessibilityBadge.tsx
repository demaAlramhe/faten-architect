"use client";

import { useState, useEffect, useCallback, useRef, useId, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "faten-a11y-v2";
const LEGACY_STORAGE_KEY = "faten-a11y";

/** Theme affects page colors (mutually exclusive with default). */
export type A11yTheme = "default" | "light" | "dark" | "grayscale";

export type A11yTextAlign = "natural" | "start" | "center" | "end";

export interface A11yState {
  fontScale: number;
  highContrast: boolean;
  theme: A11yTheme;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  highlightClickable: boolean;
  readableFont: boolean;
  reducedMotion: boolean;
  bigCursor: boolean;
  textAlign: A11yTextAlign;
}

export const defaultA11yState: A11yState = {
  fontScale: 100,
  highContrast: false,
  theme: "default",
  highlightLinks: false,
  highlightHeadings: false,
  highlightClickable: false,
  readableFont: false,
  reducedMotion: false,
  bigCursor: false,
  textAlign: "natural",
};

function parseStored(raw: string | null): A11yState {
  if (!raw) return defaultA11yState;
  try {
    const parsed = JSON.parse(raw) as Partial<A11yState>;
    const merged = { ...defaultA11yState, ...parsed };
    if (typeof merged.fontScale === "number") {
      merged.fontScale = Math.min(130, Math.max(90, merged.fontScale));
    }
    return merged;
  } catch {
    return defaultA11yState;
  }
}

/** מיגרציה ממפתח localStorage ישן (faten-a11y) */
function migrateLegacy(raw: string): A11yState | null {
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    const m: Partial<A11yState> = {};
    if (typeof o.fontScale === "number") m.fontScale = Math.min(130, Math.max(90, o.fontScale));
    if (typeof o.highContrast === "boolean") m.highContrast = o.highContrast;

    const rm = (o.readingMode ?? o.theme) as string | undefined;
    if (rm === "light" || rm === "dark" || rm === "grayscale" || rm === "default") m.theme = rm;

    if (typeof o.highlightLinks === "boolean") m.highlightLinks = o.highlightLinks;
    else if (typeof o.underlineLinks === "boolean") m.highlightLinks = o.underlineLinks;

    if (typeof o.highlightHeadings === "boolean") m.highlightHeadings = o.highlightHeadings;
    if (typeof o.highlightClickable === "boolean") m.highlightClickable = o.highlightClickable;
    if (typeof o.readableFont === "boolean") m.readableFont = o.readableFont;
    if (typeof o.reducedMotion === "boolean") m.reducedMotion = o.reducedMotion;
    if (typeof o.bigCursor === "boolean") m.bigCursor = o.bigCursor;

    const ta = o.textAlign;
    if (ta === "natural" || ta === "start" || ta === "center" || ta === "end") m.textAlign = ta;

    return { ...defaultA11yState, ...m };
  } catch {
    return null;
  }
}

export function loadA11yState(): A11yState {
  if (typeof window === "undefined") return defaultA11yState;
  const v2 = localStorage.getItem(STORAGE_KEY);
  if (v2) return parseStored(v2);
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy) {
    const migrated = migrateLegacy(legacy);
    if (migrated) {
      saveA11yState(migrated);
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      return migrated;
    }
  }
  return defaultA11yState;
}

export function saveA11yState(state: A11yState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

/** Apply all accessibility flags to <html> — single source of truth. */
export function applyA11yState(state: A11yState): void {
  const root = document.documentElement;
  root.style.setProperty("--a11y-font-multiplier", String(state.fontScale / 100));
  root.setAttribute("data-a11y-font-scale", String(state.fontScale));
  root.setAttribute("data-a11y-contrast", state.highContrast ? "high" : "normal");
  root.setAttribute("data-a11y-theme", state.theme);
  root.setAttribute("data-a11y-link-highlight", state.highlightLinks ? "on" : "off");
  root.setAttribute("data-a11y-headings", state.highlightHeadings ? "on" : "off");
  root.setAttribute("data-a11y-clickable", state.highlightClickable ? "on" : "off");
  root.setAttribute("data-a11y-readable", state.readableFont ? "on" : "off");
  root.setAttribute("data-a11y-motion", state.reducedMotion ? "reduced" : "normal");
  root.setAttribute("data-a11y-cursor", state.bigCursor ? "large" : "normal");
  root.setAttribute("data-a11y-text-align", state.textAlign);
}

const accessibilitySvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
    aria-hidden
  >
    <circle cx="10" cy="6" r="2.2" />
    <path d="M10 8.5v1.2l-2.8 1v2.6h1.2v-1.8l1.6-.6v5.4h1.2v-5.2l2 .7v1.8h1.2v-2.6l-3.2-1.2V8.5H10Z" />
    <circle cx="7.2" cy="17.2" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.2" cy="17.2" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7.2 17.2h8M9 14.8l5.2 1v1.4L9 16.2v-1.4z" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

function IconTextSize({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19V5M4 19h4M4 19H0M4 5h4M4 5H0" strokeLinecap="round" />
      <path d="M12 5v14M12 5h3.5M12 5h-3.5M12 19h3.5M12 19h-3.5" strokeLinecap="round" />
      <path d="M20 8v8M20 8h2M20 8h-2M20 16h2M20 16h-2" strokeLinecap="round" />
    </svg>
  );
}

function IconContrast({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 3a9 9 0 0 1 0 18V3Z" fill="currentColor" />
    </svg>
  );
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGrayscale({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#888" />
          <stop offset="100%" stopColor="#e8e8e8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 3a9 9 0 0 1 0 18V3Z" fill={`url(#${gid})`} />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" strokeLinecap="round" />
    </svg>
  );
}

function IconHeading({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 4v16M18 4v16M6 12h12" strokeLinecap="round" />
    </svg>
  );
}

function IconCursor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 3l14 10-6 1-2 6-6-17z" />
    </svg>
  );
}

function IconType({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 20h16M6 4h12M9 4v10M15 4v10" strokeLinecap="round" />
    </svg>
  );
}

function IconMotion({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.5 4.5l1.5 1.5M18 18l1.5 1.5M4.5 19.5l1.5-1.5M18 6l1.5-1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconAlign({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 6h16M8 10h12M4 14h16M10 18h10" strokeLinecap="round" />
    </svg>
  );
}

function IconPointer({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M9 12h6M12 9v6" strokeLinecap="round" />
    </svg>
  );
}

type RowProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
};

function PanelRow({ icon, title, description, children }: RowProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-black/[0.06] bg-white/80 px-3 py-2.5 shadow-sm backdrop-blur-sm transition hover:border-black/[0.08]">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warm-beige/90 text-accent-gold">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-warm-charcoal">{title}</p>
        {description ? <p className="mt-0.5 text-[11px] leading-snug text-warm-charcoal/65">{description}</p> : null}
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

/**
 * כפתור נגישות צף + פאנל הגדרות — עיצוב מודרני, תמיכה ב-RTL, שמירה ב-localStorage.
 */
export function AccessibilityFloatingBadge() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(defaultA11yState);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const s = loadA11yState();
    setState(s);
    applyA11yState(s);
  }, []);

  const commit = useCallback((next: Partial<A11yState>) => {
    setState((prev) => {
      const merged = { ...prev, ...next };
      saveA11yState(merged);
      applyA11yState(merged);
      return merged;
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultA11yState);
    saveA11yState(defaultA11yState);
    applyA11yState(defaultA11yState);
  }, []);

  const adjustFont = (delta: number) => {
    const next = Math.max(90, Math.min(130, state.fontScale + delta));
    commit({ fontScale: next });
  };

  const setTheme = (theme: A11yTheme) => commit({ theme });

  const cycleTextAlign = () => {
    const order: A11yTextAlign[] = ["natural", "start", "center", "end"];
    const i = order.indexOf(state.textAlign);
    commit({ textAlign: order[(i + 1) % order.length] });
  };

  const textAlignLabel: Record<A11yTextAlign, string> = {
    natural: "ברירת מחדל",
    start: "יישור התחלה",
    center: "מרכוז",
    end: "יישור סיום",
  };

  useEffect(() => {
    if (!open) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter((el) => !el.hasAttribute("disabled"));
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onEscape);
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => firstFocusableRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleBtn = (active: boolean) =>
    `rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition ${
      active
        ? "bg-warm-charcoal text-white shadow-sm"
        : "bg-white/90 text-warm-charcoal shadow-sm ring-1 ring-black/[0.06] hover:bg-white"
    }`;

  const segBtn = (active: boolean) =>
    `flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition ${
      active ? "bg-warm-charcoal text-white shadow-sm" : "text-warm-charcoal/80 hover:bg-black/[0.04]"
    }`;

  return (
    <div className="a11y-widget fixed bottom-6 end-6 z-[9999] flex flex-col items-end gap-3" dir="rtl">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-panel-title"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="a11y-widget w-[min(94vw,400px)] overflow-hidden rounded-2xl border border-black/[0.08] bg-[#faf9f7]/95 shadow-[0_24px_60px_-20px_rgba(15,14,13,0.35)] backdrop-blur-xl"
          >
            <div className="border-b border-black/[0.06] bg-gradient-to-l from-warm-beige/80 to-white/90 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p id="a11y-panel-title" className="text-sm font-semibold tracking-tight text-warm-charcoal">
                    נגישות
                  </p>
                  <p className="mt-0.5 text-[11px] text-warm-charcoal/60">התאמה אישית לקריאה ולניווט</p>
                </div>
                <button
                  ref={firstFocusableRef}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="rounded-full p-1.5 text-warm-charcoal/70 transition hover:bg-black/[0.05] hover:text-warm-charcoal focus-ring"
                  aria-label="סגירת חלון נגישות"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-[min(70vh,520px)] space-y-2 overflow-y-auto overscroll-contain px-3 py-3">
              <PanelRow
                icon={<IconTextSize className="h-4 w-4" />}
                title="גודל טקסט"
                description={`נוכחי: ${state.fontScale}%`}
              >
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" className={toggleBtn(false)} onClick={() => adjustFont(-6)} aria-label="הקטנת טקסט">
                    −
                  </button>
                  <button type="button" className={toggleBtn(false)} onClick={() => commit({ fontScale: 100 })} aria-label="איפוס גודל טקסט">
                    איפוס
                  </button>
                  <button type="button" className={toggleBtn(false)} onClick={() => adjustFont(6)} aria-label="הגדלת טקסט">
                    +
                  </button>
                </div>
              </PanelRow>

              <PanelRow icon={<IconContrast className="h-4 w-4" />} title="ניגודיות גבוהה" description="חיזוק צבעים לקריאה">
                <button
                  type="button"
                  onClick={() => commit({ highContrast: !state.highContrast })}
                  className={toggleBtn(state.highContrast)}
                  aria-pressed={state.highContrast}
                >
                  {state.highContrast ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconSun className="h-4 w-4" />} title="מצב תצוגה" description="בהיר / כהה / אפור">
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                  <button type="button" className={segBtn(state.theme === "default")} onClick={() => setTheme("default")}>
                    רגיל
                  </button>
                  <button type="button" className={segBtn(state.theme === "light")} onClick={() => setTheme("light")}>
                    בהיר
                  </button>
                  <button type="button" className={segBtn(state.theme === "dark")} onClick={() => setTheme("dark")}>
                    כהה
                  </button>
                  <button type="button" className={segBtn(state.theme === "grayscale")} onClick={() => setTheme("grayscale")}>
                    אפור
                  </button>
                </div>
              </PanelRow>

              <PanelRow icon={<IconLink className="h-4 w-4" />} title="הדגשת קישורים" description="רקע עדין לזיהוי קישורים">
                <button
                  type="button"
                  onClick={() => commit({ highlightLinks: !state.highlightLinks })}
                  className={toggleBtn(state.highlightLinks)}
                  aria-pressed={state.highlightLinks}
                >
                  {state.highlightLinks ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconHeading className="h-4 w-4" />} title="הדגשת כותרות">
                <button
                  type="button"
                  onClick={() => commit({ highlightHeadings: !state.highlightHeadings })}
                  className={toggleBtn(state.highlightHeadings)}
                  aria-pressed={state.highlightHeadings}
                >
                  {state.highlightHeadings ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconPointer className="h-4 w-4" />} title="הדגשת לחיצים" description="כפתורים ואלמנטים לחיצים">
                <button
                  type="button"
                  onClick={() => commit({ highlightClickable: !state.highlightClickable })}
                  className={toggleBtn(state.highlightClickable)}
                  aria-pressed={state.highlightClickable}
                >
                  {state.highlightClickable ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconType className="h-4 w-4" />} title="גופן קריא" description="גופן מערכתי ברור יותר">
                <button
                  type="button"
                  onClick={() => commit({ readableFont: !state.readableFont })}
                  className={toggleBtn(state.readableFont)}
                  aria-pressed={state.readableFont}
                >
                  {state.readableFont ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconMotion className="h-4 w-4" />} title="הפחתת תנועה" description="מוריד אנימציות">
                <button
                  type="button"
                  onClick={() => commit({ reducedMotion: !state.reducedMotion })}
                  className={toggleBtn(state.reducedMotion)}
                  aria-pressed={state.reducedMotion}
                >
                  {state.reducedMotion ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconCursor className="h-4 w-4 text-accent-gold" />} title="סמן גדול">
                <button
                  type="button"
                  onClick={() => commit({ bigCursor: !state.bigCursor })}
                  className={toggleBtn(state.bigCursor)}
                  aria-pressed={state.bigCursor}
                >
                  {state.bigCursor ? "פעיל" : "כבוי"}
                </button>
              </PanelRow>

              <PanelRow icon={<IconAlign className="h-4 w-4" />} title="יישור טקסט" description={textAlignLabel[state.textAlign]}>
                <button type="button" onClick={cycleTextAlign} className={toggleBtn(false)} aria-label="מעבר בין מצבי יישור">
                  החלף ({textAlignLabel[state.textAlign]})
                </button>
              </PanelRow>
            </div>

            <div className="flex gap-2 border-t border-black/[0.06] bg-white/60 px-3 py-3">
              <button
                type="button"
                onClick={resetAll}
                className="flex-1 rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 text-xs font-semibold text-warm-charcoal shadow-sm transition hover:bg-warm-beige/80 focus-ring"
              >
                איפוס הכל
              </button>
              <a
                href="#main"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-accent-gold px-3 py-2.5 text-center text-xs font-semibold text-white shadow-sm transition hover:bg-accent-gold-dark focus-ring"
              >
                דלג לתוכן
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="a11y-widget flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.08] bg-white text-accent-gold shadow-[0_12px_40px_-12px_rgba(26,24,22,0.45)] ring-1 ring-black/[0.04] transition hover:shadow-[0_16px_44px_-14px_rgba(26,24,22,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        aria-label={open ? "סגירת תפריט נגישות" : "פתיחת תפריט נגישות"}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-haspopup="dialog"
      >
        {accessibilitySvg}
      </motion.button>
    </div>
  );
}

/** תג נגישות סטטי (לשימוש אופציונלי בפוטר). */
export function AccessibilityBadge() {
  return (
    <div
      className="a11y-widget inline-flex items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white/95 px-3 py-2.5 text-accent-gold shadow-sm ring-1 ring-black/[0.04]"
      role="img"
      aria-label="האתר תומך בנגישות ובאנשים עם מוגבלות"
      title="נגישות – האתר מותאם לאנשים עם מוגבלות"
    >
      {accessibilitySvg}
      <span className="text-sm font-semibold text-warm-charcoal">נגיש</span>
    </div>
  );
}
