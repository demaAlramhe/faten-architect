"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  currentIndex: number;
  onNavigate: (delta: number) => void;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    onNavigate(-1);
  }, [onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(1);
  }, [onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const el = containerRef.current;
    const focusable = el?.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    const list = focusable ? Array.from(focusable) : [];
    const first = list[0];
    const last = list[list.length - 1];
    first?.focus();

    const handleKeyDownTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !el?.contains(document.activeElement)) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDownTrap);

    return () => {
      document.removeEventListener("keydown", handleKeyDownTrap);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="תצוגת גלריית תמונות"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute left-4 top-4 z-10 rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-ring"
            aria-label="סגור"
          >
            <span aria-hidden>✕</span>
          </button>

          <div className="relative flex flex-1 items-center justify-center w-full">
            {hasPrev && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 focus-ring sm:right-4"
                aria-label="תמונה קודמת"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {current && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[85vh] w-full max-w-4xl"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[85vh] w-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority
                />
              </motion.div>
            )}

            {hasNext && (
              <button
                type="button"
                onClick={goNext}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 focus-ring sm:left-4"
                aria-label="תמונה הבאה"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          <p className="mt-2 text-sm text-white/80" aria-live="polite">
            {currentIndex + 1} / {images.length}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
