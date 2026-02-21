import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      imageAnalysis,
      userText,
      tags,
      tagContributions,
      tone,
      duration,
      mode,
      useCase,
      useCaseInstruction,
    } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API Key fehlt in .env.local" },
        { status: 500 }
      );
    }

    const hasImage = imageAnalysis && Object.keys(imageAnalysis).length > 0;

    const context = [
      hasImage
        ? `═══ GEMINI VISION ANALYSIS — USE ALL OF THIS DATA ═══\n${JSON.stringify(imageAnalysis, null, 2)}\n═══ END ANALYSIS ═══`
        : null,
      userText ? `USER INTENTION / ADDITIONAL DIRECTION:\n"${userText}"` : null,
      tags?.length
        ? `SELECTED STYLE MODIFIERS:\n${tags.join(", ")}`
        : null,
      tagContributions?.length
        ? `PROMPT CONTRIBUTIONS FROM SELECTED TAGS (integrate these naturally):\n${tagContributions.join("\n")}`
        : null,
      `VISUAL TONE: ${tone || "luxury"}`,
      mode === "video" ? `VIDEO DURATION: ${duration || "8"} seconds` : null,
      `OUTPUT TYPE: ${(mode || "video").toUpperCase()} GENERATION PROMPT`,
      `USE CASE: ${useCase || "produkt"}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const system = `You are PromptArchitect Pro — the world's most precise AI prompt engineer for ${mode} generation tools in 2026.

YOUR PRIMARY MISSION: Transform raw visual data and user intention into a PERFECT, production-ready ${mode} prompt in English.

USE CASE PRIORITY INSTRUCTIONS:
${useCaseInstruction || "Focus on product detail accuracy above all else."}

ABSOLUTE RULES — NEVER VIOLATE:

1. DETAIL ACCURACY IS SACRED
   If the image analysis mentions "rose gold #B8722A" → the prompt MUST say "rose gold #B8722A"
   If it mentions "BOSS" logo → the prompt MUST say "BOSS logo"
   If it mentions "crocodile leather" → the prompt MUST say "crocodile-embossed leather"
   Every color, material, brand name, texture, dimension from the analysis goes into the prompt.
   NO DETAIL IS TOO SMALL.

2. WORLD BEFORE SUBJECT
   Always describe the environment first, then introduce the subject into that world.

3. PHYSICS ANCHORING
   Describe physical behavior with scientific precision:
   - Steam: "thin wisps, vertical rise, 0.3Hz sway, dissipates at 12cm"
   - Metal: "specular highlight travels 15° as camera rotates"
   - Liquid: "unbroken viscous stream, catching directional specular"

4. EMOTIONAL STATE — NOT POSE OR ACTION
   Give subjects inner states, never pose instructions.
   Wrong: "chef smiles at camera"
   Correct: "chef feels quiet pride after completing something difficult, eyes soft"

5. ANTI-STOCK FILTER
   Every prompt must feel like it was NOT made for stock footage.
   Use "as if" constructions: "as if the camera arrived mid-sentence"

6. INTENTION STATEMENT
   End always with what the viewer should FEEL, not see.

7. ALL SETUP SETTINGS ARE MANDATORY
   You will receive a list of "PROMPT CONTRIBUTIONS FROM SELECTED TAGS".
   There could be many specific setup settings (up to 16+ categories).
   You MUST include EVERY SINGLE ONE of these selected settings explicitly in the main_prompt.
   No exceptions, no omissions. Do not drop any selected setup setting!

OUTPUT: Return ONLY this compact JSON (no markdown, no newlines inside string values):
{
  "quality_score": <85-99>,
  "detail_accuracy": <70-100, how many image details made it into the prompt>,
  "main_prompt": "<complete production-ready prompt in English, 250-600 chars>",
  "negative_prompt": "<specific avoidances based on image content and common AI failures>",
  "layers": {
    "world": "<environment with all visible details from analysis>",
    "subject": "<subject with EVERY color/material/brand/texture detail from image>",
    "motion": "<camera movement and subject motion — for video; omit for image>",
    "lighting": "<exact lighting from analysis integrated with selected style>",
    "lens": "<focal length, aperture, lens character>",
    "color": "<color grade integrating exact colors from analysis>",
    "physics": "<precise physical behavior descriptions>",
    "intention": "<what the viewer feels — not sees>"
  },
  "recommended_tool": "<single best tool for this use case and content>",
  "ghost_director": "<one sentence: what invisible director philosophy guides this frame>",
  "use_case_notes": "<one sentence: why this approach serves the ${useCase} use case>"
}

LANGUAGE: Output prompt in English only. All JSON values in English.`;

    let prompt;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620", // or claude-3-7-sonnet-20250219 if referring to the standard models. Note: changing model name to standard claude-3-5-sonnet.
          max_tokens: 2000,
          system,
          messages: [{ role: "user", content: context }],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(`Claude API Fehler: ${data.error.message}`);
      }

      const text =
        data.content?.map((c: any) => c.text || "").join("") || "";
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");

      if (start === -1 || end === -1) {
        throw new Error("Claude hat kein gültiges JSON zurückgegeben");
      }

      prompt = JSON.parse(text.slice(start, end + 1));
    } catch (claudeError: any) {
      console.warn("Claude failed, triggering OpenAI fallback:", claudeError.message);

      const openaiKey = process.env.OPENAI_API_KEY;
      if (!openaiKey) {
        return NextResponse.json(
          { error: `Claude Fehler: ${claudeError.message}. | OPENAI Fallback nicht möglich: OPENAI_API_KEY fehlt in .env.local` },
          { status: 500 }
        );
      }

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
            { role: "system", content: system },
            { role: "user", content: context }
          ],
        }),
      });

      const openaiData = await openaiResponse.json();

      if (openaiData.error) {
        return NextResponse.json(
          { error: `OpenAI Fallback Fehler: ${openaiData.error.message}` },
          { status: 500 }
        );
      }

      const generatedText = openaiData.choices?.[0]?.message?.content || "";

      try {
        prompt = JSON.parse(generatedText);
      } catch (parseError) {
        return NextResponse.json(
          { error: "Fehler beim Parsen der JSON-Antwort von OpenAI." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ prompt });
  } catch (err: any) {
    console.error("Critical API Error in /api/build-prompt:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
