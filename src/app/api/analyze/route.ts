import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LIBRARY, SCENE_LIBRARY } from "@/lib/constants";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Initialisiere genAI später in der POST Funktion


// ─── Build LIBRARY_TAGS dynamically from constants.ts ────────────────────────
// Single source of truth — no manual sync needed, no label drift possible.
const CAT_ID_TO_KEY: Record<string, string> = {
  style: "visueller_stil",
  mood: "stimmung",
  kamera: "kameratechnik",
  licht: "lichtgestaltung",
  linse: "linse_optik",
  farbe: "farbgebung",
  physik: "physik_material",
  komposition: "komposition",
  atmosphaere: "atmosphaere_umgebung",
  bewegung: "bewegung_zeit",
  director: "director_philosophie",
  zeitgeist: "zeitgeist_aera",
  sound: "sound_synaesthesie",
  produkt_typ: "produkt_typen",
};

const LIBRARY_TAGS: Record<string, string[]> = Object.fromEntries(
  LIBRARY
    .filter(cat => cat.id in CAT_ID_TO_KEY)
    .map(cat => [CAT_ID_TO_KEY[cat.id], cat.entries.map(e => e.label)])
);

// Embed tag lists for the Gemini prompt (exact labels for copy-paste fidelity)
const TAG_REFERENCE = Object.entries(LIBRARY_TAGS)
  .map(([key, tags]) => `${key}: ${tags.join(" | ")}`)
  .join("\n");

// Kompakte Label-Referenz der Scene Library (nur Labels, keine Seed-Texte)
const SCENE_SEED_REFERENCE = SCENE_LIBRARY
  .map(cat => `${cat.id}: ${cat.entries.map(e => e.label).join(" | ")}`)
  .join("\n");

// Vollständiges Set gültiger Scene-Seed Labels für Validierung
const VALID_SCENE_SEEDS = new Set(
  SCENE_LIBRARY.flatMap(cat => cat.entries.map(e => e.label))
);

// ─── Bug #2 Fix: Mode-aware analysis focus ────────────────────────────────────
const MODE_CONTEXT: Record<string, string> = {
  video: `This analysis will be used for VIDEO generation. Focus on:
- Motion potential: what elements could move, flow, or animate naturally
- Temporal aspects: how light, particles, or materials could change over time
- Physics cues: gravity, liquid behavior, steam, fabric movement
- Camera movement potential: zoom, pan, orbit opportunities`,
  image: `This analysis will be used for STILL IMAGE generation. Focus on:
- Static composition: balance, rule of thirds, negative space
- Material surface detail: textures, reflections, fine grain
- Light behavior on surfaces: highlights, shadows, gradients
- Depth and layering: foreground, subject, background separation`,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[analyze] Request received. Payload keys:", Object.keys(body));
    const { imageBase64, mimeType, useCaseInstruction, mode = "video" } = body;


    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key fehlt in .env.local" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);


    const systemPrompt = `You are an expert visual analyst for AI content generation.

USE CASE FOCUS:
${useCaseInstruction || "Analyze the product for general commercial use."}

GENERATION MODE:
${MODE_CONTEXT[mode] || MODE_CONTEXT.video}

TASK:
Analyze the provided image and return a JSON object with these exact fields:

{
  "subject": "Main subject/product description",
  "materials": "Key materials, textures, surfaces visible",
  "colors": "Color palette - primary and accent colors",
  "lighting": "Current lighting setup and quality",
  "composition": "Framing, angles, spatial arrangement",
  "mood": "Emotional tone and atmosphere",
  "background": "Background elements and setting",
  "unique_details": "Distinctive visual characteristics worth preserving",
  "visible_text": "ALL text visible in the image — brand names, logos, model numbers, labels, product names, slogans, serial numbers, ingredient lists — quoted VERBATIM exactly as it appears. Empty string if no text is visible.",
  "recommendations": {
    "use_case": "one of: produkt|marketing|story|humor|lifestyle|food|fashion|architektur|natur|technologie|event|portrait",
    "tone": "one of: luxury|documentary|editorial|dark|artistic|commercial",
    "duration": "one of: 3|5|8|15",
    "tags_visueller_stil": ["0-3 tags from LIBRARY_TAGS.visueller_stil — pick what fits the image aesthetic"],
    "tags_stimmung": ["0-3 tags from LIBRARY_TAGS.stimmung — emotional feeling of the image"],
    "tags_kamera": ["0-2 tags from LIBRARY_TAGS.kameratechnik — camera movement or setup that matches"],
    "tags_licht": ["0-2 tags from LIBRARY_TAGS.lichtgestaltung — lighting character visible in image"],
    "tags_linse": ["0-2 tags from LIBRARY_TAGS.linse_optik — lens choice that fits the look"],
    "tags_farbe": ["0-2 tags from LIBRARY_TAGS.farbgebung — color grade or film stock that matches"],
    "tags_material": ["0-3 tags from LIBRARY_TAGS.physik_material — materials visible in the image"],
    "tags_komposition": ["0-2 tags from LIBRARY_TAGS.komposition — framing approach used"],
    "tags_atmosphaere": ["0-2 tags from LIBRARY_TAGS.atmosphaere_umgebung — environment/setting"],
    "tags_bewegung": ["0-2 tags from LIBRARY_TAGS.bewegung_zeit — motion quality if relevant"],
    "tags_director": ["0-1 tags from LIBRARY_TAGS.director_philosophie — director whose style matches"],
    "tags_zeitgeist": ["0-1 tags from LIBRARY_TAGS.zeitgeist_aera — era or cultural moment"],
    "tags_sound": ["0-1 tags from LIBRARY_TAGS.sound_synaesthesie — sonic atmosphere"],
    "tags_produkt": ["0-2 tags from LIBRARY_TAGS.produkt_typen — product category if applicable"],
    "scene_seeds": ["0-3 labels from AVAILABLE SCENE SEEDS below — entries matching the image's mood, setting, or narrative. Empty array [] if nothing clearly fits."]
  }
}

AVAILABLE TAGS — copy labels with exact spelling, including all special characters:
${TAG_REFERENCE}

AVAILABLE SCENE SEEDS — use exact labels only:
${SCENE_SEED_REFERENCE}

CRITICAL RULES FOR RECOMMENDATIONS:
1. Each tags array MUST only use labels EXACTLY as listed above for that category
2. Return [] for categories clearly not relevant — don't force tags
3. Quality over quantity — 8-15 total tags across all categories is ideal
4. "use_case" must be exactly one of the 12 values
5. "tone" must be exactly one of the 6 values
6. Be creative and specific — director_philosophie and zeitgeist_aera add real depth
7. scene_seeds: pick 0-3 labels EXACTLY as listed in AVAILABLE SCENE SEEDS — German umlauts included. Return [] if no strong match.

Return ONLY valid JSON. No markdown fences, no explanation text.`;

    let parsed: any;
    try {
      // ─── GEMINI EXECUTION ───────────────────────────────────────
      const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-1.5-pro"];
      const GEMINI_TIMEOUT_MS = 25000;

      const callGemini = (modelName: string) => {
        const m = genAI.getGenerativeModel({ model: modelName });
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Gemini Timeout nach ${GEMINI_TIMEOUT_MS / 1000}s`)), GEMINI_TIMEOUT_MS)
        );
        return Promise.race([
          m.generateContent([
            { text: systemPrompt },
            { inlineData: { mimeType: mimeType || "image/jpeg", data: imageBase64 } },
          ]),
          timeout,
        ]);
      };

      let result: any;
      for (const modelName of GEMINI_MODELS) {
        try {
          console.log(`[analyze] Trying ${modelName}...`);
          result = await callGemini(modelName);
          console.log(`[analyze] ✓ ${modelName} responded`);
          break;
        } catch (e: any) {
          console.warn(`[analyze] ${modelName} failed: ${e.message}`);
          if (modelName === GEMINI_MODELS[GEMINI_MODELS.length - 1]) throw e;
        }
      }

      const response = result.response;
      const text = response.text().trim();
      console.log("[analyze] Gemini response received (length:", text.length, ")");

      const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      if (start === -1 || end === -1) {
        console.error("[analyze] No JSON brace found in Gemini response. Cleaned text:", cleaned);
        throw new Error("Kein gültiges JSON in der Gemini-Antwort gefunden");
      }

      const jsonString = cleaned.slice(start, end + 1);
      try {
        parsed = JSON.parse(jsonString);
      } catch (parseError) {
        console.error("[analyze] JSON parse error. JSON string:", jsonString);
        throw new Error("Die KI-Antwort konnte nicht als JSON verarbeitet werden.");
      }
      console.log("✓ Gemini Analysis Successful");

    } catch (geminiError: any) {
      console.warn("⚠️ GEMINI FAILED:", geminiError.message);

      if (!openaiKey) {
        return NextResponse.json({
          error: `Gemini Fehler: ${geminiError.message}. OpenAI Fallback nicht möglich.`
        }, { status: 500 });
      }

      console.log("→ Attempting OpenAI Vision Fallback...");
      try {
        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: "You are an expert visual analyst. Return ONLY valid JSON." },
              {
                role: "user",
                content: [
                  { type: "text", text: systemPrompt },
                  { type: "image_url", image_url: { url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}` } }
                ]
              }
            ]
          })
        });

        const oaiData = await openaiResponse.json();
        if (!openaiResponse.ok) throw new Error(oaiData.error?.message || "OpenAI error");

        parsed = JSON.parse(oaiData.choices[0].message.content);
        console.log("✓ OpenAI Fallback Successful");

      } catch (oaiError: any) {
        return NextResponse.json({
          error: `Kritischer Fehler. (Gemini: ${geminiError.message} | OpenAI: ${oaiError.message})`
        }, { status: 500 });
      }
    }

    // Split analysis from recommendations
    if (!parsed) {
      throw new Error("AI response could not be parsed as a valid object");
    }
    const { recommendations, ...analysis } = parsed;

    // Merge all 14 category tag arrays into single flat array for page.tsx
    if (recommendations) {
      const allTags = [
        ...(recommendations.tags_visueller_stil || []),
        ...(recommendations.tags_stimmung || []),
        ...(recommendations.tags_kamera || []),
        ...(recommendations.tags_licht || []),
        ...(recommendations.tags_linse || []),
        ...(recommendations.tags_farbe || []),
        ...(recommendations.tags_material || []),
        ...(recommendations.tags_komposition || []),
        ...(recommendations.tags_atmosphaere || []),
        ...(recommendations.tags_bewegung || []),
        ...(recommendations.tags_director || []),
        ...(recommendations.tags_zeitgeist || []),
        ...(recommendations.tags_sound || []),
        ...(recommendations.tags_produkt || []),
      ].filter(t => typeof t === 'string' && t.length > 0);
      recommendations.tags = allTags;

      // Validate scene_seeds — only keep labels that exist in SCENE_LIBRARY
      if (Array.isArray(recommendations.scene_seeds)) {
        recommendations.scene_seeds = recommendations.scene_seeds
          .filter((s: unknown) => typeof s === "string" && VALID_SCENE_SEEDS.has(s));
      } else {
        recommendations.scene_seeds = [];
      }
    }

    return NextResponse.json({
      analysis,
      recommendations: recommendations || null,
    });

  } catch (err: any) {
    console.error("[analyze] Critical Error:", err);
    return NextResponse.json({
      error: err.message || "Unknown error",
      details: err.stack || undefined
    }, { status: 500 });
  }

}
