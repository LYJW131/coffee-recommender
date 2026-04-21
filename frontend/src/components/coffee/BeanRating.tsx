import { useState } from "react";

interface BeanRatingProps {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}

export function BeanRating({ value, onChange, max = 5 }: BeanRatingProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="flex items-center gap-3" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }).map((_, i) => {
        const idx = i + 1;
        const active = idx <= display;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Strength ${idx}`}
            onMouseEnter={() => setHover(idx)}
            onClick={() => onChange(idx)}
            className="group relative h-10 w-10 transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              viewBox="0 0 40 56"
              className={`h-full w-full transition-all duration-300 ${
                active ? "drop-shadow-[0_4px_8px_oklch(0.22_0.04_45/0.4)]" : "opacity-30"
              }`}
            >
              <ellipse
                cx="20"
                cy="28"
                rx="14"
                ry="22"
                fill={active ? "url(#beanGrad)" : "var(--color-muted-foreground)"}
                transform="rotate(-12 20 28)"
              />
              <path
                d="M 20 8 Q 16 28 20 48"
                stroke={active ? "oklch(0.15 0.03 40)" : "var(--color-foreground)"}
                strokeWidth="1.5"
                fill="none"
                transform="rotate(-12 20 28)"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="beanGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.4 0.08 50)" />
                  <stop offset="100%" stopColor="oklch(0.18 0.03 40)" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        );
      })}
    </div>
  );
}
