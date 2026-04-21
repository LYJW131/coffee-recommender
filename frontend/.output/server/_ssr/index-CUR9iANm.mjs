import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function BeanRating({ value, onChange, max = 5 }) {
  const [hover, setHover] = reactExports.useState(0);
  const display = hover || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", onMouseLeave: () => setHover(0), children: Array.from({ length: max }).map((_, i) => {
    const idx = i + 1;
    const active = idx <= display;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `Strength ${idx}`,
        onMouseEnter: () => setHover(idx),
        onClick: () => onChange(idx),
        className: "group relative h-10 w-10 transition-transform duration-200 hover:scale-110 active:scale-95",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 40 56",
            className: `h-full w-full transition-all duration-300 ${active ? "drop-shadow-[0_4px_8px_oklch(0.22_0.04_45/0.4)]" : "opacity-30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: "20",
                  cy: "28",
                  rx: "14",
                  ry: "22",
                  fill: active ? "url(#beanGrad)" : "var(--color-muted-foreground)",
                  transform: "rotate(-12 20 28)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M 20 8 Q 16 28 20 48",
                  stroke: active ? "oklch(0.15 0.03 40)" : "var(--color-foreground)",
                  strokeWidth: "1.5",
                  fill: "none",
                  transform: "rotate(-12 20 28)",
                  opacity: "0.7"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "beanGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.4 0.08 50)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.18 0.03 40)" })
              ] }) })
            ]
          }
        )
      },
      i
    );
  }) });
}
function SugarRating({ value, onChange, max = 5 }) {
  const [hover, setHover] = reactExports.useState(0);
  const display = hover || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", onMouseLeave: () => setHover(0), children: Array.from({ length: max }).map((_, i) => {
    const idx = i + 1;
    const active = idx <= display;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `Sweetness ${idx}`,
        onMouseEnter: () => setHover(idx),
        onClick: () => onChange(idx),
        className: "group h-10 w-10 transition-transform duration-200 hover:scale-110 active:scale-95",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 40 40",
            className: `h-full w-full transition-all duration-300 ${active ? "drop-shadow-[0_4px_6px_oklch(0.22_0.04_45/0.25)]" : "opacity-30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "6",
                  y: "6",
                  width: "28",
                  height: "28",
                  rx: "3",
                  fill: active ? "var(--color-cream)" : "transparent",
                  stroke: "var(--color-foreground)",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M 12 14 L 28 14 M 14 20 L 26 20 M 12 26 L 28 26",
                  stroke: "var(--color-foreground)",
                  strokeWidth: "0.8",
                  opacity: active ? 0.4 : 0.6
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M 6 6 L 10 10 M 34 6 L 30 10 M 6 34 L 10 30 M 34 34 L 30 30",
                  stroke: "var(--color-foreground)",
                  strokeWidth: "1",
                  opacity: active ? 0.5 : 0.3
                }
              )
            ]
          }
        )
      },
      i
    );
  }) });
}
function TempToggle({ value, onChange }) {
  const isHot = value === "hot";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex items-center rounded-full border border-border bg-cream/60 p-1.5 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-foreground shadow-md transition-all duration-500 ease-out",
        style: { left: isHot ? "calc(50%)" : "6px" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange("iced"),
        className: `relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${!isHot ? "text-cream" : "text-foreground/60"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07", strokeLinecap: "round" }) }),
          "Iced"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange("hot"),
        className: `relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${isHot ? "text-cream" : "text-foreground/60"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 11h14a3 3 0 010 6h-1M4 11v6a3 3 0 003 3h8a3 3 0 003-3M8 3s-1 1-1 2 1 2 1 3-1 2-1 2M12 3s-1 1-1 2 1 2 1 3-1 2-1 2M16 3s-1 1-1 2 1 2 1 3-1 2-1 2", strokeLinecap: "round" }) }),
          "Hot"
        ]
      }
    )
  ] });
}
const tilts = ["polaroid-tilt-1", "polaroid-tilt-2", "polaroid-tilt-3"];
function RecommendationCard({ rec, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `group ${tilts[index % 3]} animate-fade-up transition-transform duration-500 hover:rotate-0 hover:-translate-y-2`,
      style: { animationDelay: `${index * 120}ms` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm bg-cream p-4 pb-8 shadow-[var(--shadow-polaroid)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: rec.image,
              alt: rec.drink,
              loading: "lazy",
              width: 1024,
              height: 1280,
              className: "aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-3 rounded-full bg-foreground/90 px-3 py-1.5 text-xs font-bold tracking-wide text-cream backdrop-blur-md", children: [
            rec.match,
            "% MATCH"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: rec.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-serif text-2xl leading-tight text-foreground", children: rec.drink }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm italic leading-relaxed text-muted-foreground", children: [
            '"',
            rec.notes,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Taste Match" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-lg text-foreground", children: [
                rec.match,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full bg-gradient-to-r from-accent to-foreground transition-all duration-1000 ease-out",
                style: { width: `${rec.match}%` }
              }
            ) })
          ] })
        ] })
      ] })
    }
  );
}
const bgImage = "/assets/coffee-bg-D05hrTx0.jpg";
const icedLatte = "/assets/coffee-iced-latte-88g_RZCG.jpg";
const pourover = "/assets/coffee-pourover--5thPKYY.jpg";
const latteArt = "/assets/coffee-latte-art-BNBMN81j.jpg";
const dirtyCoffee = "/assets/coffee-dirty-CbNbNVCK.jpg";
const frappuccino = "/assets/coffee-frappuccino-CtHlJzUJ.jpg";
const espressoShot = "/assets/coffee-espresso-shot-DdwtpNkS.jpg";
const flatWhite = "/assets/coffee-flat-white-Bd5Mj_p5.jpg";
const cappuccino = "/assets/coffee-cappuccino--SlMfayN.jpg";
const americano = "/assets/coffee-americano-CjVeXCwW.jpg";
const mocha = "/assets/coffee-mocha-BE5kEmkS.jpg";
const cortado = "/assets/coffee-cortado-D9m4dNc7.jpg";
const aeropress = "/assets/coffee-aeropress-Bh9JQ7xv.jpg";
const FLAVORS = [{
  id: "fruity",
  label: "Fruity"
}, {
  id: "floral",
  label: "Floral"
}, {
  id: "nutty",
  label: "Nutty"
}, {
  id: "chocolate",
  label: "Chocolate"
}, {
  id: "milky",
  label: "Milky"
}];
const MILKS = [{
  id: "whole",
  label: "Whole milk"
}, {
  id: "skim",
  label: "Skim milk"
}, {
  id: "oat",
  label: "Oat milk"
}, {
  id: "coconut",
  label: "Coconut milk"
}, {
  id: "none",
  label: "No milk"
}];
const LOADING_MESSAGES = ["Analyzing your taste...", "Matching with Starbucks, Luckin, Manner..."];
const IMAGE_BY_KEY = {
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
  aeropress
};
const DEFAULT_IMAGE_KEYS_BY_TEMP = {
  iced: ["icedLatte", "frappuccino", "dirty", "mocha"],
  hot: ["pourover", "latteArt", "flatWhite", "cappuccino", "espressoShot", "cortado", "americano", "aeropress"]
};
function mapRecommendations(list, temp) {
  const defaults = DEFAULT_IMAGE_KEYS_BY_TEMP[temp];
  return list.map((rec, index) => {
    const imageKey = rec.imageKey && IMAGE_BY_KEY[rec.imageKey] ? rec.imageKey : defaults[index % defaults.length];
    return {
      ...rec,
      imageKey,
      image: IMAGE_BY_KEY[imageKey],
      match: Math.max(0, Math.min(100, Math.round(rec.match)))
    };
  });
}
function Index() {
  const [strength, setStrength] = reactExports.useState(3);
  const [sweetness, setSweetness] = reactExports.useState(2);
  const [temp, setTemp] = reactExports.useState("hot");
  const [milk, setMilk] = reactExports.useState("oat");
  const [flavors, setFlavors] = reactExports.useState(["nutty"]);
  const [extraNotes, setExtraNotes] = reactExports.useState("");
  const [showResults, setShowResults] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = reactExports.useState(0);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [recommendations, setRecommendations] = reactExports.useState([]);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  const toggleFlavor = (id) => {
    setFlavors((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          strength,
          sweetness,
          temperature: temp,
          milk,
          flavors,
          extraNotes
        })
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
        document.getElementById("results")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI service is temporarily unavailable. Please try again.";
      setErrorMsg(message);
    } finally {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bgImage, alt: "", "aria-hidden": "true", width: 1920, height: 1280, className: "h-full w-full object-cover opacity-25" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-latte/85 via-latte/80 to-latte/95" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-6 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-12 pb-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-accent", children: "AI · Taste · Curated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl", children: [
          "The cup that ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-accent", children: "knows" }),
          " you",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "before you do."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-base text-muted-foreground", children: "Tell us how you take it. Our AI sommelier scans thousands of brews from world-class roasters and finds the one made for your palate." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8 sm:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-baseline justify-between border-b border-foreground/10 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-foreground", children: "Your Taste Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "No. 01 / 06" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl text-foreground", children: "Strength" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "How bold should the brew be?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BeanRating, { value: strength, onChange: setStrength })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-foreground/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl text-foreground", children: "Sweetness" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "A little sugar, or a sweet symphony?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SugarRating, { value: sweetness, onChange: setSweetness })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-foreground/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl text-foreground", children: "Temperature" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Frosty refreshment or warm embrace?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TempToggle, { value: temp, onChange: setTemp })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-foreground/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl text-foreground", children: "Milk Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose your perfect pour." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: MILKS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMilk(m.id), className: `rounded-full border px-5 py-2 text-sm transition-all ${milk === m.id ? "border-foreground bg-foreground text-cream shadow-sm" : "border-foreground/20 text-foreground/70 hover:border-foreground/50"}`, children: m.label }, m.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-foreground/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl text-foreground", children: "Flavor Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pick all that call to you." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: [
                flavors.length,
                " selected"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: FLAVORS.map((f) => {
              const active = flavors.includes(f.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleFlavor(f.id), "aria-pressed": active, className: `group inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-all ${active ? "border-accent bg-accent/15 text-foreground shadow-[inset_0_0_0_1px_oklch(0.55_0.1_55/0.4)]" : "border-foreground/20 text-foreground/70 hover:border-foreground/50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-4 w-4 items-center justify-center rounded-full border transition-all ${active ? "border-accent bg-accent text-cream" : "border-foreground/30 bg-transparent"}`, children: active && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-3 w-3", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12l5 5L20 7", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
                f.label
              ] }, f.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-foreground/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl text-foreground", children: "Extra Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Whisper your preferences to the barista." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: extraNotes, onChange: (e) => setExtraNotes(e.target.value), placeholder: "Any secret cravings? (e.g., light ice, extra hot...)", className: "w-full rounded-full border border-foreground/15 bg-cream/40 px-6 py-4 text-sm text-foreground placeholder:italic placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSubmit, disabled: loading, className: "btn-coffee group rounded-full px-10 py-5 font-serif text-lg tracking-wide disabled:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 inline-flex items-center gap-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-5 w-5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 animate-spin rounded-full border-2 border-cream/30 border-t-cream" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-fade-up", children: LOADING_MESSAGES[loadingMsgIdx] }, loadingMsgIdx)
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Discover My Brand Match",
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 transition-transform group-hover:translate-x-1", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14M13 5l7 7-7 7", strokeLinecap: "round", strokeLinejoin: "round" }) })
        ] }) }) }) }),
        errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-sm text-destructive", children: errorMsg })
      ] }) }),
      showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "results", className: "mt-28 scroll-mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-accent", children: "The Verdict" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-serif text-4xl text-foreground sm:text-5xl", children: "Three cups, hand-picked for you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground", children: "Curated by your taste profile — no checkout, just discovery." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-10 px-2 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-6", children: recommendations.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecommendationCard, { rec, index: i }, rec.brand)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-foreground/10 bg-foreground/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2026 Brewed. A taste-first AI experience." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif italic", children: "— Brewed with care, served with intention." })
    ] }) })
  ] });
}
export {
  Index as component
};
