"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface LightboxProps {
  src: string | null;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    if (!src) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] bg-[#0A1020] border border-border-strong rounded-2xl p-3 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close image"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-text hover:text-accent transition-colors border border-border"
        >
          <X size={20} />
        </button>
        <div className="bg-white rounded-xl p-2 max-h-[82vh] overflow-auto flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[78vh] w-auto object-contain rounded-lg shadow-inner"
          />
        </div>
        <p className="mt-3 text-center text-xs text-text-muted">{alt} (Click outside or ESC to close)</p>
      </div>
    </div>
  );
}
