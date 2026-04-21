import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const flavorSchema = z.enum(["fruity", "floral", "nutty", "chocolate", "milky"]);
const milkSchema = z.enum(["whole", "skim", "oat", "coconut", "none"]);
const tempSchema = z.enum(["iced", "hot"]);
const imageKeySchema = z.enum([
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
  "aeropress",
]);

const requestSchema = z.object({
  strength: z.number().int().min(1).max(5),
  sweetness: z.number().int().min(1).max(5),
  temperature: tempSchema,
  milk: milkSchema,
  flavors: z.array(flavorSchema).max(5),
  extraNotes: z.string().max(200).optional().default(""),
});

const recommendationSchema = z.object({
  brand: z.string().min(1).max(60),
  drink: z.string().min(1).max(80),
  match: z.number().min(0).max(100),
  notes: z.string().min(1).max(280),
  imageKey: imageKeySchema.optional(),
});

const responseSchema = z.object({
  recommendations: z.array(recommendationSchema).length(3),
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
            maximum: 99,
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
              "aeropress",
            ],
          },
        },
        required: ["brand", "drink", "match", "notes"],
      },
    },
  },
  required: ["recommendations"],
};

const FLAVOR_LABELS: Record<z.infer<typeof flavorSchema>, string> = {
  fruity: "Fruity",
  floral: "Floral",
  nutty: "Nutty",
  chocolate: "Chocolate",
  milky: "Milky",
};

const MILK_LABELS: Record<z.infer<typeof milkSchema>, string> = {
  whole: "Whole milk",
  skim: "Skim milk",
  oat: "Oat milk",
  coconut: "Coconut milk",
  none: "No milk",
};

const TEMP_LABELS: Record<z.infer<typeof tempSchema>, string> = {
  iced: "Iced",
  hot: "Hot",
};

const DEFAULT_IMAGE_KEYS: Record<z.infer<typeof tempSchema>, z.infer<typeof imageKeySchema>[]> = {
  iced: ["icedLatte", "frappuccino", "dirty", "mocha"],
  hot: ["pourover", "latteArt", "flatWhite", "cappuccino", "espressoShot", "cortado", "americano", "aeropress"],
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function buildPrompt(input: z.infer<typeof requestSchema>) {
  const flavorText = input.flavors.length ? input.flavors.map((item) => FLAVOR_LABELS[item]).join(",") : "none";
  const extraNotes = input.extraNotes?.trim() || "none";

  return [
    "Return 3 coffee recommendations.",
    "Use only brands: LUCKIN,MANNER,STARBUCKS,COTTON,KENYUE(COSTA).",
    "Use different imageKey for each recommendation.",
    "notes must be one short sentence.",
    `profile: strength=${input.strength};sweetness=${input.sweetness};temp=${TEMP_LABELS[input.temperature]};milk=${MILK_LABELS[input.milk]};flavors=${flavorText};extra=${extraNotes}`,
  ].join("\n");
}

function parseGeminiText(payload: any) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return null;
  const text = parts
    .map((part: any) => (typeof part?.text === "string" ? part.text : ""))
    .join("")
    .trim();
  return text || null;
}

function normalizeResponse(
  result: z.infer<typeof responseSchema>,
  temperature: z.infer<typeof tempSchema>,
): z.infer<typeof responseSchema> {
  const defaults = DEFAULT_IMAGE_KEYS[temperature];
  const allKeys = imageKeySchema.options;
  const used = new Set<string>();

  const pickUniqueImageKey = (preferred: string | undefined, index: number) => {
    if (preferred && !used.has(preferred)) {
      used.add(preferred);
      return preferred as z.infer<typeof imageKeySchema>;
    }
    const fallback = defaults.find((key) => !used.has(key));
    if (fallback) {
      used.add(fallback);
      return fallback;
    }
    const anyUnused = allKeys.find((key) => !used.has(key));
    if (anyUnused) {
      used.add(anyUnused);
      return anyUnused as z.infer<typeof imageKeySchema>;
    }
    return defaults[index % defaults.length];
  };

  return {
    recommendations: result.recommendations.map((item, index) => ({
      ...item,
      match: Math.max(0, Math.min(100, Math.round(item.match))),
      imageKey: pickUniqueImageKey(item.imageKey, index),
    })),
  };
}

export const Route = createFileRoute("/api/recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.GEMINI_API_KEY;
        const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
        const endpoint =
          process.env.GEMINI_ENDPOINT ||
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        if (!apiKey) {
          return json({ error: "Missing GEMINI_API_KEY in Worker secrets." }, 500);
        }

        let body: unknown;
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
            responseJsonSchema: GEMINI_RESPONSE_SCHEMA,
          },
        };

        try {
          const upstream = await fetch(`${endpoint}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiReqBody),
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
      },
    },
  },
});
