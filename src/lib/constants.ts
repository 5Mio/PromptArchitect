// ═══════════════════════════════════════════════════════════════
// PROMPT ARCHITECT PRO — MASTER LIBRARY v5
// 500+ Einträge | 12 Use Cases | 16 Kategorien
// Output Language: English (Best Practice)
// UI Language: Deutsch
// ═══════════════════════════════════════════════════════════════

// ─── USE CASES ────────────────────────────────────────────────

export const USE_CASES = [
  {
    id: "produkt",
    label: "Produkt",
    icon: "◈",
    description: "Produktpräsentation & Details",
    claudeInstruction: `Focus: PRODUCT DETAIL ACCURACY is the absolute highest priority.
Every visible product feature from the image analysis MUST appear in the prompt.
Brand markings, materials, colors with hex, textures, proportions, engravings, logos — nothing omitted.
The product must be instantly recognizable from the prompt alone without seeing the image.
Style: Clean, precise, commercial-grade. The product is the hero. Nothing competes.`,
    geminiInstruction: `CRITICAL PRIORITY: Extract every single product detail with maximum precision.
Document exactly: brand name exact spelling and position, logo size and placement, all color values with hex,
material type and surface finish (matte/glossy/brushed/polished/satin/textured), hardware details,
all visible text/engravings/serial numbers, proportions and scale relationships,
packaging if present, unique design features, any reflections revealing hidden geometry.
Miss absolutely nothing — every detail will be placed directly into the AI generation prompt.`,
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "◎",
    description: "Werbung & Brand Campaigns",
    claudeInstruction: `Focus: Emotional brand connection + product desire creation.
Create aspirational atmosphere. The viewer must WANT what is shown.
Balance: 60% emotional atmosphere, 40% product clarity.
Style: High-end commercial, aspirational, polished, desire-inducing.`,
    geminiInstruction: `Extract: Product and brand identity signals, full color palette,
aspirational lifestyle elements visible, target audience demographic indicators,
emotional cues and energy, any existing brand language or visual identity present.`,
  },
  {
    id: "story",
    label: "Story",
    icon: "◐",
    description: "Narrative & Storytelling",
    claudeInstruction: `Focus: Narrative tension and emotional journey.
Every frame belongs to a larger story — viewer arrived mid-sentence.
Create "stolen moment" — camera caught something real and unrepeatable.
Style: Cinematic, character-driven, emotionally layered.
Viewer asks: "what happened before?" and "what comes next?"`,
    geminiInstruction: `Extract: Human elements and micro-expressions, environmental storytelling cues,
emotional atmosphere and tension level, time of day indicators, narrative context clues,
relationship dynamics if people present, tension or calm signals, story-relevant background details.`,
  },
  {
    id: "humor",
    label: "Funny / Humor",
    icon: "◑",
    description: "Komische & unterhaltsame Inhalte",
    claudeInstruction: `Focus: Comedic timing and unexpected visual juxtaposition.
Create humor through contrast, surprise, or delightful absurdity.
Describe the exact moment of comedic impact — timing is everything.
Style: Range from dry wit to slapstick. Genuine, never forced.`,
    geminiInstruction: `Extract: Humorous elements, unexpected contrasts, facial expressions suggesting comedy,
situational comedy elements, visual puns or irony, scale differences,
anything surprising, incongruous, or delightfully wrong in the frame.`,
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    icon: "◒",
    description: "Lebensstil & Alltagsmomente",
    claudeInstruction: `Focus: Authentic human moments in aspirational settings.
Life as it beautifully could be — elevated but completely believable.
Style: Editorial lifestyle, warm, inclusive, genuinely human.`,
    geminiInstruction: `Extract: Lifestyle quality indicators, social context, time of day,
environment quality and aspiration level, human presence and activity type,
emotional warmth, authentic vs staged quality of the image.`,
  },
  {
    id: "food",
    label: "Food & Gastro",
    icon: "◓",
    description: "Food Photography & Restaurant",
    claudeInstruction: `Focus: Sensory richness — make viewer taste and smell through the image.
Describe textures, steam behavior, glistening surfaces, color vibrancy of every element.
Every visible ingredient must be named and described. Nothing generic.
Physics: steam behavior, liquid viscosity, surface texture are critical.
Style: Editorial food photography, warm, appetite-inducing, artisanal.`,
    geminiInstruction: `DETAIL CRITICAL for food: Every ingredient visible must be identified and named.
Document: cooking state exactly (raw/medium/well/charred/glazed/caramelized),
steam presence and behavior pattern, all surface textures (crispy/moist/glossy/caramelized/glistening),
color vibrancy of each element, plating style and technique, sauce consistency and color,
dishware material and style, garnish details, table setting, quality of light on food surfaces.`,
  },
  {
    id: "fashion",
    label: "Fashion & Beauty",
    icon: "◔",
    description: "Mode, Beauty & Editorial",
    claudeInstruction: `Focus: Garment and beauty detail with editorial sophistication.
Fabric behavior, drape, texture equal importance to overall look.
Direct subject through emotional state — never poses.
Style: High fashion editorial, confident, artistically composed.`,
    geminiInstruction: `Extract: Fabric type and texture description, exact color with hex estimate,
cut and silhouette details, styling details (buttons/seams/zippers/hardware/stitching),
brand markings if visible, beauty details (skin quality, hair texture and style, makeup approach),
all accessories and their materials, editorial mood and energy level.`,
  },
  {
    id: "architektur",
    label: "Architektur",
    icon: "◕",
    description: "Gebäude, Räume & Spaces",
    claudeInstruction: `Focus: Spatial poetry — architecture as emotional and physical experience.
Light behavior within space is paramount. Show how it FEELS to inhabit this space.
Geometry, materiality, scale relationships carry equal weight.
Style: Architectural photography, geometrically precise yet atmospheric.`,
    geminiInstruction: `Extract: Architectural style and period, all visible materials with finish quality,
light source behavior and quality in space, scale indicators and proportions,
geometric relationships between elements, interior vs exterior context,
condition and age indicators, spatial depth and layering.`,
  },
  {
    id: "natur",
    label: "Natur & Landschaft",
    icon: "◖",
    description: "Outdoor, Natur & Umgebung",
    claudeInstruction: `Focus: Scale, light, and the visceral feeling of being in this place.
Weather behavior, atmospheric perspective, seasonal and temporal mood.
Make viewer feel the temperature, wind, air quality, and silence.
Style: Documentary nature, simultaneously vast and intimate.`,
    geminiInstruction: `Extract: Landscape type and geography, vegetation and species if identifiable,
weather conditions and cloud formation type, precise time of day from light angle and color,
color palette of natural elements with approximate values, scale indicators,
seasonal markers, atmospheric haze or clarity level.`,
  },
  {
    id: "technologie",
    label: "Technologie",
    icon: "◗",
    description: "Tech, Innovation & Zukunft",
    claudeInstruction: `Focus: Precision and purposeful innovation.
Technology feels advanced but human — not cold or sterile.
Show the human-technology relationship or pure object authority.
Style: Clean, precise, forward-looking, materially honest.`,
    geminiInstruction: `Extract: Device type and category, brand and model if visible,
all interface elements or screen content, materials (metal type/glass/composite/plastic),
LED or light elements, design language complexity level,
scale indicators and environmental context, implied purpose.`,
  },
  {
    id: "event",
    label: "Event & Experience",
    icon: "◘",
    description: "Events, Konzerte & Erlebnisse",
    claudeInstruction: `Focus: Energy, collective atmosphere, FOMO-inducing presence.
Crowd energy, lighting spectacle, implied sound through visual cues.
Make viewer viscerally wish they were there in that exact moment.
Style: Dynamic, energetic, immersive, electrically alive.`,
    geminiInstruction: `Extract: Event type and scale, crowd density and energy level,
lighting effects type and color, key decisive moment quality,
spatial scale and venue type, emotional atmosphere intensity,
night or day context, sound implied by visual evidence.`,
  },
  {
    id: "portrait",
    label: "Portrait & Menschen",
    icon: "◙",
    description: "Menschen, Charakter & Emotion",
    claudeInstruction: `Focus: Inner life revealed through authentic human expression.
Never describe poses — describe emotional states only.
The eyes carry everything. Micro-expressions matter most.
Style: Intimate, brutally honest, character-revealing.`,
    geminiInstruction: `Extract: Age range estimate, primary emotional expression label,
eye direction and emotional quality (soft/sharp/distant/present),
micro-expression details (jaw tension/brow state/mouth relaxation),
skin texture and tone, hair details, clothing as character signal,
relationship to environment, quality and direction of light on face.`,
  },
] as const;

export type UseCaseId = typeof USE_CASES[number]["id"];

// ─── LIBRARY TYPES ────────────────────────────────────────────

export interface LibraryEntry {
  label: string;
  promptContribution: string;
  useCases?: UseCaseId[];
}

export interface LibraryCategory {
  id: string;
  label: string;
  color: string;
  useCases?: UseCaseId[];
  entries: LibraryEntry[];
}

// ─── MASTER LIBRARY — 500+ EINTRÄGE ──────────────────────────

export const LIBRARY: LibraryCategory[] = [

  // ══════════════════════════════════════════════════════════
  // 01 — VISUELLER STIL (50 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "style",
    label: "Visueller Stil",
    color: "#ff4d00",
    entries: [
      { label: "Cinematic Widescreen", promptContribution: "cinematic widescreen 2.39:1 anamorphic, film-like rendering, depth and gravitas" },
      { label: "Documentary Raw", promptContribution: "raw documentary aesthetic, unposed naturalism, handheld observational intimacy" },
      { label: "Luxury Commercial", promptContribution: "high-end commercial polish, aspirational production quality, flawless execution" },
      { label: "Fashion Editorial", promptContribution: "editorial photography aesthetic, magazine-quality tension between beauty and concept" },
      { label: "Noir Classique", promptContribution: "high contrast noir, deep dramatic shadows, chiaroscuro lighting, moral ambiguity in tone" },
      { label: "Hyperrealist", promptContribution: "hyperrealistic rendering exceeding photographic precision, every surface texture amplified" },
      { label: "Radical Minimalist", promptContribution: "radical minimalism, 80% negative space, essential elements only, silence as composition" },
      { label: "Vintage 35mm", promptContribution: "35mm film grain, Kodak Vision3 color science, analog warmth and organic imperfection" },
      { label: "Futuristisch", promptContribution: "futuristic clean aesthetic, advanced material quality, forward temporal perspective" },
      { label: "Brutalist", promptContribution: "raw brutalist aesthetic, honest exposed materials, uncompromising geometric composition" },
      { label: "Impressionistisch", promptContribution: "impressionistic painterly quality, light as primary subject, edges dissolve intentionally" },
      { label: "Industriell", promptContribution: "industrial aesthetic, raw functional surfaces, beauty extracted from utility" },
      { label: "Wabi-Sabi", promptContribution: "wabi-sabi philosophy, beauty in imperfection and transience, natural decay honored" },
      { label: "Art Deco", promptContribution: "art deco precision, strict geometric symmetry, decorative mathematical elegance" },
      { label: "Bauhaus", promptContribution: "Bauhaus principle: form follows function, geometric purity, primary color relationships" },
      { label: "Expressionistisch", promptContribution: "expressionist distortion of reality, emotional truth over physical truth, subjective vision" },
      { label: "Surrealismus", promptContribution: "surrealist logic, dreamlike reality bending, unexpected object relationships, Dalí-adjacent" },
      { label: "Pop Art", promptContribution: "pop art bold graphic quality, flat color areas, commercial culture elevated to art" },
      { label: "Romantizismus", promptContribution: "romantic painterly tradition, sublime emotional response to nature, Turner-adjacent light" },
      { label: "Street Photography", promptContribution: "street photography honesty, decisive moment, unposed urban life captured" },
      { label: "Fine Art", promptContribution: "fine art photography intent, gallery-worthy composition, concept and beauty unified" },
      { label: "Reportage", promptContribution: "photojournalistic reportage style, truth over beauty, moment over composition" },
      { label: "Conceptual", promptContribution: "conceptual photography, idea is image, visual metaphor executed precisely" },
      { label: "Typografisch", promptContribution: "typography as visual element, text integrated into composition, graphic design sensibility" },
      { label: "Archival", promptContribution: "archival documentary quality, evidence of time passing, historical document feeling" },
      { label: "Natur-Dokumentation", promptContribution: "nature documentary BBC quality, patience in every frame, wildlife respect", useCases: ["natur"] },
      { label: "Product Hero Shot", promptContribution: "commercial product hero shot, 360° implied, object isolated and celebrated", useCases: ["produkt"] },
      { label: "Lookbook", promptContribution: "fashion lookbook aesthetic, garment as protagonist, environment as supporting cast", useCases: ["fashion"] },
      { label: "Food Editorial", promptContribution: "food editorial Kinfolk/Bon Appétit quality, beauty and appetite in balance", useCases: ["food"] },
      { label: "Architectural Photography", promptContribution: "architectural photography tradition, geometric precision, spatial narrative", useCases: ["architektur"] },
      { label: "Sozialrealismus", promptContribution: "social realist tradition, dignity in ordinary life, honest class-conscious gaze" },
      { label: "Piktorialismus", promptContribution: "pictorialist soft-focus tradition, photography as fine art painting, chemical romance" },
      { label: "Neue Sachlichkeit", promptContribution: "New Objectivity precision, Renger-Patzsch clarity, object dignity through sharp focus" },
      { label: "Japonismus", promptContribution: "Japanese aesthetic influence, asymmetric balance, negative space as active element" },
      { label: "Ukiyo-e Inspired", promptContribution: "ukiyo-e woodblock influence, flat planes, pattern and line, season as character" },
      { label: "Cyber-Noir", promptContribution: "cyber-noir fusion, neon-saturated darkness, technological melancholy, rain-slicked surfaces" },
      { label: "Pastoral", promptContribution: "pastoral tradition, idealized countryside, natural harmony, pre-industrial ease" },
      { label: "Grunge", promptContribution: "grunge texture and grit, imperfection celebrated, raw energy over polish" },
      { label: "Glamour Classic", promptContribution: "classic Hollywood glamour, Hurrell-adjacent lighting, mythologizing the subject" },
      { label: "Scandinavia Clean", promptContribution: "Scandinavian design aesthetic, functional beauty, honest materials, winter light quality" },
      { label: "Mediterranean Warmth", promptContribution: "Mediterranean light and warmth, sun-bleached surfaces, late afternoon gold" },
      { label: "Berlin Underground", promptContribution: "Berlin underground aesthetic, raw spaces, darkness and neon, industrial night" },
      { label: "Tokyo Neon", promptContribution: "Tokyo urban neon aesthetic, information density, layered signs and light, energy" },
      { label: "Desert Minimalism", promptContribution: "desert minimalist aesthetic, vast empty space, heat shimmer, geological time" },
      { label: "Ocean Documentary", promptContribution: "ocean documentary Blue Planet quality, blue world, silence and pressure", useCases: ["natur"] },
      { label: "Haute Cuisine", promptContribution: "haute cuisine plating aesthetic, precision and artistry, Michelin star presentation", useCases: ["food"] },
      { label: "Street Food Raw", promptContribution: "street food documentary rawness, smoke and heat, authentic culinary culture", useCases: ["food"] },
      { label: "Makrokunst", promptContribution: "macro art photography, miniature universe revealed, scale illusion and wonder" },
      { label: "Infrarot", promptContribution: "infrared photography aesthetics, foliage glows white, surreal tonal inversion" },
      { label: "Cyanotypie", promptContribution: "cyanotype blue-and-white photographic tradition, prussian blue tones, botanical precision" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 02 — STIMMUNG (50 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "mood",
    label: "Stimmung & Atmosphäre",
    color: "#ffd166",
    entries: [
      { label: "Intim & Privat", promptContribution: "intimate private atmosphere, undisturbed personal moment, quiet sacred space" },
      { label: "Dramatisch", promptContribution: "dramatic tension, high emotional stakes, charged atmosphere before breaking" },
      { label: "Melancholisch", promptContribution: "melancholic undertone, bittersweet beauty, reflective stillness with ache" },
      { label: "Mysteriös", promptContribution: "mysterious atmosphere, withheld information, depth implied never shown" },
      { label: "Friedvoll", promptContribution: "serene unhurried calm, meditative contemplative quality, time suspended" },
      { label: "Angespannt", promptContribution: "palpable tension, anticipation fills every element, collectively held breath" },
      { label: "Nostalgisch", promptContribution: "nostalgic warmth, memory quality, soft temporal distance, cherished past" },
      { label: "Roh & Ehrlich", promptContribution: "raw unfiltered authenticity, no pretense anywhere, truth over beauty always" },
      { label: "Triumphierend", promptContribution: "triumphant earned energy, hard-won victory radiating, powerful justified presence" },
      { label: "Ätherisch", promptContribution: "ethereal otherworldly quality, between physical states, dreamlike unreality" },
      { label: "Verführerisch", promptContribution: "seductive magnetic pull, desired object quality, irresistible invitation", useCases: ["marketing", "fashion", "lifestyle", "food"] },
      { label: "Verspielt", promptContribution: "genuine playful lightness, joy without irony, delightful uninhibited energy", useCases: ["humor", "lifestyle", "food"] },
      { label: "Episch", promptContribution: "epic mythological scale, larger-than-life resonance, powerful lasting gravity" },
      { label: "Warm & Einladend", promptContribution: "visible tangible warmth, comfort made material, welcome invitation", useCases: ["food", "lifestyle", "architektur"] },
      { label: "Kalt & Distanziert", promptContribution: "cold psychological distance, emotional unavailability, clinical remove" },
      { label: "Zärtlich", promptContribution: "tender gentle quality, fragile care visible, softness protecting something precious", useCases: ["portrait", "lifestyle"] },
      { label: "Bedrohlich", promptContribution: "subtle menace present, threat beneath surface, unease without explanation" },
      { label: "Ehrfürchtig", promptContribution: "awe-inducing sublime scale, viewer made small and grateful, reverence involuntary" },
      { label: "Visionär", promptContribution: "visionary quality, future implied in present, prophetic clarity" },
      { label: "Primitiv & Ursprünglich", promptContribution: "primal rawness, before civilization quality, elemental and honest" },
      { label: "Luxuriös", promptContribution: "luxury made visible and tactile, wealth as material fact, abundance refined" },
      { label: "Bescheiden", promptContribution: "quiet dignity, understatement as power, beauty without announcement" },
      { label: "Intensiv", promptContribution: "extreme intensity, maximum emotional concentration, nothing held back" },
      { label: "Verträumt", promptContribution: "dreamy quality, edges soft with possibility, between sleep and waking" },
      { label: "Heimelig", promptContribution: "hygge-adjacent warmth, home as sanctuary, belonging made visible" },
      { label: "Aufregend", promptContribution: "palpable excitement, anticipation made visual, energy barely contained" },
      { label: "Einsam", promptContribution: "solitude without sadness, chosen aloneness, self-sufficient quietude" },
      { label: "Festlich", promptContribution: "celebratory atmosphere, joy collective and specific, occasion elevated" },
      { label: "Spirituell", promptContribution: "spiritual presence felt not explained, transcendence possible in frame" },
      { label: "Sehnsüchtig", promptContribution: "longing made visible, desire for what cannot be reached, yearning in light" },
      { label: "Kraftvoll", promptContribution: "raw physical power visible, strength in every material, force restrained" },
      { label: "Sanft", promptContribution: "extreme gentleness, soft handling of everything, care as visual language" },
      { label: "Unheimlich", promptContribution: "uncanny valley adjacent, familiar yet wrong, Freudian unheimlich at work" },
      { label: "Nostalgisch-Schmerzlich", promptContribution: "saudade quality, beautiful pain of missing, past unreachable but present" },
      { label: "Erwartungsvoll", promptContribution: "pregnant pause quality, everything about to happen, peak anticipation" },
      { label: "Entspannt", promptContribution: "deep relaxation visible, tension fully released, ease without effort" },
      { label: "Trotzig", promptContribution: "defiant energy, resistance made beautiful, power against authority" },
      { label: "Verletzlich", promptContribution: "vulnerability shown with dignity, openness without shame, strength in exposure" },
      { label: "Zeitlos", promptContribution: "timeless quality, decade impossible to place, immune to trend" },
      { label: "Vergänglich", promptContribution: "transience made visible, beauty precisely because it ends, mortality honored" },
      { label: "Überwältigend", promptContribution: "overwhelming scale and beauty, viewer capacity exceeded, surrender required" },
      { label: "Heiter", promptContribution: "light uncomplicated happiness, genuine smile quality, brightness without weight" },
      { label: "Kontemplativ", promptContribution: "contemplative pace, thinking space built in, reflection invited" },
      { label: "Magisch", promptContribution: "magic made plausible, wonder without explanation, childhood logic restored" },
      { label: "Gleichmütig", promptContribution: "equanimous steady quality, neither high nor low, centered and true" },
      { label: "Provokativ", promptContribution: "intentional provocation, comfort disrupted with purpose, question forced" },
      { label: "Poetisch", promptContribution: "poetic logic over literal, metaphor as primary language, meaning layered" },
      { label: "Absurd", promptContribution: "absurdist logic, reasonable impossibility, Camus made visual", useCases: ["humor"] },
      { label: "Dringlich", promptContribution: "urgent immediacy, now-ness in every element, cannot wait quality" },
      { label: "Beruhigend", promptContribution: "genuinely calming effect, nervous system settles, safety communicated" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 03 — KAMERATECHNIK (40 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "kamera",
    label: "Kameratechnik",
    color: "#4ade80",
    entries: [
      { label: "ARRI Alexa 35", promptContribution: "ARRI Alexa 35, LOG-C3 color science, characteristic ARRI texture and dynamic range" },
      { label: "ARRI Alexa Mini LF", promptContribution: "ARRI Alexa Mini LF, large format sensor, creamy shallow depth, LF bokeh quality" },
      { label: "RED V-RAPTOR", promptContribution: "RED V-RAPTOR 8K, clinical precision, extreme resolution, commercial quality" },
      { label: "Blackmagic URSA", promptContribution: "Blackmagic URSA Cinema, BRAW color science, film-like latitude" },
      { label: "Sony Venice 2", promptContribution: "Sony Venice 2 full-frame, skin tone excellence, smooth gradation" },
      { label: "Anamorphisch 2.39:1", promptContribution: "anamorphic 2.39:1, oval bokeh, horizontal lens flares, scope feel" },
      { label: "Anamorphisch 1.85:1", promptContribution: "spherical 1.85:1, Academy ratio feel, classic framing, versatile" },
      { label: "Makro Extreme", promptContribution: "extreme macro, 1:1 or greater reproduction, world within world" },
      { label: "Handheld Observational", promptContribution: "handheld observational, 0.3Hz breathing, human camera presence, Dardenne brothers" },
      { label: "Steadicam Float", promptContribution: "Steadicam floating movement, gliding through space, ghostly pursuit" },
      { label: "Dolly Slow Push", promptContribution: "slow deliberate dolly push-in 0.3m over 8 seconds, mounting intimacy" },
      { label: "Dolly Pull Back", promptContribution: "slow dolly pull-back revealing scale, subject remains but world grows" },
      { label: "Crane Up", promptContribution: "crane movement rising from ground level to god's eye view, scale revelation" },
      { label: "Drohne Orbit", promptContribution: "drone orbital movement around subject, world rotating, subject stable" },
      { label: "Drohne Descent", promptContribution: "drone descending from sky to subject level, arriving from above" },
      { label: "Zeitlupe 120fps", promptContribution: "120fps slow motion, time stretched 5x, physics made philosophical" },
      { label: "Zeitlupe 240fps", promptContribution: "240fps extreme slow motion, micro-movements revealed, impact stretched" },
      { label: "Zeitraffer", promptContribution: "time-lapse compression, time as landscape, motion of light over hours" },
      { label: "Hyperlapse", promptContribution: "hyperlapse motion through space and time, city breathing in seconds" },
      { label: "Statisch / Locked", promptContribution: "tripod-locked absolute stillness, meditative commitment to single frame" },
      { label: "Speed Ramp", promptContribution: "speed ramp: normal → 20% slow motion at impact moment, held 2 seconds" },
      { label: "Rack Focus", promptContribution: "rack focus shift mid-shot, attention redirected, layered depth revealed" },
      { label: "Über-Schulter", promptContribution: "over-shoulder, viewer complicity with subject, intimate POV established" },
      { label: "Low Angle Dutch", promptContribution: "low angle 8° dutch tilt, psychological unease, power dynamic shifted" },
      { label: "High Angle Overhead", promptContribution: "overhead high angle, subject vulnerable below, god perspective" },
      { label: "Eye Level Neutral", promptContribution: "neutral eye-level, democratic gaze, honest relationship to subject" },
      { label: "Low Angle Heroic", promptContribution: "low angle heroic upward gaze, subject monumentalized, power given" },
      { label: "Extreme Close-Up", promptContribution: "extreme close-up, detail fills frame, context removed, texture supreme" },
      { label: "Wide Establishing", promptContribution: "wide establishing shot, world before subject, environment as character" },
      { label: "Two Shot", promptContribution: "two-shot framing, relationship between subjects, space between them charged" },
      { label: "Snorricam", promptContribution: "snorricam body-mount, world moves around stable subject, psychological anchor" },
      { label: "Vertigo Effect", promptContribution: "Hitchcock vertigo dolly-zoom, space warps, perception destabilized" },
      { label: "Split Diopter", promptContribution: "split diopter lens, two focal planes sharp simultaneously, spatial dissonance" },
      { label: "Fisheye Immersive", promptContribution: "fisheye lens, 180° immersive field, distorted periphery, total environment" },
      { label: "Tilt-Shift Miniature", promptContribution: "tilt-shift lens, selective focus creates miniature world illusion" },
      { label: "Long Lens Compression", promptContribution: "400mm+ compression, space flattened, background crowded forward" },
      { label: "Periskop Lens", promptContribution: "periscope lens, impossible angle, ground level or through gaps" },
      { label: "Hidden Camera", promptContribution: "candid hidden camera quality, subjects unaware, natural behavior captured" },
      { label: "One-Take", promptContribution: "single unbroken take quality, real time, no cuts, trust in moment" },
      { label: "Multi-Exposure", promptContribution: "multiple exposure blend, time layered, two truths coexisting in frame" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 04 — LICHTGESTALTUNG (50 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "licht",
    label: "Lichtgestaltung",
    color: "#a78bfa",
    entries: [
      { label: "Einzellichtquelle", promptContribution: "single light source only, one truth, everything else surrenders to shadow" },
      { label: "Natürliches Licht Rein", promptContribution: "purely natural light, no artificial sources whatsoever, honest illumination" },
      { label: "Goldene Stunde", promptContribution: "golden hour, 20 min before sunset, warm directional long golden rays" },
      { label: "Blaue Stunde", promptContribution: "blue hour post-sunset, ambient cool natural balance, soft luminous sky" },
      { label: "Hartes Licht", promptContribution: "hard directional light, sharp shadow edges, uncompromising high contrast" },
      { label: "Weiches Diffus", promptContribution: "diffused soft light, gentle shadow falloff, flattering wrapping quality" },
      { label: "Rim Light Subtil", promptContribution: "subtle rim light separating subject from background, defining edge glow" },
      { label: "Rim Light Dramatisch", promptContribution: "strong dramatic rim light, near-silhouette, subject fire-edged" },
      { label: "Kerzenlicht", promptContribution: "candlelight only, 0.5Hz organic flicker, warm amber #FF8C42, intimate darkness" },
      { label: "Neonlicht Urban", promptContribution: "urban neon practical lights, colored spill on wet surfaces, night atmosphere" },
      { label: "Chiaroscuro Extrem", promptContribution: "extreme Caravaggio chiaroscuro, 90% shadow, 10% light, revelation quality" },
      { label: "Gegenlicht Silhouette", promptContribution: "strong backlight, subject silhouetted completely, light is the story" },
      { label: "Gegenlicht Rim", promptContribution: "backlight with rim definition, subject rim-lit, detail preserved in shadow" },
      { label: "Fensterlicht Nord", promptContribution: "north-facing window light, even diffused directionless quality, Vermeer tradition" },
      { label: "Fensterlicht Seitlich", promptContribution: "side window light, half-face illuminated, Rembrandt triangle quality" },
      { label: "Practicals Only", promptContribution: "only practical light sources visible in frame, motivated real-world lighting" },
      { label: "Industrielicht", promptContribution: "industrial fluorescent or mercury vapor, cold unforgiving, truth-telling light" },
      { label: "Strobe / Blitz", promptContribution: "strobe flash, frozen moment, hard flash shadow, fashion/action quality" },
      { label: "Lagerfeuer", promptContribution: "campfire as sole light source, 0.8Hz flicker, warm circle of light, darkness beyond" },
      { label: "Mondlicht", promptContribution: "moonlight only, cool blue-silver #B0C8E8, soft directionless nocturnal calm" },
      { label: "Sternenlicht", promptContribution: "starlight only, near-darkness, long exposure implies, sky as light source" },
      { label: "Unterwasser Licht", promptContribution: "underwater caustic light patterns, dancing rippled projections on surfaces" },
      { label: "Lichtstreifen", promptContribution: "light rays through dust or smoke, volumetric God rays, sacred quality" },
      { label: "Fluoreszenz", promptContribution: "UV fluorescent light, certain materials glow, others vanish, surreal selection" },
      { label: "LED Praktisch", promptContribution: "practical LED sources in frame, modern color temperature mix, contemporary" },
      { label: "Neon Einfarbig", promptContribution: "single-color neon wash, everything in one hue, monochromatic atmosphere" },
      { label: "Gegenlicht Gegenlicht", promptContribution: "subject against light source itself, lens flare honest, light bleeds" },
      { label: "Diffuses Wolkenlicht", promptContribution: "overcast cloud diffusion, giant softbox sky, shadowless even light" },
      { label: "Mittagslicht Hart", promptContribution: "harsh midday sun overhead, brutal vertical shadows, unforgiving truth" },
      { label: "Sonnenaufgang", promptContribution: "sunrise first light, cool to warm transition, new possibility in color" },
      { label: "Laborlicht", promptContribution: "clinical laboratory lighting, cold white #F0F4F8, precise revealing, no mercy" },
      { label: "Kinobeamer", promptContribution: "single projector beam, dust particles visible, cinephile atmosphere" },
      { label: "Schaufenster", promptContribution: "display lighting precision, product illuminated from inside out, retail theater" },
      { label: "Dramatisch Top Light", promptContribution: "top light from above, face in shadow below eyes, theatrical mystery" },
      { label: "Low Key Extrem", promptContribution: "extreme low key, maximum 15% of frame illuminated, darkness as subject" },
      { label: "High Key Clean", promptContribution: "high key, even fill everywhere, shadow-free, bright and open" },
      { label: "Clair-Obscur Sanft", promptContribution: "gentle chiaroscuro, soft gradation between light and shadow, da Vinci sfumato" },
      { label: "Gegenlicht Haze", promptContribution: "backlight through atmospheric haze, light scattered, ethereal glow diffuse" },
      { label: "Licht auf Wasser", promptContribution: "light reflecting off water surface, caustic dancing patterns, movement captured" },
      { label: "Tungsten Warm", promptContribution: "tungsten incandescent only, warm #FF9B50 color temperature, filament quality" },
      { label: "Daylight Balanced", promptContribution: "daylight balanced 5600K, neutral accurate, natural truth in color" },
      { label: "Mixed Color Temp", promptContribution: "mixed color temperatures in conflict, warm and cool in same frame, tension" },
      { label: "Spot Isoliert", promptContribution: "isolated spot light, subject in circle of light, darkness encircles" },
      { label: "Butterfly Light", promptContribution: "beauty butterfly light from directly above, butterfly shadow under nose" },
      { label: "Split Light", promptContribution: "split lighting, face exactly half light half shadow, duality expressed" },
      { label: "Licht in Bewegung", promptContribution: "moving light source, light sweeps through space, dynamic illumination" },
      { label: "Natur Kathedrallicht", promptContribution: "forest cathedral light, vertical shafts through canopy, sacred grove quality", useCases: ["natur"] },
      { label: "Food Warm Spot", promptContribution: "warm spot light on food, darkness below, appetite-inducing theater", useCases: ["food"] },
      { label: "Architektur Wash", promptContribution: "architectural wall wash, texture revealed by raking light, material honored", useCases: ["architektur"] },
      { label: "Portrait Loop", promptContribution: "portrait loop lighting, small nose shadow on cheek, classic beauty standard", useCases: ["portrait"] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 05 — LINSE & OPTIK (40 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "linse",
    label: "Linse & Optik",
    color: "#38bdf8",
    entries: [
      { label: "50mm Standard", promptContribution: "50mm standard, closest to human eye, natural spatial relationship" },
      { label: "85mm Portrait", promptContribution: "85mm f/1.4, flattering portrait compression, natural background separation" },
      { label: "35mm Reportage", promptContribution: "35mm, subject in world, slight wide field, humanist photography tradition" },
      { label: "100mm Macro", promptContribution: "100mm macro, 1:1 reproduction ratio, world-within-world depth" },
      { label: "135mm Intimate", promptContribution: "135mm f/2.0, compressed intimacy without intrusion, subject unaware feel" },
      { label: "24mm Immersive", promptContribution: "24mm, slight edge distortion preserved, environmental immersion" },
      { label: "18mm Wide", promptContribution: "18mm wide, dramatic perspective, environment dominant, subject in context" },
      { label: "400mm Surveillance", promptContribution: "400mm telephoto compression, space flattened, observer distant, surveillance feel" },
      { label: "Leica Summilux", promptContribution: "Leica Summilux character, micro-contrast, three-dimensional rendering, glow" },
      { label: "Zeiss Otus Scharf", promptContribution: "Zeiss Otus clinical sharpness, aberration-free, absolute precision, no poetry" },
      { label: "Helios Swirl", promptContribution: "vintage Helios swirly bokeh, rotating background blur, Soviet character" },
      { label: "Anamorphic Cooke", promptContribution: "Cooke anamorphic character, warm oval bokeh, horizontal flare, British warmth" },
      { label: "Master Prime Zeiss", promptContribution: "Zeiss Master Prime cinema lens, clinical neutral, maximum resolution" },
      { label: "Vintage Soviet Jupiter", promptContribution: "vintage Jupiter lens, soft aberrations, historical color rendering, age" },
      { label: "Canon Dream Lens", promptContribution: "Canon 50mm f/0.95 dream lens, extreme glow at edges, mythical softness" },
      { label: "Tief Scharf f/11", promptContribution: "deep depth of field f/11, foreground to horizon sharp, documentary truth" },
      { label: "Minimal Scharf f/1.2", promptContribution: "f/1.2 razor-thin focus, dream-like falloff, only essence sharp" },
      { label: "Bokeh Rund", promptContribution: "circular bokeh balls, clean round out-of-focus highlights, pleasant" },
      { label: "Bokeh Nervig", promptContribution: "cat's-eye bokeh at edges, lens character preserved, authentic imperfection" },
      { label: "Lensfehler Sphärisch", promptContribution: "spherical aberration glow, soft halo around highlights, pre-correction feel" },
      { label: "Chromatische Aberration", promptContribution: "chromatic aberration preserved, color fringing at edges, vintage truth" },
      { label: "Verzeichnung Barrel", promptContribution: "barrel distortion uncorrected, bulging center, wide-angle honesty" },
      { label: "Tilt-Shift Scharf", promptContribution: "tilt-shift selective plane focus, only strip sharp, rest dreams away" },
      { label: "Prisma Effekt", promptContribution: "prism lens element, rainbow chromatic split, psychedelic realism" },
      { label: "Lochkamera", promptContribution: "pinhole camera aesthetic, everything equally soft, infinite depth of field" },
      { label: "Anamorphic LUT", promptContribution: "anamorphic color science, horizontal squeeze released, scope world feel" },
      { label: "Ultra Panavision 70", promptContribution: "Ultra Panavision 70 feel, extreme wide field, edge-to-edge immersion" },
      { label: "Portrait f/2.8", promptContribution: "portrait f/2.8, sweet spot quality, sharp subject, gentle background" },
      { label: "Makro Stack", promptContribution: "focus-stacked macro, every plane captured, impossible depth in miniature" },
      { label: "Retroreflektiv", promptContribution: "retroreflective surfaces catching light, unexpected glow from specific angles" },
      { label: "Variable ND", promptContribution: "variable ND filter character, slight color cast, cinematic motion blur" },
      { label: "Graufilter Weich", promptContribution: "soft ND graduation, sky retained, landscape balanced, natural drama" },
      { label: "Nahlinse", promptContribution: "close-up diopter, makeshift macro, slightly aberrant edges, experimental" },
      { label: "Zoom Push", promptContribution: "zoom lens push feel, zooming in reveals detail, telescopic discovery" },
      { label: "Frontal Flat", promptContribution: "flat frontal lens, no compression, honest confrontation, no flattery" },
      { label: "Portrait Compress", promptContribution: "portrait compression brings background closer, intimate world enclosed" },
      { label: "Weitwinkel Reportage", promptContribution: "wide angle photojournalism tradition, in the action, Cartier-Bresson range" },
      { label: "Periskop Tight", promptContribution: "periscope lens in tight space, impossible angle achieved, surprise perspective" },
      { label: "Infrarot Konversion", promptContribution: "infrared-converted sensor, dramatic tonal shifts, surreal landscape" },
      { label: "Nachtoptik", promptContribution: "night vision optical quality, green-tinted surveillance, evidence quality" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 06 — FARBGEBUNG (40 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "farbe",
    label: "Farbgebung & Grading",
    color: "#fb7185",
    entries: [
      { label: "Kodak Vision3 500T", promptContribution: "Kodak Vision3 500T emulation, tungsten warmth, fine grain, organic color" },
      { label: "Kodak Portra 400", promptContribution: "Kodak Portra 400 color science, beautiful skin tones, neutral with warmth" },
      { label: "Fuji Provia Slide", promptContribution: "Fuji Provia slide film, saturated accurate color, punchy and clear" },
      { label: "Fuji Superia", promptContribution: "Fuji Superia consumer film, slight green shift, nostalgic everyday color" },
      { label: "Ilford HP5 B&W", promptContribution: "Ilford HP5 black and white, full tonal range, classic grain structure" },
      { label: "Teal & Orange", promptContribution: "teal shadows, orange skin tones, classic Hollywood blockbuster grade" },
      { label: "Entsättigt Clean", promptContribution: "global desaturation -30, skin protected +20, clean muted palette" },
      { label: "Monochrom Silber", promptContribution: "silver gelatin black and white, zone system tonal range, Ansel Adams" },
      { label: "Monochrom Selenium", promptContribution: "selenium-toned black and white, cool silver-blue, archival quality feel" },
      { label: "Warm Amber", promptContribution: "warm amber grade, raised shadow blacks #1a0f0a, cream highlights" },
      { label: "Kalt Stahl", promptContribution: "cool steel grade, clinical blue-green shadows, precise emotional distance" },
      { label: "Hoher Kontrast", promptContribution: "crushed blacks, bright whites, maximum graphic contrast, graphic design" },
      { label: "Erdtöne", promptContribution: "natural earth tone palette, ochres, siennas, honest organic spectrum" },
      { label: "Pastell Luftig", promptContribution: "soft pastel palette, lifted shadow values, airy delicate color world" },
      { label: "Neon Saturiert", promptContribution: "neon saturation boost, electric colors, urban night palette maximized" },
      { label: "Cross Process", promptContribution: "cross-processed film emulation, unexpected color shifts, E-6 in C-41" },
      { label: "Bleach Bypass", promptContribution: "bleach bypass processing, desaturated high contrast, silver retained" },
      { label: "Print Film Look", promptContribution: "print film color science, lab-printed quality, photochemical tradition" },
      { label: "LOG Flat Raw", promptContribution: "LOG flat profile, full dynamic range preserved, awaiting grade" },
      { label: "REC709 Clean", promptContribution: "REC.709 standard broadcast, clean accurate, professional video quality" },
      { label: "HDR Wide Gamut", promptContribution: "HDR wide color gamut, P3 color space, next-generation display target" },
      { label: "Vintage Polaroid", promptContribution: "Polaroid instant film character, color shift, white border, fading edges" },
      { label: "Instagram Presets Off", promptContribution: "anti-preset, no filter applied, honest straight color, algorithm-free" },
      { label: "Autumnal Palette", promptContribution: "autumnal color palette, burnt orange, deep red, warm brown spectrum" },
      { label: "Winter Kalt", promptContribution: "winter palette, cool blue-whites, frozen color temperature, 6500K+" },
      { label: "Frühling Frisch", promptContribution: "spring color, fresh green emergence, pale pink, hopeful palette" },
      { label: "Sommer Satt", promptContribution: "summer saturated palette, full sun color, vibrant life at peak" },
      { label: "Night City Neon", promptContribution: "night city neon palette, magenta, cyan, gold against deep blue-black" },
      { label: "Desert Ochre", promptContribution: "desert color palette, ochre, sand, terracotta, bleached bone white" },
      { label: "Ocean Blue", promptContribution: "ocean blue palette, deep navy to turquoise, white foam, gradient depth" },
      { label: "Forest Green", promptContribution: "deep forest green palette, shadow greens, dappled gold, bark brown" },
      { label: "Monochromatic Rot", promptContribution: "red monochromatic study, all values in red spectrum, powerful single hue" },
      { label: "Monochromatic Blau", promptContribution: "blue monochromatic study, all values in blue spectrum, emotional depth" },
      { label: "Komplementär Orange-Blau", promptContribution: "orange-blue complementary contrast, maximum color tension, split world" },
      { label: "Analoges Trio", promptContribution: "analogous color trio, adjacent hues, harmony and unity, flowing palette" },
      { label: "Schwarz-Gold", promptContribution: "black and gold palette, luxury material language, power and refinement" },
      { label: "Weiß-Minimal", promptContribution: "white minimal palette, clean space, light as color, Scandinavian purity" },
      { label: "Ink Washed", promptContribution: "ink-washed color approach, diluted intensity, East Asian ink painting feel" },
      { label: "Overexposed Fade", promptContribution: "intentional overexposure, blown highlights, faded memory quality" },
      { label: "Oxidiert Patina", promptContribution: "oxidation and patina color quality, aged verdigris, rust and time made beautiful" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 07 — PHYSIK & MATERIAL (60 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "physik",
    label: "Physik & Material",
    color: "#34d399",
    entries: [
      { label: "Dampf präzise", promptContribution: "steam: thin vertical wisps, 0.3Hz sway from ambient air, dissipates at 10-15cm height", useCases: ["food", "lifestyle"] },
      { label: "Dampf Dicht", promptContribution: "dense steam cloud, fully obscuring, pressure visible, industrial heat", useCases: ["food"] },
      { label: "Flüssigkeit Dünn", promptContribution: "thin liquid pour, water-like, unbroken stream, specular highlight tracking" },
      { label: "Flüssigkeit Viskos", promptContribution: "viscous liquid pour, honey-like, slow ribbon, glossy surface, heavy" },
      { label: "Flüssigkeit Splash", promptContribution: "liquid splash frozen mid-air, droplets suspended, crown formation" },
      { label: "Metall Poliert", promptContribution: "polished metal, mirror surface, reflections distorted by form, cool #C0C0C0" },
      { label: "Metall Gebürstet", promptContribution: "brushed metal, directional grain texture, matte sheen, industrial dignity" },
      { label: "Metall Patiniert", promptContribution: "patinated metal, oxidation color, verdigris or rust, age made beautiful" },
      { label: "Metall Chrom", promptContribution: "chrome surface, perfect mirror, environment reflected, hyperreal clarity" },
      { label: "Glas Klar", promptContribution: "clear glass, accurate refraction, internal highlights, transparent depth" },
      { label: "Glas Mattiert", promptContribution: "frosted matte glass, diffused transmission, privacy in material" },
      { label: "Glas Farbig", promptContribution: "colored glass, light tinted as it passes through, cathedral quality" },
      { label: "Glas Zerbrochen", promptContribution: "broken glass, fracture patterns, stress lines, dangerous beauty" },
      { label: "Textil Seide", promptContribution: "silk fabric, liquid drape, high specular sheen, fluid motion in air" },
      { label: "Textil Wolle", promptContribution: "wool texture, fiber visible, matte warmth, cozy substantial weight" },
      { label: "Textil Leinen", promptContribution: "linen texture, woven structure visible, natural color variation, honest" },
      { label: "Textil Denim", promptContribution: "denim weave texture, indigo variations, worn areas lighter, working class" },
      { label: "Textil Samt", promptContribution: "velvet pile, light changes with direction, luxury tactile quality" },
      { label: "Leder Glatt", promptContribution: "smooth leather, grain subtle, high durability sheen, luxury material" },
      { label: "Leder Rau", promptContribution: "rough leather, grain visible and irregular, lived-in character, worn" },
      { label: "Leder Krokodil", promptContribution: "crocodile embossed leather, scale pattern precise, luxury signifier" },
      { label: "Holz Hell", promptContribution: "light wood grain, blonde oak or ash quality, natural linear pattern" },
      { label: "Holz Dunkel", promptContribution: "dark wood, walnut depth, rich grain, furniture-quality material" },
      { label: "Holz Verwittert", promptContribution: "weathered wood, grey-silver from sun exposure, splinter texture, age" },
      { label: "Holz Gebrannt", promptContribution: "charred wood, Shou Sugi Ban, black surface, texture of controlled fire" },
      { label: "Stein Marmor", promptContribution: "marble veining precise, cool surface, geological luxury, mineral age" },
      { label: "Stein Beton Roh", promptContribution: "raw concrete, formwork texture, grey honest mass, Brutalist dignity" },
      { label: "Stein Granit", promptContribution: "granite surface, speckled mineral pattern, hard permanence" },
      { label: "Keramik Glasiert", promptContribution: "glazed ceramic, glossy color surface, kiln-fired quality, craft pride" },
      { label: "Keramik Raku", promptContribution: "raku ceramic, crackle glaze, smoke-marked, Japanese tea ceremony quality" },
      { label: "Papier Büttenpapier", promptContribution: "handmade deckle-edge paper, fiber texture visible, tactile honesty" },
      { label: "Papier Gefaltet", promptContribution: "paper fold geometry, crisp crease lines, origami precision" },
      { label: "Haut Natürlich", promptContribution: "natural skin, pores and texture preserved, not smoothed, human truth", useCases: ["portrait", "fashion"] },
      { label: "Haut Nass", promptContribution: "wet skin, water beading, surface tension on skin, physical reality", useCases: ["portrait", "lifestyle"] },
      { label: "Haut Gealtert", promptContribution: "aged skin, lines as biography, wrinkles as earned character, dignity", useCases: ["portrait"] },
      { label: "Feuer Flamme", promptContribution: "flame organic movement, 1.2Hz flicker, color gradient yellow-orange-blue base" },
      { label: "Feuer Glut", promptContribution: "ember glow, deep red-orange #FF4500, pulsing heat, approaching extinction" },
      { label: "Rauch Dünn", promptContribution: "thin smoke wisps, 0.1Hz movement, light interaction visible, dissipating" },
      { label: "Rauch Dicht", promptContribution: "dense smoke, layered opacity, light scattered internally, obscuring" },
      { label: "Wasser Spiegelung", promptContribution: "water surface reflection, perfect mirror with subtle distortion, depth below" },
      { label: "Wasser Bewegend", promptContribution: "moving water, current visible, surface tension broken, energy of flow" },
      { label: "Wasser Tropfen", promptContribution: "water droplets on surface, surface tension spheres, refraction inside" },
      { label: "Wasser Untergetaucht", promptContribution: "underwater, caustic light dancing, blue-green ambient, pressure visible" },
      { label: "Staub Partikel", promptContribution: "dust particles in light beam, floating micro-debris, volumetric light made visible" },
      { label: "Eis Klar", promptContribution: "clear ice, internal air bubbles, transparency and opacity coexisting" },
      { label: "Eis Schnee", promptContribution: "snow texture, compressed crystal, footprint reveals depth, white world" },
      { label: "Blüten Textur", promptContribution: "flower petal surface, micro-texture visible, color saturation maximum", useCases: ["natur", "lifestyle"] },
      { label: "Frucht Frisch", promptContribution: "fresh fruit surface, moisture still present, color at peak, life intact", useCases: ["food"] },
      { label: "Frucht Aufgeschnitten", promptContribution: "cut fruit interior revealed, seed pattern, moisture glistening, geometry exposed", useCases: ["food"] },
      { label: "Käse Textur", promptContribution: "cheese texture specific to type, crystals if aged, rind character, cut surface", useCases: ["food"] },
      { label: "Fleisch Marmorierung", promptContribution: "meat marbling pattern, fat distribution precise, butcher quality detail", useCases: ["food"] },
      { label: "Brot Kruste", promptContribution: "bread crust texture, oven spring cracks, golden-brown Maillard, interior visible", useCases: ["food"] },
      { label: "Kaffee Crema", promptContribution: "espresso crema layer, tiger stripe pattern, caramel-tan color, freshness signal", useCases: ["food"] },
      { label: "Schokolade Glanz", promptContribution: "chocolate temper sheen, perfect gloss, precise snap implied in form", useCases: ["food"] },
      { label: "Öl Glänzend", promptContribution: "oil surface, spectrum interference colors, iridescent rainbow sheen" },
      { label: "Karbon Fiber", promptContribution: "carbon fiber weave pattern, glossy surface, diagonal pattern, performance material" },
      { label: "Porzellan Fein", promptContribution: "fine porcelain, translucency when backlit, perfect smooth surface, fragile power" },
      { label: "Gummi Elastisch", promptContribution: "rubber elasticity visible, deformed shape memory, tension implied" },
      { label: "Plastik Transparent", promptContribution: "clear plastic, slight blue tint, scratches on surface, functional material" },
      { label: "Koralle Textur", promptContribution: "coral structure, calcium skeleton, once-living architecture, oceanic origin" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 08 — KOMPOSITION & FRAMING (50 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "komposition",
    label: "Komposition & Framing",
    color: "#f59e0b",
    entries: [
      { label: "Drittelregel", promptContribution: "rule of thirds composition, subject at intersection, classical balance" },
      { label: "Goldener Schnitt", promptContribution: "golden ratio spiral composition, Fibonacci proportion, divine geometry" },
      { label: "Zentralperspektive", promptContribution: "perfect one-point perspective, vanishing point centered, Kubrick symmetry" },
      { label: "Symmetrisch", promptContribution: "bilateral symmetry, perfect mirror reflection in composition, formal authority" },
      { label: "Asymmetrisch", promptContribution: "dynamic asymmetry, tension through imbalance, energy in off-center weight" },
      { label: "Führende Linien", promptContribution: "leading lines directing gaze to subject, compositional guidance system" },
      { label: "Rahmen im Rahmen", promptContribution: "frame within frame, architectural or natural border isolating subject" },
      { label: "Tiefe Perspektive", promptContribution: "extreme depth, layers from foreground to horizon, spatial richness" },
      { label: "Flache Ebenen", promptContribution: "flat compressed planes, depth eliminated, graphic design quality" },
      { label: "Diagonale Dynamik", promptContribution: "strong diagonal composition, 45° energy, movement implied in stillness" },
      { label: "Negative Space Groß", promptContribution: "dominant negative space, subject small in vast emptiness, isolation" },
      { label: "Voller Bildraum", promptContribution: "frame completely filled, no empty space, abundance and richness" },
      { label: "Über-Schulter Blick", promptContribution: "over-shoulder POV composition, viewer as voyeur, private access" },
      { label: "Spiegelung Komposition", promptContribution: "reflection used compositionally, reality doubled or distorted in water/glass" },
      { label: "Silhouette", promptContribution: "pure silhouette, shape only, identity through form, light behind" },
      { label: "Gegenlicht Komposition", promptContribution: "backlit composition, subject defined by light behind, mysterious" },
      { label: "Überlagerung", promptContribution: "overlapping elements, foreground obscuring background, depth created" },
      { label: "Wiederholung Rhythmus", promptContribution: "compositional repetition, rhythm in similar elements, pattern and variation" },
      { label: "Kontrast Groß-Klein", promptContribution: "scale contrast between elements, large and small in same frame, relationship" },
      { label: "Isolation", promptContribution: "subject isolated completely, nothing competes, pure focused attention" },
      { label: "Dreieck Komposition", promptContribution: "triangular compositional arrangement, three-point stability, classical tradition" },
      { label: "L-Form", promptContribution: "L-shaped compositional structure, directional energy, classic framing" },
      { label: "Z-Linie", promptContribution: "Z-pattern eye movement, diagonal then back, cinematic scanning" },
      { label: "Crowd Compression", promptContribution: "compressed crowd, telephoto density, collective as single organism" },
      { label: "Empty Center", promptContribution: "empty center composition, subject at edges, what's missing is present" },
      { label: "Dual Subject", promptContribution: "two subjects in dialogue, space between them charged with meaning" },
      { label: "Horizont Tief", promptContribution: "low horizon line, sky as dominant element, vastness above" },
      { label: "Horizont Hoch", promptContribution: "high horizon line, ground as dominant element, rootedness emphasized" },
      { label: "No Horizont", promptContribution: "no horizon visible, space ambiguous, floating or enclosed quality" },
      { label: "Detail Ausschnitt", promptContribution: "detail crop, part reveals whole, synecdoche as composition" },
      { label: "Panorama", promptContribution: "panoramic framing 3:1 or wider, horizontal world, vast sweep" },
      { label: "Quadrat", promptContribution: "square format 1:1, equal tension all directions, Instagram ancestry" },
      { label: "Portrait Format", promptContribution: "portrait 9:16 vertical, height emphasized, human scale honored" },
      { label: "Triptychon Feel", promptContribution: "triptych implied in single frame, three-part visual reading" },
      { label: "Texture Fill", promptContribution: "texture fills entire frame, scale removed, pure material study" },
      { label: "Subject Tiny", promptContribution: "subject tiny in vast environment, scale relationship overwhelming" },
      { label: "Subject Huge", promptContribution: "subject massive filling frame, power and proximity, overwhelming presence" },
      { label: "Eye Level Direct", promptContribution: "direct eye-level confrontation, democratic honest relationship" },
      { label: "Bird's Eye", promptContribution: "bird's eye view, everything seen from above, map-like spatial truth" },
      { label: "Worm's Eye", promptContribution: "worm's eye extreme low, monumental scale, universe from ground" },
      { label: "Schnappschuss", promptContribution: "snapshot composition, imperfect moment-capture, authenticity over craft" },
      { label: "Langzeitbelichtung Trail", promptContribution: "long exposure light trails, time made visible in single frame" },
      { label: "Bokeh Vordergrund", promptContribution: "foreground bokeh elements, soft organic frame around sharp subject" },
      { label: "Durchblick", promptContribution: "view through opening, arch or doorway frames distant subject, discovery" },
      { label: "Spiegelung Wasser", promptContribution: "water reflection composition, reality above, mirrored world below" },
      { label: "Schattenkomposition", promptContribution: "shadow as compositional element equal to subject, shadow as truth" },
      { label: "Muster Unterbrochen", promptContribution: "repeating pattern interrupted by anomaly, where eye goes, story is" },
      { label: "Tension Edges", promptContribution: "subject near frame edge, tension of almost-leaving, dynamic energy" },
      { label: "Center Bull's Eye", promptContribution: "subject dead center, perfect bull's-eye, unflinching direct attention" },
      { label: "Layered Depth", promptContribution: "three distinct depth layers: foreground, midground, background, all active" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 09 — ATMOSPHÄRE & UMGEBUNG (40 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "atmosphaere",
    label: "Atmosphäre & Umgebung",
    color: "#64748b",
    entries: [
      { label: "Goldene Stunde Outdoor", promptContribution: "outdoor golden hour, long grass shadows, warm directional magic light" },
      { label: "Blauer Nacht Urban", promptContribution: "blue-hour urban, city lights waking, sky still faintly lit, transition moment" },
      { label: "Nebel Morgen", promptContribution: "morning fog, visibility 50m, light diffused spherically, mystery in distance" },
      { label: "Starker Regen", promptContribution: "heavy rain, rivulets on every surface, sound implied in visual, soaking world" },
      { label: "Leichter Regen", promptContribution: "light drizzle, surfaces darkened, reflections doubled in puddles, quiet" },
      { label: "Gewitter Stimmung", promptContribution: "pre-storm atmosphere, green-grey sky, charged air implied, anticipation" },
      { label: "Schneefall", promptContribution: "snowfall, flakes caught in frame, world muted and softened, silence visual" },
      { label: "Wüstenhitze", promptContribution: "desert heat shimmer, mirage distortion at horizon, bleached color, brutal sun" },
      { label: "Wald Dicht", promptContribution: "dense forest, canopy closing above, filtered light, enclosed cathedral world" },
      { label: "Wald Offen", promptContribution: "open forest floor, light shafts reaching ground, space to move and breathe" },
      { label: "Küste Wind", promptContribution: "coastal wind, everything in motion, salt air implied, horizontal energy" },
      { label: "Berg Kalt", promptContribution: "mountain cold, breath visible, thin air quality, altitude in every detail" },
      { label: "Stadt Nacht", promptContribution: "city at night, artificial light universe, human hive active, energy and isolation" },
      { label: "Stadt Tag Geschäftig", promptContribution: "busy city day, layered activity, urban choreography, modern density" },
      { label: "Verlassener Ort", promptContribution: "abandoned place, nature reclaiming, peeling surfaces, time's passage visible" },
      { label: "Interieur Warm", promptContribution: "warm interior, outside cold implied, sanctuary feeling, in vs out" },
      { label: "Industrie Leer", promptContribution: "empty industrial space, scale overwhelming, function without people" },
      { label: "Marktplatz Lebhaft", promptContribution: "lively marketplace, sensory overload, human commerce energy, color riot" },
      { label: "Bibliothek Still", promptContribution: "library stillness, knowledge as atmosphere, dust and paper smell implied" },
      { label: "Küche Aktiv", promptContribution: "active kitchen, steam and heat, choreographed chaos, creation in process", useCases: ["food"] },
      { label: "Restaurant Abend", promptContribution: "evening restaurant atmosphere, candle glow, murmur implied, occasion elevated", useCases: ["food"] },
      { label: "Atelier Kreativ", promptContribution: "creative studio, work in progress, materials present, making visible" },
      { label: "Hotel Luxus", promptContribution: "luxury hotel environment, curated comfort, impersonal perfection, service implied" },
      { label: "Haus Persönlich", promptContribution: "personal home environment, lived-in evidence, character accumulated over time" },
      { label: "Bad & Spa", promptContribution: "bathroom or spa atmosphere, steam and warmth, private ritual space" },
      { label: "Konzertsaal Leer", promptContribution: "empty concert hall, acoustics visible in architecture, anticipation of music" },
      { label: "Labor Präzise", promptContribution: "precision laboratory, cleanliness as statement, measurement as philosophy" },
      { label: "Werkstatt Handwerk", promptContribution: "craftsman's workshop, tool marks and materials, skill visible in space" },
      { label: "Outdoor Frühling", promptContribution: "spring outdoor atmosphere, new growth, fresh green, possibility in air" },
      { label: "Outdoor Sommer Mittag", promptContribution: "summer midday, full sun, saturation maximum, peak life energy" },
      { label: "Outdoor Herbst", promptContribution: "autumn atmosphere, decay beautiful, last warmth, transition present" },
      { label: "Outdoor Winter Klar", promptContribution: "clear winter day, crisp air, bare structures revealed, cold clarity" },
      { label: "Unterwasser Tief", promptContribution: "deep underwater, pressure implied, light diminishing, blue world" },
      { label: "Höhle Dunkel", promptContribution: "cave darkness, torch or headlamp only, geological time surrounds" },
      { label: "Dachterrasse Urban", promptContribution: "urban rooftop, city below, sky above, between worlds territory" },
      { label: "Zugfenster", promptContribution: "through train window, world passing at speed, reflection and reality merged" },
      { label: "Auto Nacht", promptContribution: "inside car at night, dashboard glow, outside world in motion, safe capsule" },
      { label: "Bühne Spotlight", promptContribution: "stage spotlight, performer in circle of light, darkness beyond, theater" },
      { label: "Kirchenraum", promptContribution: "sacred interior space, vertical light, age and human devotion accumulated" },
      { label: "Galerie Weiß", promptContribution: "white gallery space, art context implied, neutral ground for object" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 10 — BEWEGUNG & ZEIT (30 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "bewegung",
    label: "Bewegung & Zeit",
    color: "#f97316",
    entries: [
      { label: "Eingefroren", promptContribution: "frozen motion, 1/8000 shutter, time stopped at decisive moment" },
      { label: "Bewegungsunschärfe", promptContribution: "motion blur, 1/30 shutter, movement ghost, time expressed in single frame" },
      { label: "Schwebestatus", promptContribution: "floating suspended state, gravity paused, peaceful weightlessness" },
      { label: "Freier Fall", promptContribution: "free fall state, gravity dominant, acceleration visible, terminal velocity feeling" },
      { label: "Aufprall Moment", promptContribution: "impact moment captured, energy transfer visible, force at maximum" },
      { label: "Explosion Frozen", promptContribution: "explosion frozen at peak, particles suspended, energy at maximum instant" },
      { label: "Staccato Bewegung", promptContribution: "staccato movement quality, sharp-to-sharp, no in-between, decisive" },
      { label: "Legato Fließend", promptContribution: "legato flowing movement, continuous unbroken motion, grace personified" },
      { label: "Spirale", promptContribution: "spiral movement implied or actual, helix energy, DNA of motion" },
      { label: "Pendel", promptContribution: "pendulum movement, returning quality, rhythm and inevitability" },
      { label: "Wachstum", promptContribution: "growth state captured, biological expansion, life force made visible" },
      { label: "Verfall Zeitlupe", promptContribution: "decay in slow motion, beautiful entropy, time's work revealed gently" },
      { label: "Perfekte Schleife", promptContribution: "seamless loop quality, beginning connects to end, eternal return" },
      { label: "Chaos Geordnet", promptContribution: "ordered chaos, seeming randomness with hidden structure, complexity" },
      { label: "Synchron", promptContribution: "synchronized movement, multiple elements in perfect unison, choreography" },
      { label: "Asynchron", promptContribution: "asynchronous elements, each on own time, polyphonic visual rhythm" },
      { label: "Sprung Höchstpunkt", promptContribution: "jump at apex, zero gravity moment, peak between up and down" },
      { label: "Aufwärtsbewegung", promptContribution: "upward movement, ascent energy, rising quality, optimism in direction" },
      { label: "Abwärtsbewegung", promptContribution: "downward movement, descent, gravity honored, weight acknowledged" },
      { label: "Rotation Langsam", promptContribution: "slow rotation, object reveals all sides gradually, contemplative 360°" },
      { label: "Zittern", promptContribution: "trembling vibration, 10Hz micro-movement, tension or cold or fear visible" },
      { label: "Wellenförmig", promptContribution: "wave motion, sinusoidal energy, fluid periodic movement through medium" },
      { label: "Strömung", promptContribution: "flow state movement, direction clear, resistance zero, pure momentum" },
      { label: "Kollision", promptContribution: "collision moment, two forces meeting, energy redistributed violently" },
      { label: "Auseinanderfallen", promptContribution: "falling apart in slow motion, disintegration as grace, ending as beauty" },
      { label: "Zusammenkommen", promptContribution: "coming together, convergence, attraction made visible, unity forming" },
      { label: "Ruhende Energie", promptContribution: "stored energy apparent in stillness, coiled spring quality, potential" },
      { label: "Nachschwingen", promptContribution: "aftermovement, vibration decaying, main event passed, echo visible" },
      { label: "Zeitsprung", promptContribution: "time jump implied, before and after in one frame, temporal paradox" },
      { label: "Simultaneität", promptContribution: "simultaneous actions, multiple time streams in single frame, poly-temporal" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 11 — DIRECTOR PHILOSOPHIE (30 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "director",
    label: "Director Philosophie",
    color: "#c084fc",
    entries: [
      { label: "Roger Deakins", promptContribution: "Deakins philosophy: motivated natural light, practicals drive the look, restrained but devastating beauty" },
      { label: "Wong Kar-Wai", promptContribution: "WKW: time distorted by emotion, color saturated with longing, unrequited feeling in every grain" },
      { label: "Kubrick", promptContribution: "Kubrick: geometric perfection containing psychological terror, one-point perspective as power" },
      { label: "Terrence Malick", promptContribution: "Malick: natural light divine, nature as consciousness, human smallness in vast graceful world" },
      { label: "Wes Anderson", promptContribution: "Anderson: precise symmetry, flat staging, deadpan artificiality elevated to philosophy" },
      { label: "Christopher Doyle", promptContribution: "Doyle: saturated neons, handheld intimacy, rain-wet streets, urban romantic fever" },
      { label: "Gordon Willis", promptContribution: "Willis Prince of Darkness: face half in shadow, what remains unseen IS the story" },
      { label: "Agnès Varda", promptContribution: "Varda: playful gaze, ordinary made extraordinary, tender feminist curiosity" },
      { label: "Chivo Lubezki", promptContribution: "Lubezki: long unbroken shots, natural light pushed to limits, present-tense immediacy" },
      { label: "Vilmos Zsigmond", promptContribution: "Zsigmond: flashed film technique, muted tones, pre-fogged light quality, 1970s truth" },
      { label: "Bradford Young", promptContribution: "Young: underexposed intentionally, shadow as protection, Black subjects in darkness with dignity" },
      { label: "Andrei Tarkovsky", promptContribution: "Tarkovsky: long takes, elemental nature, spiritual time, burning questions without answers" },
      { label: "Ingmar Bergman", promptContribution: "Bergman: face as landscape, God's absence visible, silence between words is the text" },
      { label: "Federico Fellini", promptContribution: "Fellini: dream logic honored, circus of the self, reality and fantasy indistinguishable" },
      { label: "Jean-Luc Godard", promptContribution: "Godard: rules broken consciously, cinema thinking about cinema, jump cut as truth" },
      { label: "Sofia Coppola", promptContribution: "Coppola: loneliness in luxury, alienation in beautiful spaces, ennui made exquisite" },
      { label: "Park Chan-wook", promptContribution: "Park: rigorous visual design, revenge as poetry, color as emotional notation" },
      { label: "Bong Joon-ho", promptContribution: "Bong: social class visible in every frame choice, genre as Trojan horse, detail density" },
      { label: "Claire Denis", promptContribution: "Denis: body as primary text, elliptical narrative, sensation before meaning" },
      { label: "Parfüm Werbung Paris", promptContribution: "luxury fragrance philosophy: suggestion over statement, desire without explanation, want over need" },
      { label: "Apple Product Film", promptContribution: "Apple product philosophy: object as protagonist, perfection as emotion, detail as respect" },
      { label: "Nike Werbung", promptContribution: "Nike philosophy: human potential as infinite, effort as sacred, body as instrument of will" },
      { label: "Dokumentarismus Kiefer", promptContribution: "Cinéma vérité: observe never direct, fly on wall, truth over beauty in every decision" },
      { label: "National Geographic", promptContribution: "NatGeo philosophy: patience rewarded, respect for subject, education through beauty" },
      { label: "BBC Planet Earth", promptContribution: "BBC natural documentary: technical perfection serving wonder, nature as protagonist" },
      { label: "Annie Leibovitz Portrait", promptContribution: "Leibovitz: subject's world becomes set, celebrity made human, power made intimate" },
      { label: "Helmut Newton Fashion", promptContribution: "Newton: power and desire, women as force, darkness in luxury, transgression as beauty" },
      { label: "Sebastião Salgado", promptContribution: "Salgado: human dignity in extremity, black and white as moral stance, epic empathy" },
      { label: "Henri Cartier-Bresson", promptContribution: "HCB: decisive moment, geometry and spontaneity, life at its most alive" },
      { label: "Diane Arbus", promptContribution: "Arbus: direct confrontation, outsiders with dignity, normalcy questioned" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 12 — ZEITGEIST & ÄRA (30 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "zeitgeist",
    label: "Zeitgeist & Ära",
    color: "#e879f9",
    entries: [
      { label: "1920er Art Deco", promptContribution: "1920s art deco era, geometric luxury, jazz age confidence, modernism emerging" },
      { label: "1930er Depression", promptContribution: "1930s Great Depression aesthetic, Dorothea Lange quality, hardship with dignity" },
      { label: "1940er Wartime", promptContribution: "1940s wartime aesthetic, rationed color, propaganda quality, collective purpose" },
      { label: "1950er Optimismus", promptContribution: "1950s post-war optimism, pastel chrome, American dream material, naive hope" },
      { label: "1960er Pop & Mod", promptContribution: "1960s mod pop aesthetic, bold graphic, space age optimism, liberation beginning" },
      { label: "1970er Gritty", promptContribution: "1970s gritty New York film school, desaturated pushed grain, social realism" },
      { label: "1970er Disco", promptContribution: "1970s disco era, metallic glamour, platform excess, Studio 54 night world" },
      { label: "1980er Neon", promptContribution: "1980s neon excess, Miami Vice palette, synth-pop visual, excess as philosophy" },
      { label: "1990er Grunge", promptContribution: "1990s grunge aesthetic, flannel and grain, anti-glamour, Generation X irony" },
      { label: "1990er Heroin Chic", promptContribution: "late 1990s heroin chic, pale and hollow, Calvin Klein minimalism, controversial fragility" },
      { label: "2000er Y2K", promptContribution: "Y2K aesthetic, chrome and plastic, millennial optimism, digital future promised" },
      { label: "2000er MySpace", promptContribution: "early 2000s MySpace era, glossy over-sharpened, HDR discovery, digital native" },
      { label: "2010er Instagram", promptContribution: "early Instagram era, Valencia filter world, curated authenticity, VSCO film" },
      { label: "2010er Normcore", promptContribution: "2010s normcore, aggressively ordinary, fashion that refuses to perform, anti-statement" },
      { label: "2020er Solarpunk", promptContribution: "solarpunk 2020s, green technology harmony, optimistic sustainability, future is nature" },
      { label: "2020er Cottagecore", promptContribution: "cottagecore aesthetic, pastoral fantasy, handmade nature, pandemic escape desire" },
      { label: "2020er Brutalist Revival", promptContribution: "2020s brutalist revival, honest raw materials, anti-decoration, architectural truth" },
      { label: "Ancient Rome", promptContribution: "ancient Roman aesthetic, marble and fresco, imperial power material, eternal city" },
      { label: "Mittelalter", promptContribution: "medieval aesthetic, candlelit manuscript quality, illuminated gold, pre-modern world" },
      { label: "Renaissance", promptContribution: "Renaissance aesthetic, sfumato technique, humanism made visual, rebirth quality" },
      { label: "Barock", promptContribution: "baroque excess, dramatic chiaroscuro, theatrical gesture, Catholic spiritual power" },
      { label: "Rokoko", promptContribution: "rococo pastoral lightness, pink and gold, aristocratic play, pre-revolutionary ease" },
      { label: "Viktorianisch", promptContribution: "Victorian era aesthetic, industrial progress meets sentimentality, moral weight" },
      { label: "Belle Époque", promptContribution: "Belle Époque, Paris at peak, art nouveau curves, world before the war" },
      { label: "Meiji Japan", promptContribution: "Meiji Japan aesthetic, tradition meets modernity, woodblock precision in new form" },
      { label: "Pre-Raphaelite", promptContribution: "Pre-Raphaelite aesthetic, medievalism with photographic detail, moral beauty" },
      { label: "Bauhaus 1919", promptContribution: "Bauhaus founding vision, geometry as beauty, workshop as art school, utopia" },
      { label: "Soviet Konstruktivismus", promptContribution: "Soviet constructivist aesthetic, diagonal dynamic, red and black, collective power" },
      { label: "Zukunft 2050", promptContribution: "2050 future aesthetic, advanced material, clean energy visible, post-scarcity quality" },
      { label: "Post-Apokalyptisch", promptContribution: "post-apocalyptic world, nature reclaiming, rust and green, beauty after end" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 13 — SOUND & SYNAESTHESIE (20 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "sound",
    label: "Sound & Synästhesie",
    color: "#22d3ee",
    entries: [
      { label: "Absolute Stille", promptContribution: "absolute silence implied, no sound possible in this frame, visual hush" },
      { label: "Donnerschlag", promptContribution: "thunderclap implied in frame, visual equivalent of sudden loud sound" },
      { label: "Flüstern", promptContribution: "whisper quality, sound made barely, intimacy of near-silence, lean in" },
      { label: "Tiefes Brummen", promptContribution: "deep bass drone implied, sub-frequency presence, ground vibration quality" },
      { label: "Glockenklang", promptContribution: "bell tone sustained, resonance in material, pure frequency made visible" },
      { label: "Regen Klang", promptContribution: "rain sound as visual texture, rhythmic percussion of drops, white noise calm" },
      { label: "Meeresrauschen", promptContribution: "ocean sound implied, rhythmic advance and retreat, eternal meter" },
      { label: "Stadtlärm", promptContribution: "urban sound cacophony visible in frame density, layered human noise" },
      { label: "Waldrauschen", promptContribution: "forest sound, wind through leaves, 1000 tiny movements creating one sound" },
      { label: "Feuerknistern", promptContribution: "fire crackling implied, sporadic irregular organic sound, alive quality" },
      { label: "Musik Sichtbar", promptContribution: "music made visible, frequency as form, sound waves as light waves" },
      { label: "Jazz Timing", promptContribution: "jazz rhythm implied in composition, syncopated off-beat placement, improvised" },
      { label: "Klassik Struktur", promptContribution: "classical music structural quality, architecture in sound translated to frame" },
      { label: "Techno Repetition", promptContribution: "techno visual repetition, 4/4 beat in composition, trance through iteration" },
      { label: "Blues Feeling", promptContribution: "blues emotional quality, melancholy transcended through expression, soul visible" },
      { label: "Gospel Energie", promptContribution: "gospel energy, collective voice, spiritual uplift made physical" },
      { label: "Streichquartett Kammer", promptContribution: "chamber music intimacy, four elements in conversation, private performance" },
      { label: "Bass Drop", promptContribution: "bass drop moment, peak impact, everything releases simultaneously" },
      { label: "Vinyl Knistern", promptContribution: "vinyl record warmth implied, analog imperfection, needle and groove quality" },
      { label: "Binaural Tief", promptContribution: "binaural depth implied, surround quality, sound present in every direction" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 14 — MARKEN & PRODUKT-TYPEN (40 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "produkt_typ",
    label: "Produkt-Typen",
    color: "#f0abfc",
    useCases: ["produkt", "marketing"],
    entries: [
      { label: "Luxus Uhr", promptContribution: "luxury timepiece: crown and pusher detail, dial texture precise, case finish quality, bracelet links", useCases: ["produkt"] },
      { label: "Parfüm Flakon", promptContribution: "perfume bottle: glass quality, cap material, label typography, liquid color and level", useCases: ["produkt", "marketing"] },
      { label: "Schmuck Gold", promptContribution: "gold jewelry: karat-appropriate color #B8860B, hallmark if visible, setting detail, surface finish", useCases: ["produkt"] },
      { label: "Schmuck Silber", promptContribution: "silver jewelry: .925 color #C0C0C0, oxidation if present, craftsmanship detail, surface quality", useCases: ["produkt"] },
      { label: "Ledertasche", promptContribution: "leather bag: stitching pattern precise, hardware finish, gusset detail, logo placement exact", useCases: ["produkt"] },
      { label: "Schuh Premium", promptContribution: "premium shoe: sole construction detail, upper material and finish, lace quality, last shape", useCases: ["produkt"] },
      { label: "Kosmetik Tube", promptContribution: "cosmetic tube: squeeze state, cap design, label typography, product color if visible", useCases: ["produkt"] },
      { label: "Skincare Tiegel", promptContribution: "skincare jar: lid material, jar material, fill level visible, label quality", useCases: ["produkt"] },
      { label: "Elektronik Premium", promptContribution: "premium electronics: port placement exact, button texture, screen bezel width, material seams", useCases: ["produkt", "technologie"] },
      { label: "Smartphone", promptContribution: "smartphone: camera island design, port type, glass back pattern if present, frame material", useCases: ["produkt", "technologie"] },
      { label: "Kopfhörer", promptContribution: "headphones: driver housing material, headband construction, cable or wireless indicator, ear pad material", useCases: ["produkt"] },
      { label: "Auto Exterieur", promptContribution: "car exterior: paint depth and finish, wheel design exact, badge placement, body line quality" },
      { label: "Auto Interieur", promptContribution: "car interior: seat material and pattern, dashboard material, steering wheel wrap, stitching detail" },
      { label: "Motorrad", promptContribution: "motorcycle: tank design, engine fin detail, exhaust finish, instrument cluster quality" },
      { label: "Fahrrad Premium", promptContribution: "premium bicycle: frame tube shape, component finish, tyre tread pattern, cable routing" },
      { label: "Wein Flasche", promptContribution: "wine bottle: label design exact, capsule material and color, glass color, fill level", useCases: ["produkt", "food"] },
      { label: "Whisky / Spirituosen", promptContribution: "spirits bottle: stopper design, label typography, liquid color and clarity, batch markings", useCases: ["produkt", "food"] },
      { label: "Kaffee Produkt", promptContribution: "coffee product: packaging material, roast date visible if present, brand typography exact", useCases: ["produkt", "food"] },
      { label: "Schokolade Verpackung", promptContribution: "chocolate packaging: foil or paper quality, embossed text, score pattern if unwrapped", useCases: ["produkt", "food"] },
      { label: "Messer / Küchenutensil", promptContribution: "knife: blade finish (satin/mirror/hammered), handle material, bolster quality, edge geometry", useCases: ["produkt", "food"] },
      { label: "Möbel Design", promptContribution: "design furniture: material and joinery visible, proportion elegant, designer's hand evident" },
      { label: "Leuchte Design", promptContribution: "design lamp: light source type, shade material and translucency, base material and finish" },
      { label: "Keramik Handwerk", promptContribution: "craft ceramic: throwing marks if hand-made, glaze color and texture, foot rim quality", useCases: ["produkt", "lifestyle"] },
      { label: "Buch / Editorial", promptContribution: "book: spine typography, cover material and finish, page quality if open, binding type" },
      { label: "Sportartikel", promptContribution: "sports equipment: material performance quality, brand placement, functional detail precision" },
      { label: "Medizinprodukt", promptContribution: "medical device: clinical precision, material sterility implied, function through form visible" },
      { label: "Werkzeug Premium", promptContribution: "premium tool: handle material, metal finish, machined precision, professional quality implied" },
      { label: "Spielzeug / Collector", promptContribution: "collector item: paint application quality, material authenticity, scale accuracy, detail level" },
      { label: "Kunstwerk Objekt", promptContribution: "art object: medium and process visible, artist's hand present, context-free dignity" },
      { label: "Architekturmodell", promptContribution: "architectural model: material and scale honest, light and shadow on form, precision craft", useCases: ["architektur"] },
      { label: "Instrument Musik", promptContribution: "musical instrument: material resonance implied, playing surface detail, craftsmanship quality" },
      { label: "Textil Heimtextil", promptContribution: "home textile: thread count quality implied, pattern precision, material drape and weight" },
      { label: "Tableware Premium", promptContribution: "premium tableware: glaze quality, form proportion, brand stamp if visible, material integrity", useCases: ["food", "lifestyle"] },
      { label: "Blumen Strauß", promptContribution: "flower arrangement: species identifiable, stem cut quality, water freshness, arrangement structure", useCases: ["lifestyle"] },
      { label: "Kunstblumen", promptContribution: "artificial flower: material quality (silk/paper/plastic), detail precision, life-like accuracy" },
      { label: "Haustier Portrait", promptContribution: "pet portrait: breed characteristics honored, coat texture precise, personality through expression" },
      { label: "Baby Produkt", promptContribution: "baby product: material safety implied, soft surfaces, ergonomic care, protection visible" },
      { label: "Outdoor Ausrüstung", promptContribution: "outdoor gear: technical material quality, function evident in design, durability visible" },
      { label: "Technik Kabel / Accessory", promptContribution: "tech accessory: connector type precise, material quality, braid or jacket pattern" },
      { label: "Verpackung Unboxing", promptContribution: "packaging unboxing: tissue paper fold, insert design, reveal moment composition" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 15 — QUALITÄTSSICHERUNG / NEGATIVE (40 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "negative",
    label: "Qualitätssicherung",
    color: "#f87171",
    entries: [
      { label: "Anti-Stock", promptContribution: "AVOID: stock footage aesthetic, posed commercial smile, artificial staging, generic" },
      { label: "Anti-CGI Plastik", promptContribution: "AVOID: CGI plastic smoothness, synthetic skin, unnatural digital perfection" },
      { label: "Anti-Flimmern", promptContribution: "AVOID: temporal flickering, frame-to-frame inconsistency, motion artifacts" },
      { label: "Anti-Float Physik", promptContribution: "AVOID: gravity violations, floating elements, weightless objects, physics errors" },
      { label: "Echte Hände", promptContribution: "AVOID: floating fingers, merged hands, extra digits, anatomical impossibilities" },
      { label: "Kein Ungewollter Text", promptContribution: "AVOID: unintended text, watermarks, random signage, alphabet soup" },
      { label: "Anti-Überbelichtung", promptContribution: "AVOID: blown highlights, overexposed whites, loss of detail in light areas" },
      { label: "Anti-Unterbelichtung", promptContribution: "AVOID: crushed blacks losing detail, underexposed muddy shadows" },
      { label: "Anti-Rauschen", promptContribution: "AVOID: digital noise, chroma noise artifacts, grainy muddy low-light" },
      { label: "Anti-Jpeg Artefakt", promptContribution: "AVOID: JPEG compression artifacts, blocking, mosquito noise around edges" },
      { label: "Anti-Symmetrie Fehler", promptContribution: "AVOID: unintended face/body asymmetry, lopsided proportions" },
      { label: "Anti-Doppelkinn", promptContribution: "AVOID: double chin merging with neck, undefined jaw-neck boundary" },
      { label: "Anti-Falsches Licht", promptContribution: "AVOID: light direction inconsistency, multiple impossible light sources" },
      { label: "Anti-Schatten Fehler", promptContribution: "AVOID: shadows pointing wrong direction, shadow-less objects, impossible shadows" },
      { label: "Anti-Reflexions Fehler", promptContribution: "AVOID: reflections showing impossible views, wrong reflections in mirrors/glass" },
      { label: "Anti-Augen Fehler", promptContribution: "AVOID: dead eyes, misaligned eyes, wrong eye size, unfocused gaze" },
      { label: "Anti-Zahn Fehler", promptContribution: "AVOID: too many teeth, fused teeth, grey teeth, impossible dental anatomy" },
      { label: "Anti-Haar Fehler", promptContribution: "AVOID: hair passing through objects, disconnected hair chunks, hair physics errors" },
      { label: "Anti-Kleidungs Fehler", promptContribution: "AVOID: fabric passing through body, physics-defying cloth, merged garment layers" },
      { label: "Anti-Hintergrund Fehler", promptContribution: "AVOID: background inconsistency, teleporting background elements, continuity errors" },
      { label: "Anti-Skalierung", promptContribution: "AVOID: object scale inconsistency, randomly sized elements, proportional errors" },
      { label: "Anti-Linsen Flare Fake", promptContribution: "AVOID: artificial digital lens flares, fake bokeh added in post, digital light leaks" },
      { label: "Anti-Oversharpen", promptContribution: "AVOID: over-sharpened edges, halo artifacts, HDR phone photography look" },
      { label: "Anti-Skin Smooth", promptContribution: "AVOID: over-smoothed plastic skin, beauty filter excess, pore-free unreality" },
      { label: "Anti-Farbe Oversaturated", promptContribution: "AVOID: oversaturated neon reality, Instagram filter excess, unnatural color boost" },
      { label: "Anti-Kitsch", promptContribution: "AVOID: kitsch sentimentality, manipulative cheap emotion, greeting card aesthetic" },
      { label: "Anti-Logo Fehler", promptContribution: "AVOID: misspelled brand names, logo distortion, wrong brand colors" },
      { label: "Anti-Watermark", promptContribution: "AVOID: visible watermarks, copyright notices, agency logos in frame" },
      { label: "Anti-Datum Stempel", promptContribution: "AVOID: date stamps, timestamp overlays, film roll metadata visible" },
      { label: "Anti-Blitzlicht Direkt", promptContribution: "AVOID: direct on-camera flash, flat red-eye inducing light, tourist photo quality" },
      { label: "Anti-Kitschlicht", promptContribution: "AVOID: god rays oversaturated, sunset lens flare clichés, Instagram travel photo light" },
      { label: "Anti-Duplikat", promptContribution: "AVOID: duplicated elements, copy-pasted objects, copy-mirrored patterns unexpected" },
      { label: "Anti-Weiße Rand", promptContribution: "AVOID: unintended white borders, frame-within-frame artifacts" },
      { label: "Anti-Bildstörung", promptContribution: "AVOID: corrupted pixel areas, digital glitch not intentional, rendering errors" },
      { label: "Anti-Unechtes Bokeh", promptContribution: "AVOID: fake depth-of-field added post, wrong bokeh placement, AI bokeh errors" },
      { label: "Anti-Fehl-Proportion", promptContribution: "AVOID: stretched or squished aspect ratios, distorted human proportions" },
      { label: "Anti-Leere Augen", promptContribution: "AVOID: soulless hollow eyes, blank stare, nobody home expression, AI doll look" },
      { label: "Anti-Kleidungs Repeat", promptContribution: "AVOID: pattern repetition errors in textiles, tile artifacts in fabric" },
      { label: "Anti-Architektur Fehler", promptContribution: "AVOID: impossible architecture, gravity-defying structures, Escher-unintentional buildings" },
      { label: "Anti-Zeitlos Fehler", promptContribution: "AVOID: period anachronisms, modern elements in historic settings, timeline contradictions" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 16 — TECHNISCHE PARAMETER (30 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "technisch",
    label: "Technische Parameter",
    color: "#94a3b8",
    entries: [
      { label: "8K Ultra HD", promptContribution: "8K resolution quality, extreme fine detail, pixel-peeping reward, maximum fidelity" },
      { label: "4K Cinema", promptContribution: "4K cinema quality, DCI 4096×2160, professional standard, theater-ready" },
      { label: "Full HD Broadcast", promptContribution: "1080p broadcast quality, professional television standard, clean delivery" },
      { label: "RAW Uncompressed", promptContribution: "RAW uncompressed quality, maximum data preserved, no lossy compression" },
      { label: "24fps Film", promptContribution: "24fps film cadence, cinema standard, motion cadence as narrative grammar" },
      { label: "25fps European", promptContribution: "25fps European broadcast standard, PAL quality, slight motion difference" },
      { label: "48fps High Frame", promptContribution: "48fps high frame rate, hyper-real motion, soap opera effect embraced or fought" },
      { label: "120fps Zeitlupe", promptContribution: "120fps for 5x slow motion, smooth deceleration, time as material" },
      { label: "HDR Dolby Vision", promptContribution: "Dolby Vision HDR, specular highlights preserved, wide color gamut P3" },
      { label: "SDR 100 Nit", promptContribution: "SDR 100 nit standard, classical display target, universal compatibility" },
      { label: "IMAX Quality", promptContribution: "IMAX 70mm quality, overwhelming frame, maximum immersion, gigantic canvas" },
      { label: "Super 8 Quality", promptContribution: "Super 8 film quality, home movie intimacy, specific grain and color, family archive" },
      { label: "16mm Documentary", promptContribution: "16mm documentary grain, reportage intimacy, Cassavetes tradition, truth in grain" },
      { label: "70mm Epic", promptContribution: "70mm epic film quality, Lawrence of Arabia tradition, vast and detailed" },
      { label: "VHS Tape", promptContribution: "VHS tape quality, tracking lines, color bleed, 1980s home video authenticity" },
      { label: "Betacam SP", promptContribution: "Betacam SP broadcast quality, specific 1990s video look, news documentary" },
      { label: "DV Mini Digital", promptContribution: "miniDV digital quality, early 2000s, specific compression artifact, dogme95" },
      { label: "Instagram Square 1:1", promptContribution: "square 1:1 Instagram native format, social media first composition" },
      { label: "Story Vertikal 9:16", promptContribution: "vertical 9:16 story format, mobile native, full screen immersion" },
      { label: "Cinema 2.35:1", promptContribution: "2.35:1 cinema aspect ratio, widescreen panoramic, scope feel" },
      { label: "Banner 16:9", promptContribution: "16:9 horizontal banner format, television and web standard" },
      { label: "Print 4:5", promptContribution: "4:5 print-optimized ratio, portrait standard for high-quality print" },
      { label: "Druck 300 DPI", promptContribution: "300 DPI print resolution quality, fine detail for large format printing" },
      { label: "Web 72 DPI", promptContribution: "72 DPI web resolution, screen-optimized, fast loading quality" },
      { label: "Spherical 360°", promptContribution: "360° spherical capture quality, VR-ready, equirectangular immersive" },
      { label: "Stereo 3D", promptContribution: "stereoscopic 3D quality, depth for anaglyph or VR, binocular parallax" },
      { label: "Thermal Wärme", promptContribution: "thermal camera perspective, heat as color, invisible made visible" },
      { label: "UV Ultraviolett", promptContribution: "UV ultraviolet spectrum capture, fluorescence revealed, hidden world" },
      { label: "Röntgen", promptContribution: "X-ray quality, internal structure revealed, inside and outside simultaneously" },
      { label: "Mikroskop Nano", promptContribution: "electron microscope quality, nanoscale world, surface as alien landscape" },
    ],
  },
];

// ─── TOOLS ────────────────────────────────────────────────────

export const VIDEO_TOOLS = [
  { name: "Kling 2.x", use: "Organische Bewegung & Realismus" },
  { name: "Runway Gen-4", use: "Kamerabewegung & Übergänge" },
  { name: "Sora", use: "Atmosphäre & Umgebungsshots" },
  { name: "Pika 2.x", use: "Produkt & Still-Life Animation" },
  { name: "Luma Dream", use: "Abstrakte & stilisierte Looks" },
  { name: "Haiper 2.0", use: "Schnelle dynamische Inhalte" },
];

export const IMAGE_TOOLS = [
  { name: "Midjourney v7", use: "Künstlerisch & stilisiert" },
  { name: "Flux Pro 1.1", use: "Fotorealismus & Produktshots" },
  { name: "DALL-E 3", use: "Prompt-Genauigkeit & Konzepte" },
  { name: "Stable Diffusion XL", use: "Anpassung & volle Kontrolle" },
  { name: "Ideogram 2", use: "Text-in-Bild & Typografie" },
  { name: "Adobe Firefly 3", use: "Kommerziell sichere Outputs" },
];

// ─── TYPES ────────────────────────────────────────────────────

export type Mode = "video" | "image";
export type Step = 0 | 1 | 2 | 3;

export interface GeminiAnalysis {
  subject: string;
  colors: string;
  materials: string;
  lighting: string;
  composition: string;
  mood: string;
  background: string;
  details: string;
  style: string;
  technical: string;
  [key: string]: string;
}

export interface PromptOutput {
  quality_score: number;
  detail_accuracy: number;
  tags_integrated?: number;
  main_prompt: string;
  negative_prompt: string;
  prompt_breakdown?: Record<string, string>;
  layers: {
    world?: string;
    subject?: string;
    motion?: string;
    lighting?: string;
    lens?: string;
    color?: string;
    physics?: string;
    intention?: string;
  };
  recommended_tool: string;
  ghost_director: string;
  use_case_notes: string;
}

// ─── SCENE LIBRARY ────────────────────────────────────────────

export interface SceneLibraryEntry {
  label: string;
  seed: string;
}

export interface SceneLibraryCategory {
  id: string;
  label: string;
  color: string;
  entries: SceneLibraryEntry[];
}

export const SCENE_LIBRARY: SceneLibraryCategory[] = [

  // ══════════════════════════════════════════════════════════
  // 01 — SCHAUPLATZ & SETTING (20 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "location",
    label: "Schauplatz & Setting",
    color: "#ff4d00",
    entries: [
      { label: "Tokioter Seitenstraße", seed: "narrow Tokyo alleyway, lanterns overhead, cobblestones worn smooth, doors of unknown purpose" },
      { label: "Isländische Lavafelder", seed: "Icelandic lava field, black volcanic rock, moss, vast flat horizon, otherworldly silence" },
      { label: "Verlassenes Industriegebäude", seed: "abandoned industrial facility, broken skylights, rust and concrete, frozen in past time" },
      { label: "Pariser Dachterrasse", seed: "Parisian rooftop at dusk, zinc rooftops extending to horizon, chimneys, soft city haze" },
      { label: "Japanisches Ryokan", seed: "traditional Japanese ryokan interior, tatami, shoji screen light, minimalist wooden architecture" },
      { label: "Berliner U-Bahnhof", seed: "Berlin subway station, brutalist tiles, fluorescent light flicker, late-night emptiness" },
      { label: "Unterwasser-Grotte", seed: "underwater cave, light shafts from surface, suspended particles, deep marine silence" },
      { label: "Marokkanischer Souk", seed: "Marrakech souk, spice colors, dappled light through woven roof, layered sensory world" },
      { label: "Skandinavisches Fjord", seed: "Norwegian fjord at dawn, mirror-flat water, granite cliffs, pure cold light" },
      { label: "Hongkonger Nachtmarkt", seed: "Hong Kong night market, vertical neon, steam from food stalls, compressed urban density" },
      { label: "Arabische Altstadt", seed: "ancient Arab medina, whitewashed walls, geometry of shadows, timeless stone architecture" },
      { label: "Russischer Winterwald", seed: "Russian birch forest in winter, white trunks, blue shadows on snow, absolute stillness" },
      { label: "Futuristische Metropole", seed: "future city, aerial perspective, bioluminescent towers, rivers of light, vertical gardens" },
      { label: "Mittelalterliche Bibliothek", seed: "medieval monastery library, candlelit manuscripts, dust motes in light shafts, centuries of knowledge" },
      { label: "Brasilianische Favela", seed: "Brazilian favela hillside, dense color, makeshift architecture climbing upward, raw vitality" },
      { label: "Australisches Outback", seed: "Australian outback, ochre earth, lone eucalyptus, heat shimmer, geological time" },
      { label: "Venezianische Kanäle", seed: "Venice canals at fog, water reflections on palazzo walls, gondola oar sound, vanishing perspective" },
      { label: "Leerer New Yorker Diner", seed: "empty New York diner at 3am, vinyl booths, counter stools, neon sign in window, isolation" },
      { label: "Karibische Sandbank", seed: "Caribbean sandbar at low tide, shin-deep turquoise water, horizon 360°, total solitude" },
      { label: "Tibetisches Kloster", seed: "Tibetan monastery on cliff edge, prayer flags, altitude light, ancient stone meeting clouds" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 02 — LICHTSTIMMUNG (20 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "light",
    label: "Lichtstimmung",
    color: "#ffd166",
    entries: [
      { label: "Polarlicht-Nacht", seed: "aurora borealis, green and violet curtains across black sky, cold crystalline air, otherworldly color" },
      { label: "Neon-Regen Reflexionen", seed: "rain-soaked street at night, neon signs bleeding color into wet asphalt, every puddle a painting" },
      { label: "Goldene Stunde + Nebel", seed: "golden hour sunlight entering through morning mist, volumetric rays, warm against cool haze" },
      { label: "Einzelne Kerze im Dunkel", seed: "single candle flame, absolute darkness surrounding, warm radius of 40cm, everything beyond void" },
      { label: "Kaminfeuer-Wärme", seed: "fireplace light, dancing warm orange, deep shadow recession, crackling intimate glow" },
      { label: "Biolumineszenz", seed: "bioluminescent ocean at night, blue light from within water, dark beach, natural electric beauty" },
      { label: "Gewitter am Horizont", seed: "thunderstorm building on horizon, anvil cloud with internal lightning, ominous pre-storm light" },
      { label: "Mondschatten Mitternacht", seed: "full moon casting hard shadows, silver light, deep black, no color — only luminance and void" },
      { label: "Industrielles Flutlicht", seed: "industrial floodlight from single source, harsh directional shadows, theatrical contrast, factory scale" },
      { label: "Magische Blaue Stunde", seed: "blue hour just after sunset, city lights activating, sky cobalt, world in transition between states" },
      { label: "Unterwasser-Kaustik", seed: "underwater caustic light patterns, sunlight refracted through surface, shifting geometry of illumination" },
      { label: "Gegenlicht-Silhouette", seed: "extreme backlight, subject as pure silhouette, rim light only, details dissolved by luminance" },
      { label: "Regenwand-Fenster", seed: "rain streaming down window glass, interior light from behind, water as lens distorting outside world" },
      { label: "Volcano-Glut", seed: "volcanic lava flow light, deep red-orange from below, smoke and heat shimmer, geological fire" },
      { label: "Morgendunst-Strahlen", seed: "morning light shafts through forest canopy, dew on every surface, world just awakening" },
      { label: "Glashaus-Diffusion", seed: "greenhouse diffused light, even soft illumination, green filter, life in suspended cultivation" },
      { label: "Infrarot-Welt", seed: "infrared photography, foliage white as snow, sky black, a world reversed and made strange" },
      { label: "Stroboskop-Freeze", seed: "stroboscopic light freezing motion, multiple exposure implied, time fractured and recomposed" },
      { label: "Röntgen-Transparenz", seed: "x-ray aesthetic, internal structure visible, external appearance dissolved, truth beneath surface" },
      { label: "Kerzen-Prozession", seed: "procession of candlelight, moving flames in darkness, warm points of light against profound black" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 03 — NARRATIVER MOMENT (15 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "narrative",
    label: "Narrativer Moment",
    color: "#4ade80",
    entries: [
      { label: "Stille vor dem Sturm", seed: "the moment before everything changes, perfect stillness containing latent violence or transformation" },
      { label: "Übergabe / Weitergabe", seed: "object passing from one hand to another, legacy transferred, chain of meaning continuing" },
      { label: "Enthüllung im Nebel", seed: "something emerging from obscurity, the moment of recognition, revelation through gradual clarity" },
      { label: "Letzter Blick zurück", seed: "departure moment, one final look at what is being left behind, threshold between before and after" },
      { label: "Unbeobachteter Moment", seed: "subject unaware of camera, private authentic moment, the world seen without performance" },
      { label: "Geheimnis wird aufgedeckt", seed: "hidden truth becoming visible, surface broken to reveal interior, concealment yielding to exposure" },
      { label: "Zeitlos Eingefroren", seed: "motion stopped at apex, peak moment crystallized, before and after implied but absent" },
      { label: "Triumph in Einsamkeit", seed: "victory without audience, private achievement in empty space, accomplishment without witness" },
      { label: "Erste Begegnung", seed: "two elements meeting for first time, anticipation and discovery, the charged instant of first contact" },
      { label: "Der leere Stuhl", seed: "an absence more present than presence, what was here and is gone, vacancy as narrative" },
      { label: "Warten auf etwas", seed: "suspended anticipation, threshold state, time stretching before arrival of the expected" },
      { label: "Das Unmögliche passiert", seed: "physical law suspended, impossible moment happening calmly, reality quietly broken" },
      { label: "Zusammenbruch & Neubeginn", seed: "after the fall, ruins becoming foundation, destruction as prerequisite for what comes next" },
      { label: "Parallele Welten treffen sich", seed: "two realities occupying same space, contradiction without resolution, coexistence of opposites" },
      { label: "Abschied ohne Worte", seed: "farewell that cannot be spoken, emotion in gesture and distance, language exceeded by feeling" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 04 — ATMOSPHÄRE & EMOTION (15 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "atmosphere",
    label: "Atmosphäre & Emotion",
    color: "#a78bfa",
    entries: [
      { label: "Sakral & Erhaben", seed: "sacred geometry, sublime scale, the individual small before something greater, reverence enforced by space" },
      { label: "Melancholisch & Schwebend", seed: "bittersweet suspension, beauty tinged with impermanence, the ache of things almost within reach" },
      { label: "Bedrohlich & Beunruhigend", seed: "threat implied not shown, wrongness in normal things, unease building without identifiable source" },
      { label: "Mythisch & Archetypisch", seed: "primal story resonance, symbols older than language, archetype recognized before understood" },
      { label: "Nostalgisch & Vergangen", seed: "memory texture, time distance, the specific weight of what was and cannot return" },
      { label: "Ekstatisch & Grenzenlos", seed: "expansion beyond boundaries, joy that exceeds containment, body and spirit at maximum" },
      { label: "Kontemplativ & Meditativ", seed: "thought made visible, the quality of deep attention, mind emptied and present to single thing" },
      { label: "Sehnsüchtig & Unerreicht", seed: "desire for what cannot be touched, longing as its own landscape, the beautiful that stays distant" },
      { label: "Bizarr & Absurd", seed: "logic inverted, the mundane made strange, rules suspended without drama, absurdity accepted" },
      { label: "Traumhaft & Auflösend", seed: "dream physics, edges uncertain, transitions without cause, beauty in dissolution of order" },
      { label: "Kalt & Emotionslos", seed: "clinical detachment, human warmth withheld, observation without judgment, sterile precision" },
      { label: "Sinnlich & Körperlich", seed: "tactile reality, the body's intelligence, material world pressing on the senses" },
      { label: "Rebellisch & Ungehorsam", seed: "refusal of expected, rule broken deliberately, beauty in transgression, the system subverted" },
      { label: "Spielerisch & Verspielt", seed: "lightness of being, joy in absurdity, world as playground, gravity suspended by humor" },
      { label: "Zeitlos & Unvergänglich", seed: "outside of time, permanent, immune to decay, the quality of things that will always have been" },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 05 — REGISSEUR-PHILOSOPHIE (10 Einträge)
  // ══════════════════════════════════════════════════════════
  {
    id: "director",
    label: "Regisseur-Philosophie",
    color: "#38bdf8",
    entries: [
      { label: "Kubrick Symmetrie", seed: "perfect bilateral symmetry, one-point perspective, mathematical frame composition, cold god's-eye geometry" },
      { label: "Wong Kar-Wai Sehnsucht", seed: "blurred motion of time passing, longing encoded in light and color, memory as unstable material" },
      { label: "Tarkovsky Zeit-Malerei", seed: "time as paintable substance, slow revelation, the frame as meditation, reality made numinous" },
      { label: "Lynch Traumlogik", seed: "dream logic accepted without question, the uncanny in ordinary space, beauty in wrongness" },
      { label: "Malick Natur-Kontemplation", seed: "nature as co-protagonist, light worshipped, whispered interior voice, world beyond human scale" },
      { label: "Fincher Präzisions-Dunkel", seed: "meticulous darkness, every shadow placed, technical perfection serving psychological unease" },
      { label: "Wes Anderson Diorama", seed: "flat symmetric framing, pastel palette precision, world as lovingly constructed dollhouse" },
      { label: "Agnès Varda Poesie", seed: "tender observation, feminist gaze, the overlooked elevated, personal and political unified" },
      { label: "Christopher Doyle Farbrausch", seed: "saturated impossible color, expressionist palette, emotion translated directly to hue" },
      { label: "Sven Nykvist Licht-Demut", seed: "light as spiritual subject, no artifice, natural illumination honored, simplicity as highest form" },
    ],
  },
];
