import { NextRequest, NextResponse } from "next/server";

// All available tag labels — Gemini picks from this list
const ALL_TAGS = [
  // Visueller Stil
  "Cinematic Widescreen","Documentary Raw","Luxury Commercial","Fashion Editorial",
  "Noir Classique","Hyperrealist","Radical Minimalist","Vintage 35mm","Futuristisch",
  "Brutalist","Impressionistisch","Industriell","Wabi-Sabi","Art Deco","Bauhaus",
  "Expressionistisch","Surrealismus","Pop Art","Street Photography","Fine Art",
  "Reportage","Conceptual","Product Hero Shot","Lookbook","Food Editorial",
  "Architectural Photography","Sozialrealismus","Neue Sachlichkeit","Japonismus",
  "Cyber-Noir","Glamour Classic","Scandinavia Clean","Mediterranean Warmth",
  "Desert Minimalism","Makrokunst",
  // Stimmung
  "Intim & Privat","Dramatisch","Melancholisch","Mysteriös","Friedvoll","Angespannt",
  "Nostalgisch","Roh & Ehrlich","Triumphierend","Ätherisch","Verführerisch","Verspielt",
  "Episch","Warm & Einladend","Kalt & Distanziert","Zärtlich","Bedrohlich","Ehrfürchtig",
  "Visionär","Luxuriös","Bescheiden","Intensiv","Verträumt","Heimelig","Sehnsüchtig",
  "Kraftvoll","Sanft","Zeitlos","Vergänglich","Poetisch","Beruhigend",
  // Kamera
  "ARRI Alexa 35","ARRI Alexa Mini LF","Anamorphisch 2.39:1","Makro Extreme",
  "Handheld Observational","Steadicam Float","Dolly Slow Push","Dolly Pull Back",
  "Crane Up","Drohne Orbit","Drohne Descent","Zeitlupe 120fps","Zeitlupe 240fps",
  "Zeitraffer","Statisch / Locked","Speed Ramp","Rack Focus","Über-Schulter",
  "Low Angle Dutch","High Angle Overhead","Eye Level Neutral","Low Angle Heroic",
  "Extreme Close-Up","Wide Establishing","Tilt-Shift Miniature","Long Lens Compression",
  // Licht
  "Einzellichtquelle","Natürliches Licht Rein","Goldene Stunde","Blaue Stunde",
  "Hartes Licht","Weiches Diffus","Rim Light Subtil","Rim Light Dramatisch",
  "Kerzenlicht","Neonlicht Urban","Chiaroscuro Extrem","Gegenlicht Silhouette",
  "Gegenlicht Rim","Fensterlicht Nord","Fensterlicht Seitlich","Practicals Only",
  "Industrielicht","Strobe / Blitz","Lagerfeuer","Mondlicht","Lichtstreifen",
  "Neon Einfarbig","Spot Isoliert","Butterfly Light","Split Light","Diffuses Wolkenlicht",
  // Linse
  "50mm Standard","85mm Portrait","35mm Reportage","100mm Macro","135mm Intimate",
  "24mm Immersive","400mm Surveillance","Leica Summilux","Zeiss Otus Scharf",
  "Helios Swirl","Anamorphic Cooke","Tief Scharf f/11","Minimal Scharf f/1.2",
  "Bokeh Rund","Tilt-Shift Scharf","Portrait f/2.8",
  // Farbe
  "Kodak Vision3 500T","Kodak Portra 400","Fuji Provia Slide","Ilford HP5 B&W",
  "Teal & Orange","Entsättigt Clean","Monochrom Silber","Warm Amber","Kalt Stahl",
  "Hoher Kontrast","Erdtöne","Pastell Luftig","Neon Saturiert","Cross Process",
  "Bleach Bypass","Vintage Polaroid","Autumnal Palette","Winter Kalt","Sommer Satt",
  "Night City Neon","Desert Ochre","Ocean Blue","Forest Green","Schwarz-Gold",
  // Physik
  "Dampf präzise","Dampf Dicht","Flüssigkeit Dünn","Flüssigkeit Viskos",
  "Flüssigkeit Splash","Metall Poliert","Metall Gebürstet","Metall Chrom",
  "Glas Klar","Glas Mattiert","Textil Seide","Textil Wolle","Textil Samt",
  "Leder Glatt","Leder Rau","Leder Krokodil","Holz Hell","Holz Dunkel",
  "Stein Marmor","Stein Beton Roh","Keramik Glasiert","Haut Natürlich",
  "Feuer Flamme","Rauch Dünn","Wasser Spiegelung","Wasser Tropfen","Eis Klar",
  "Frucht Frisch","Frucht Aufgeschnitten","Käse Textur","Fleisch Marmorierung",
  "Brot Kruste","Kaffee Crema","Schokolade Glanz","Karbon Fiber","Porzellan Fein",
  // Komposition
  "Drittelregel","Goldener Schnitt","Zentralperspektive","Symmetrisch","Asymmetrisch",
  "Führende Linien","Rahmen im Rahmen","Tiefe Perspektive","Diagonale Dynamik",
  "Negative Space Groß","Voller Bildraum","Spiegelung Komposition","Silhouette",
  "Isolation","Dual Subject","Layered Depth","Detail Ausschnitt","Bokeh Vordergrund",
  "Durchblick","Schattenkomposition","Center Bull's Eye",
  // Atmosphäre
  "Goldene Stunde Outdoor","Blauer Nacht Urban","Nebel Morgen","Starker Regen",
  "Wüstenhitze","Wald Dicht","Küste Wind","Stadt Nacht","Stadt Tag Geschäftig",
  "Verlassener Ort","Interieur Warm","Industrie Leer","Bibliothek Still",
  "Küche Aktiv","Restaurant Abend","Hotel Luxus","Haus Persönlich","Galerie Weiß",
  // Bewegung
  "Eingefroren","Bewegungsunschärfe","Schwebestatus","Freier Fall","Aufprall Moment",
  "Staccato Bewegung","Legato Fließend","Spirale","Perfekte Schleife","Synchron",
  "Sprung Höchstpunkt","Rotation Langsam","Ruhende Energie","Simultaneität",
  // Director
  "Roger Deakins","Wong Kar-Wai","Kubrick","Terrence Malick","Wes Anderson",
  "Christopher Doyle","Agnès Varda","Chivo Lubezki","Bradford Young","Andrei Tarkovsky",
  "Ingmar Bergman","Federico Fellini","Sofia Coppola","Park Chan-wook","Bong Joon-ho",
  "Parfüm Werbung Paris","Apple Product Film","Nike Werbung","National Geographic",
  "BBC Planet Earth","Annie Leibovitz Portrait","Henri Cartier-Bresson",
  // Qualitätssicherung
  "Anti-Stock","Anti-CGI Plastik","Anti-Flimmern","Anti-Float Physik","Echte Hände",
  "Kein Ungewollter Text","Anti-Überbelichtung","Anti-Rauschen","Anti-Skin Smooth",
  "Anti-Farbe Oversaturated","Anti-Kitsch","Anti-Augen Fehler","Anti-Haar Fehler",
];

const ALL_USE_CASES = ["produkt","marketing","story","humor","lifestyle","food","fashion","architektur","natur","technologie","event","portrait"];
const ALL_TONES = ["luxury","documentary","editorial","dark","artistic","commercial"];
const ALL_DURATIONS = ["3","5","8","15"];

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

    // ── SINGLE PASS: Analysis + Recommendations ───────────────
    const PROMPT = `You are a professional cinematographer, art director and AI prompt engineer.
Analyze this image with MAXIMUM DETAIL then recommend the perfect generation setup.

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
    "use_case": "<one of: produkt|marketing|story|humor|lifestyle|food|fashion|architektur|natur|technologie|event|portrait>",
    "use_case_reason": "<one sentence why>",
    "tone": "<one of: luxury|documentary|editorial|dark|artistic|commercial>",
    "tone_reason": "<one sentence why>",
    "duration": "<one of: 3|5|8|15>",
    "duration_reason": "<one sentence why>",
    "tags": ["<10-14 tags from list, exact spelling>"],
    "tags_reason": "<one sentence explaining tag selection>",
    "confidence": <70-99>,
    "setup_summary": "<2 sentences: what this image is and why this setup fits best>"
  }
}

AVAILABLE TAGS (use EXACT spelling from this list only):
Cinematic Widescreen, Documentary Raw, Luxury Commercial, Fashion Editorial, Noir Classique, Hyperrealist, Radical Minimalist, Vintage 35mm, Futuristisch, Brutalist, Impressionistisch, Industriell, Wabi-Sabi, Art Deco, Bauhaus, Expressionistisch, Street Photography, Fine Art, Product Hero Shot, Lookbook, Food Editorial, Architectural Photography, Makrokunst,
Intim & Privat, Dramatisch, Melancholisch, Mysteriös, Friedvoll, Angespannt, Nostalgisch, Roh & Ehrlich, Triumphierend, Ätherisch, Verführerisch, Verspielt, Episch, Warm & Einladend, Kalt & Distanziert, Zärtlich, Bedrohlich, Ehrfürchtig, Luxuriös, Intensiv, Verträumt, Heimelig, Kraftvoll, Zeitlos, Poetisch, Beruhigend,
ARRI Alexa 35, ARRI Alexa Mini LF, Anamorphisch 2.39:1, Makro Extreme, Handheld Observational, Steadicam Float, Dolly Slow Push, Zeitlupe 120fps, Zeitlupe 240fps, Statisch / Locked, Speed Ramp, Rack Focus, Über-Schulter, Low Angle Dutch, High Angle Overhead, Eye Level Neutral, Low Angle Heroic, Extreme Close-Up, Wide Establishing, Tilt-Shift Miniature, Long Lens Compression,
Einzellichtquelle, Natürliches Licht Rein, Goldene Stunde, Blaue Stunde, Hartes Licht, Weiches Diffus, Rim Light Subtil, Rim Light Dramatisch, Kerzenlicht, Neonlicht Urban, Chiaroscuro Extrem, Gegenlicht Silhouette, Gegenlicht Rim, Fensterlicht Nord, Fensterlicht Seitlich, Practicals Only, Lichtstreifen, Spot Isoliert, Butterfly Light, Split Light, Diffuses Wolkenlicht,
50mm Standard, 85mm Portrait, 35mm Reportage, 100mm Macro, 135mm Intimate, 24mm Immersive, 400mm Surveillance, Leica Summilux, Zeiss Otus Scharf, Helios Swirl, Tief Scharf f/11, Minimal Scharf f/1.2, Bokeh Rund, Portrait f/2.8,
Kodak Vision3 500T, Kodak Portra 400, Fuji Provia Slide, Ilford HP5 B&W, Teal & Orange, Entsättigt Clean, Monochrom Silber, Warm Amber, Kalt Stahl, Hoher Kontrast, Erdtöne, Pastell Luftig, Neon Saturiert, Cross Process, Bleach Bypass, Vintage Polaroid, Autumnal Palette, Winter Kalt, Sommer Satt, Night City Neon, Desert Ochre, Ocean Blue, Forest Green, Schwarz-Gold,
Dampf präzise, Dampf Dicht, Flüssigkeit Dünn, Flüssigkeit Viskos, Flüssigkeit Splash, Metall Poliert, Metall Gebürstet, Metall Chrom, Glas Klar, Glas Mattiert, Textil Seide, Textil Wolle, Textil Samt, Leder Glatt, Leder Rau, Leder Krokodil, Holz Hell, Holz Dunkel, Stein Marmor, Stein Beton Roh, Keramik Glasiert, Haut Natürlich, Feuer Flamme, Rauch Dünn, Wasser Spiegelung, Wasser Tropfen, Eis Klar, Frucht Frisch, Frucht Aufgeschnitten, Kaffee Crema, Schokolade Glanz, Karbon Fiber, Porzellan Fein,
Drittelregel, Goldener Schnitt, Zentralperspektive, Symmetrisch, Asymmetrisch, Führende Linien, Rahmen im Rahmen, Tiefe Perspektive, Diagonale Dynamik, Negative Space Groß, Voller Bildraum, Silhouette, Isolation, Dual Subject, Layered Depth, Detail Ausschnitt, Bokeh Vordergrund, Durchblick, Schattenkomposition, Center Bull's Eye,
Roger Deakins, Wong Kar-Wai, Kubrick, Terrence Malick, Wes Anderson, Christopher Doyle, Agnès Varda, Chivo Lubezki, Andrei Tarkovsky, Ingmar Bergman, Sofia Coppola, Park Chan-wook, Parfüm Werbung Paris, Apple Product Film, Nike Werbung, National Geographic, BBC Planet Earth, Annie Leibovitz Portrait, Henri Cartier-Bresson,
Anti-Stock, Anti-CGI Plastik, Anti-Flimmern, Anti-Float Physik, Echte Hände, Kein Ungewollter Text, Anti-Überbelichtung, Anti-Rauschen, Anti-Skin Smooth, Anti-Farbe Oversaturated, Anti-Kitsch

Return ONLY the JSON. Nothing else.`;

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
    if (data.error) {
      return NextResponse.json({ error: `Gemini Fehler: ${data.error.message}` }, { status: 400 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return NextResponse.json({ error: "Gemini hat kein gültiges JSON zurückgegeben" }, { status: 500 });
    }

    const parsed = JSON.parse(text.slice(start, end + 1));
    const analysis = parsed.analysis || parsed;
    const recommendations = parsed.recommendations || null;

    return NextResponse.json({ analysis, recommendations });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
