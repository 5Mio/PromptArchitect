import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ─── Full Library Tag Map — all 565 tags synced from constants.ts LIBRARY ──────
const LIBRARY_TAGS: Record<string, string[]> = {
  visueller_stil: ["Cinematic Widescreen","Documentary Raw","Luxury Commercial","Fashion Editorial","Noir Classique","Hyperrealist","Radical Minimalist","Vintage 35mm","Futuristisch","Brutalist","Impressionistisch","Industriell","Wabi-Sabi","Art Deco","Bauhaus","Expressionistisch","Surrealismus","Pop Art","Romantizismus","Street Photography","Fine Art","Reportage","Conceptual","Typografisch","Archival","Natur-Dokumentation","Product Hero Shot","Lookbook","Food Editorial","Architectural Photography","Sozialrealismus","Piktorialismus","Neue Sachlichkeit","Japonismus","Ukiyo-e Inspired","Cyber-Noir","Pastoral","Grunge","Glamour Classic","Scandinavia Clean","Mediterranean Warmth","Berlin Underground","Tokyo Neon","Desert Minimalism","Ocean Documentary","Haute Cuisine","Street Food Raw","Makrokunst","Infrarot","Cyanotypie"],
  stimmung: ["Intim & Privat","Dramatisch","Melancholisch","Mysteriös","Friedvoll","Angespannt","Nostalgisch","Roh & Ehrlich","Triumphierend","Ätherisch","Verführerisch","Verspielt","Episch","Warm & Einladend","Kalt & Distanziert","Bedrohlich","Ehrfürchtig","Visionär","Primitiv & Ursprünglich","Luxuriös","Bescheiden","Intensiv","Verträumt","Heimelig","Aufregend","Einsam","Festlich","Spirituell","Sehnsucht","Kraftvoll","Sanft","Unheimlich","Nostalgisch-Schmerzvoll","Erwartungsvoll","Entspannt","Traurig","Verletzlich","Zeitlos","Vergänglich","Überwältigend","Heiter","Kontemplativ","Magisch","Gleichmütig","Provokativ","Poetisch","Dringlich","Beruhigend"],
  kameratechnik: ["ARRI Alexa 35","ARRI Alexa Mini LF","RED V-RAPTOR","Blackmagic URSA","Sony Venice 2","Anamorphisch 2.39:1","Anamorphisch 1.85:1","Makro Extreme","Handheld Observational","Steadicam Float","Dolly Slow Push","Dolly Full Back","Crane Up","Drohne Orbit","Drohne Descent","Zeitlupe 120fps","Zeitlupe 240fps","Zeitraffer","Hyperlapse","Statisch / Locked","Speed Ramp","Rack Focus","Über-Schulter","Low Angle Dutch","High Angle Overhead","Eye Level Neutral","Low Angle Heroic","Extreme Close-Up","Wide Establishing","Two Shot","Snorricam","Vertigo Effekt","Split Diopter","Fisheye Immersive","Tilt-Shift Miniature","Long Lens Compression","Periskop Lens","Hidden Camera","One-Take","Multi-Exposure"],
  lichtgestaltung: ["Einzellichtquelle","Natürliches Licht Rein","Goldene Stunde","Blaue Stunde","Hartes Licht","Weiches Diffus","Rim Light Subtil","Rim Light Dramatisch","Kerzenlicht","Neonlicht Urban","Chiaroscuro Extrem","Gegenlicht Silhouette","Gegenlicht Rim","Fensterlicht Nord","Fensterlicht Seitlich","Practicals Only","Industrielicht","Strobe & Blitz","Lagerfeuer","Mondlicht","Sternenlicht","Unterwasser Licht","Lichttreppen","Fluoreszenz","LED Praktisch","Neon Einfarbig","Gegenlicht Gegenlicht","Diffuses Wolkenlicht","Mittagslicht Hart","Sonnenaufgang","Laborlicht","Kinobauer","Obachsenlinse","Dramatisch Top Light","Low Key Extrem","High Key Clean","Clair-Obscur Sanft","Gegenlicht Haze","Licht auf Wasser","Tungsten Warm","Daylight Balanced","Mixed Color Temp","Spot Zoolinse","Butterfly Light","Split Light","Licht in Bewegung"],
  linse_optik: ["50mm Standard","85mm Portrait","35mm Reportage","100mm Macro","135mm Intimate","24mm Immersive","18mm Wide","400mm Surveillance","Leica Summilux","Zeiss Otus Scharf","Helios Swirl","Anamorphic Cooke","Master Prime Zeiss","Vintage Soviet Jupiter","Canon Dream Lens","Tief Scharf f/11","Minimal Scharf f/1.2","Bokeh Rund","Bokeh Nervig","Lensfehler Sphärisch","Chromatische Aberration","Verzeichnung Barrel","Tilt-Shift Scharf","Prisma Effekt","Lochkamera","Anamorphic LUT","Ultra Panavision 70","Portrait f/2.8","Makro Stack","Retroreflektiv","Variable ND","Graufilter Weich","Nahlinse","Zoom Push","Frontal Flat","Portrait Compress","Weitwinkel Reportage","Periskop Tight","Infrarot Konversion","Nachtoptik"],
  farbgebung: ["Kodak Vision3 500T","Kodak Portra 400","Fuji Provia Slide","Fuji Superia","Ilford HP5 B&W","Teal & Orange","Entsättigt Clean","Monochrom Silber","Monochrom Selenium","Warm Amber","Kalt Stahl","Hoher Kontrast","Erdtöne","Pastell Luftig","Neon Saturiert","Cross Process","Bleach Bypass","Print Film Look","LOG Flat Raw","REC709 Clean","HDR Wide Gamut","Vintage Polaroid","Instagram Presets Off","Autumnal Palette","Winter Kalt","Frühling Frisch","Sommer Satt","Night City Neon","Desert Ochre","Ocean Blue","Forest Green","Monochromatic Rot","Monochromatic Blau","Komplementär Orange-Blau","Analoges Trio","Schwarz-Gold","Weiß-Minimal","Ink Washed","Overexposed Fade","Oxidiert Patina"],
  physik_material: ["Dampf präzise","Dampf diffus","Rauch dünn","Rauch dicht","Rauch Boden","Flüssigkeit Dünn","Flüssigkeit Viskos","Flüssigkeit Splash","Metall Poliert","Metall Gebürstet","Metall Patiniert","Metall Chrome","Glas Klar","Glas Mattiert","Glas Zerstochen","Textil Seide","Textil Wolle","Textil Leinen","Textil Denim","Textil Samt","Leder Glatt","Leder Rau","Leder Krokodil","Holz Hell","Holz Dunkel","Holz Verwittert","Holz Gebeizt","Stein Marmor","Stein Beton Roh","Stein Granit","Keramik Glasiert","Keramik Raku","Papier Büttenpapier","Papier Gefaltet","Feuer Flamme","Feuer Glut","Rauch Echt","Wasser Bewegend","Wasser Spiegelung","Wasser Tropfen","Wasser Untergetaucht","Stroh Partikel","Eis Klar","Eis Schnee","Öl Glänzend","Karbon Fiber","Porzellan Fein","Gummi Elastisch","Plastik Transparent","Koralle Textur"],
  komposition: ["Drittelregel","Goldener Schnitt","Zentralperspektive","Symmetrie","Asymmetrisch","Führende Linien","Rahmen im Rahmen","Tiefe Perspektive","Flache Ebenen","Diagonale Dynamik","Negative Space Groß","Voller Bildraum","Über-Schulter Blick","Silhouette","Spiegelung Komposition","Gegenbewegung","Überlagierung","Wiederholung Rhythmus","Kontrast Groß-Klein","Isolation","Dreieck Komposition","S-Line","Z-Linie","Crowd Compression","Empty Center","Dual Subject","Horizont Tief","Horizont Hoch","No Horizont","Detail Ausschnitt","Panorama","Querformat","Portrait Format","Triptychon Feel","Texture Fill","Subject Tiny","Subject Huge","Eye Level Direct","Bird's Eye","Worm's Eye"],
  atmosphaere_umgebung: ["Goldene Stunde Outdoor","Blauer Nacht Urban","Nebel Morgen","Starker Regen","Leichter Regen","Gewitter Stimmung","Schneefall","Wüstenhitze","Wald Dicht","Wald Offen","Küste Wind","Berg Kalt","Stadt Nacht","Stadt Tag Geschäftig","Verlassener Ort","Interieur Warm","Industrie Leer","Marktplatz Lebhaft","Bibliothek Still","Küche Aktiv","Restaurant Abend","Atelier Kreativ","Hotel Luxus","Haus Persönlich","Bad & Spa","Konzertsaal Leer","Labor Präzise","Werkstatt Handwerk","Outdoor Frühling","Outdoor Sommer Mittag","Outdoor Herbst","Outdoor Winter Klar","Unterwasser Tief","Höhle Dunkel","Dachterrasse Urban","Zugfenster","Auto Nacht","Bühne Spotlight","Kirchenraum","Galerie Weiß"],
  bewegung_zeit: ["Eingefroren","Bewegungsunschärfe","Schwebestatus","Freier Fall","Aufprall Moment","Explosion Frozen","Staccato Bewegung","Legato Fließend","Spirale","Pendel","Wachstum","Verfall Zeitlupe","Perfekte Schleife","Chaos Geordnet","Synchron","Asynchron","Sprung Höchstpunkt","Aufwärtsbewegung","Abwärtsbewegung","Rotation Langsam","Zittern","Wellenmäßig","Strömung","Kollision","Auseinanderfallen","Zusammenkommen","Ruhende Energie","Hochschwingendes","Zeitsprung","Simultanität"],
  director_philosophie: ["Roger Deakins","Wong Kar-Wai","Kubrick","Terrence Malick","Wes Anderson","Christopher Doyle","Gordon Willis","Agnès Varda","Chivo Lubezki","Bradford Young","Andrei Tarkovsky","Ingmar Bergman","Federico Fellini","Jean-Luc Godard","Sofia Coppola","Park Chan-wook","Bong Joon-ho","Claire Denis","Parfüm Werbung Paris","Apple Product Film","Nike Werbung","Dokumentarismus Kiefer","National Geographic","BBC Planet Earth","Annie Leibovitz Portrait","Helmut Newton Fashion","Sebastião Salgado","Henri Cartier-Bresson","Diane Arbus"],
  zeitgeist_aera: ["1920er Art Deco","1930er Depression","1940er Wartime","1950er Optimismus","1960er Pop & Mod","1970er Gritty","1970er Disco","1980er Neon","1990er Grunge","1990er Heroin Chic","2000er Y2K","2000er MySpace","2010er Instagram","2010er Normcore","2020er Solarpunk","2020er Cottagecore","2020er Brutalist Revival","Ancient Rome","Mittelalter","Renaissance","Barock","Rokoko","Viktorianisch","Belle Époque","Meiji Japan","Pre-Raphaelite","Bauhaus 1919","Soviet Konstruktivismus","Zukunft 2050","Post-Apokalyptisch"],
  sound_synaesthesie: ["Absolute Stille","Donnerschlag","Flattern","Tiefes Brummen","Glockenklang","Regen Klang","Meeresrauschen","Stadtlärm","Waldrauschen","Feuerknistern","Musik Sichtbar","Jazz Timing","Klassik Struktur","Techno Repetition","Blues Feeling","Gospel Energie","Streichquartett Kammer","Bass Drop","Vinyl Knistern","Binaural Tief"],
  produkt_typen: ["Luxus Uhr","Parfum Flakon","Schmuck Gold","Schmuck Silber","Ledertasche","Schuh Premium","Kosmetik Tube","Skincare Tiegel","Elektronik Premium","Smartphone","Kopfhörer","Auto Exterieur","Auto Interieur","Motorrad","Fahrrad Premium","Wein Flasche","Whisky / Spirituosen","Kaffee Produkt","Schokolade Verpackung","Messer / Küchenutensil","Möbel Design","Leuchte Design","Keramik Handwerk","Buch / Editorial","Sportartikel","Medizinprodukt","Werkzeug Premium","Spielzeug / Collector","Kunstwerk Objekt","Instrument Musik","Textil Meisterstück","Kunstblumen","Hausier Portrait","Baby Produkt","Outdoor Ausrüstung"],
};

// Keep AVAILABLE_TAGS for backward compat but now build from full map
const AVAILABLE_TAGS = Object.values(LIBRARY_TAGS).flat().join('", "');

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
    "tags_visueller_stil": ["0-3 tags from LIBRARY_TAGS.visueller_stil — pick what fits the image aesthetic"],
    "tags_stimmung": ["0-3 tags from LIBRARY_TAGS.stimmung — emotional feeling of the image"],
    "tags_kamera": ["0-2 tags from LIBRARY_TAGS.kameratechnik — camera movement or setup that matches"],
    "tags_licht": ["0-2 tags from LIBRARY_TAGS.lichtgestaltung — lighting character visible in image"],
    "tags_linse": ["0-2 tags from LIBRARY_TAGS.linse_optik — lens choice that fits the look"],
    "tags_farbe": ["0-2 tags from LIBRARY_TAGS.farbgebung — color grade or film stock that matches"],
    "tags_material": ["0-3 tags from LIBRARY_TAGS.physik_material — materials visible in the image"],
    "tags_komposition": ["0-2 tags from LIBRARY_TAGS.komposition — framing approach used"],
    "tags_atmosphaere": ["0-2 tags from LIBRARY_TAGS.atmosphaere_umgebung — environment/setting"],
    "tags_bewegung": ["0-2 tags from LIBRARY_TAGS.bewegung_zeit — motion quality if relevant"],
    "tags_director": ["0-1 tags from LIBRARY_TAGS.director_philosophie — director whose style matches"],
    "tags_zeitgeist": ["0-1 tags from LIBRARY_TAGS.zeitgeist_aera — era or cultural moment"],
    "tags_sound": ["0-1 tags from LIBRARY_TAGS.sound_synaesthesie — sonic atmosphere"],
    "tags_produkt": ["0-2 tags from LIBRARY_TAGS.produkt_typen — product category if applicable"]
  }
}

CRITICAL RULES FOR RECOMMENDATIONS:
1. Each tags array MUST only use labels EXACTLY as listed in LIBRARY_TAGS for that key
2. Return [] for categories clearly not relevant — don't force tags
3. Quality over quantity — 8-15 total tags across all categories is ideal
4. "use_case" must be exactly one of the 12 values
5. "tone" must be exactly one of the 6 values
6. Be creative and specific — director_philosophie and zeitgeist_aera add real depth

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

    // Merge all 14 category tag arrays into single flat array for page.tsx
    if (recommendations) {
      const allTags = [
        ...(recommendations.tags_visueller_stil || []),
        ...(recommendations.tags_stimmung || []),
        ...(recommendations.tags_kamera || []),
        ...(recommendations.tags_licht || []),
        ...(recommendations.tags_linse || []),
        ...(recommendations.tags_farbe || []),
        ...(recommendations.tags_material || []),
        ...(recommendations.tags_komposition || []),
        ...(recommendations.tags_atmosphaere || []),
        ...(recommendations.tags_bewegung || []),
        ...(recommendations.tags_director || []),
        ...(recommendations.tags_zeitgeist || []),
        ...(recommendations.tags_sound || []),
        ...(recommendations.tags_produkt || []),
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
