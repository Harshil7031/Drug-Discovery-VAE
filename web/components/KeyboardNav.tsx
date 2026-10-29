"use client";

import { useEffect } from "react";

const SECTION_KEYS: Record<string, string> = {
  "1": "overview",
  "2": "problem",
  "3": "pipeline",
  "4": "model",
  "5": "generator",
  "6": "results",
  "7": "latent",
  "8": "ethics",
};

export function KeyboardNav() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const targetId = SECTION_KEYS[e.key];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
