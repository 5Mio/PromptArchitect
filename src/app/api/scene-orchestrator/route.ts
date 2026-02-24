import { NextRequest, NextResponse } from "next/server";

// ─── Creative Spark Pools ─────────────────────────────────────
// Each generation draws one random element from each pool.
// These act as invisible creative lenses — not literal instructions.

const FILM_LENSES = [
  "Wabi-sabi Japanese minimalism — imperfection and transience as beauty",
  "Soviet constructivist geometry — bold diagonals and graphic tension",
  "French New Wave spontaneity — handheld intimacy, natural light, stolen moments",
  "Italian Neorealism rawness — real locations, ambient light, unguarded emotion",
  "Hong Kong cinema kinetics — layered reflections, motion blur, urban density",
  "Scandinavian hygge stillness — soft diffused light, warmth against cold",
  "90s grunge editorial — overexposed film, tactile grain, anti-glamour beauty",
  "Art Deco opulence — symmetry, gilded surfaces, theatrical shadow play",
  "Magical realism — one impossible element treated as completely ordinary",
  "Brutalist contrast — vast concrete geometry, single object as sole focal point",
  "Wong Kar-wai time poetry — slow motion, saturated color, blurred motion trails",
  "Terrence Malick golden hour — extreme backlight, whispered narration energy",
  "David Lynch surrealism — ordinary spaces made deeply uncanny",
  "Gregory Crewdson suburban sublime — cinematic lighting in mundane environments",
];

const NARRATIVE_ARCHETYPES = [
  "The moment before departure — something is about to change forever",
  "The ritual of preparation — a private ceremony before the world sees",
  "The accidental discovery — the subject found, not staged",
  "The quiet aftermath — the story just happened, only traces remain",
  "The transformation in progress — caught mid-metamorphosis",
  "The unexpected encounter — two worlds meeting for the first time",
  "The private celebration — joy witnessed by no one but the camera",
  "The test of endurance — the subject persists against its environment",
  "The moment of recognition — something understood clearly for the first time",
  "The inheritance — object carries the accumulated weight of time and memory",
  "The threshold — standing at the exact border between two worlds",
  "The return — familiar object seen with completely new eyes",
];

const CONTRAST_WORLDS = [
  "hyper-luxury object abandoned in raw industrial decay",
  "ancient handcraft in a neon-lit digital future",
  "perfect geometric order colliding with organic natural chaos",
  "intimate human warmth inside a vast frozen empty landscape",
  "fragile delicate object amid overwhelming scale or power",
  "old-world artisanal precision inside a hypermodern metropolis at 3am",
  "silence and absolute stillness at the epicenter of potential energy",
  "a single warm light source as the only thing alive in total darkness",
  "the handmade in a world of perfect machine replication",
  "natural material (stone, water, wood) meeting synthetic luxury directly",
  "extreme close-up intimacy inside an overwhelmingly grand architectural space",
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { imageAnalysis, useCase, tone, userText, selectedSeeds } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API Key fehlt in .env.local" },
        { status: 500 }
      );
    }

    const hasImage = imageAnalysis && Object.keys(imageAnalysis).length > 0;
    const hasSeeds = Array.isArray(selectedSeeds) && selectedSeeds.length > 0;

    // Draw a fresh creative spark for each generation
    const creativeSpark = {
      filmLens: pick(FILM_LENSES),
      narrativeArchetype: pick(NARRATIVE_ARCHETYPES),
      contrastWorld: pick(CONTRAST_WORLDS),
    };

    const contextParts = [
      hasImage
        ? `VISUAL DATA:\n${JSON.stringify(imageAnalysis, null, 2)}`
        : null,
      userText
        ? `USER SCENE DIRECTION — MANDATORY:\nAll 6 scenarios MUST be directly grounded in this creative vision. Do not deviate:\n"${userText}"`
        : null,
      `USE CASE: ${useCase || "produkt"}`,
      `TONE: ${tone || "luxury"}`,
      hasSeeds
        ? `CREATIVE DIRECTION — MANDATORY:\nAll 6 scenarios MUST be grounded in this creative world:\n${(selectedSeeds as string[]).map((s: string) => `- ${s}`).join("\n")}`
        : null,
      `═══ CREATIVE SPARK — USE AS LENS, NOT LITERAL ═══
Apply these 3 creative dimensions as invisible filters while generating scenarios.
Do NOT reference them literally — let them shape the ENERGY, PERSPECTIVE, and FEELING.

FILM LENS      : ${creativeSpark.filmLens}
NARRATIVE TYPE : ${creativeSpark.narrativeArchetype}
CONTRAST WORLD : ${creativeSpark.contrastWorld}
═══════════════════════════════════════════════════`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const system = `You are a creative director generating 6 distinct scene scenarios for AI visual generation.

Each scenario must be RADICALLY DIFFERENT from the others in: framing, camera distance, narrative sub-moment, and emotional register.

RULES:
- NEVER suggest "product on white background" or generic studio shots
- Every scenario must be SPECIFIC and CINEMATIC — name exact locations, light sources, atmospheric conditions
- Scenarios must respect the selected TONE as the style filter
- Scenarios must serve the USE CASE context
- If USER SCENE DIRECTION is provided, ALL 6 scenarios MUST stay within that creative vision
- If CREATIVE DIRECTION seeds are provided, ALL 6 scenarios MUST stay within that creative world
- The CREATIVE SPARK provides invisible energy — let it influence tone and perspective without being named
- Each scenario must occupy a DIFFERENT camera distance: one macro, one extreme close-up, one medium, one wide, one environmental, one POV or subjective

Return ONLY a valid JSON array of exactly 6 objects. No markdown, no explanation:

[
  {
    "id": "s1",
    "title": "<3-4 words, cinematic, evocative>",
    "scenario": "<2 sentences: what is happening in this exact moment? What makes it unique?>",
    "environment": "<specific location + time of day + key light source>",
    "mood": "<exactly 3 comma-separated adjectives>"
  }
]`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1400,
        system,
        messages: [{ role: "user", content: contextParts }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: `Claude API Fehler: ${data.error.message}` },
        { status: 500 }
      );
    }

    const rawText = data.content?.map((c: any) => c.text || "").join("") || "";
    const text = rawText.replace(/```(?:json)?\s*/gi, "").replace(/```\s*/g, "");
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      return NextResponse.json(
        { error: "Kein gültiges JSON Array zurückgegeben" },
        { status: 500 }
      );
    }

    const scenes = JSON.parse(text.slice(start, end + 1));
    return NextResponse.json({ scenes });
  } catch (err: any) {
    console.error("Error in /api/scene-orchestrator:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
