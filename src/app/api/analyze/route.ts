import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ─── Bug #3 Fix: Available tag labels that Gemini must use EXACTLY ────────────
// Auto-synced from src/lib/constants.ts LIBRARY entries
const AVAILABLE_TAGS = [
  // Visueller Stil
  "Cinematic Widescreen", "Documentary Raw", "Luxury Commercial", "Fashion Editorial",
  "Noir Classique", "Hyperrealist", "Radical Minimalist", "Vintage 35mm",
  "Futuristisch", "Brutalist", "Impressionistisch", "Industriell",
  "Wabi-Sabi", "Art Deco", "Bauhaus", "Expressionistisch",
  "Surrealismus", "Pop Art", "Romantizismus", "Street Photography",
  "Fine Art", "Reportage", "Conceptual", "Typografisch", "Archival",
  "Natur-Dokumentation", "Product Hero Shot", "Lookbook", "Food Editorial",
  "Architectural Photography", "Sozialrealismus", "Piktorialismus",
  "Neue Sachlichkeit", "Japonismus", "Ukiyo-e Inspired", "Cyber-Noir",
  "Pastoral", "Grunge", "Glamour Classic", "Scandinavia Clean",
  "Mediterranean Warmth", "Berlin Underground", "Tokyo Neon",
  "Desert Minimalism", "Ocean Documentary", "Haute Cuisine", "Street Food Raw",
  "Makrokunst", "Infrarot", "Cyanotypie",
  // Stimmung & Atmosphäre
  "Intim & Privat", "Dramatisch", "Melancholisch", "Mysteriös",
  "Friedvoll", "Angespannt", "Nostalgisch", "Roh & Ehrlich",
  "Triumphierend", "Ätherisch", "Verführerisch", "Verspielt",
  "Episch", "Kalt & Distanziert", "Bedrohlich", "Ehrfürchtig",
  "Visionär", "Primitiv & Ursprünglich", "Luxuriös", "Bescheiden",
  "Intensiv", "Verträumt", "Heimelig", "Aufregend", "Einsam", "Festlich",
  // Kamera & Technik
  "Weitwinkel", "Telephoto", "Makro", "Fisheye", "Tilt-Shift",
  "Drohne", "Handheld Raw", "Steadicam", "Hochformat", "Panorama",
  // Komposition
  "Symmetrie", "Goldener Schnitt", "Negative Space", "Layering",
  "Diagonale", "Rahmen im Rahmen", "Zentralperspektive",
  "Über-die-Schulter", "Vogelperspektive", "Froschperspektive",
  // Licht & Farbe
  "Goldene Stunde", "Blaue Stunde", "Hartes Licht", "Weiches Licht",
  "Gegenlicht", "Chiaroscuro", "Neon", "Monochrom", "Pastelltöne",
  "Satte Farben", "Entsättigt", "Duotone", "Split Toning",
  // Bewegung & Zeit
  "Freeze Frame", "Motion Blur", "Langzeitbelichtung", "Slow Motion",
  "Zeitraffer", "Panning", "Ghosting",
  // Kontext & Setting
  "Studio", "Urban", "Natur", "Architektur", "Interior", "Underwater",
  "Aerial", "Underground", "Crowd", "Solitude",
].join('", "');

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
    const { imageBase64, mimeType, useCaseInstruction, mode = "video" } =
      await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key fehlt in .env.local" }, { status: 500 });
    }

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
  "recommendations": {
    "use_case": "one of: produkt|marketing|story|humor|lifestyle|food|fashion|architektur|natur|technologie|event|portrait",
    "tone": "one of: luxury|documentary|editorial|dark|artistic|commercial",
    "duration": "one of: 3|5|8|15",
    "tags_visueller_stil": ["0-3 tags: Cinematic Widescreen, Documentary Raw, Luxury Commercial, Fashion Editorial, Noir Classique, Hyperrealist, Radical Minimalist, Vintage 35mm, Futuristisch, Wabi-Sabi, Art Deco, Bauhaus, Product Hero Shot, Lookbook, Cyber-Noir, Glamour Classic, Scandinavia Clean, Berlin Underground, Tokyo Neon, Desert Minimalism"],
    "tags_stimmung": ["0-3 tags: Dramatisch, Melancholisch, Mysteriös, Friedvoll, Nostalgisch, Triumphierend, Ätherisch, Verführerisch, Episch, Luxuriös, Intensiv, Aufregend, Bedrohlich, Visionär, Primitiv & Ursprünglich"],
    "tags_kamera": ["0-2 tags: Weitwinkel, Telephoto, Makro, Fisheye, Tilt-Shift, Drohne, Handheld Raw, Steadicam, Hochformat, Panorama"],
    "tags_licht": ["0-2 tags: Goldene Stunde, Blaue Stunde, Hartes Licht, Weiches Licht, Gegenlicht, Chiaroscuro, Neon, Monochrom, Satte Farben, Entsättigt"],
    "tags_komposition": ["0-2 tags: Symmetrie, Goldener Schnitt, Negative Space, Layering, Diagonale, Rahmen im Rahmen, Zentralperspektive, Vogelperspektive, Froschperspektive"],
    "tags_material": ["0-2 tags: Metall Poliert, Metall Chrome, Glas Klar, Leder Glatt, Leder Krokodil, Holz Hell, Stein Marmor, Wasser Tropfen, Textil Seide, Textil Leder"]
  }
}

CRITICAL RULES FOR RECOMMENDATIONS:
1. Each tags array MUST contain only labels from its listed options — copy letter-perfect
2. Return empty array [] for categories not relevant to this image  
3. "use_case" must be exactly one of the 12 values shown
4. "tone" must be exactly one of the 6 values shown
5. Recommend tags across MULTIPLE categories — a watch should get visueller_stil + licht + komposition + material tags
Return ONLY valid JSON. No markdown fences, no explanation text.`;

    let parsed: any;
    try {
      // ─── GEMINI EXECUTION ───────────────────────────────────────
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        { text: systemPrompt },
        {
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: imageBase64,
          },
        },
      ]);

      const text = result.response.text().trim();
      const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No JSON found in Gemini response");

      parsed = JSON.parse(cleaned.slice(start, end + 1));
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
    const { recommendations, ...analysis } = parsed;

    // Merge category-specific tags into single flat array for page.tsx
    if (recommendations) {
      const allTags = [
        ...(recommendations.tags_visueller_stil || []),
        ...(recommendations.tags_stimmung || []),
        ...(recommendations.tags_kamera || []),
        ...(recommendations.tags_licht || []),
        ...(recommendations.tags_komposition || []),
        ...(recommendations.tags_material || []),
      ].filter(t => typeof t === 'string' && t.length > 0);
      recommendations.tags = allTags;
    }

    return NextResponse.json({
      analysis,
      recommendations: recommendations || null,
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[analyze] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
