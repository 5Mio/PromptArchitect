// ═══════════════════════════════════════════════════════════════
// TOOLTIP DATA — PromptArchitect Pro v5
// Hover: short description
// Click: wann, effekt, beispiel, nicht_wenn, profi_tipp
// ═══════════════════════════════════════════════════════════════

import type { TooltipData } from "@/components/Tooltip";

// ─── USE CASE TOOLTIPS ────────────────────────────────────────

export const USE_CASE_TOOLTIPS: Record<string, TooltipData> = {
  produkt: {
    short: "Maximale Detailtreue. Jedes sichtbare Produktdetail wird 1:1 in den Prompt übernommen.",
    wann: "E-Commerce, Produktkataloge, Hero Shots, Verpackungsdesign, Markenvisualisierung",
    effekt: "Gemini extrahiert Farb-Hex-Codes, Materialien, Logos, Texturen. Claude garantiert dass JEDES Detail im Prompt erscheint.",
    beispiel: "Apple Product Films, Rolex Werbung, Luxus Parfüm Hero Shots",
    nicht_wenn: "Story oder emotionale Atmosphäre Vorrang hat — Detailfokus kann Narrativ schwächen",
    profi_tipp: "Produktbild in neutralem Studio-Setup hochladen für maximale Extraktionsqualität",
  },
  marketing: {
    short: "Emotionale Markenbindung + Produktbegehren. 60% Atmosphäre, 40% Produktklarheit.",
    wann: "Kampagnen, Social Media Ads, Brand Content, Lifestyle-Produktbilder",
    effekt: "Erzeugt Atmosphäre die das Produkt begehrenswert macht — Wunsch ohne Erklärung",
    beispiel: "Nike Just Do It, Apple Think Different, Chanel N°5 Kampagnen",
    nicht_wenn: "Technische Produktdetails im Vordergrund stehen müssen",
  },
  story: {
    short: "Narrativer Sog. Der Betrachter landet mitten in einer Geschichte.",
    wann: "Kurzfilme, Branded Content, Episodische Social Media Serien, Film-Stills",
    effekt: "Jedes Frame gehört zu einer größeren Geschichte — 'gestohlener Moment' Qualität",
    beispiel: "Wong Kar-Wai, Terrence Malick, Dardenne Brüder Stil",
    nicht_wenn: "Klare Produktbotschaft nötig — Story kann Produkt überschatten",
    profi_tipp: "Bilder mit Menschen oder klarem Kontext laden — Gemini extrahiert narrative Elemente",
  },
  humor: {
    short: "Komödiantisches Timing durch visuelle Überraschung und Kontrast.",
    wann: "Social Media Viral Content, Meme-adjacent Werbung, Entertainment Brands",
    effekt: "Humor durch Kontrast, Überraschung oder liebenswürdige Absurdität",
    beispiel: "Old Spice Werbung, Innocent Smoothies, Dollar Shave Club",
    nicht_wenn: "Luxus oder Premium-Positionierung — Humor kann Brand-Wert schwächen",
  },
  lifestyle: {
    short: "Authentische menschliche Momente in aspirationellen Umgebungen.",
    wann: "Lifestyle Brands, Wellness, Home & Living, Fashion Editorial",
    effekt: "Leben wie es sein könnte — erhöht aber vollständig glaubwürdig",
    beispiel: "Kinfolk Magazine, Cereal Magazine, Muji Ästhetik",
    nicht_wenn: "Harte Produktfakten kommuniziert werden müssen",
  },
  food: {
    short: "Sensorischer Reichtum — der Betrachter soll schmecken und riechen können.",
    wann: "Restaurant Marketing, Food Blogs, Menükarten, Packaging, Kochbücher",
    effekt: "Jede Zutat wird benannt, Texturen präzise beschrieben, Physik korrekt (Dampf, Viskosität)",
    beispiel: "Bon Appétit Magazine, Noma Restaurant, René Redzepi Fotografie",
    nicht_wenn: "Abstrakte oder konzeptuelle Bildsprache gewünscht",
    profi_tipp: "Echtes Tellerbild hochladen — Gemini identifiziert alle Zutaten automatisch",
  },
  fashion: {
    short: "Kleidung und Beauty mit editorialer Sophistication. Stoff-Verhalten so wichtig wie Look.",
    wann: "Fashion Shows, Lookbooks, Editorial Shoots, Beauty Kampagnen",
    effekt: "Stoff-Drape, Textur, Schnittdetails werden präzise beschrieben — Modell durch emotionalen Zustand",
    beispiel: "Vogue Editorial, Helmut Newton, Annie Leibovitz Fashion Work",
    nicht_wenn: "E-Commerce Produktshots — Fashion Mode kann übertrieben artistic werden",
  },
  architektur: {
    short: "Architektur als emotionale Erfahrung. Licht im Raum ist paramount.",
    wann: "Architekturfotografie, Immobilien Premium, Interior Design, Bau-Präsentationen",
    effekt: "Räumliche Poesie — wie es sich ANFÜHLT in diesem Raum zu sein",
    beispiel: "Julius Shulman, Ezra Stoller, Hufton + Crow Stil",
    nicht_wenn: "Technische Zeichnungen oder Grundrisse kommuniziert werden sollen",
  },
  natur: {
    short: "Maßstab, Licht und das körperliche Gefühl an einem vastenen Ort zu sein.",
    wann: "Outdoor Brands, Nature Documentary, Umwelt-Content, Travel Photography",
    effekt: "Betrachter fühlt Temperatur, Wind, Luftqualität — nicht nur sehen",
    beispiel: "National Geographic, BBC Planet Earth, Sebastião Salgado",
    nicht_wenn: "Urban oder Studio-Content — Natur-Mode ignoriert gebaute Umgebungen",
  },
  technologie: {
    short: "Präzision und Innovation. Technologie fühlt sich fortschrittlich aber menschlich an.",
    wann: "Tech-Startups, Consumer Electronics, B2B Software Visualisierung",
    effekt: "Gerät-Details exakt (Port-Typ, Material, Buttons), Designsprache präzise",
    beispiel: "Apple Product Photography, Dyson, Tesla Werbung",
    nicht_wenn: "Menschliche oder emotionale Narrative wichtiger sind",
  },
  event: {
    short: "Energie, kollektive Atmosphäre, FOMO-induzierende Präsenz.",
    wann: "Event Promotion, Festival Marketing, Konzert Dokumentation, Sports",
    effekt: "Betrachter wünscht sich DORT gewesen zu sein — Sound durch Visual impliziert",
    beispiel: "Coachella Visuals, UEFA Champions League, Red Bull Dokumentationen",
    nicht_wenn: "Stille oder Kontemplation kommuniziert werden soll",
  },
  portrait: {
    short: "Inneres Leben durch authentischen menschlichen Ausdruck. Augen tragen alles.",
    wann: "Portrait Photography, Personal Branding, Documentary People, Actor Shots",
    effekt: "Emotionaler Zustand statt Posen — Mikro-Expressionen werden beschrieben",
    beispiel: "Platon, Annie Leibovitz Portraits, Steve McCurry",
    nicht_wenn: "Gruppe oder Event im Vordergrund steht",
  },
};

// ─── TONE TOOLTIPS ────────────────────────────────────────────

export const TONE_TOOLTIPS: Record<string, TooltipData> = {
  luxury: {
    short: "High-End Commercial Ästhetik. Makellose Ausführung, aspirationale Qualität.",
    wann: "Premium Brands, Luxusprodukte, Hochpreisige Dienstleistungen",
    effekt: "Jedes Detail communiciert Wert — Material, Licht, Komposition arbeiten zusammen",
    beispiel: "Rolex, Chanel, Bentley, Four Seasons Hotel Visuals",
    nicht_wenn: "Authentizität oder Roheit kommuniziert werden soll — Luxus wirkt distanziert",
    profi_tipp: "Kombiniere mit 'Roger Deakins' Director Tag für kontrollierten Luxus ohne Kitsch",
  },
  documentary: {
    short: "Rohe Authentizität. Wahrheit über Schönheit, Moment über Komposition.",
    wann: "Documentary Content, Social Impact, NGO Kommunikation, Authenticity Brands",
    effekt: "Handheld, ungestellt, naturalistisch — Betrachter vertraut dem Gesehenen",
    beispiel: "Vice Media Ästhetik, NatGeo Field Work, Dardenne Brüder",
    nicht_wenn: "Polierte Markenimage-Kommunikation nötig",
  },
  editorial: {
    short: "Magazin-Qualität Spannung zwischen Schönheit und Konzept.",
    wann: "Fashion Editorials, Lifestyle Magazine, Kulturelle Institutionen",
    effekt: "Visuell sophisticated — Idee und Ästhetik gleichwertig",
    beispiel: "Vogue, AnOther Magazine, i-D, Apartamento",
    nicht_wenn: "Direktes Verkaufen im Vordergrund — Editorial kann zu abstract wirken",
  },
  dark: {
    short: "Dunkel, dramatisch, psychologisch komplex. Schatten als Ausdrucksmittel.",
    wann: "Kunst, Parfüm, Nischenbrand, Musik Visuals, Film Stills",
    effekt: "Hoher Kontrast, Chiaroscuro, emotionale Schwere — Mystery und Tiefe",
    beispiel: "Dior Homme, Rick Owens, Nick Cave Visuals",
    nicht_wenn: "Helle fröhliche Kommunikation nötig — Dark kann abstoßen",
    profi_tipp: "Kombiniere mit 'Noir Classique' Style für maximale visuelle Wirkung",
  },
  artistic: {
    short: "Künstlerische Freiheit. Konzept und Ästhetik über kommerzielle Klarheit.",
    wann: "Art Direction, Kulturelle Marken, Museums & Galerien, Musik Industrie",
    effekt: "Idee ist das Bild — visuelle Metapher als primäre Sprache",
    beispiel: "Björk Video Ästhetik, Comme des Garçons, Yohji Yamamoto",
    nicht_wenn: "Produkt klar kommuniziert werden muss — Artistic überwältigt Botschaft",
  },
  commercial: {
    short: "Saubere kommerzielle Klarheit. Botschaft sofort verständlich, universal ansprechend.",
    wann: "Mainstream Advertising, FMCG, E-Commerce, Massenmarkt",
    effekt: "Clean, hell, zugänglich — maximale Verständlichkeit für breite Zielgruppe",
    beispiel: "Unilever Werbung, IKEA Katalog, H&M Mainstream",
    nicht_wenn: "Premium Positionierung nötig — zu sauber kann billig wirken",
  },
};

// ─── DURATION TOOLTIPS ────────────────────────────────────────

export const DURATION_TOOLTIPS: Record<string, TooltipData> = {
  "3": {
    short: "3 Sekunden Micro-Content. Maximale Verdichtung, sofortige Wirkung.",
    wann: "Social Media Stories, Pre-Roll Ads, GIF-ähnliche Loops, Aufmerksamkeitsfang",
    effekt: "Single decisive moment oder tight loop — keine Zeit für Entwicklung",
    beispiel: "Instagram Story Ads, TikTok Hook Opener, Product Reveal Loop",
    profi_tipp: "Für Loops: Start und Ende müssen nahtlos verbindbar sein",
  },
  "5": {
    short: "5 Sekunden Standard. Intro + Moment + kleiner Ausklang.",
    wann: "Social Media Feed Posts, Product Demos, Standard Ad Placement",
    effekt: "Genug Zeit für einen vollständigen Eindruck — Bewegung zeigen und landen",
    beispiel: "YouTube Pre-Roll (unskippable), Facebook Feed Video",
    profi_tipp: "Idealformat für Kling und Runway — gute Balance aus Qualität und Länge",
  },
  "8": {
    short: "8 Sekunden Hero Shot. Vollständige visuell Entwicklung möglich.",
    wann: "Hero Shots, Premium Produktpräsentation, Brand Films, Website Header",
    effekt: "Raum für Atmosphäre-Aufbau, Produkt-Reveal und emotionale Landung",
    beispiel: "Parfüm TV Spots (15s cut auf 8s), Automobilwerbung",
    profi_tipp: "Bestes Format für Atmosäphre + Detailtreue Kombination",
  },
  "15": {
    short: "15 Sekunden Feature. Story-Arc mit Anfang, Mitte und Ende.",
    wann: "Instagram Reels, YouTube Shorts, TV Spots, Branded Content",
    effekt: "Komplettes Narrativ möglich — Aufbau, Climax, Auflösung",
    beispiel: "TV Werbung Kurzformat, Cinematic Brand Films",
    nicht_wenn: "Tool-Limitierung — Sora/Kling generieren bei 15s weniger konsistent",
    profi_tipp: "In Shots aufteilen und separat generieren gibt bessere Ergebnisse als 1× 15s",
  },
};

// ─── OUTPUT FIELD TOOLTIPS ────────────────────────────────────

export const OUTPUT_TOOLTIPS: Record<string, TooltipData> = {
  quality_score: {
    short: "Gesamtbewertung des Prompts basierend auf Struktur, Spezifität und Schema-Einhaltung.",
    wann: "90-99: Production-ready. 80-89: Gut, kleine Optimierungen möglich. <80: Bild erneut versuchen",
    effekt: "Score basiert auf: Detailreichtum, Schicht-Vollständigkeit, Physik-Genauigkeit, Intentions-Klarheit",
    profi_tipp: "Score unter 82? Mehr Tags aus Orchestra Library hinzufügen oder Intention präzisieren",
  },
  detail_accuracy: {
    short: "Wie viele Bilddetails aus der Gemini-Analyse im finalen Prompt landeten.",
    wann: "100%: Alle Details übernommen. 80-99%: Sehr gut. <80%: Einige Details fehlen",
    effekt: "Misst ob Farben, Materialien, Logos, Texturen aus dem Originalbild im Prompt sind",
    nicht_wenn: "Bei Text-only Prompts (kein Bild) ist dieser Score weniger relevant",
    profi_tipp: "Score < 85%? Use Case 'Produkt' wählen für maximale Detailextraktion",
  },
  world: {
    short: "Umgebungsebene — was existiert BEVOR das Hauptsubjekt eingeführt wird.",
    effekt: "Beste Prompts beschreiben die Welt zuerst, dann das Subjekt. Gibt AI Kontext und Maßstab.",
    profi_tipp: "Je spezifischer die Welt (Material, Temperatur, Zeit), desto besser das Ergebnis",
  },
  subject: {
    short: "Subjekt-Ebene — das Hauptobjekt mit ALLEN visuellen Details aus dem Bild.",
    effekt: "Hier landen Farb-Hex-Codes, Materialien, Logos, Texturen — die Seele des Prompts",
    profi_tipp: "Produktbild: Diese Ebene ist am kritischsten. Alle Details sollten hier erscheinen",
  },
  motion: {
    short: "Bewegungsebene — Kamerabewegung und Subjektbewegung für Video-Prompts.",
    effekt: "Präzise Bewegungsbeschreibung (0.3Hz, 15° Dolly) gibt dem AI klare physische Parameter",
    nicht_wenn: "Image-Mode — Motion Layer ist dann leer oder enthält nur implizierte Bewegung",
  },
  lighting: {
    short: "Lichtebene — Lichtquelle, Richtung, Qualität, Farbtemperatur.",
    effekt: "Exaktes Licht aus dem Bild wird hier beschrieben und mit gewähltem Stil fusioniert",
    profi_tipp: "Licht bestimmt 60% der visuellen Wirkung — diese Ebene sorgfältig prüfen",
  },
  lens: {
    short: "Optik-Ebene — Brennweite, Blende, Linsencharakter.",
    effekt: "Bestimmt Kompression, Bokeh-Qualität, Verzerrung und damit die 'Persönlichkeit' des Bildes",
    profi_tipp: "85mm f/1.4 für Portrait, 100mm Macro für Produktdetails, 35mm für Kontext",
  },
  color: {
    short: "Farbebene — Grading, Farbwissenschaft, Palette integriert mit Bilddaten.",
    effekt: "Exakte Farben aus dem Originalbild werden mit gewähltem Color Grade fusioniert",
    profi_tipp: "Spezifische Hex-Codes aus dem Bild + Named Film Stock = präziseste Farbergebnisse",
  },
  physics: {
    short: "Physik-Ebene — präzises physikalisches Verhalten aller Materialien im Frame.",
    effekt: "Dampf-Frequenz, Flüssigkeits-Viskosität, Metall-Reflexion — vermeidet AI-Physikfehler",
    profi_tipp: "Für Food und Produkt besonders kritisch — diese Ebene verhindert die meisten Fehler",
  },
  intention: {
    short: "Intentions-Ebene — was der Betrachter FÜHLEN soll, nicht was er sehen soll.",
    effekt: "Stärkste Ebene für emotionale Wirkung. 'Viewer feels' not 'viewer sees'",
    profi_tipp: "Wenn diese Ebene leer ist, füge Tone und Mood Tags hinzu um sie zu füllen",
  },
  ghost_director: {
    short: "Die unsichtbare Regie-Philosophie hinter dem Prompt — ein Satz der alles ausrichtet.",
    effekt: "Ghost Director gibt dem AI Modell eine konsistente künstlerische Stimme für den gesamten Shot",
    beispiel: "Roger Deakins würde sagen: 'Das Licht muss einen Grund haben zu sein'",
    profi_tipp: "Director Philosophy Tags aus Orchestra Library beeinflussen diesen Satz stark",
  },
  recommended_tool: {
    short: "Das AI-Tool das am besten zu diesem spezifischen Content und Use Case passt.",
    effekt: "Basiert auf: Bewegungstyp, Detailgrad, Stilistik, Use Case — nicht nur persönliche Präferenz",
    profi_tipp: "Tool wechseln und Prompt anpassen wenn empfohlenes Tool nicht verfügbar ist",
  },
  use_case_notes: {
    short: "Warum dieser Ansatz den gewählten Use Case optimal bedient.",
    effekt: "Erklärt die strategische Entscheidung hinter dem Prompt — für Teams und Präsentationen nützlich",
  },
};

// ─── TAG TOOLTIPS (Sample für häufig genutzte Tags) ────────────
// Alle anderen Tags nutzen ihren promptContribution als short description

export const TAG_TOOLTIPS: Record<string, TooltipData> = {
  // STYLE
  "Cinematic Widescreen": {
    short: "2.39:1 Anamorphic Look. Filmische Gravitas durch das Seitenverhältnis selbst.",
    wann: "Premium Video Content, Brand Films, alles was episch wirken soll",
    effekt: "Breite Leinwand impliziert Kino-Budget und Absicht — erhöht sofort wahrgenommene Qualität",
    beispiel: "Interstellar, Blade Runner 2049, jeder Premium Automobilspot",
    nicht_wenn: "Portrait oder vertikale Social Media Formate",
  },
  "Documentary Raw": {
    short: "Rohe Dokumentar-Ästhetik. Wahrheit über Schönheit.",
    wann: "Authentizitäts-Brands, NGOs, Real People Stories, Behind-the-Scenes",
    effekt: "Ungestellt, naturalistisch, handheld — Betrachter vertraut dem Gesehenen instinktiv",
    nicht_wenn: "Luxus oder High-End Produkte — Raw kann billig wirken",
  },
  "Hyperrealist": {
    short: "Detailgenauigkeit jenseits normaler Fotografie. Jede Textur hyperartikuliert.",
    wann: "Produkt Hero Shots, Wissenschaftliche Visualisierung, Photoreal Architektur",
    effekt: "Jede Oberfläche wird gerendert mit maximaler Präzision — Material 'spricht'",
    profi_tipp: "Kombiniere mit Makro-Tags für maximale Material-Studie",
  },
  "Vintage 35mm": {
    short: "35mm Film-Grain und Kodak Vision3 Farbwissenschaft. Analoge Wärme.",
    wann: "Nostalgie, Heritage Brands, Musik, Lifestyle mit authentischem Charakter",
    effekt: "Organisches Grain, charakteristische Farbverschiebungen, analoge Imperfektionen",
    beispiel: "Levi's Heritage Kampagnen, Vinyl Record Labels, Indie Film Ästhetik",
    profi_tipp: "Kombiniere mit 'Kodak Vision3 500T' Farb-Tag für maximale Film-Authentizität",
  },
  // MOOD
  "Melancholisch": {
    short: "Bittersüße Schönheit. Schmerz der trotzdem schön ist.",
    wann: "Emotionale Marken, Musik Visuals, künstlerischer Content",
    effekt: "Nachdenkliche Stille, zeitliche Distanz, etwas Verlorenes präsent",
    beispiel: "Wong Kar-Wai Filme, Sofia Coppola Lost in Translation",
    profi_tipp: "Kombiniere mit 'Blaue Stunde' Licht für perfekte Melancholie-Formel",
  },
  "Verführerisch": {
    short: "Magnetische Anziehung. Begehren ohne Erklärung.",
    wann: "Parfüm, Mode, Gastronomie, Lifestyle — überall wo Verlangen erzeugt werden soll",
    effekt: "Suggestion über Aussage — was NICHT gezeigt wird ist genauso wichtig",
    beispiel: "Chanel N°5, Dior Sauvage, high-end Gastronomie Visuells",
    nicht_wenn: "Familienprodukte oder B2B Kommunikation",
  },
  // KAMERA
  "ARRI Alexa 35": {
    short: "Professionellste Cinema-Kamera. LOG-C3 Farbwissenschaft, ARRI Charakteristik.",
    wann: "Wenn höchste wahrgenommene Produktionsqualität kommuniziert werden soll",
    effekt: "ARRI-Textur ist erkennbar — erhöht sofort Glaubwürdigkeit und Qualitätswahrnehmung",
    beispiel: "Praktisch jeder Award-winning Spielfilm seit 2012",
    profi_tipp: "Kombiniere mit 'Anamorphisch 2.39:1' für den vollständigen Cinema Look",
  },
  "Zeitlupe 120fps": {
    short: "Zeit 5× verlangsamt. Physik und Mikrobewegungen werden zur Poesie.",
    wann: "Produktperformance, Sport, Food (Splash/Pour), Fashion (Stoff in Bewegung)",
    effekt: "Macht das Unsichtbare sichtbar — Dampf-Wirbel, Flüssigkeits-Verhalten, Staub",
    beispiel: "Schampus-Werbung, Nike Performance Spots, BBC Earth Insekten-Sequenzen",
    profi_tipp: "Kling 2.x generiert besten Slow Motion Physik — als Empfehlung setzen",
  },
  // LICHT
  "Goldene Stunde": {
    short: "Die magischen 20 Minuten vor Sonnenuntergang. Warmes direktionales Licht.",
    wann: "Outdoor, Lifestyle, Reise, Natur, Portraits im Freien",
    effekt: "Schmeichelhaftes warmes Licht, lange Schatten, goldene Flächen — klassisch schön",
    beispiel: "Terrence Malick Filme, Golden-Hour Instagram Ästhetik, Outdoor Brand Visuals",
    nicht_wenn: "Innenaufnahmen oder wenn kühle Ästhetik gewünscht",
    profi_tipp: "Kombiniere mit 'Kodak Vision3 500T' Farbe für analogen Golden-Hour Look",
  },
  "Chiaroscuro Extrem": {
    short: "Caravaggio-Kontrast. 90% Schatten, 10% Licht. Dramatisch.",
    wann: "Kunst, Parfüm, Film Noir, High-Drama Portraits",
    effekt: "Extremes Hell-Dunkel — was NICHT beleuchtet ist erzählt die Geschichte",
    beispiel: "Caravaggio Gemälde, Gordon Willis Cinematography (Godfather), Batman",
    nicht_wenn: "Produktshots wo Detailtreue wichtig ist — zu viel Schatten versteckt Details",
  },
  // PHYSIK
  "Dampf präzise": {
    short: "Physikalisch korrekter Dampf: 0.3Hz Schwingung, 10-15cm Steighöhe.",
    wann: "Heißes Essen, Kaffee, Tee, Sauna, jede dampfende Flüssigkeit",
    effekt: "Verhindert typischen AI-Fehler: zu breiten, zu dichten oder falsch platzierten Dampf",
    beispiel: "Professionelle Food Photography, Coffee Brand Visuals",
    profi_tipp: "Für Kaffee: 'Dampf präzise' + 'Kaffee Crema' + 'Kerzenlicht' = perfekter Coffee Shot",
  },
  "Metall Poliert": {
    short: "Hochglanz-Metallreflexion. Umgebung spiegelt sich in der Oberfläche.",
    wann: "Luxusuhren, Premium Besteck, Auto-Chrom, High-End Consumer Electronics",
    effekt: "Spekularhöhepunkte wandern mit der Kamera — Material 'lebt'",
    nicht_wenn: "Matte oder gebürstete Oberflächen — diese brauchen 'Metall Gebürstet' Tag",
  },
  // KOMPOSITION
  "Zentralperspektive": {
    short: "Perfekte Einpunkt-Perspektive. Kubrick Symmetrie.",
    wann: "Architektur, Korridor-Shots, formale Produktshots, Symmetrie als Aussage",
    effekt: "Absolute visuelle Autorität — der Fluchtpunkt zieht den Blick unwiderstehlich",
    beispiel: "The Shining, Moonrise Kingdom, praktisch jeder Kubrick Film",
    profi_tipp: "Kombiniere mit 'Kubrick' Director Tag für vollständige Kubrick-Philosophie",
  },
  "Negative Space Groß": {
    short: "Dominanter leerer Raum. Subjekt klein in großer Leere.",
    wann: "Luxus-Marken, Minimalismus, Technologie, wenn Einsamkeit kommuniziert werden soll",
    effekt: "Stille als visuelle Sprache — das Subjekt bekommt durch Kontrast mehr Gewicht",
    beispiel: "Apple Marketing, Bang & Olufsen, japanische Ästhetik",
  },
  // DIRECTOR
  "Roger Deakins": {
    short: "Motiviertes natürliches Licht. Practicals only. Zurückhaltend aber verheerend schön.",
    wann: "Wenn Authentizität und Qualität gleichzeitig kommuniziert werden sollen",
    effekt: "Kein künstliches Licht ohne Begründung — jede Lichtquelle ist im Frame motiviert",
    beispiel: "Sicario, Blade Runner 2049, 1917, Skyfall — alle Deakins",
    profi_tipp: "Kombiniere mit 'Practicals Only' Licht-Tag für den vollständigen Deakins-Look",
  },
  "Wong Kar-Wai": {
    short: "Zeit durch Emotion verzerrt. Farbe gesättigt von Sehnsucht.",
    wann: "Romantische Inhalte, Melancholie-Ästhetik, Mode mit emotionalem Kern",
    effekt: "Slow Motion + Saturierte Farben + Handheld = Zeit als Gefühl",
    beispiel: "In the Mood for Love, Chungking Express, Happy Together",
    profi_tipp: "Kombiniere mit 'Melancholisch' Mood und 'Gegenlicht Rim' Licht",
  },
  "Kubrick": {
    short: "Geometrische Perfektion mit psychologischem Unbehagen darunter.",
    wann: "Wenn visuelle Autorität und unterschwellige Spannung kommuniziert werden sollen",
    effekt: "Einpunkt-Perspektive, perfekte Symmetrie, etwas stimmt nicht — aber was?",
    beispiel: "2001, The Shining, Full Metal Jacket, Barry Lyndon",
    nicht_wenn: "Warme, einladende oder organische Ästhetik gewünscht",
  },
  // NEGATIVE
  "Anti-Stock": {
    short: "Verhindert Stock-Foto-Ästhetik. Kein gestelltes Lächeln, keine künstliche Inszenierung.",
    wann: "IMMER aktivieren wenn authentische Kommunikation gewünscht",
    effekt: "AI-Modelle tendieren zu Stock-Ästhetik — dieser Tag kämpft aktiv dagegen",
    profi_tipp: "Kombiniere mit 'Documentary Raw' Style für maximale Anti-Stock-Wirkung",
  },
  "Anti-CGI Plastik": {
    short: "Verhindert künstlich-glattes CGI-Aussehen. Kein Plastik-Skin.",
    wann: "Portrait, Beauty, Lifestyle — überall wo Haut oder organische Materialien vorkommen",
    effekt: "Erzwingt organische Texturen und natürliche Imperfektionen im Output",
    profi_tipp: "Kombiniere mit 'Haut Natürlich' Material-Tag",
  },
  "Echte Hände": {
    short: "Verhindert AI-typische Anatomie-Fehler: schwebende Finger, falsche Handgelenke.",
    wann: "IMMER wenn Hände im Frame sind",
    effekt: "Explizite Instruktion an AI-Tool Hände korrekt zu rendern — reduziert Fehlerrate",
    profi_tipp: "Bei Portrait Use Case immer mitauswählen",
  },
};
