import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { prompts, imageBase64, quality = "standard" } = await req.json();

        if (!prompts || !Array.isArray(prompts)) {
            return NextResponse.json({ error: "Keine Prompts für die Bildgenerierung bereitgestellt" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "GEMINI_API_KEY fehlt in .env.local" }, { status: 500 });
        }

        console.log(`[generate-image] Processing ${prompts.length} prompts. Image present: ${!!imageBase64} (${imageBase64?.length || 0} bytes)`);

        // Wir nutzen Google Imagen 3 via REST API
        // Falls 001 nicht geht, probieren wir 002
        const models = ["imagen-3.0-generate-002", "imagen-3.0-generate-001"];
        let results: any[] = [];
        const promptsToProcess = prompts.slice(0, 4);

        results = await Promise.all(
            promptsToProcess.map(async (promptText) => {
                let lastError = "Kein Modell antwortete";
                const attempts = [
                    { model: "imagen-3.0-generate-001", useImage: true },
                    { model: "imagen-3.0-generate-002", useImage: true },
                    { model: "imagen-3.0-generate-001", useImage: false },
                    { model: "imagen-3.0-generate-002", useImage: false },
                ];

                for (const attempt of attempts) {
                    try {
                        const { model, useImage } = attempt;
                        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateImages?key=${apiKey}`;

                        // Prompts für Imagen 3 optimieren (max 800 chars, keine harten Umbrüche)
                        const cleanPrompt = promptText.replace(/\n/g, " ").slice(0, 800);

                        const body: any = {
                            prompt: cleanPrompt,
                            numberOfImages: 1,
                            aspectRatio: "1:1",
                            safetySetting: "BLOCK_LOW_AND_ABOVE",
                        };

                        if (useImage && imageBase64) {
                            const base64Data = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
                            // Google AI Studio i2i Format
                            body.imageReference = { image: { content: base64Data, mimeType: "image/png" } };
                        }

                        console.log(`[generate-image] Attempt: ${model} (Image: ${useImage}) PromptLen: ${cleanPrompt.length}`);
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 35000);

                        const response = await fetch(endpoint, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-goog-api-key": apiKey // Alternative Header-Variante
                            },
                            body: JSON.stringify(body),
                            signal: controller.signal
                        });
                        clearTimeout(timeoutId);

                        const resText = await response.text();
                        let data: any;
                        try { data = JSON.parse(resText); } catch { continue; }

                        if (!response.ok || data.error) {
                            lastError = data.error?.message || `API Fehler ${response.status}`;
                            console.warn(`[generate-image] Attempt failed with: ${lastError}`, { model, useImage, data });
                            if (response.status === 404) continue;
                            if (lastError.toLowerCase().includes("safety")) return { error: `Safety: ${lastError}` };
                            continue;
                        }

                        const imgData = data.images?.[0]?.base64_encoded_data || data.images?.[0]?.base64EncodedData;
                        if (imgData) {
                            return { url: `data:image/png;base64,${imgData}` };
                        }
                        lastError = `Kein Bild von ${model} (JSON: ${JSON.stringify(data).slice(0, 50)})`;
                    } catch (e: any) {
                        lastError = e.message;
                    }
                }
                return { error: lastError };
            })
        );

        return NextResponse.json({ results });
    } catch (err: any) {
        console.error("Critical API Error in /api/generate-image:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

