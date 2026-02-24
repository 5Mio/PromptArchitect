import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { prompts, imageBase64, imageMime = "image/jpeg" } = await req.json();

        if (!prompts || !Array.isArray(prompts)) {
            return NextResponse.json({ error: "Keine Prompts bereitgestellt" }, { status: 400 });
        }

        const openaiKey = process.env.OPENAI_API_KEY;
        if (!openaiKey) {
            return NextResponse.json({ error: "OPENAI_API_KEY fehlt in .env.local" }, { status: 500 });
        }

        console.log(`[generate-image] ${prompts.length} prompts. Image: ${!!imageBase64} (${imageBase64?.length || 0} chars)`);

        const promptsToProcess = prompts.slice(0, 4);

        const results = await Promise.all(
            promptsToProcess.map(async (promptText: string) => {
                let lastError = "Kein Modell antwortete";
                // DALL-E 3 max prompt: 4000 chars
                const cleanPrompt = promptText.replace(/\n/g, " ").slice(0, 3800);

                // ── PRIMARY: gpt-image-1 i2i (X → X brand consistency) ──
                // Sends the reference image + generated prompt → styled product image
                if (imageBase64) {
                    try {
                        console.log("[generate-image] Trying gpt-image-1 i2i...");
                        const base64Data = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
                        const buffer = Buffer.from(base64Data, "base64");
                        const ext = imageMime === "image/png" ? "png" : "jpeg";
                        const file = new File([buffer], `reference.${ext}`, { type: imageMime });

                        const formData = new FormData();
                        formData.append("model", "gpt-image-1");
                        formData.append("image", file);
                        formData.append("prompt", cleanPrompt);
                        formData.append("n", "1");
                        formData.append("size", "1024x1024");

                        const ctrl = new AbortController();
                        const tid = setTimeout(() => ctrl.abort(), 55000);
                        const response = await fetch("https://api.openai.com/v1/images/edits", {
                            method: "POST",
                            headers: { Authorization: `Bearer ${openaiKey}` },
                            body: formData,
                            signal: ctrl.signal,
                        });
                        clearTimeout(tid);

                        const data = await response.json();

                        if (!response.ok || data.error) {
                            lastError = data.error?.message || `gpt-image-1 HTTP ${response.status}`;
                            console.warn(`[generate-image] gpt-image-1 failed: ${lastError}`);
                            // Fall through to DALL-E 3
                        } else {
                            const b64 = data.data?.[0]?.b64_json;
                            if (b64) {
                                console.log("[generate-image] ✓ gpt-image-1 i2i success");
                                return { url: `data:image/png;base64,${b64}` };
                            }
                            lastError = `gpt-image-1 kein Bild (keys: ${Object.keys(data.data?.[0] ?? {}).join(", ")})`;
                        }
                    } catch (e: any) {
                        lastError = `gpt-image-1 Exception: ${e.message}`;
                        console.warn("[generate-image] gpt-image-1 exception:", e.message);
                    }
                }

                // ── FALLBACK: DALL-E 3 text-to-image ─────────────────────
                // Used when no image uploaded OR gpt-image-1 fails/unavailable
                try {
                    console.log("[generate-image] Trying DALL-E 3 text-to-image...");
                    const ctrl = new AbortController();
                    const tid = setTimeout(() => ctrl.abort(), 55000);
                    const response = await fetch("https://api.openai.com/v1/images/generations", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${openaiKey}`,
                        },
                        body: JSON.stringify({
                            model: "dall-e-3",
                            prompt: cleanPrompt,
                            n: 1,
                            size: "1024x1024",
                            response_format: "b64_json",
                            quality: "standard",
                        }),
                        signal: ctrl.signal,
                    });
                    clearTimeout(tid);

                    const data = await response.json();

                    if (!response.ok || data.error) {
                        lastError = data.error?.message || `DALL-E 3 HTTP ${response.status}`;
                        console.warn(`[generate-image] DALL-E 3 failed: ${lastError}`);
                        return { error: lastError };
                    }

                    const b64 = data.data?.[0]?.b64_json;
                    if (b64) {
                        console.log("[generate-image] ✓ DALL-E 3 success");
                        return { url: `data:image/png;base64,${b64}` };
                    }

                    lastError = "DALL-E 3 kein Bild in der Antwort";
                } catch (e: any) {
                    lastError = `DALL-E 3 Exception: ${e.message}`;
                    console.error("[generate-image] DALL-E 3 exception:", e.message);
                }

                return { error: lastError };
            })
        );

        return NextResponse.json({ results });
    } catch (err: any) {
        console.error("[generate-image] Critical error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
