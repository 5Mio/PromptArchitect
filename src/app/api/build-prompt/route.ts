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
      sceneDirection,
    } = await req.json();

    // ─── INPUT VALIDATION ─────────────────────────────────────
    const hasContent = (imageAnalysis && Object.keys(imageAnalysis).length > 0) || 
                       (userText && userText.trim().length > 0) ||
                       (tags && tags.length > 0);
    if (!hasContent) {
      return NextResponse.json(
        { error: "Mindestens ein Eingabefeld erforderlich: Bild, Text oder Tags" },
        { status: 400 }
      );
    }
    if (!tone) {
      return NextResponse.json(
        { error: "Tone ist ein Pflichtfeld" },
        { status: 400 }
      );
    }
    if (!mode) {
      return NextResponse.json(
        { error: "Mode ist ein Pflichtfeld (video oder image)" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API Key fehlt in .env.local" },
        { status: 500 }
      );
    }

    const hasImage = imageAnalysis && Object.keys(imageAnalysis).length > 0;

    // ─── TONE DEFINITIONS ─────────────────────────────────────
    const TONE_DEFINITIONS: Record<string, string> = {
      luxury: "High-end commercial polish. Every detail signals value. Aspirational, flawless execution. Materials whisper exclusivity. Nothing is accidental. Words like: pristine, exquisite, immaculate, deliberate, refined.",
      documentary: "Raw authenticity over beauty. Truth-first gaze. Unposed naturalism. Handheld energy. The camera arrived uninvited. Words like: candid, unfiltered, observed, honest, raw.",
      editorial: "Magazine-quality tension between beauty and concept. Sophisticated, idea-driven. Art direction is visible. Words like: sculptural, considered, arresting, constructed, intentional.",
      dark: "Chiaroscuro dominates. Shadow IS the subject. Psychological depth and withheld mystery. Noir philosophy. Words like: obscured, smoldering, ominous, brooding, tenebrous.",
      artistic: "Concept IS the image. Visual metaphor as primary language. Gallery-worthy intent. Words like: conceptual, allegorical, evocative, abstract, poetic.",
      commercial: "Bright, clean, universally accessible. Message instantly legible. No ambiguity. Words like: clear, vibrant, approachable, direct, inviting.",
    };

    // ─── DURATION PACING ──────────────────────────────────────
    const DURATION_PACING: Record<string, string> = {
      "3": "MICRO FORMAT (3 seconds): Single decisive moment OR seamless loop. Zero development arc. Maximum compression — one idea, one impact, instantly legible.",
      "5": "SHORT FORMAT (5 seconds): Intro breath (0-1s) + peak moment (1-4s) + micro resolution (4-5s). One complete impression. Tight pacing — no subplots.",
      "8": "HERO FORMAT (8 seconds): World establish (0-2s) → subject reveal and detail (2-5s) → emotional peak (5-7s) → land/hold (7-8s). Full arc possible.",
      "15": "FEATURE FORMAT (15 seconds): Full narrative structure: setup (0-4s), build tension (4-10s), climax + resolution (10-15s). Three story beats required.",
    };

    // ─── BUILD TAG PAIRS ──────────────────────────────────────
    // Pair each tag label with its contribution so Claude can key the breakdown correctly
    const tagPairs: Array<{ label: string; contribution: string }> =
      tags?.length
        ? tags.map((label: string, i: number) => ({
          label,
          contribution: tagContributions?.[i] || "",
        }))
        : [];

    const context = [
      hasImage
        ? `═══ GEMINI VISION ANALYSIS — USE ALL OF THIS DATA ═══\n${JSON.stringify(imageAnalysis, null, 2)}\n═══ END ANALYSIS ═══`
        : null,
      userText ? `USER INTENTION / ADDITIONAL DIRECTION:\n"${userText}"` : null,
      tagPairs.length
        ? `═══ MANDATORY SETUP TAGS (${tagPairs.length} active) ═══\nEach tag MUST be integrated into main_prompt AND get its own entry in prompt_breakdown.\n\n${tagPairs.map((t, i) => `[TAG ${i + 1}/${tagPairs.length}] "${t.label}"\n  Generic contribution: ${t.contribution}`).join("\n\n")}\n═══ END TAGS ═══`
        : "NO STYLE TAGS SELECTED — rely on use case and tone defaults.",
      `VISUAL TONE: ${tone || "luxury"} — see system definition`,
      mode === "video"
        ? `VIDEO DURATION: ${duration || "8"} seconds — see pacing structure in system`
        : null,
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

The motion layer and main_prompt MUST describe action that fits this exact duration.`
        : `Image Mode Active: Omit the motion layer (set to empty string).
Focus on: material surface quality, light behavior, compositional tension, single frozen moment.`
      }

══════════════════════════════════════════════
SECTION C — USE CASE PRIORITY INSTRUCTIONS
══════════════════════════════════════════════
${useCaseInstruction || "Focus on product detail accuracy above all else."}

${sceneDirection ? `══════════════════════════════════════════════
SECTION G — SCENE DIRECTION (MANDATORY)
══════════════════════════════════════════════
The user has selected a specific scene scenario. This is the creative foundation of the entire prompt.
BUILD THE ENTIRE PROMPT AROUND THIS SCENARIO — it is not a suggestion, it is the directive.

${sceneDirection}

The world, motion, lighting, and intention layers MUST serve this scene.
Do NOT default to generic product placement. The scene IS the prompt.

` : ""}══════════════════════════════════════════════
SECTION D — ABSOLUTE RULES (NEVER VIOLATE)
══════════════════════════════════════════════

1. DETAIL ACCURACY IS SACRED
   Every color hex, material, brand name, texture from the Gemini analysis MUST appear in the prompt.
   "rose gold #B8722A" in analysis → "rose gold #B8722A" in prompt. No exceptions.

2. ALL TAGS ARE MANDATORY
   Every [TAG N/TOTAL] in the user context MUST be integrated into main_prompt.
   Every tag also gets its own entry in prompt_breakdown (see Section E).

3. WORLD BEFORE SUBJECT
   Always describe the environment first, then introduce the subject into that world.

4. PHYSICS ANCHORING
   Describe physical behavior with precision:
   - Steam: "thin wisps, vertical rise, 0.3Hz sway, dissipates at 12cm"
   - Metal: "specular highlight travels 15° as camera rotates"
   - Liquid: "unbroken viscous stream, catching directional specular"

5. EMOTIONAL STATE — NOT POSE
   Give subjects inner states, never pose instructions.
   Wrong: "model poses confidently" — Correct: "model carries calm authority, as if the camera is irrelevant"

6. ANTI-STOCK FILTER
   Use "as if" constructions. "as if the camera arrived mid-sentence."

7. INTENTION STATEMENT
   End always with what the viewer should FEEL, not see.

══════════════════════════════════════════════
SECTION E — PROMPT_BREAKDOWN RULES (CRITICAL)
══════════════════════════════════════════════
prompt_breakdown is a JSON object:
  KEY   = the exact tag label string as given (e.g. "Produkt Hero Shot")
  VALUE = 1-2 sentences describing HOW this tag was applied to THIS specific subject

THE GOLDEN RULE FOR BREAKDOWN VALUES:
  NEVER reproduce the generic tag definition. That is noise.
  ALWAYS describe the concrete application to this specific product/scene from the analysis.
  MENTION specific details: material, color, shape, brand, environment from the image.
  Answer the question: "Because we selected this tag, the prompt now does [X] with [this specific thing]."

GOOD (product-specific, references actual subject):
  "Produkt Hero Shot" → "The BOSS chronograph rises from absolute void, concrete plinth catching single lateral light. Camera holds 20° downward orbit — the rose gold case is the only object that exists in this universe."

BAD (generic copy of tag definition — forbidden):
  "Produkt Hero Shot" → "Commercial product hero shot, 360° implied, object isolated and celebrated."

══════════════════════════════════════════════
SECTION F — OUTPUT FORMAT
══════════════════════════════════════════════
Return ONLY valid JSON (no markdown fences, no newlines inside string values):

{
  "quality_score": <85-99>,
  "detail_accuracy": <70-100, percentage of image details that made it into the prompt>,
  "tags_integrated": <integer, count of tags actually woven into main_prompt>,
  "main_prompt": "<complete production-ready prompt in English, 250-600 chars, tone: ${tone || "luxury"}, all tags integrated>",
  "negative_prompt": "<specific avoidances based on image content and common AI generation failures>",
  "prompt_breakdown": {
    ${tagPairs.length > 0
      ? tagPairs.map(t => `"${t.label}": "<how THIS specific product/scene uses ${t.label} — reference actual colors, materials, shapes from the image analysis>"`).join(',\n    ')
      : '"_note": "no tags selected"'
    }
  },
  "layers": {
    "world": "<environment with all visible details from analysis, described in ${tone || "luxury"} tone>",
    "subject": "<subject with EVERY color/material/brand/texture detail from analysis>",
    "motion": "${mode === "video" ? `<camera + subject motion fitting within ${duration || "8"}s pacing structure>` : ""}",
    "lighting": "<exact lighting from analysis integrated with selected style>",
    "lens": "<focal length, aperture, lens character from selected tags>",
    "color": "<color grade with exact hex values from analysis integrated with film stock choice>",
    "physics": "<precise physical behavior of every material in the frame>",
    "intention": "<what the viewer feels — not sees — written in ${tone || "luxury"} tone>"
  },
  "recommended_tool": "<single best tool name for this use case and content type>",
  "ghost_director": "<one sentence: the invisible director philosophy behind this frame>",
  "use_case_notes": "<one sentence: why this specific approach serves the ${useCase} use case>"
}

LANGUAGE: All JSON values in English only.`;

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
          model: "claude-sonnet-4-6",
          max_tokens: 3000,
          system,
          messages: [{ role: "user", content: context }],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(`Claude API Fehler: ${data.error.message}`);
      }

      const text = data.content?.map((c: any) => c.text || "").join("") || "";
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
          {
            error: `Claude Fehler: ${claudeError.message}. | OPENAI Fallback nicht möglich: OPENAI_API_KEY fehlt in .env.local`,
          },
          { status: 500 }
        );
      }

      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
              { role: "user", content: context },
            ],
          }),
        }
      );

      const openaiData = await openaiResponse.json();

      if (openaiData.error) {
        return NextResponse.json(
          { error: `OpenAI Fallback Fehler: ${openaiData.error.message}` },
          { status: 500 }
        );
      }

      const generatedText =
        openaiData.choices?.[0]?.message?.content || "";

      try {
        prompt = JSON.parse(generatedText);
      } catch {
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
