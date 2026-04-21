interface TempToggleProps {
  value: "iced" | "hot";
  onChange: (v: "iced" | "hot") => void;
}

export function TempToggle({ value, onChange }: TempToggleProps) {
  const isHot = value === "hot";
  return (
    <div className="relative inline-flex items-center rounded-full border border-border bg-cream/60 p-1.5 backdrop-blur-sm">
      <div
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-foreground shadow-md transition-all duration-500 ease-out"
        style={{ left: isHot ? "calc(50%)" : "6px" }}
      />
      <button
        type="button"
        onClick={() => onChange("iced")}
        className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
          !isHot ? "text-cream" : "text-foreground/60"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" strokeLinecap="round" />
        </svg>
        Iced
      </button>
      <button
        type="button"
        onClick={() => onChange("hot")}
        className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
          isHot ? "text-cream" : "text-foreground/60"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 11h14a3 3 0 010 6h-1M4 11v6a3 3 0 003 3h8a3 3 0 003-3M8 3s-1 1-1 2 1 2 1 3-1 2-1 2M12 3s-1 1-1 2 1 2 1 3-1 2-1 2M16 3s-1 1-1 2 1 2 1 3-1 2-1 2" strokeLinecap="round" />
        </svg>
        Hot
      </button>
    </div>
  );
}
