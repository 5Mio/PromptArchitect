import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, useCaseInstruction } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Kein Bild übergeben" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key fehlt in .env.local" }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: mimeType || "image/jpeg",
                  data: imageBase64,
                },
              },
              {
                text: `You are a professional cinematographer and product photographer with 20 years of experience.
Analyze this image for AI video/image prompt generation with MAXIMUM DETAIL AND PRECISION.

${useCaseInstruction ? `USE CASE PRIORITY INSTRUCTIONS:\n${useCaseInstruction}\n\n` : ""}

Extract ALL visual information and return ONLY this JSON (no markdown, no explanation, compact values):

{
  "subject": "Precise description of main subject/product with every visible detail",
  "colors": "All colors with approximate hex codes where identifiable (e.g. rose gold #B8722A, matte black #1a1a1a)",
  "materials": "All visible materials with surface finish type (brushed/polished/matte/glossy/textured)",
  "lighting": "Light source type, direction angle (e.g. upper-right 30°), quality (hard/soft), color temperature estimate",
  "composition": "Camera angle, framing, depth of field, focal point position, aspect ratio impression",
  "mood": "Emotional atmosphere, psychological feeling, energy level",
  "background": "Background description, treatment, relationship to subject",
  "details": "ALL critical fine details: text/logos/engravings/markings/serial numbers/brand elements/unique features",
  "style": "Overall visual aesthetic, photography style, production quality level",
  "technical": "Lens compression, exposure, contrast, any technical photography characteristics"
}

CRITICAL: Be hyper-specific. If you see a brand name — write it exactly.
If you see a color — approximate the hex. If you see a texture — describe it precisely.
Return ONLY the JSON object. Nothing before or after.`,
              },
            ],
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1200,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: `Gemini Fehler: ${data.error.message}` },
        { status: 400 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      return NextResponse.json(
        { error: "Gemini hat kein gültiges JSON zurückgegeben" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(text.slice(start, end + 1));
    return NextResponse.json({ analysis });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
