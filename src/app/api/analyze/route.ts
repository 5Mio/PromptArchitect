import { NextRequest, NextResponse } from "next/server";

// ─── MASTER DATA SYNC ──────────────────────────────────────────
// Note: We avoid importing from @constants to prevent potential SSR/bundle issues 
// in some edge environments, but we ensure this list exactly reflects the master.

const ALL_USE_CASES = ["produkt", "marketing", "story", "humor", "lifestyle", "food", "fashion", "architektur", "natur", "technologie", "event", "portrait"];
const ALL_TONES = ["luxury", "documentary", "editorial", "dark", "artistic", "commercial"];
const ALL_DURATIONS = ["3", "5", "8", "15"];

// Categories and their tags
const ORCHESTRA = {
  style: ["Cinematic Widescreen", "Documentary Raw", "Luxury Commercial", "Fashion Editorial", "Noir Classique", "Hyperrealist", "Radical Minimalist", "Vintage 35mm", "Futuristisch", "Brutalist", "Impressionistisch", "Industriell", "Wabi-Sabi", "Art Deco", "Bauhaus", "Expressionistisch", "Surrealismus", "Pop Art", "Romantizismus", "Street Photography", "Fine Art", "Reportage", "Conceptual", "Typografisch", "Archival", "Natur-Dokumentation", "Product Hero Shot", "Lookbook", "Food Editorial", "Architectural Photography", "Sozialrealismus", "Piktorialismus", "Neue Sachlichkeit", "Japonismus", "Ukiyo-e Inspired", "Cyber-Noir", "Pastoral", "Grunge", "Glamour Classic", "Scandinavia Clean", "Mediterranean Warmth", "Berlin Underground", "Tokyo Neon", "Desert Minimalism", "Ocean Documentary", "Haute Cuisine", "Street Food Raw", "Makrokunst", "Infrarot", "Cyanotypie"],
  mood: ["Intim & Privat", "Dramatisch", "Melancholisch", "Mysteriös", "Friedvoll", "Angespannt", "Nostalgisch", "Roh & Ehrlich", "Triumphierend", "Ätherisch", "Verführerisch", "Verspielt", "Episch", "Warm & Einladend", "Kalt & Distanziert", "Zärtlich", "Bedrohlich", "Ehrfürchtig", "Visionär", "Primitiv & Ursprünglich", "Luxuriös", "Bescheiden", "Intensiv", "Verträumt", "Heimelig", "Aufregend", "Einsam", "Festlich", "Spirituell", "Sehnsüchtig", "Kraftvoll", "Sanft", "Unheimlich", "Nostalgisch-Schmerzlich", "Erwartungsvoll", "Entspannt", "Trotzig", "Verletzlich", "Zeitlos", "Vergänglich", "Überwältigend", "Heiter", "Kontemplativ", "Magisch", "Gleichmütig", "Provokativ", "Poetisch", "Absurd", "Dringlich", "Beruhigend"],
  kamera: ["ARRI Alexa 35", "ARRI Alexa Mini LF", "RED V-RAPTOR", "Blackmagic URSA", "Sony Venice 2", "Anamorphisch 2.39:1", "Anamorphisch 1.85:1", "Makro Extreme", "Handheld Observational", "Steadicam Float", "Dolly Slow Push", "Dolly Pull Back", "Crane Up", "Drohne Orbit", "Drohne Descent", "Zeitlupe 120fps", "Zeitlupe 240fps", "Zeitraffer", "Hyperlapse", "Statisch / Locked", "Speed Ramp", "Rack Focus", "Über-Schulter", "Low Angle Dutch", "High Angle Overhead", "Eye Level Neutral", "Low Angle Heroic", "Extreme Close-Up", "Wide Establishing", "Two Shot", "Snorricam", "Vertigo Effect", "Split Diopter", "Fisheye Immersive", "Tilt-Shift Miniature", "Long Lens Compression", "Periskop Lens", "Hidden Camera", "One-Take", "Multi-Exposure"],
  licht: ["Einzellichtquelle", "Natürliches Licht Rein", "Goldene Stunde", "Blaue Stunde", "Hartes Licht", "Weiches Diffus", "Rim Light Subtil", "Rim Light Dramatisch", "Kerzenlicht", "Neonlicht Urban", "Chiaroscuro Extrem", "Gegenlicht Silhouette", "Gegenlicht Rim", "Fensterlicht Nord", "Fensterlicht Seitlich", "Practicals Only", "Industrielicht", "Strobe / Blitz", "Lagerfeuer", "Mondlicht", "Sternenlicht", "Unterwasser Licht", "Lichtstreifen", "Fluoreszenz", "LED Praktisch", "Neon Einfarbig", "Gegenlicht Gegenlicht", "Diffuses Wolkenlicht", "Mittagslicht Hart", "Sonnenaufgang", "Laborlicht", "Kinobeamer", "Schaufenster", "Dramatisch Top Light", "Low Key Extrem", "High Key Clean", "Clair-Obscur Sanft", "Gegenlicht Haze", "Licht auf Wasser", "Tungsten Warm", "Daylight Balanced", "Mixed Color Temp", "Spot Isoliert", "Butterfly Light", "Split Light", "Licht in Bewegung", "Natur Kathedrallicht", "Food Warm Spot", "Architektur Wash", "Portrait Loop"],
  linse: ["50mm Standard", "85mm Portrait", "35mm Reportage", "100mm Macro", "135mm Intimate", "24mm Immersive", "18mm Wide", "400mm Surveillance", "Leica Summilux", "Zeiss Otus Scharf", "Helios Swirl", "Anamorphic Cooke", "Master Prime Zeiss", "Vintage Soviet Jupiter", "Canon Dream Lens", "Tief Scharf f/11", "Minimal Scharf f/1.2", "Bokeh Rund", "Bokeh Nervig", "Lensfehler Sphärisch", "Chromatische Aberration", "Verzeichnung Barrel", "Tilt-Shift Scharf", "Prisma Effekt", "Lochkamera", "Anamorphic LUT", "Ultra Panavision 70", "Portrait f/2.8", "Makro Stack", "Retroreflektiv", "Variable ND", "Graufilter Weich", "Nahlinse", "Zoom Push", "Frontal Flat", "Portrait Compress", "Weitwinkel Reportage", "Periskop Tight", "Infrarot Konversion", "Nachtoptik"],
  farbe: ["Kodak Vision3 500T", "Kodak Portra 400", "Fuji Provia Slide", "Fuji Superia", "Ilford HP5 B&W", "Teal & Orange", "Entsättigt Clean", "Monochrom Silber", "Monochrom Selenium", "Warm Amber", "Kalt Stahl", "Hoher Kontrast", "Erdtöne", "Pastell Luftig", "Neon Saturiert", "Cross Process", "Bleach Bypass", "Print Film Look", "LOG Flat Raw", "REC709 Clean", "HDR Wide Gamut", "Vintage Polaroid", "Instagram Presets Off", "Autumnal Palette", "Winter Kalt", "Frühling Frisch", "Sommer Satt", "Night City Neon", "Desert Ochre", "Ocean Blue", "Forest Green", "Monochromatic Rot", "Monochromatic Blau", "Komplementär Orange-Blau", "Analoges Trio", "Schwarz-Gold", "Weiß-Minimal", "Ink Washed", "Overexposed Fade", "Oxidiert Patina"],
  physik: ["Dampf präzise", "Dampf Dicht", "Flüssigkeit Dünn", "Flüssigkeit Viskos", "Flüssigkeit Splash", "Metall Poliert", "Metall Gebürstet", "Metall Patiniert", "Metall Chrom", "Glas Klar", "Glas Mattiert", "Glas Farbig", "Glas Zerbrochen", "Textil Seide", "Textil Wolle", "Textil Leinen", "Textil Denim", "Textil Samt", "Leder Glatt", "Leder Rau", "Leder Krokodil", "Holz Hell", "Holz Dunkel", "Holz Verwittert", "Holz Gebrannt", "Stein Marmor", "Stein Beton Roh", "Stein Granit", "Keramik Glasiert", "Keramik Raku", "Papier Büttenpapier", "Papier Gefaltet", "Haut Natürlich", "Haut Nass", "Haut Gealtert", "Feuer Flamme", "Feuer Glut", "Rauch Dünn", "Rauch Dicht", "Wasser Spiegelung", "Wasser Bewegend", "Wasser Tropfen", "Wasser Untergetaucht", "Staub Partikel", "Eis Klar", "Eis Schnee", "Blüten Textur", "Frucht Frisch", "Frucht Aufgeschnitten", "Käse Textur", "Fleisch Marmorierung", "Brot Kruste", "Kaffee Crema", "Schokolade Glanz", "Öl Glänzend", "Karbon Fiber", "Porzellan Fein", "Gummi Elastisch", "Plastik Transparent", "Koralle Textur"],
  komposition: ["Drittelregel", "Goldener Schnitt", "Zentralperspektive", "Symmetrisch", "Asymmetrisch", "Führende Linien", "Rahmen im Rahmen", "Tiefe Perspektive", "Flache Ebenen", "Diagonale Dynamik", "Negative Space Groß", "Voller Bildraum", "Über-Schulter Blick", "Spiegelung Komposition", "Silhouette", "Gegenlicht Komposition", "Überlagerung", "Wiederholung Rhythmus", "Kontrast Groß-Klein", "Isolation", "Dreieck Komposition", "L-Form", "Z-Linie", "Crowd Compression", "Empty Center", "Dual Subject", "Horizont Tief", "Horizont Hoch", "No Horizont", "Detail Ausschnitt", "Panorama", "Quadrat", "Portrait Format", "Triptychon Feel", "Texture Fill", "Subject Tiny", "Subject Huge", "Eye Level Direct", "Bird's Eye", "Worm's Eye", "Schnappschuss", "Langzeitbelichtung Trail", "Bokeh Vordergrund", "Durchblick", "Spiegelung Wasser", "Schattenkomposition", "Muster Unterbrochen", "Tension Edges", "Center Bull's Eye", "Layered Depth"],
  atmosphaere: ["Goldene Stunde Outdoor", "Blauer Nacht Urban", "Nebel Morgen", "Starker Regen", "Leichter Regen", "Gewitter Stimmung", "Schneefall", "Wüstenhitze", "Wald Dicht", "Wald Offen", "Küste Wind", "Berg Kalt", "Stadt Nacht", "Stadt Tag Geschäftig", "Verlassener Ort", "Interieur Warm", "Industrie Leer", "Marktplatz Lebhaft", "Bibliothek Still", "Küche Aktiv", "Restaurant Abend", "Atelier Kreativ", "Hotel Luxus", "Haus Persönlich", "Bad & Spa", "Konzertsaal Leer", "Labor Präzise", "Werkstatt Handwerk", "Outdoor Frühling", "Outdoor Sommer Mittag", "Outdoor Herbst", "Outdoor Winter Klar", "Unterwasser Tief", "Höhle Dunkel", "Dachterrasse Urban", "Zugfenster", "Auto Nacht", "Bühne Spotlight", "Kirchenraum", "Galerie Weiß"],
  bewegung: ["Eingefroren", "Bewegungsunschärfe", "Schwebestatus", "Freier Fall", "Aufprall Moment", "Explosion Frozen", "Staccato Bewegung", "Legato Fließend", "Spirale", "Pendel", "Wachstum", "Verfall Zeitlupe", "Perfekte Schleife", "Chaos Geordnet", "Synchron", "Asynchron", "Sprung Höchstpunkt", "Aufwärtsbewegung", "Abwärtsbewegung", "Rotation Langsam", "Zittern", "Wellenförmig", "Strömung", "Kollision", "Auseinanderfallen", "Zusammenkommen", "Ruhende Energie", "Nachschwingen", "Zeitsprung", "Simultaneität"],
  director: ["Roger Deakins", "Wong Kar-Wai", "Kubrick", "Terrence Malick", "Wes Anderson", "Christopher Doyle", "Gordon Willis", "Agnès Varda", "Chivo Lubezki", "Vilmos Zsigmond", "Bradford Young", "Andrei Tarkovsky", "Ingmar Bergman", "Federico Fellini", "Jean-Luc Godard", "Sofia Coppola", "Park Chan-wook", "Bong Joon-ho", "Claire Denis", "Parfüm Werbung Paris", "Apple Product Film", "Nike Werbung", "Dokumentarismus Kiefer", "National Geographic", "BBC Planet Earth", "Annie Leibovitz Portrait", "Helmut Newton Fashion", "Sebastião Salgado", "Henri Cartier-Bresson", "Diane Arbus"],
  zeitgeist: ["1920er Art Deco", "1930er Depression", "1940er Wartime", "1950er Optimismus", "1960er Pop & Mod", "1970er Gritty", "1970er Disco", "1980er Neon", "1990er Grunge", "1990er Heroin Chic", "2000er Y2K", "2000er MySpace", "2010er Instagram", "2010er Normcore", "2020er Solarpunk", "2020er Cottagecore", "2020er Brutalist Revival", "Ancient Rome", "Mittelalter", "Renaissance", "Barock", "Rokoko", "Viktorianisch", "Belle Époque", "Meiji Japan", "Pre-Raphaelite", "Bauhaus 1919", "Soviet Konstruktivismus", "Zukunft 2050", "Post-Apokalyptisch"],
  sound: ["Absolute Stille", "Donnerschlag", "Flüstern", "Tiefes Brummen", "Glockenklang", "Regen Klang", "Meeresrauschen", "Stadtlärm", "Waldrauschen", "Feuerknistern", "Musik Sichtbar", "Jazz Timing", "Klassik Struktur", "Techno Repetition", "Blues Feeling", "Gospel Energie", "Streichquartett Kammer", "Bass Drop", "Vinyl Knistern", "Binaural Tief"],
  produkt_typ: ["Luxus Uhr", "Parfüm Flakon", "Schmuck Gold", "Schmuck Silber", "Ledertasche", "Schuh Premium", "Kosmetik Tube", "Skincare Tiegel", "Elektronik Premium", "Smartphone", "Kopfhörer", "Auto Exterieur", "Auto Interieur", "Motorrad", "Fahrrad Premium", "Wein Flasche", "Whisky / Spirituosen", "Kaffee Produkt", "Schokolade Verpackung", "Messer / Küchenutensil", "Möbel Design", "Leuchte Design", "Keramik Handwerk", "Buch / Editorial", "Sportartikel", "Medizinprodukt", "Werkzeug Premium", "Spielzeug / Collector", "Kunstwerk Objekt", "Architekturmodell", "Instrument Musik", "Textil Heimtextil", "Tableware Premium", "Blumen Strauß", "Kunstblumen", "Haustier Portrait", "Baby Produkt", "Outdoor Ausrüstung", "Technik Kabel / Accessory", "Verpackung Unboxing"],
  negative: ["Anti-Stock", "Anti-CGI Plastik", "Anti-Flimmern", "Anti-Float Physik", "Echte Hände", "Kein Ungewollter Text", "Anti-Überbelichtung", "Anti-Unterbelichtung", "Anti-Rauschen", "Anti-Jpeg Artefakt", "Anti-Symmetrie Fehler", "Anti-Doppelkinn", "Anti-Falsches Licht", "Anti-Schatten Fehler", "Anti-Reflexions Fehler", "Anti-Augen Fehler", "Anti-Zahn Fehler", "Anti-Haar Fehler", "Anti-Kleidungs Fehler", "Anti-Hintergrund Fehler", "Anti-Skalierung", "Anti-Linsen Flare Fake", "Anti-Oversharpen", "Anti-Skin Smooth", "Anti-Farbe Oversaturated", "Anti-Kitsch", "Anti-Logo Fehler", "Anti-Watermark", "Anti-Datum Stempel", "Anti-Blitzlicht Direkt", "Anti-Kitschlicht", "Anti-Duplikat", "Anti-Weiße Rand", "Anti-Bildstörung", "Anti-Unechtes Bokeh", "Anti-Fehl-Proportion", "Anti-Leere Augen", "Anti-Kleidungs Repeat", "Anti-Architektur Fehler", "Anti-Zeitlos Fehler"],
  technisch: ["8K Ultra HD", "4K Cinema", "Full HD Broadcast", "RAW Uncompressed", "24fps Film", "25fps European", "48fps High Frame", "120fps Zeitlupe", "HDR Dolby Vision", "SDR 100 Nit", "IMAX Quality", "Super 8 Quality", "16mm Documentary", "70mm Epic", "VHS Tape", "Betacam SP", "DV Mini Digital", "Instagram Square 1:1", "Story Vertikal 9:16", "Cinema 2.35:1", "Banner 16:9", "Print 4:5", "Druck 300 DPI", "Web 72 DPI", "Spherical 360°", "Stereo 3D", "Thermal Wärme", "UV Ultraviolett", "Röntgen", "Mikroskop Nano"]
};

const ALL_TAGS = Object.values(ORCHESTRA).flat();

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

    // Prepare tags string for prompt - categorized to help the model maintain context
    const tagsContext = Object.entries(ORCHESTRA)
      .map(([cat, tags]) => `[${cat.toUpperCase()}]: ${tags.join(", ")}`)
      .join("\n");

    // ── SINGLE PASS: Analysis + Recommendations ───────────────
    const PROMPT = `You are a professional cinematographer, art director and AI prompt engineer.
Analyze this image with MAXIMUM DETAIL then recommend the perfect generation setup from the ORCHESTRA library.

Return ONLY this JSON (no markdown, no explanation):

{
  "analysis": {
    "subject": "Precise description of main subject with every visible detail",
    "colors": "All colors with hex codes (e.g. rose gold #B8722A, matte black #1a1a1a)",
    "materials": "All visible materials with surface finish (brushed/polished/matte/glossy)",
    "lighting": "Light source, direction angle, quality hard/soft, color temperature",
    "composition": "Camera angle, framing, depth of field, focal point",
    "mood": "Emotional atmosphere, psychological feeling, energy level",
    "background": "Background description and relationship to subject",
    "details": "ALL fine details: logos/text/engravings/markings/brand elements",
    "style": "Overall aesthetic, photography style, production quality",
    "technical": "Lens compression, exposure, contrast, technical characteristics"
  },
  "recommendations": {
    "use_case": "<one of: ${ALL_USE_CASES.join("|")}>",
    "use_case_reason": "<one sentence why>",
    "tone": "<one of: ${ALL_TONES.join("|")}>",
    "tone_reason": "<one sentence why>",
    "duration": "<one of: ${ALL_DURATIONS.join("|")}>",
    "duration_reason": "<one sentence why>",
    "tags": ["<Exactly 16 tags: strictly ONE best matching tag from EACH of the 16 categories below. DO NOT skip any category. Exact spelling required.>"],
    "tags_reason": "<one sentence explaining the tag selections>",
    "confidence": <70-99>,
    "setup_summary": "<2 sentences: what this image is and why this setup fits best>"
  }
}

AVAILABLE ORCHESTRA TAGS (pick the most relevant ones):
${tagsContext}

Return ONLY the JSON. Nothing else.`;
    ;

    // ─── EXECUTION ─────────────────────────────────────────────
    try {
      console.log("--- Starting Gemini Analysis Pass ---");
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                { inline_data: { mime_type: mimeType || "image/jpeg", data: imageBase64 } },
                { text: PROMPT },
              ],
            }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 2000 },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        const errMsg = data.error?.message || response.statusText || "Unknown Gemini Error";
        console.error("Gemini API Error (Status " + response.status + "):", errMsg);
        throw new Error(errMsg);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");

      if (start === -1 || end === -1) {
        throw new Error("Gemini returned no valid JSON");
      }

      const parsed = JSON.parse(text.slice(start, end + 1));
      const analysis = parsed.analysis || parsed;
      const recommendations = parsed.recommendations || null;

      console.log("✓ Gemini Analysis Successful");
      return NextResponse.json({ analysis, recommendations });
    } catch (geminiError: any) {
      const originalMessage = geminiError.message || "Unknown error";
      console.warn("⚠️ GEMINI FAILED:", originalMessage);
      console.log("→ Attempting OpenAI Vision Fallback...");

      const openaiKey = process.env.OPENAI_API_KEY;
      if (!openaiKey) {
        console.error("❌ Fallback failed: OPENAI_API_KEY is missing in env");
        return NextResponse.json({
          error: `Gemini Quota erreicht. | Fallback fehlgeschlagen: OpenAI Key nicht konfiguriert.`
        }, { status: 500 });
      }

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
              {
                role: "system",
                content: "You are a professional cinematographer, art director and AI prompt engineer. Always output perfect JSON matching the requested schema."
              },
              {
                role: "user",
                content: [
                  { type: "text", text: PROMPT },
                  { type: "image_url", image_url: { url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}` } }
                ]
              }
            ]
          })
        });

        const openaiData = await openaiResponse.json();

        if (!openaiResponse.ok || openaiData.error) {
          const oaiMsg = openaiData.error?.message || openaiResponse.statusText || "OpenAI error";
          console.error("❌ OpenAI Fallback also failed:", oaiMsg);
          return NextResponse.json({
            error: `API Quota Problem. (Gemini: ${originalMessage} | OpenAI: ${oaiMsg})`
          }, { status: 500 });
        }

        const text = openaiData.choices?.[0]?.message?.content || "";
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");

        if (start === -1 || end === -1) {
          throw new Error("OpenAI returned no valid JSON");
        }

        const parsed = JSON.parse(text.slice(start, end + 1));
        const analysis = parsed.analysis || parsed;
        const recommendations = parsed.recommendations || null;

        console.log("✓ OpenAI Fallback Successful");
        return NextResponse.json({ analysis, recommendations });

      } catch (oaiError: any) {
        console.error("❌ Critical Fallback Error:", oaiError.message);
        return NextResponse.json({
          error: `Kritischer API Fehler. (Original: ${originalMessage} | Fallback: ${oaiError.message})`
        }, { status: 500 });
      }
    }
  } catch (err: any) {
    console.error("Outer API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
