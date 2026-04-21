import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-NiO-KzHT.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$2 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter = () => import("./index-CUR9iANm.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Brewed — AI Coffee Recommender"
    }, {
      name: "description",
      content: "Discover your perfect cup. An AI-powered coffee recommender that matches your taste profile to artisan brews from world-class roasters."
    }, {
      property: "og:title",
      content: "Brewed — AI Coffee Recommender"
    }, {
      property: "og:description",
      content: "Discover your perfect cup, brewed by AI."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const flavorSchema = enumType(["fruity", "floral", "nutty", "chocolate", "milky"]);
const milkSchema = enumType(["whole", "skim", "oat", "coconut", "none"]);
const tempSchema = enumType(["iced", "hot"]);
const imageKeySchema = enumType([
  "dirty",
  "frappuccino",
  "icedLatte",
  "pourover",
  "latteArt",
  "espressoShot",
  "flatWhite",
  "cappuccino",
  "americano",
  "mocha",
  "cortado",
  "aeropress"
]);
const requestSchema = objectType({
  strength: numberType().int().min(1).max(5),
  sweetness: numberType().int().min(1).max(5),
  temperature: tempSchema,
  milk: milkSchema,
  flavors: arrayType(flavorSchema).max(5),
  extraNotes: stringType().max(200).optional().default("")
});
const recommendationSchema = objectType({
  brand: stringType().min(1).max(60),
  drink: stringType().min(1).max(80),
  match: numberType().min(0).max(100),
  notes: stringType().min(1).max(280),
  imageKey: imageKeySchema.optional()
});
const responseSchema = objectType({
  recommendations: arrayType(recommendationSchema).length(3)
});
const GEMINI_RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    recommendations: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          brand: { type: "string" },
          drink: { type: "string" },
          match: {
            type: "integer",
            minimum: 80,
            maximum: 99
          },
          notes: { type: "string" },
          imageKey: {
            type: "string",
            enum: [
              "dirty",
              "frappuccino",
              "icedLatte",
              "pourover",
              "latteArt",
              "espressoShot",
              "flatWhite",
              "cappuccino",
              "americano",
              "mocha",
              "cortado",
              "aeropress"
            ]
          }
        },
        required: ["brand", "drink", "match", "notes"]
      }
    }
  },
  required: ["recommendations"]
};
const FLAVOR_LABELS = {
  fruity: "Fruity",
  floral: "Floral",
  nutty: "Nutty",
  chocolate: "Chocolate",
  milky: "Milky"
};
const MILK_LABELS = {
  whole: "Whole milk",
  skim: "Skim milk",
  oat: "Oat milk",
  coconut: "Coconut milk",
  none: "No milk"
};
const TEMP_LABELS = {
  iced: "Iced",
  hot: "Hot"
};
const DEFAULT_IMAGE_KEYS = {
  iced: ["icedLatte", "frappuccino", "dirty", "mocha"],
  hot: ["pourover", "latteArt", "flatWhite", "cappuccino", "espressoShot", "cortado", "americano", "aeropress"]
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
function buildPrompt(input) {
  const flavorText = input.flavors.length ? input.flavors.map((item) => FLAVOR_LABELS[item]).join(",") : "none";
  const extraNotes = input.extraNotes?.trim() || "none";
  return [
    "Return 3 coffee recommendations.",
    "Use only brands: LUCKIN,MANNER,STARBUCKS,COTTON,KENYUE(COSTA).",
    "Use different imageKey for each recommendation.",
    "notes must be one short sentence.",
    `profile: strength=${input.strength};sweetness=${input.sweetness};temp=${TEMP_LABELS[input.temperature]};milk=${MILK_LABELS[input.milk]};flavors=${flavorText};extra=${extraNotes}`
  ].join("\n");
}
function parseGeminiText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return null;
  const text = parts.map((part) => typeof part?.text === "string" ? part.text : "").join("").trim();
  return text || null;
}
function normalizeResponse(result, temperature) {
  const defaults = DEFAULT_IMAGE_KEYS[temperature];
  const allKeys = imageKeySchema.options;
  const used = /* @__PURE__ */ new Set();
  const pickUniqueImageKey = (preferred, index) => {
    if (preferred && !used.has(preferred)) {
      used.add(preferred);
      return preferred;
    }
    const fallback = defaults.find((key) => !used.has(key));
    if (fallback) {
      used.add(fallback);
      return fallback;
    }
    const anyUnused = allKeys.find((key) => !used.has(key));
    if (anyUnused) {
      used.add(anyUnused);
      return anyUnused;
    }
    return defaults[index % defaults.length];
  };
  return {
    recommendations: result.recommendations.map((item, index) => ({
      ...item,
      match: Math.max(0, Math.min(100, Math.round(item.match))),
      imageKey: pickUniqueImageKey(item.imageKey, index)
    }))
  };
}
const Route = createFileRoute("/api/recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.GEMINI_API_KEY;
        const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
        const baseUrl = (process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com").replace(/\/+$/, "");
        const apiRoot = baseUrl.endsWith("/v1beta") ? baseUrl : `${baseUrl}/v1beta`;
        const endpoint = process.env.GEMINI_ENDPOINT || `${apiRoot}/models/${model}:generateContent`;
        if (!apiKey) {
          return json({ error: "Missing GEMINI_API_KEY in Worker secrets." }, 500);
        }
        let body;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON body." }, 400);
        }
        const parsed = requestSchema.safeParse(body);
        if (!parsed.success) {
          return json({ error: "Invalid request payload.", details: parsed.error.flatten() }, 400);
        }
        const geminiReqBody = {
          contents: [{ parts: [{ text: buildPrompt(parsed.data) }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 260,
            responseMimeType: "application/json",
            responseJsonSchema: GEMINI_RESPONSE_SCHEMA
          }
        };
        try {
          const upstream = await fetch(`${endpoint}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiReqBody)
          });
          if (!upstream.ok) {
            const detail = await upstream.text();
            return json({ error: "Gemini upstream error.", detail }, upstream.status || 502);
          }
          const geminiPayload = await upstream.json();
          const outputText = parseGeminiText(geminiPayload);
          if (typeof outputText !== "string" || !outputText.trim()) {
            return json({ error: "Gemini returned empty content." }, 502);
          }
          const parsedJson = JSON.parse(outputText);
          const structured = responseSchema.parse(parsedJson);
          return json(normalizeResponse(structured, parsed.data.temperature));
        } catch (error) {
          console.error("recommend api failed:", error);
          return json({ error: "Failed to generate recommendations." }, 500);
        }
      }
    }
  }
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const ApiRecommendRoute = Route.update({
  id: "/api/recommend",
  path: "/api/recommend",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  ApiRecommendRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router;
};
export {
  getRouter
};
