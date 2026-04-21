interface Rec {
  brand: string;
  drink: string;
  match: number;
  notes: string;
  image: string;
}

interface Props {
  rec: Rec;
  index: number;
}

const tilts = ["polaroid-tilt-1", "polaroid-tilt-2", "polaroid-tilt-3"];

export function RecommendationCard({ rec, index }: Props) {
  return (
    <div
      className={`group ${tilts[index % 3]} animate-fade-up transition-transform duration-500 hover:rotate-0 hover:-translate-y-2`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="rounded-sm bg-cream p-4 pb-8 shadow-[var(--shadow-polaroid)]">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={rec.image}
            alt={rec.drink}
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 rounded-full bg-foreground/90 px-3 py-1.5 text-xs font-bold tracking-wide text-cream backdrop-blur-md">
            {rec.match}% MATCH
          </div>
        </div>

        <div className="mt-5 px-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{rec.brand}</p>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-foreground">{rec.drink}</h3>
          <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
            "{rec.notes}"
          </p>

          {/* Match progress bar */}
          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Taste Match
              </span>
              <span className="font-serif text-lg text-foreground">{rec.match}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-foreground transition-all duration-1000 ease-out"
                style={{ width: `${rec.match}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
