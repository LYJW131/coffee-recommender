import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BeanRating } from "@/components/coffee/BeanRating";
import { SugarRating } from "@/components/coffee/SugarRating";
import { TempToggle } from "@/components/coffee/TempToggle";
import { RecommendationCard } from "@/components/coffee/RecommendationCard";
import bgImage from "@/assets/coffee-bg.jpg";
import icedLatte from "@/assets/coffee-iced-latte.jpg";
import pourover from "@/assets/coffee-pourover.jpg";
import latteArt from "@/assets/coffee-latte-art.jpg";
import dirtyCoffee from "@/assets/coffee-dirty.jpg";
import frappuccino from "@/assets/coffee-frappuccino.jpg";
import espressoShot from "@/assets/coffee-espresso-shot.jpg";
import flatWhite from "@/assets/coffee-flat-white.jpg";
import cappuccino from "@/assets/coffee-cappuccino.jpg";
import americano from "@/assets/coffee-americano.jpg";
import mocha from "@/assets/coffee-mocha.jpg";
import cortado from "@/assets/coffee-cortado.jpg";
import aeropress from "@/assets/coffee-aeropress.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brewed — AI Coffee Recommender" },
      { name: "description", content: "Discover your perfect cup. An AI-powered coffee recommender that matches your taste profile to artisan brews from world-class roasters." },
      { property: "og:title", content: "Brewed — AI Coffee Recommender" },
      { property: "og:description", content: "Discover your perfect cup, brewed by AI." },
    ],
  }),
  component: Index,
});

type Flavor = "fruity" | "floral" | "nutty" | "chocolate" | "milky";
type Milk = "whole" | "skim" | "oat" | "coconut" | "none";
type ImageKey =
  | "dirty"
  | "frappuccino"
  | "icedLatte"
  | "pourover"
  | "latteArt"
  | "espressoShot"
  | "flatWhite"
  | "cappuccino"
  | "americano"
  | "mocha"
  | "cortado"
  | "aeropress";

interface ApiRecommendation {
  brand: string;
  drink: string;
  match: number;
  notes: string;
  imageKey?: ImageKey;
}

interface Recommendation extends ApiRecommendation {
  image: string;
}

const FLAVORS: { id: Flavor; label: string }[] = [
  { id: "fruity", label: "Fruity" },
  { id: "floral", label: "Floral" },
  { id: "nutty", label: "Nutty" },
  { id: "chocolate", label: "Chocolate" },
  { id: "milky", label: "Milky" },
];

const MILKS: { id: Milk; label: string }[] = [
  { id: "whole", label: "Whole milk" },
  { id: "skim", label: "Skim milk" },
  { id: "oat", label: "Oat milk" },
  { id: "coconut", label: "Coconut milk" },
  { id: "none", label: "No milk" },
];

const LOADING_MESSAGES = [
  "Analyzing your taste...",
  "Matching with Starbucks, Luckin, Manner...",
];

const IMAGE_BY_KEY: Record<ImageKey, string> = {
  dirty: dirtyCoffee,
  frappuccino,
  icedLatte,
  pourover,
  latteArt,
  espressoShot,
  flatWhite,
  cappuccino,
  americano,
  mocha,
  cortado,
  aeropress,
};

const DEFAULT_IMAGE_KEYS_BY_TEMP: Record<"iced" | "hot", ImageKey[]> = {
  iced: ["icedLatte", "frappuccino", "dirty", "mocha"],
  hot: ["pourover", "latteArt", "flatWhite", "cappuccino", "espressoShot", "cortado", "americano", "aeropress"],
};

function mapRecommendations(
  list: ApiRecommendation[],
  temp: "iced" | "hot",
): Recommendation[] {
  const defaults = DEFAULT_IMAGE_KEYS_BY_TEMP[temp];
  return list.map((rec, index) => {
    const imageKey = rec.imageKey && IMAGE_BY_KEY[rec.imageKey] ? rec.imageKey : defaults[index % defaults.length];
    return {
      ...rec,
      imageKey,
      image: IMAGE_BY_KEY[imageKey],
      match: Math.max(0, Math.min(100, Math.round(rec.match))),
    };
  });
}

function Index() {
  const [strength, setStrength] = useState(3);
  const [sweetness, setSweetness] = useState(2);
  const [temp, setTemp] = useState<"iced" | "hot">("hot");
  const [milk, setMilk] = useState<Milk>("oat");
  const [flavors, setFlavors] = useState<Flavor[]>(["nutty"]);
  const [extraNotes, setExtraNotes] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggleFlavor = (id: Flavor) => {
    setFlavors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setShowResults(false);
    setErrorMsg("");
    setLoadingMsgIdx(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 900);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strength,
          sweetness,
          temperature: temp,
          milk,
          flavors,
          extraNotes,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Unable to fetch recommendations.");
      }

      const recs = Array.isArray(payload?.recommendations) ? payload.recommendations : [];
      if (recs.length !== 3) {
        throw new Error("The recommendation result is incomplete, please retry.");
      }

      setRecommendations(mapRecommendations(recs, temp));
      setShowResults(true);
      requestAnimationFrame(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "AI service is temporarily unavailable. Please try again.";
      setErrorMsg(message);
    } finally {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-latte/85 via-latte/80 to-latte/95" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Hero */}
        <section className="pt-12 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">AI · Taste · Curated</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            The cup that <em className="text-accent">knows</em> you
            <br />
            before you do.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Tell us how you take it. Our AI sommelier scans thousands of brews from
            world-class roasters and finds the one made for your palate.
          </p>
        </section>

        {/* Questionnaire */}
        <section className="mx-auto max-w-2xl">
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="mb-10 flex items-baseline justify-between border-b border-foreground/10 pb-5">
              <h2 className="font-serif text-2xl text-foreground">Your Taste Profile</h2>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">No. 01 / 06</span>
            </div>

            <div className="space-y-10">
              {/* Strength */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-xl text-foreground">Strength</p>
                  <p className="text-sm text-muted-foreground">How bold should the brew be?</p>
                </div>
                <BeanRating value={strength} onChange={setStrength} />
              </div>

              <div className="h-px bg-foreground/10" />

              {/* Sweetness */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-xl text-foreground">Sweetness</p>
                  <p className="text-sm text-muted-foreground">A little sugar, or a sweet symphony?</p>
                </div>
                <SugarRating value={sweetness} onChange={setSweetness} />
              </div>

              <div className="h-px bg-foreground/10" />

              {/* Temperature */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-xl text-foreground">Temperature</p>
                  <p className="text-sm text-muted-foreground">Frosty refreshment or warm embrace?</p>
                </div>
                <TempToggle value={temp} onChange={setTemp} />
              </div>

              <div className="h-px bg-foreground/10" />

              {/* Milk Type */}
              <div>
                <div className="mb-4">
                  <p className="font-serif text-xl text-foreground">Milk Type</p>
                  <p className="text-sm text-muted-foreground">Choose your perfect pour.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {MILKS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilk(m.id)}
                      className={`rounded-full border px-5 py-2 text-sm transition-all ${
                        milk === m.id
                          ? "border-foreground bg-foreground text-cream shadow-sm"
                          : "border-foreground/20 text-foreground/70 hover:border-foreground/50"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-foreground/10" />

              {/* Flavor (multi-select) */}
              <div>
                <div className="mb-4 flex items-baseline justify-between">
                  <div>
                    <p className="font-serif text-xl text-foreground">Flavor Notes</p>
                    <p className="text-sm text-muted-foreground">Pick all that call to you.</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {flavors.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FLAVORS.map((f) => {
                    const active = flavors.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFlavor(f.id)}
                        aria-pressed={active}
                        className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-all ${
                          active
                            ? "border-accent bg-accent/15 text-foreground shadow-[inset_0_0_0_1px_oklch(0.55_0.1_55/0.4)]"
                            : "border-foreground/20 text-foreground/70 hover:border-foreground/50"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                            active
                              ? "border-accent bg-accent text-cream"
                              : "border-foreground/30 bg-transparent"
                          }`}
                        >
                          {active && (
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-foreground/10" />

              {/* Extra Notes */}
              <div>
                <div className="mb-4">
                  <p className="font-serif text-xl text-foreground">Extra Notes</p>
                  <p className="text-sm text-muted-foreground">Whisper your preferences to the barista.</p>
                </div>
                <input
                  type="text"
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  placeholder="Any secret cravings? (e.g., light ice, extra hot...)"
                  className="w-full rounded-full border border-foreground/15 bg-cream/40 px-6 py-4 text-sm text-foreground placeholder:italic placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-coffee group rounded-full px-10 py-5 font-serif text-lg tracking-wide disabled:opacity-90"
              >
                <span className="relative z-10 inline-flex items-center gap-3">
                  {loading ? (
                    <>
                      {/* Coffee dripping spinner */}
                      <span className="relative inline-flex h-5 w-5 items-center justify-center">
                        <span className="absolute inset-0 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                      </span>
                      <span key={loadingMsgIdx} className="animate-fade-up">
                        {LOADING_MESSAGES[loadingMsgIdx]}
                      </span>
                    </>
                  ) : (
                    <>
                      Discover My Brand Match
                      <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
            {errorMsg && (
              <p className="mt-4 text-center text-sm text-destructive">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* Results */}
        {showResults && (
          <section id="results" className="mt-28 scroll-mt-12">
            <div className="mb-14 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-accent">The Verdict</p>
              <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
                Three cups, hand-picked for you.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Curated by your taste profile — no checkout, just discovery.
              </p>
            </div>

            <div className="grid gap-10 px-2 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-6">
              {recommendations.map((rec, i) => (
                <RecommendationCard key={rec.brand} rec={rec} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-foreground/10 bg-foreground/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Brewed. A taste-first AI experience.</p>
          <p className="font-serif italic">— Brewed with care, served with intention.</p>
        </div>
      </footer>
    </div>
  );
}
