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

    // ─── TONE DEFINITIONS ─────────────────────────────────────
    // FIX #1: Tone now has concrete definitions Claude must apply throughout
    const TONE_DEFINITIONS: Record<string, string> = {
      luxury: "High-end commercial polish. Every detail signals value. Aspirational, flawless execution. Materials whisper exclusivity. Nothing is accidental. Words like: pristine, exquisite, immaculate, deliberate, refined.",
      documentary: "Raw authenticity over beauty. Truth-first gaze. Unposed naturalism. Handheld energy. The camera arrived uninvited. Words like: candid, unfiltered, observed, honest, raw.",
      editorial: "Magazine-quality tension between beauty and concept. Sophisticated, idea-driven. Art direction is visible. Words like: sculptural, considered, arresting, constructed, intentional.",
      dark: "Chiaroscuro dominates. Shadow IS the subject. Psychological depth and withheld mystery. Noir philosophy. Words like: obscured, smoldering, ominous, brooding, tenebrous.",
      artistic: "Concept IS the image. Visual metaphor as primary language. Gallery-worthy intent. Words like: conceptual, allegorical, evocative, abstract, poetic.",
      commercial: "Bright, clean, universally accessible. Message instantly legible. No ambiguity. Words like: clear, vibrant, approachable, direct, inviting.",
    };

    // ─── DURATION PACING ──────────────────────────────────────
    // FIX #2: Duration now shapes the structural arc of the prompt
    const DURATION_PACING: Record<string, string> = {
      "3": "MICRO FORMAT (3 seconds): Single decisive moment OR seamless loop. Zero development arc. Maximum compression — one idea, one impact, instantly legible. Describe only what happens in that single frozen beat or the one cyclical motion.",
      "5": "SHORT FORMAT (5 seconds): Intro breath (0-1s) + peak moment (1-4s) + micro resolution (4-5s). One complete impression. Tight pacing — no subplots.",
      "8": "HERO FORMAT (8 seconds): World establish (0-2s) → subject reveal and detail (2-5s) → emotional peak (5-7s) → land/hold (7-8s). Full arc possible. Describe all four beats.",
      "15": "FEATURE FORMAT (15 seconds): Full narrative structure: setup (0-4s), build tension (4-10s), climax + resolution (10-15s). Three story beats required in the motion description.",
    };

    const context = [
      hasImage
        ? `═══ GEMINI VISION ANALYSIS — USE ALL OF THIS DATA ═══\n${JSON.stringify(imageAnalysis, null, 2)}\n═══ END ANALYSIS ═══`
        : null,
      userText ? `USER INTENTION / ADDITIONAL DIRECTION:\n"${userText}"` : null,
      tags?.length
        ? `SELECTED STYLE MODIFIERS (${tags.length} tags active):\n${tags.join(", ")}`
        : "NO STYLE TAGS SELECTED — rely on use case and tone defaults.",
      tagContributions?.length
        ? `═══ MANDATORY PROMPT CONTRIBUTIONS FROM SELECTED TAGS ═══\nEach line below MUST appear verbatim or paraphrased in the main_prompt. NO EXCEPTIONS:\n${tagContributions.map((t: string, i: number) => `[TAG ${i + 1}/${tagContributions.length}]: ${t}`).join("\n")}\n═══ END TAG CONTRIBUTIONS ═══`
        : null,
      `VISUAL TONE: ${tone || "luxury"} — see system definition`,
      mode === "video" ? `VIDEO DURATION: ${duration || "8"} seconds — see pacing structure in system` : null,
      `OUTPUT TYPE: ${(mode || "video").toUpperCase()} GENERATION PROMPT`,
      `USE CASE: ${useCase || "produkt"}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    // ─── SYSTEM PROMPT ────────────────────────────────────────
    const system = `You are PromptArchitect Pro — the world's most precise AI prompt engineer for ${mode} generation tools in 2026.

YOUR PRIMARY MISSION: Transform raw visual data and user intention into a PERFECT, production-ready ${mode} prompt in English.

══════════════════════════════════════════════
SECTION A — VISUAL TONE (APPLY THROUGHOUT)
══════════════════════════════════════════════
Active Tone: ${tone || "luxury"}
Definition: ${TONE_DEFINITIONS[tone || "luxury"] || TONE_DEFINITIONS["luxury"]}

This tone is NOT optional styling — it is the DNA of every word in the prompt.
Your vocabulary, adjective choices, atmosphere descriptors, and emotional framing MUST reflect this tone consistently from first word to last.

══════════════════════════════════════════════
SECTION B — ${mode === "video" ? "VIDEO PACING STRUCTURE" : "IMAGE MODE RULES"}
══════════════════════════════════════════════
${mode === "video"
  ? `Active Duration: ${duration || "8"} seconds
Pacing Rule: ${DURATION_PACING[duration || "8"] || DURATION_PACING["8"]}

The motion layer and main_prompt MUST describe action that fits within this exact duration.
Do NOT describe complex multi-scene events for 3s formats. Do NOT describe a single frozen beat for 15s formats.`
  : `Image Mode Active: Omit the motion layer entirely (set to null or empty string).
Focus maximum attention on: material surface quality, light behavior, compositional tension, and the single frozen moment.`
}

══════════════════════════════════════════════
SECTION C — USE CASE PRIORITY INSTRUCTIONS
══════════════════════════════════════════════
${useCaseInstruction || "Focus on product detail accuracy above all else."}

══════════════════════════════════════════════
SECTION D — ABSOLUTE RULES (NEVER VIOLATE)
══════════════════════════════════════════════

1. DETAIL ACCURACY IS SACRED
   If the image analysis mentions "rose gold #B8722A" → the prompt MUST say "rose gold #B8722A"
   If it mentions "BOSS" logo → the prompt MUST say "BOSS logo"
   Every color hex, material, brand name, texture from the analysis goes into the prompt.
   NO DETAIL IS TOO SMALL.

2. TAG CONTRIBUTIONS ARE MANDATORY
   You will receive lines marked [TAG N/TOTAL] in the user context.
   Every single one MUST be integrated into main_prompt. Check them off mentally.
   If you received 12 tag contributions, all 12 must influence the output.
   This is a hard requirement — not a suggestion.

3. WORLD BEFORE SUBJECT
   Always describe the environment first, then introduce the subject.

4. PHYSICS ANCHORING
   Describe physical behavior with scientific precision:
   - Steam: "thin wisps, vertical rise, 0.3Hz sway, dissipates at 12cm"
   - Metal: "specular highlight travels 15° as camera rotates"
   - Liquid: "unbroken viscous stream, catching directional specular"

5. EMOTIONAL STATE — NOT POSE OR ACTION
   Give subjects inner states, never pose instructions.
   Wrong: "chef smiles at camera"
   Correct: "chef feels quiet pride after completing something difficult, eyes soft"

6. ANTI-STOCK FILTER
   Use "as if" constructions: "as if the camera arrived mid-sentence"

7. INTENTION STATEMENT
   End always with what the viewer should FEEL, not see.

══════════════════════════════════════════════
SECTION E — OUTPUT FORMAT
══════════════════════════════════════════════
Return ONLY this compact JSON (no markdown, no newlines inside string values):
{
  "quality_score": <85-99>,
  "detail_accuracy": <70-100, how many image details made it into the prompt>,
  "tags_integrated": <0-16, count of tag contributions actually integrated>,
  "main_prompt": "<complete production-ready prompt in English, 250-600 chars — MUST include all tag contributions and reflect the active tone>",
  "negative_prompt": "<specific avoidances based on image content and common AI failures>",
  "layers": {
    "world": "<environment with all visible details from analysis, described in ${tone || "luxury"} tone>",
    "subject": "<subject with EVERY color/material/brand/texture detail from image>",
    "motion": "${mode === "video" ? `<camera movement and subject motion fitting within ${duration || "8"} seconds per pacing structure>` : `<omit for image mode — set empty string>`}",
    "lighting": "<exact lighting from analysis integrated with selected style>",
    "lens": "<focal length, aperture, lens character>",
    "color": "<color grade integrating exact colors from analysis>",
    "physics": "<precise physical behavior descriptions>",
    "intention": "<what the viewer feels — not sees — written in ${tone || "luxury"} tone>"
  },
  "recommended_tool": "<single best tool for this use case and content>",
  "ghost_director": "<one sentence: what invisible director philosophy guides this frame, influenced by active tone: ${tone || "luxury"}>",
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
          model: "claude-opus-4-5",
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
