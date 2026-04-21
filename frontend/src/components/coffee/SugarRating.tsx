import { useState } from "react";

interface SugarRatingProps {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}

export function SugarRating({ value, onChange, max = 5 }: SugarRatingProps) {
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
            aria-label={`Sweetness ${idx}`}
            onMouseEnter={() => setHover(idx)}
            onClick={() => onChange(idx)}
            className="group h-10 w-10 transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              viewBox="0 0 40 40"
              className={`h-full w-full transition-all duration-300 ${
                active ? "drop-shadow-[0_4px_6px_oklch(0.22_0.04_45/0.25)]" : "opacity-30"
              }`}
            >
              <rect
                x="6"
                y="6"
                width="28"
                height="28"
                rx="3"
                fill={active ? "var(--color-cream)" : "transparent"}
                stroke="var(--color-foreground)"
                strokeWidth="1.5"
              />
              <path
                d="M 12 14 L 28 14 M 14 20 L 26 20 M 12 26 L 28 26"
                stroke="var(--color-foreground)"
                strokeWidth="0.8"
                opacity={active ? 0.4 : 0.6}
              />
              <path
                d="M 6 6 L 10 10 M 34 6 L 30 10 M 6 34 L 10 30 M 34 34 L 30 30"
                stroke="var(--color-foreground)"
                strokeWidth="1"
                opacity={active ? 0.5 : 0.3}
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
