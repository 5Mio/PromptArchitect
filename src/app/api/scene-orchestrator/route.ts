import { NextRequest, NextResponse } from "next/server";

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

    const contextParts = [
      hasImage
        ? `VISUAL DATA:\n${JSON.stringify(imageAnalysis, null, 2)}`
        : null,
      userText ? `USER DIRECTION: "${userText}"` : null,
      `USE CASE: ${useCase || "produkt"}`,
      `TONE: ${tone || "luxury"}`,
      hasSeeds
        ? `CREATIVE DIRECTION — MANDATORY:\nAll 6 scenarios MUST be grounded in this creative world:\n${(selectedSeeds as string[]).map(s => `- ${s}`).join("\n")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const system = `You are a creative director generating 6 distinct scene scenarios for AI visual generation.

Each scenario must be RADICALLY DIFFERENT from the others in: framing, camera distance, narrative sub-moment.

RULES:
- NEVER suggest "product on white background" or generic studio shots
- Every scenario must be SPECIFIC and CINEMATIC — name exact locations, light sources, atmospheric conditions
- Scenarios must respect the selected TONE as the style filter
- Scenarios must serve the USE CASE context
- Use film/photography references in your imagination, not in the output
- If CREATIVE DIRECTION seeds are provided in the user message, ALL 6 scenarios MUST stay within that creative world

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
        max_tokens: 1200,
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
    // Strip markdown code fences if present
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
