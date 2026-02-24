"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  USE_CASES, LIBRARY, SCENE_LIBRARY, VIDEO_TOOLS, IMAGE_TOOLS,
  type Mode, type Step, type UseCaseId,
  type GeminiAnalysis, type PromptOutput,
} from "@/lib/constants";
import { Tooltip } from "@/components/Tooltip";
import {
  USE_CASE_TOOLTIPS, TONE_TOOLTIPS, DURATION_TOOLTIPS,
  OUTPUT_TOOLTIPS, TAG_TOOLTIPS,
} from "@/lib/tooltips";
import { RecommendationBanner, type Recommendations } from "@/components/RecommendationBanner";

// ─── Types ────────────────────────────────────────────────────

interface SceneScenario {
  id: string;
  title: string;
  scenario: string;
  environment: string;
  mood: string;
}

// ─── Helpers ──────────────────────────────────────────────────

function getTagTooltip(label: string, promptContribution: string) {
  return TAG_TOOLTIPS[label] || { short: promptContribution };
}

function useTagColorMap() {
  const map: Record<string, string> = {};
  LIBRARY.forEach(cat => {
    cat.entries.forEach(entry => {
      map[entry.label] = cat.color;
    });
  });
  return map;
}

// ─── Mini Components ──────────────────────────────────────────

function TagWithTooltip({
  label, color, selected, recommended, onClick, promptContribution,
}: {
  label: string; color: string; selected: boolean; recommended: boolean;
  onClick: () => void; promptContribution: string;
}) {
  const borderColor = selected && recommended
    ? color
    : selected
      ? color
      : recommended
        ? `${color}80`
        : `${color}30`;

  const bgColor = selected && recommended
    ? `${color}30`
    : selected
      ? `${color}20`
      : recommended
        ? `${color}14`
        : `${color}08`;

  const textColor = selected ? color : recommended ? `${color}dd` : "var(--text-muted)";

  return (
    <Tooltip data={getTagTooltip(label, promptContribution)}>
      <button
        onClick={onClick}
        aria-pressed={selected}
        aria-label={`${label}${recommended ? " — KI-empfohlen" : ""}${selected ? " — ausgewählt" : ""}`}
        className="tag-pill"
        style={{
          border: `1px solid ${borderColor}`,
          background: bgColor,
          color: textColor,
          boxShadow: recommended ? `0 0 5px ${color}35` : "none",
          animation: recommended ? "recTagGlow 2.5s ease-in-out infinite" : "none",
          margin: "3px",
        }}
      >
        {label}
        {recommended && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute", top: 0, right: 0,
              width: 7, height: 7, borderRadius: "50%",
              background: selected ? "var(--gold)" : "var(--accent)",
              boxShadow: selected ? "0 0 4px var(--gold)" : "0 0 4px var(--accent)",
            }}
          />
        )}
      </button>
    </Tooltip>
  );
}

function ScoreBar({ label, value, color, tooltipKey }: {
  label: string; value: number; color: string; tooltipKey: string;
}) {
  return (
    <Tooltip data={OUTPUT_TOOLTIPS[tooltipKey] || { short: label }}>
      <div
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <span
          className="text-[10px] uppercase tracking-widest whitespace-nowrap"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", minWidth: 110 }}
        >
          {label}
        </span>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${value}%`}
          className="flex-1 h-[3px] rounded-full overflow-hidden"
          style={{ background: "var(--surface3)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${value}%`, background: color }}
          />
        </div>
        <span
          className="text-[13px] font-medium text-right"
          style={{ fontFamily: "var(--font-mono)", color, minWidth: 40 }}
        >
          {value}%
        </span>
      </div>
    </Tooltip>
  );
}

function LayerRow({ layerKey, label, value }: {
  layerKey: string; label: string; value: string;
}) {
  return (
    <Tooltip data={OUTPUT_TOOLTIPS[layerKey] || { short: label }}>
      <div className="layer-row cursor-pointer">
        <span
          className="text-[9px] uppercase tracking-widest pt-1.5"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <span
          className="text-[12px] leading-relaxed rounded-md px-3 py-1.5 border"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#C8C4BE",
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {value}
        </span>
      </div>
    </Tooltip>
  );
}

function BreakdownRow({ tagLabel, explanation, tagColor }: {
  tagLabel: string; explanation: string; tagColor: string;
}) {
  return (
    <div
      className="breakdown-row"
      style={{ borderLeft: `3px solid ${tagColor}`, borderColor: "var(--border)" }}
    >
      <span
        className="text-[10px] rounded-full px-2.5 py-1 whitespace-nowrap"
        style={{
          fontFamily: "var(--font-mono)",
          border: `1px solid ${tagColor}50`,
          background: `${tagColor}12`,
          color: tagColor,
        }}
      >
        {tagLabel}
      </span>
      <span
        className="text-[11.5px] leading-relaxed"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        {explanation}
      </span>
    </div>
  );
}

// ─── Library Tab Scroller ─────────────────────────────────────

function LibraryTabScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);

    if (scrollWidth > clientWidth) {
      setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
    } else {
      setScrollProgress(0);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", checkScroll); ro.disconnect(); };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const value = parseFloat(e.target.value);
    const targetScroll = (value / 100) * (el.scrollWidth - el.clientWidth);
    el.scrollLeft = targetScroll;
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="relative group">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Kategorien nach links scrollen"
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-2 transition-opacity duration-200"
            style={{
              background: "linear-gradient(to right, var(--surface) 40%, transparent)",
              border: "none", cursor: "pointer", color: "var(--accent)",
              fontSize: 18, fontWeight: "bold",
            }}
          >
            ‹
          </button>
        )}

        {/* Scrollable tabs */}
        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Orchestra Library Kategorien"
          className="lib-scroll-area"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "auto",
            paddingBottom: "4px",
            paddingLeft: canScrollLeft ? 24 : 0,
            paddingRight: canScrollRight ? 24 : 0,
          }}
        >
          {children}
        </div>

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Kategorien nach rechts scrollen"
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center px-2 transition-opacity duration-200"
            style={{
              background: "linear-gradient(to left, var(--surface) 40%, transparent)",
              border: "none", cursor: "pointer", color: "var(--accent)",
              fontSize: 18, fontWeight: "bold",
            }}
          >
            ›
          </button>
        )}
      </div>

      {/* The "Schieberegler" (Slider) for better accessibility */}
      {hasOverflow && (
        <div className="px-2 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={scrollProgress}
            onChange={onSliderChange}
            className="category-slider"
            aria-label="Kategorien Schieberegler"
          />
        </div>
      )}
    </div>
  );
}

function SectionDivider({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span
        className="text-[9px] uppercase tracking-widest whitespace-nowrap font-medium"
        style={{ fontFamily: "var(--font-mono)", color: `${color}99` }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

// ─── Preview Label Helper ──────────────────────────────────────

function getPreviewLabel(index: number, sceneList: SceneScenario[]): string {
  if (index === 0) return "Hauptstil";
  return sceneList[index - 1]?.title ?? `Szene ${index}`;
}

// ─── Main App ─────────────────────────────────────────────────

export default function Home() {
  const [mode, setMode] = useState<Mode>("video");
  const [useCase, setUseCase] = useState<UseCaseId>("produkt");
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tone, setTone] = useState("luxury");
  const [duration, setDuration] = useState("8");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState("image/jpeg");

  const [step, setStep] = useState<Step>(0);
  const [geminiAnalysis, setGeminiAnalysis] = useState<GeminiAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [recDismissed, setRecDismissed] = useState(false);
  const [geminiDone, setGeminiDone] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [output, setOutput] = useState<PromptOutput | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<string>("prompt");
  const [copied, setCopied] = useState(false);
  const [scenes, setScenes] = useState<SceneScenario[]>([]);
  const [selectedScene, setSelectedScene] = useState<SceneScenario | null>(null);
  const [isGeneratingScenes, setIsGeneratingScenes] = useState(false);
  const [selectedSeeds, setSelectedSeeds] = useState<string[]>([]);
  const [activeLibraryCategory, setActiveLibraryCategory] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false);
  const [debugOpen, setDebugOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState<{ url: string; label: string; index: number } | null>(null);
  const [finalFormat, setFinalFormat] = useState<"text" | "json">("text");

  // Debugging-Hilfe
  useEffect(() => {
    (window as any).forceGenerate = () => {
      console.log("[DEBUG] Force trigger manual generation");
      if (output?.main_prompt) {
        generatePreviews(output.main_prompt, output.layers);
      } else {
        console.error("[DEBUG] No output available");
      }
    };
    console.log("[DEBUG] window.forceGenerate initialized");
  }, [output]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!previewModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPreviewModal(null); return; }
      if (e.key === "ArrowRight") {
        setPreviewModal(prev => {
          if (!prev) return null;
          const next = (prev.index + 1) % previews.length;
          return { url: previews[next], label: getPreviewLabel(next, scenes), index: next };
        });
      }
      if (e.key === "ArrowLeft") {
        setPreviewModal(prev => {
          if (!prev) return null;
          const p = (prev.index - 1 + previews.length) % previews.length;
          return { url: previews[p], label: getPreviewLabel(p, scenes), index: p };
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [previewModal, previews, scenes]);

  const fileRef = useRef<HTMLInputElement>(null);
  const currentUseCase = USE_CASES.find(u => u.id === useCase)!;
  const isLoading = step === 1 || step === 2;
  const tagColorMap = useTagColorMap();

  const toggleTag = (label: string) =>
    setSelectedTags(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]);

  const filteredLibrary = LIBRARY.map(cat => ({
    ...cat,
    entries: cat.entries.filter(e =>
      !e.useCases || e.useCases.includes(useCase as UseCaseId)
    ),
  })).filter(cat => cat.entries.length > 0);

  const firstCategoryWithRecs = recommendations?.tags?.length
    ? filteredLibrary.find(c => c.entries.some(e => recommendations.tags!.includes(e.label)))?.id ?? null
    : null;

  const activeCategoryId =
    filteredLibrary.find(c => c.id === activeLibraryCategory)?.id
    ?? firstCategoryWithRecs
    ?? filteredLibrary[0]?.id
    ?? null;

  const handleFile = useCallback((file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageMime(file.type);
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }, []);

  const analyzeOnly = async () => {
    if (!imageBase64) return;
    setError("");
    setIsAnalyzing(true);
    setGeminiDone(false);
    setRecommendations(null);
    setRecDismissed(false);
    setGeminiAnalysis(null);
    try {
      console.log("[analyze] Image Base64 length:", imageBase64.length, "bytes");
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64, mimeType: imageMime,
          useCaseInstruction: currentUseCase.geminiInstruction, mode,
        }),
      });
      const data = await res.json();
      if (data.error) {
        console.error("Server API Error Details:", data);
        throw new Error(data.error);
      }

      setGeminiAnalysis(data.analysis);
      if (data.recommendations) {
        setRecommendations(data.recommendations);
        applyRecommendations(data.recommendations);
        setActiveLibraryCategory(null);
      }
      setGeminiDone(true);
    } catch (e: any) {
      setError(e.message || "Gemini Analyse fehlgeschlagen");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateScenes = async () => {
    setIsGeneratingScenes(true);
    setScenes([]);
    setSelectedScene(null);
    try {
      const res = await fetch("/api/scene-orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageAnalysis: geminiAnalysis || {},
          useCase, tone, userText: text, selectedSeeds,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setScenes(data.scenes || []);
    } catch (e: any) {
      setError(e.message || "Szenen-Generierung fehlgeschlagen");
    } finally {
      setIsGeneratingScenes(false);
    }
  };

  const [debugLog, setDebugLog] = useState<string[]>([]);
  const addToLog = (msg: string) => setDebugLog(p => [...p.slice(-9), `> ${msg}`]);

  const generatePreviews = async (mainPrompt: string, layers: any) => {
    console.log("[generatePreviews] Starting...", { mainPrompt: mainPrompt.slice(0, 30), hasLayers: !!layers });
    const imgLen = imageBase64?.length || 0;
    addToLog(`Start Preview (Image: ${imgLen} bytes)`);
    setDebugOpen(true);
    setIsGeneratingPreviews(true);
    setPreviews([]);
    setError(""); // Fehler zurücksetzen
    try {
      // X-to-X editing instructions: product stays identical, environment/light/mood transforms.
      // gpt-image-1 needs explicit "keep product, change scene" framing to apply the Claude prompt.
      const editPrefix = "Keep this exact product unchanged and as the clear focal point. Apply the following cinematic visual style, environment, lighting and atmosphere to the scene around it: ";
      const styleCore = mainPrompt.slice(0, 2600);

      const visualizationPrompts: string[] = [
        `${editPrefix}${styleCore}`,
      ];

      if (scenes.length > 0) {
        scenes.slice(0, 3).forEach(s => {
          visualizationPrompts.push(
            `Keep this exact product unchanged and as the clear focal point. Place it in this scene: ${s.scenario} — ${s.environment}. Mood: ${s.mood}. Apply this cinematic quality: ${styleCore.slice(0, 600)}`
          );
        });
      }
      addToLog(`Prompts: ${visualizationPrompts.length}`);

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompts: visualizationPrompts,
          imageBase64: imageBase64,
          imageMime: imageMime,
        }),
      });
      addToLog(`API Status: ${res.status}`);
      const data = await res.json();
      console.log("[generatePreviews] API Response:", data);

      if (data.error) {
        addToLog(`API-Fehler: ${data.error}`);
        throw new Error(data.error);
      }

      const errors = (data.results || [])
        .filter((r: any) => r.error)
        .map((r: any) => r.error);

      if (errors.length > 0) {
        console.warn("[generatePreviews] Some prompts failed:", errors);
        addToLog(`X-Fehler: ${errors[0]}`);
      }

      const successfulImages = (data.results || [])
        .filter((r: any) => !r.error)
        .map((r: any) => r.url);

      console.log("[generatePreviews] Final Results:", { count: successfulImages.length, errors });
      addToLog(`Bilder: ${successfulImages.length}`);
      setPreviews(successfulImages);
      if (successfulImages.length > 0) setDebugOpen(false);
      if (successfulImages.length === 0) {
        setError("Keine Bilder generiert. Eventuell API-Limit oder Safety Block?");
      }
    } catch (e: any) {
      console.error("[generatePreviews] Error:", e);
      addToLog(`Error: ${e.message}`);
      setError("Vorschau-Generierung fehlgeschlagen: " + e.message);
    } finally {
      setIsGeneratingPreviews(false);
      addToLog("Fertig.");
      console.log("[generatePreviews] Finished.");
    }
  };

  const generate = async () => {
    if (!imageBase64 && !text.trim()) return;
    setError("");
    setOutput(null);
    if (!geminiDone) setGeminiAnalysis(null); // preserve cached analysis when re-generating
    setRecommendations(null);
    setRecDismissed(false);

    const orderedContributions = selectedTags.map(label => {
      const entry = LIBRARY.flatMap(c => c.entries).find(e => e.label === label);
      return entry?.promptContribution || "";
    });

    try {
      let analysis: GeminiAnalysis | null = geminiDone ? (geminiAnalysis as GeminiAnalysis | null) : null;

      if (imageBase64 && !geminiDone) {
        setStep(1);
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64, mimeType: imageMime,
            useCaseInstruction: currentUseCase.geminiInstruction, mode,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        analysis = data.analysis;
        setGeminiAnalysis(analysis);
        if (data.recommendations) {
          setRecommendations(data.recommendations);
          setActiveLibraryCategory(null);
        }
      }

      setStep(2);
      const res = await fetch("/api/build-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageAnalysis: analysis || {},
          userText: text,
          tags: selectedTags,
          tagContributions: orderedContributions,
          tone, duration, mode, useCase,
          useCaseInstruction: currentUseCase.claudeInstruction,
          sceneDirection: selectedScene
            ? `Selected Scene: "${selectedScene.title}"\nScenario: ${selectedScene.scenario}\nEnvironment: ${selectedScene.environment}\nMood: ${selectedScene.mood}`
            : undefined,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutput(data.prompt);
      setStep(3);
      setActiveTab("prompt");

      // Automatische Vorschau-Generierung nach dem Prompt-Build
      if (data.prompt?.main_prompt) {
        generatePreviews(data.prompt.main_prompt, data.prompt.layers);
      }
    } catch (e: any) {
      setError(e.message);
      setStep(0);
    }
  };

  const applyRecommendations = (rec: Recommendations) => {
    if (rec.use_case && USE_CASES.find(u => u.id === rec.use_case)) {
      setUseCase(rec.use_case as UseCaseId);
    }
    if (rec.tone) setTone(rec.tone);
    if (rec.duration) setDuration(rec.duration);
    if (rec.tags?.length) setSelectedTags(rec.tags);
    if (rec.scene_seeds?.length) setSelectedSeeds(rec.scene_seeds);
  };

  const copyAll = () => {
    if (!output) return;
    navigator.clipboard.writeText(
      `MAIN PROMPT:\n${output.main_prompt}\n\nNEGATIVE PROMPT:\n${output.negative_prompt}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools = mode === "video" ? VIDEO_TOOLS : IMAGE_TOOLS;
  const qScore = output?.quality_score || 0;
  const qColor = qScore >= 92 ? "var(--green)" : qScore >= 82 ? "var(--gold)" : "#F87171";
  const dScore = output?.detail_accuracy || 0;
  const dColor = dScore >= 90 ? "var(--green)" : dScore >= 75 ? "var(--gold)" : "#F87171";
  const tagsIntegrated = (output as any)?.tags_integrated as number | undefined;
  const promptBreakdown = (output as any)?.prompt_breakdown as Record<string, string> | undefined;
  const hasBreakdown = promptBreakdown && Object.keys(promptBreakdown).length > 0;
  const canAnalyze = !!imageBase64 && !isAnalyzing && !isLoading;
  const canGenerate = (!!imageBase64 || !!text.trim() || selectedSeeds.length > 0) && !isLoading && !isAnalyzing;

  const tabs = [
    { id: "prompt", label: "Prompt" },
    { id: "preview", label: previews.length > 0 ? `Vorschau (${previews.length})` : "Vorschau" },
    { id: "breakdown", label: `Breakdown${hasBreakdown ? ` (${Object.keys(promptBreakdown!).length})` : ""}` },
    { id: "layers", label: "Ebenen" },
    { id: "tools", label: "Tools" },
    { id: "analyse", label: "Rohdaten" },
    { id: "final", label: output ? "Final ✦" : "Final" },
  ];

  // ─── Final Prompt Builders ────────────────────────────────────

  const buildFinalText = (): string => {
    if (!output) return "";
    const sep = "═══════════════════════════════════════════════════";
    const line = "───────────────────────────────────────────────────";
    const layers = output.layers;
    const parts: string[] = [];

    parts.push(sep);
    parts.push("  FINAL PROMPT — PromptArchitect Pro");
    parts.push(sep);

    parts.push("\n▸ MAIN PROMPT");
    parts.push(line);
    parts.push(output.main_prompt);

    if (selectedScene) {
      parts.push("\n▸ SCENE CONTEXT");
      parts.push(line);
      parts.push(`${selectedScene.title} — ${selectedScene.environment}`);
      parts.push(selectedScene.scenario);
      parts.push(`Mood: ${selectedScene.mood}`);
    }

    parts.push("\n▸ LAYERS");
    parts.push(line);
    if (layers.world)     parts.push(`WORLD      : ${layers.world}`);
    if (layers.subject)   parts.push(`SUBJECT    : ${layers.subject}`);
    if (layers.motion)    parts.push(`MOTION     : ${layers.motion}`);
    if (layers.lighting)  parts.push(`LIGHTING   : ${layers.lighting}`);
    if (layers.lens)      parts.push(`LENS       : ${layers.lens}`);
    if (layers.color)     parts.push(`COLOR      : ${layers.color}`);
    if (layers.physics)   parts.push(`PHYSICS    : ${layers.physics}`);
    if (layers.intention) parts.push(`INTENTION  : ${layers.intention}`);

    // Breakdown
    const breakdown = (output as any).prompt_breakdown as Record<string, string> | undefined;
    if (breakdown && Object.keys(breakdown).length > 0) {
      parts.push("\n▸ PROMPT BREAKDOWN");
      parts.push(line);
      Object.entries(breakdown).forEach(([tag, explanation]) => {
        parts.push(`[${tag}]`);
        parts.push(`  ${explanation}`);
      });
    }

    parts.push("\n▸ NEGATIVE PROMPT");
    parts.push(line);
    parts.push(output.negative_prompt);

    // Gemini Rohdaten
    if (geminiAnalysis && Object.keys(geminiAnalysis).length > 0) {
      parts.push("\n▸ SOURCE ANALYSIS — Gemini Vision");
      parts.push(line);
      Object.entries(geminiAnalysis).forEach(([k, v]) => {
        parts.push(`${k.toUpperCase().padEnd(16)}: ${String(v)}`);
      });
    }

    if (output.recommended_tool) {
      parts.push("\n▸ RECOMMENDED TOOL");
      parts.push(line);
      parts.push(output.recommended_tool);
    }

    if (output.ghost_director) {
      parts.push("\n▸ CREATIVE DIRECTION");
      parts.push(line);
      parts.push(`"${output.ghost_director}"`);
    }

    if (output.use_case_notes) {
      parts.push("\n▸ USE CASE NOTES");
      parts.push(line);
      parts.push(output.use_case_notes);
    }

    parts.push("\n▸ METADATA");
    parts.push(line);
    parts.push(`Tone: ${tone}  ·  Mode: ${mode.toUpperCase()}  ·  ${mode === "video" ? `${duration}s` : "Image"}  ·  Use Case: ${useCase}`);
    if (selectedTags.length > 0) parts.push(`Tags: ${selectedTags.join(", ")}`);
    parts.push(`Quality: ${output.quality_score}%  ·  Detail Accuracy: ${output.detail_accuracy}%`);

    parts.push("\n" + sep);
    parts.push("  Generated by PromptArchitect Pro");
    parts.push(sep);

    return parts.join("\n");
  };

  const buildFinalJson = (): string => {
    if (!output) return "{}";
    const obj: Record<string, any> = {
      finalPrompt: output.main_prompt,
      negativePrompt: output.negative_prompt,
      sceneContext: selectedScene
        ? {
            title: selectedScene.title,
            scenario: selectedScene.scenario,
            environment: selectedScene.environment,
            mood: selectedScene.mood,
          }
        : null,
      layers: output.layers,
      promptBreakdown: (output as any).prompt_breakdown ?? {},
      sourceAnalysis: geminiAnalysis ?? null,
      recommendedTool: output.recommended_tool,
      ghostDirector: output.ghost_director,
      useCaseNotes: output.use_case_notes,
      metadata: {
        tone,
        mode,
        ...(mode === "video" ? { duration } : {}),
        useCase,
        activeTags: selectedTags,
        qualityScore: output.quality_score,
        detailAccuracy: output.detail_accuracy,
        tagsIntegrated: (output as any).tags_integrated ?? null,
      },
    };
    return JSON.stringify(obj, null, 2);
  };

  const downloadFinal = () => {
    const content = finalFormat === "json" ? buildFinalJson() : buildFinalText();
    const ext = finalFormat === "json" ? "json" : "txt";
    const mime = finalFormat === "json" ? "application/json" : "text/plain";
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `promptarchitect-final-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div
      className="flex flex-col"
      style={{ height: "100vh", background: "var(--bg)", overflow: "hidden" }}
      role="application"
      aria-label="PromptArchitect Pro"
    >

      {/* ── HEADER ────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-6 h-14 sticky top-0 z-50"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(12,12,14,0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-baseline gap-2.5">
          <span
            className="text-[16px] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            PromptArchitect
          </span>
          <span
            className="text-[9px] font-medium tracking-widest px-2 py-0.5 rounded"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
              border: "1px solid rgba(255,77,0,0.35)",
              background: "rgba(255,77,0,0.06)",
            }}
          >
            PRO
          </span>
          <span
            className="text-[10px] ml-1"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            by AIJantaStack
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Pipeline status */}
          <div
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <PipelineDot
              label="Gemini"
              status={step === 0 ? "idle" : step === 1 ? "active" : "done"}
              activeColor="var(--blue)"
            />
            <div className="w-4 h-px" style={{ background: "var(--border2)" }} />
            <PipelineDot
              label="Claude"
              status={step < 2 ? "idle" : step === 2 ? "active" : "done"}
              activeColor="var(--accent)"
            />
          </div>

          {/* Mode toggle */}
          <div
            className="flex p-0.5 rounded-lg gap-0.5"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {(["video", "image"] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                aria-label={m === "video" ? "Video-Modus" : "Bild-Modus"}
                className="px-3.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  background: mode === m
                    ? (m === "video" ? "var(--accent)" : "var(--gold)")
                    : "transparent",
                  color: mode === m
                    ? (m === "video" ? "#fff" : "#000")
                    : "var(--text-muted)",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                {m === "video" ? "▶ Video" : "◼ Bild"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ───────────────────────────────────────── */}
      <div
        id="main-content"
        className="flex flex-1"
        style={{ overflow: "hidden", minWidth: 0 }}
      >

        {/* ═══════════════════════════════════════════════════════
            INPUT SIDEBAR (fixed 420px)
        ═══════════════════════════════════════════════════════ */}
        <aside
          className="flex flex-col"
          style={{
            flex: "1 1 0",
            minWidth: 0,
            overflow: "hidden",
            borderRight: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

            {/* ① USE CASE */}
            <div className="card p-4">
              <div className="section-label mb-3">
                <span className="section-label-dot" style={{ background: "var(--accent)" }} />
                Verwendungszweck
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {USE_CASES.map(uc => {
                  const isRec = recommendations?.use_case === uc.id;
                  const isSelected = useCase === uc.id;
                  return (
                    <Tooltip key={uc.id} data={USE_CASE_TOOLTIPS[uc.id] || { short: uc.description }}>
                      <button
                        onClick={() => { setUseCase(uc.id); setSelectedTags([]); }}
                        className={`usecase-btn${isSelected ? " selected" : ""}${isRec && !isSelected ? " ai-rec" : ""}`}
                        style={{ position: "relative" }}
                      >
                        {isRec && !isSelected && (
                          <span
                            className="absolute -top-1.5 -right-1.5 text-[7px] font-bold px-1 py-0.5 rounded"
                            style={{
                              fontFamily: "var(--font-mono)",
                              background: "var(--accent)",
                              color: "#fff",
                              letterSpacing: "0.05em",
                            }}
                          >
                            AI
                          </span>
                        )}
                        <span className="text-[14px]" aria-hidden="true">{uc.icon}</span>
                        <span
                          className="text-[9px] font-semibold uppercase tracking-wide leading-tight text-center"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {uc.label}
                        </span>
                      </button>
                    </Tooltip>
                  );
                })}
              </div>

              {/* Use case hint */}
              <div
                className="mt-2.5 px-3 py-2 rounded-md text-[11px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(255,77,0,0.04)",
                  border: "1px solid rgba(255,77,0,0.08)",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>► </span>
                {currentUseCase.description}
              </div>

              {/* Analyze button */}
              {imageBase64 && (
                <button
                  onClick={analyzeOnly}
                  disabled={!canAnalyze && !geminiDone}
                  className={`btn-analyze mt-3${isAnalyzing ? " loading" : geminiDone ? " done" : canAnalyze ? " ready" : ""}`}
                >
                  {isAnalyzing ? (
                    <span style={{ animation: "pulse 1.2s infinite" }}>
                      Gemini analysiert Tags…
                    </span>
                  ) : geminiDone ? (
                    <>
                      <span style={{ color: "var(--gold)" }}>✓</span>
                      Tags analysiert — erneut analysieren
                    </>
                  ) : (
                    <>
                      <span>◎</span>
                      Tags analysieren
                    </>
                  )}
                </button>
              )}

              {recommendations && !recDismissed && (
                <div className="mt-3">
                  <RecommendationBanner
                    recommendations={recommendations}
                    onApply={applyRecommendations}
                    onDismiss={() => setRecDismissed(true)}
                  />
                </div>
              )}
            </div>

            {/* ② IMAGE UPLOAD */}
            <div className="card p-4">
              <div className="section-label mb-3">
                <span className="section-label-dot" style={{ background: "var(--gold)" }} />
                Bild-Referenz
                {geminiDone && (
                  <span
                    className="ml-auto text-[9px]"
                    style={{ color: "var(--gold)", fontFamily: "var(--font-mono)" }}
                  >
                    ✓ Analysiert
                  </span>
                )}
              </div>

              {imagePreview ? (
                <div
                  className="relative rounded-lg overflow-hidden"
                  style={{ border: "1px solid rgba(255,77,0,0.25)" }}
                >
                  <img
                    src={imagePreview}
                    alt="Referenz"
                    className="w-full block"
                    style={{ objectFit: "contain", maxHeight: 480 }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}
                  >
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: "var(--font-mono)", color: geminiAnalysis ? "var(--gold)" : "var(--text-muted)" }}
                    >
                      {geminiAnalysis ? "✓ Gemini Analyse abgeschlossen" : "Bereit für Gemini Analyse"}
                    </span>
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setImageBase64(null);
                        setGeminiAnalysis(null);
                        setGeminiDone(false);
                        setRecommendations(null);
                        setRecDismissed(false);
                      }}
                      aria-label="Bild entfernen"
                      className="flex items-center justify-center w-6 h-6 rounded-full text-sm transition-colors duration-150"
                      style={{
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Bild hochladen — klicken oder Datei hierher ziehen"
                  onClick={() => fileRef.current?.click()}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileRef.current?.click(); }
                  }}
                  onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                  onDragOver={e => e.preventDefault()}
                  className="flex flex-col items-center justify-center gap-3 rounded-lg transition-all duration-150 cursor-pointer group"
                  style={{
                    border: "1.5px dashed var(--border2)",
                    background: "var(--surface2)",
                    padding: "32px 20px",
                    textAlign: "center",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,77,0,0.4)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,77,0,0.03)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)";
                    (e.currentTarget as HTMLDivElement).style.background = "var(--surface2)";
                  }}
                >
                  <div className="text-3xl opacity-20" aria-hidden="true">⬆</div>
                  <div>
                    <div
                      className="text-[12px] font-medium mb-1"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                    >
                      Produkt / Referenzbild hochladen
                    </div>
                    <div
                      className="text-[10px] leading-relaxed"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    >
                      Drag & Drop oder klicken<br />
                      Gemini Flash extrahiert alle visuellen Details
                    </div>
                  </div>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                aria-label="Bilddatei auswählen"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {/* Gemini Analysis Preview */}
            {geminiAnalysis && (
              <div
                className="rounded-lg p-3.5"
                style={{
                  background: "var(--blue-subtle)",
                  border: "1px solid rgba(59,130,246,0.15)",
                  animation: "fadeUp 0.3s ease",
                }}
              >
                <div
                  className="text-[9px] uppercase tracking-widest mb-2.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--blue)" }}
                >
                  ✓ Gemini Analyse — Extrahierte Details
                </div>
                {Object.entries(geminiAnalysis).slice(0, 5).map(([k, v]) => (
                  <div key={k} className="grid gap-2 mb-1.5" style={{ gridTemplateColumns: "72px 1fr" }}>
                    <span
                      className="text-[9px] uppercase tracking-wide"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--blue)" }}
                    >
                      {k}
                    </span>
                    <span
                      className="text-[11px] leading-snug"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
                    >
                      {String(v).slice(0, 110)}{String(v).length > 110 ? "…" : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* ③ SETTINGS */}
            <div className="card p-4">
              <div className="section-label mb-3">
                <span className="section-label-dot" style={{ background: "var(--text-muted)" }} />
                Setup
              </div>
              <div className={`grid gap-3 ${mode === "video" ? "grid-cols-2" : "grid-cols-1"}`}>
                {/* Tone */}
                <div>
                  <label
                    htmlFor="tone-select"
                    className="block text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                  >
                    Tonalität
                    {recommendations?.tone && tone !== recommendations.tone && (
                      <span
                        className="text-[8px] px-1.5 py-0.5 rounded tracking-wide"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--accent)",
                          background: "var(--accent-subtle)",
                          animation: "recTagGlow 2s infinite",
                        }}
                        aria-label={`KI empfiehlt: ${recommendations.tone}`}
                      >
                        → {recommendations.tone}
                      </span>
                    )}
                  </label>
                  <select
                    id="tone-select"
                    value={tone}
                    onChange={e => setTone(e.target.value)}
                    className={`form-select${recommendations?.tone && tone !== recommendations.tone ? " rec" : ""}`}
                  >
                    {[
                      ["luxury", "Luxus / High-End"],
                      ["documentary", "Dokumentarisch / Roh"],
                      ["editorial", "Editorial / Fashion"],
                      ["dark", "Dunkel / Dramatisch"],
                      ["artistic", "Künstlerisch / Abstrakt"],
                      ["commercial", "Kommerziell / Klar"],
                    ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  {TONE_TOOLTIPS[tone] && (
                    <div
                      className="hint mt-1.5 text-[10px]"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {TONE_TOOLTIPS[tone].short}
                    </div>
                  )}
                </div>

                {/* Duration (video only) */}
                {mode === "video" && (
                  <div>
                    <label
                      htmlFor="duration-select"
                      className="block text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    >
                      Videolänge
                      {recommendations?.duration && duration !== recommendations.duration && (
                        <span
                          className="text-[8px] px-1.5 py-0.5 rounded tracking-wide"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--green)",
                            background: "var(--green-subtle)",
                            animation: "recTagGlow 2s infinite",
                          }}
                          aria-label={`KI empfiehlt: ${recommendations.duration} Sekunden`}
                        >
                          → {recommendations.duration}s
                        </span>
                      )}
                    </label>
                    <select
                      id="duration-select"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className={`form-select${recommendations?.duration && duration !== recommendations.duration ? " rec" : ""}`}
                    >
                      {[
                        ["3", "3 Sek — Micro"],
                        ["5", "5 Sek — Standard"],
                        ["8", "8 Sek — Hero Shot"],
                        ["15", "15 Sek — Feature"],
                      ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    {DURATION_TOOLTIPS[duration] && (
                      <div
                        className="hint mt-1.5 text-[10px]"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {DURATION_TOOLTIPS[duration].short}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Intent textarea */}
              <div className="mt-3">
                <label
                  htmlFor="intention-input"
                  className="block text-[10px] uppercase tracking-widest mb-1.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                  Intention{" "}
                  <span style={{ color: "var(--text-muted)", textTransform: "none", letterSpacing: 0, opacity: 0.7 }}>
                    (optional)
                  </span>
                </label>
                <textarea
                  id="intention-input"
                  rows={3}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="z.B. mysteriöse Atmosphäre, luxuriöse Wirkung, Fokus auf Handwerkskunst..."
                  className="form-textarea"
                />
              </div>
            </div>

            {/* ④ ORCHESTRA LIBRARY */}
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="section-label flex-1">
                  <span className="section-label-dot" style={{ background: "#A78BFA" }} />
                  Orchestra Library
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="btn-ghost text-[9px]"
                  >
                    Leeren ({selectedTags.length})
                  </button>
                )}
              </div>

              {selectedTags.length > 0 && (
                <div
                  className="px-3 py-2 rounded-md mb-3 flex items-center gap-2 text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "rgba(255,77,0,0.05)",
                    border: "1px solid rgba(255,77,0,0.12)",
                    color: "#FF6622",
                  }}
                >
                  <span
                    className="text-[8px] uppercase tracking-widest"
                    style={{ color: "var(--accent)" }}
                  >
                    AKTIV
                  </span>
                  <span>{selectedTags.length} Tags ausgewählt</span>
                </div>
              )}

              {/* Library tab bar */}
              <LibraryTabScroller>
                {filteredLibrary.map(cat => {
                  const isActive = cat.id === activeCategoryId;
                  const selCount = cat.entries.filter(e => selectedTags.includes(e.label)).length;
                  const recCount = cat.entries.filter(
                    e => recommendations?.tags?.includes(e.label) && !selectedTags.includes(e.label)
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${cat.label}${recCount > 0 ? `, ${recCount} KI-Empfehlungen` : ""}${selCount > 0 ? `, ${selCount} ausgewählt` : ""}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveLibraryCategory(cat.id)}
                      onKeyDown={e => {
                        const ids = filteredLibrary.map(c => c.id);
                        const idx = ids.indexOf(cat.id);
                        if (e.key === "ArrowRight") { e.preventDefault(); setActiveLibraryCategory(ids[(idx + 1) % ids.length]); }
                        if (e.key === "ArrowLeft") { e.preventDefault(); setActiveLibraryCategory(ids[(idx - 1 + ids.length) % ids.length]); }
                      }}
                      className="lib-tab"
                      style={{
                        color: isActive ? cat.color : "var(--text-muted)",
                        background: isActive ? `${cat.color}10` : "transparent",
                        borderBottom: isActive ? `2px solid ${cat.color}` : "2px solid transparent",
                        marginBottom: -1,
                        flexShrink: 0,
                      }}
                    >
                      {cat.label}
                      {recCount > 0 && (
                        <span
                          className="ml-1.5 text-[7px] px-1 py-0.5 rounded-full"
                          style={{
                            background: "var(--accent)",
                            color: "#fff",
                            fontFamily: "var(--font-mono)",
                            animation: "recTagGlow 2s ease-in-out infinite",
                          }}
                        >
                          {recCount}
                        </span>
                      )}
                      {selCount > 0 && (
                        <span
                          className="ml-1 text-[7px] px-1 py-0.5 rounded-full"
                          style={{ background: cat.color, color: "#000", fontFamily: "var(--font-mono)" }}
                        >
                          {selCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </LibraryTabScroller>

              {/* Tags for active category */}
              {filteredLibrary
                .filter(cat => cat.id === activeCategoryId)
                .map(cat => (
                  <div key={cat.id} className="flex flex-wrap" style={{ margin: -3 }}>
                    {cat.entries.map(entry => (
                      <TagWithTooltip
                        key={entry.label}
                        label={entry.label}
                        color={cat.color}
                        selected={selectedTags.includes(entry.label)}
                        recommended={!!(recommendations?.tags?.includes(entry.label))}
                        onClick={() => toggleTag(entry.label)}
                        promptContribution={entry.promptContribution}
                      />
                    ))}
                  </div>
                ))}
            </div>

            {/* ⑤ SCENE LIBRARY */}
            <div className="card p-4">
              <div className="section-label mb-3">
                <span className="section-label-dot" style={{ background: "#38BDF8" }} />
                Scene Library
                <span
                  className="ml-auto text-[9px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                  Kombinierbar
                </span>
                {selectedSeeds.length > 0 && (
                  <button onClick={() => setSelectedSeeds([])} className="btn-ghost text-[9px]">
                    Leeren ({selectedSeeds.length})
                  </button>
                )}
              </div>

              {selectedSeeds.length > 0 && (
                <div
                  className="px-3 py-2 rounded-md mb-3 flex items-center gap-2 text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "rgba(167,139,250,0.05)",
                    border: "1px solid rgba(167,139,250,0.2)",
                    color: "#A78BFA",
                  }}
                >
                  <span className="text-[8px] uppercase tracking-widest">AKTIV</span>
                  <span style={{ color: "var(--text-secondary)" }}>{selectedSeeds.length} Seeds</span>
                </div>
              )}

              {SCENE_LIBRARY.map(cat => (
                <div key={cat.id} className="mb-3">
                  <div
                    className="text-[9px] uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: `${cat.color}80` }}
                  >
                    {cat.label}
                  </div>
                  <div className="flex flex-wrap" style={{ margin: -3 }}>
                    {cat.entries.map(entry => {
                      const isSel = selectedSeeds.includes(entry.label);
                      const isRec = !!(recommendations?.scene_seeds?.includes(entry.label));
                      return (
                        <button
                          key={entry.label}
                          onClick={() => setSelectedSeeds(p =>
                            isSel ? p.filter(x => x !== entry.label) : [...p, entry.label]
                          )}
                          aria-pressed={isSel}
                          aria-label={`${entry.label}${isRec ? " — KI-empfohlen" : ""}${isSel ? " — ausgewählt" : ""}`}
                          className="tag-pill"
                          style={{
                            margin: 3,
                            position: "relative",
                            border: `1px solid ${isSel ? cat.color : isRec ? `${cat.color}70` : `${cat.color}30`}`,
                            background: isSel ? `${cat.color}20` : isRec ? `${cat.color}10` : `${cat.color}08`,
                            color: isSel ? cat.color : isRec ? `${cat.color}dd` : "var(--text-muted)",
                            boxShadow: isRec ? `0 0 5px ${cat.color}35` : "none",
                            animation: isRec ? "recTagGlow 2.5s ease-in-out infinite" : "none",
                          }}
                        >
                          {entry.label}
                          {isRec && (
                            <span
                              aria-hidden="true"
                              style={{
                                position: "absolute", top: 0, right: 0,
                                width: 7, height: 7, borderRadius: "50%",
                                background: isSel ? "var(--gold)" : "var(--accent)",
                                boxShadow: `0 0 4px ${isSel ? "var(--gold)" : "var(--accent)"}`,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* ⑥ SCENE ORCHESTRATOR */}
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="section-label flex-1">
                  <span className="section-label-dot" style={{ background: "var(--accent)" }} />
                  Szenen-Orchestrator
                </div>
                {selectedScene && (
                  <button
                    onClick={() => setSelectedScene(null)}
                    className="btn-ghost text-[9px]"
                    style={{ color: "var(--accent)" }}
                  >
                    Entfernen
                  </button>
                )}
              </div>

              {selectedScene && (
                <div
                  className="px-3 py-2 rounded-md mb-3 flex items-center gap-2 text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "var(--accent-subtle)",
                    border: "1px solid rgba(255,77,0,0.25)",
                    color: "var(--accent)",
                  }}
                >
                  <span className="text-[8px] uppercase tracking-widest">AKTIV</span>
                  <span style={{ color: "var(--text-secondary)" }}>{selectedScene.title}</span>
                </div>
              )}

              <button
                onClick={generateScenes}
                disabled={isGeneratingScenes || isLoading || (!geminiAnalysis && !text.trim() && selectedSeeds.length === 0)}
                className="btn-secondary w-full mb-3"
              >
                {isGeneratingScenes ? (
                  <span style={{ animation: "pulse 1.2s infinite" }}>Szenarien generieren…</span>
                ) : scenes.length > 0 ? (
                  "Neue Szenarien generieren"
                ) : (
                  "Szenarien generieren →"
                )}
              </button>

              {scenes.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {scenes.map(scene => {
                    const isSel = selectedScene?.id === scene.id;
                    return (
                      <button
                        key={scene.id}
                        onClick={() => setSelectedScene(isSel ? null : scene)}
                        className="text-left p-3 rounded-lg transition-all duration-150"
                        style={{
                          background: isSel ? "var(--accent-subtle)" : "var(--surface2)",
                          border: `1px solid ${isSel ? "rgba(255,77,0,0.35)" : "var(--border)"}`,
                          boxShadow: isSel ? "0 0 12px rgba(255,77,0,0.1)" : "none",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className="text-[11px] font-semibold mb-1.5 leading-tight"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: isSel ? "var(--accent)" : "var(--text-secondary)",
                          }}
                        >
                          {scene.title}
                        </div>
                        <div
                          className="text-[10px] leading-snug mb-1.5 line-clamp-3"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                        >
                          {scene.scenario}
                        </div>
                        <div
                          className="text-[9px]"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: isSel ? "rgba(255,77,0,0.6)" : "var(--text-muted)",
                          }}
                        >
                          {scene.mood}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>{/* end scrollable */}

          {/* Sticky generate footer */}
          <div
            className="p-4 flex flex-col gap-3"
            style={{
              borderTop: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            {/* Summary tag */}
            {selectedTags.length > 0 && (
              <div
                className="px-3 py-1.5 rounded-md text-[9px] tracking-wide"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(16,185,129,0.04)",
                  border: "1px solid rgba(16,185,129,0.1)",
                  color: "rgba(16,185,129,0.5)",
                  letterSpacing: "0.05em",
                }}
              >
                ✓ {selectedTags.length} Tags · {tone} · {mode === "video" ? `${duration}s` : "Bild"} · {useCase}
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={!canGenerate}
              className="btn-primary"
              style={{ position: "relative" }}
            >
              {step === 1 ? (
                <span style={{ animation: "pulse 1.2s infinite" }}>
                  Gemini analysiert Bild…
                </span>
              ) : step === 2 ? (
                <span style={{ animation: "pulse 1.2s infinite" }}>
                  Claude erstellt Prompt…
                </span>
              ) : (
                <>
                  <span>{currentUseCase.icon}</span>
                  {mode === "video" ? "Video" : "Bild"} Prompt generieren
                  {!isLoading && " →"}
                </>
              )}
              {isLoading && (
                <span
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{
                    width: "50%",
                    background: step === 1 ? "var(--blue)" : "rgba(255,255,255,0.5)",
                    animation: "slideBar 1.4s ease-in-out infinite",
                  }}
                />
              )}
            </button>

            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="px-3 py-2.5 rounded-lg text-[11px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(248,113,113,0.06)",
                  border: "1px solid rgba(248,113,113,0.18)",
                  color: "#F87171",
                }}
              >
                <span aria-hidden="true">⚠ </span>{error}
              </div>
            )}
          </div>
        </aside>

        {/* ═══════════════════════════════════════════════════════
            OUTPUT PANEL (flex)
        ═══════════════════════════════════════════════════════ */}
        <section
          className="flex flex-col"
          style={{
            flex: "1 1 0",
            minWidth: 0,
            overflow: "hidden",
            background: "#0A0A0C",
          }}
        >
          {/* Tab bar + copy */}
          <div
            className="flex items-center justify-between px-5 shrink-0"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div role="tablist" aria-label="Ausgabe-Ansichten" className="tab-bar border-0 flex-1">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeTab === id}
                  aria-controls={`tabpanel-${id}`}
                  id={`tab-${id}`}
                  onClick={() => setActiveTab(id)}
                  onKeyDown={e => {
                    const ids = tabs.map(t => t.id);
                    const idx = ids.indexOf(id);
                    if (e.key === "ArrowRight") { e.preventDefault(); setActiveTab(ids[(idx + 1) % ids.length]); }
                    if (e.key === "ArrowLeft") { e.preventDefault(); setActiveTab(ids[(idx - 1 + ids.length) % ids.length]); }
                  }}
                  tabIndex={activeTab === id ? 0 : -1}
                  className={`tab-item${activeTab === id ? (id === "breakdown" ? " gold-active" : " active") : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {output && (
              <button onClick={copyAll} className={`copy-btn${copied ? " copied" : ""}`}>
                {copied ? "✓ Kopiert" : "⎘ Alles kopieren"}
              </button>
            )}
          </div>

          {/* Output content */}
          <div
            className="flex-1 overflow-y-auto p-5"
            aria-live="polite"
            aria-atomic="false"
          >
            {/* ── Empty state ── */}
            {!output && step === 0 && (
              <div className="h-full flex flex-col items-center justify-center gap-5 text-center opacity-25 select-none">
                <div className="text-5xl" aria-hidden="true">◈</div>
                <div
                  className="text-xl italic"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-secondary)" }}
                >
                  Deine Vision wartet
                </div>
                <div
                  className="text-[11px] leading-loose max-w-[260px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                  Tags wählen → generieren → im Breakdown Tab siehst du wie jeder Tag angewendet wurde
                </div>
              </div>
            )}

            {/* ── Loading state ── */}
            {isLoading && !output && (
              <div
                role="status"
                aria-live="polite"
                aria-label={step === 1 ? "Gemini analysiert Bild" : "Claude erstellt Prompt"}
                className="h-full flex flex-col items-center justify-center gap-5"
              >
                <div
                  className="text-4xl"
                  style={{ animation: "pulse 1.2s infinite" }}
                  aria-hidden="true"
                >
                  ◈
                </div>
                <div
                  className="text-lg italic"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}
                >
                  {step === 1 ? "Gemini liest dein Bild…" : "Claude erstellt den Prompt…"}
                </div>
                <div
                  className="text-[10px] text-center leading-loose tracking-wide"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                  {step === 1 ? "Farben · Materialien · Licht · Details" : "Bild-Daten + Tags + Breakdown → Prompt"}
                </div>
              </div>
            )}

            {/* ── Output ── */}
            {output && (
              <div
                className="flex flex-col gap-4"
                style={{ animation: "fadeUp 0.35s ease" }}
              >
                {/* Score Bars */}
                <div className="flex flex-col gap-2">
                  <ScoreBar label="Prompt Qualität" value={qScore} color={qColor} tooltipKey="quality_score" />
                  <ScoreBar label="Detail-Genauigkeit" value={dScore} color={dColor} tooltipKey="detail_accuracy" />

                  {selectedTags.length > 0 && tagsIntegrated !== undefined && (
                    <Tooltip data={{
                      short: `${tagsIntegrated} von ${selectedTags.length} Tags wurden integriert.`,
                      profi_tipp: tagsIntegrated < selectedTags.length
                        ? "Breakdown Tab öffnen um zu sehen welche Tags fehlen."
                        : "Alle Tags erfolgreich integriert.",
                    }}>
                      <div
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer"
                        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                      >
                        <span
                          className="text-[10px] uppercase tracking-widest whitespace-nowrap"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", minWidth: 110 }}
                        >
                          Tags integriert
                        </span>
                        <div
                          className="flex-1 h-[3px] rounded-full overflow-hidden"
                          style={{ background: "var(--surface3)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${(tagsIntegrated / selectedTags.length) * 100}%`,
                              background: tagsIntegrated === selectedTags.length ? "var(--green)" : "var(--gold)",
                            }}
                          />
                        </div>
                        <span
                          className="text-[13px] font-medium text-right"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: tagsIntegrated === selectedTags.length ? "var(--green)" : "var(--gold)",
                            minWidth: 46,
                          }}
                        >
                          {tagsIntegrated}/{selectedTags.length}
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </div>

                {/* Ghost Director */}
                {output.ghost_director && (
                  <Tooltip data={OUTPUT_TOOLTIPS["ghost_director"] || { short: "Unsichtbare Regie-Philosophie" }}>
                    <div
                      className="px-4 py-3 rounded-lg text-[13px] italic leading-relaxed cursor-pointer"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: "rgba(255,77,0,0.03)",
                        border: "1px solid rgba(255,77,0,0.08)",
                        color: "var(--text-muted)",
                      }}
                    >
                      "{output.ghost_director}"
                    </div>
                  </Tooltip>
                )}

                {/* Use Case Note */}
                {output.use_case_notes && (
                  <div
                    className="px-3 py-2 rounded-lg text-[11px] leading-relaxed flex gap-2.5 items-start"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: "var(--green-subtle)",
                      border: "1px solid rgba(16,185,129,0.12)",
                      color: "rgba(16,185,129,0.7)",
                    }}
                  >
                    <span>{currentUseCase.icon}</span>
                    <span className="flex-1">{output.use_case_notes}</span>
                    <span
                      className="text-[8px] uppercase tracking-widest whitespace-nowrap pt-0.5 opacity-50"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tone.toUpperCase()} · {mode === "video" ? `${duration}S` : "IMG"}
                    </span>
                  </div>
                )}

                {/* ── PROMPT TAB ── */}
                {activeTab === "prompt" && (
                  <div role="tabpanel" id="tabpanel-prompt" aria-labelledby="tab-prompt" className="flex flex-col gap-4">
                    <div>
                      <div
                        className="flex items-center gap-2.5 mb-2.5"
                        style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 10 }}
                      >
                        <span className="section-label">Haupt-Prompt</span>
                        <span
                          className="text-[9px] uppercase tracking-wide"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                        >
                          EN · Copy & Paste
                        </span>
                      </div>
                      <div className="prompt-block">{output.main_prompt}</div>
                    </div>

                    <div>
                      <div
                        className="flex items-center gap-2.5 mb-2.5"
                        style={{ borderLeft: "3px solid #F87171", paddingLeft: 10 }}
                      >
                        <span className="section-label">Negative Prompt</span>
                      </div>
                      <div
                        className="prompt-block"
                        style={{ color: "#FCA5A5", borderLeft: "3px solid #F87171" }}
                      >
                        {output.negative_prompt}
                      </div>
                    </div>

                    {hasBreakdown && (
                      <div
                        className="px-3 py-2.5 rounded-lg flex items-center gap-2.5 text-[10px]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: "rgba(245,158,11,0.04)",
                          border: "1px solid rgba(245,158,11,0.1)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <span>◈</span>
                        <span>
                          {Object.keys(promptBreakdown!).length} Tags erklärt im{" "}
                          <button
                            onClick={() => setActiveTab("breakdown")}
                            style={{
                              background: "none", border: "none",
                              color: "var(--gold)", cursor: "pointer",
                              fontFamily: "var(--font-mono)", fontSize: 10,
                              padding: "0 2px", textDecoration: "underline",
                            }}
                          >
                            Breakdown Tab
                          </button>
                          {" "}— sieh wie jeder Tag angewendet wurde
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* ── PREVIEW TAB ── */}
                {activeTab === "preview" && (
                  <div
                    id="tabpanel-preview"
                    role="tabpanel"
                    aria-labelledby="tab-preview"
                    className="flex-1 overflow-y-auto"
                  >
                    {/* Collapsible Debug Log */}
                    <div
                      className="mb-4 rounded border border-zinc-800/50 font-mono text-[9px] overflow-hidden"
                      style={{ background: "var(--surface2)" }}
                    >
                      <button
                        onClick={() => setDebugOpen(p => !p)}
                        className="w-full flex justify-between items-center p-2 px-3"
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}
                      >
                        <span className="uppercase text-[8px] text-zinc-500 tracking-widest">Debug-System</span>
                        <div className="flex gap-2 items-center">
                          <span className={output ? "text-green-500" : "text-zinc-600"}>● Prompt</span>
                          <span className={imageBase64 ? "text-green-500" : "text-zinc-600"}>● Image</span>
                          <span className={isGeneratingPreviews ? "text-blue-500" : "text-zinc-600"}>● Active</span>
                          <span className="text-zinc-600 ml-1">{debugOpen ? "▲" : "▼"}</span>
                        </div>
                      </button>
                      {debugOpen && (
                        <div className="p-2 px-3 border-t border-zinc-800/50">
                          {debugLog.length > 0 ? (
                            <div className="space-y-0.5 text-zinc-400">
                              {debugLog.map((log, i) => <div key={i}>{log}</div>)}
                            </div>
                          ) : (
                            <div className="text-zinc-600 italic">Warten auf Interaktion...</div>
                          )}
                        </div>
                      )}
                    </div>

                    {!output && !isGeneratingPreviews && (
                      <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-30">
                        <div className="text-4xl mb-4">🖼️</div>
                        <div className="text-[12px] font-mono">Noch keine Vorschau generiert. Erstelle zuerst einen Prompt.</div>
                      </div>
                    )}

                    {isGeneratingPreviews && (
                      <div className="preview-grid">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="preview-card">
                            <div className="preview-skeleton" />
                            <div className="preview-scene-num">{i}</div>
                            <div className="preview-badge">Wird generiert…</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!isGeneratingPreviews && previews.length > 0 && (
                      <div className="preview-grid">
                        {previews.map((url, i) => {
                          const label = getPreviewLabel(i, scenes);
                          const filename = `promptarchitect-${label.replace(/\s+/g, "-").toLowerCase()}.png`;
                          return (
                            <div key={i} className="preview-card">
                              {/* Scene number */}
                              <div className="preview-scene-num">{i + 1}</div>

                              {/* Image — click opens lightbox */}
                              <img
                                src={url}
                                alt={label}
                                style={{ cursor: "zoom-in" }}
                                onClick={() => setPreviewModal({ url, label, index: i })}
                              />

                              {/* Scene label */}
                              <div className="preview-badge">{label}</div>

                              {/* Download */}
                              <a
                                href={url}
                                download={filename}
                                onClick={e => e.stopPropagation()}
                                className="preview-download"
                                aria-label={`${label} herunterladen`}
                                title="Herunterladen"
                              >
                                ↓
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {error && (
                      <div className="p-4 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-mono">
                        ⚠ {error}
                      </div>
                    )}

                    {!isGeneratingPreviews && output && previews.length === 0 && (
                      <div className="p-10 text-center">
                        <button
                          onClick={() => {
                            if (output?.main_prompt) {
                              generatePreviews(output.main_prompt, output.layers);
                            }
                          }}
                          className="btn-secondary"
                        >
                          Vorschau manuell generieren
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── BREAKDOWN TAB ── */}
                {activeTab === "breakdown" && (
                  <div role="tabpanel" id="tabpanel-breakdown" aria-labelledby="tab-breakdown">
                    <SectionDivider label="Prompt Breakdown — Tag-Anwendung auf dieses Produkt" color="var(--gold)" />
                    {hasBreakdown ? (
                      <div className="flex flex-col gap-2">
                        <div
                          className="hint mb-2 text-[10px]"
                          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                        >
                          Jeder Eintrag zeigt wie der Tag <em>spezifisch auf dieses Produkt</em> angewendet wurde.
                        </div>
                        {Object.entries(promptBreakdown!).map(([tagLabel, explanation]) => (
                          <BreakdownRow
                            key={tagLabel}
                            tagLabel={tagLabel}
                            explanation={explanation}
                            tagColor={tagColorMap[tagLabel] || "#666"}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="text-center pt-16 text-[11px]"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                      >
                        Keine Tags ausgewählt — wähle Tags aus der Orchestra Library und generiere erneut.
                      </div>
                    )}
                  </div>
                )}

                {/* ── LAYERS TAB ── */}
                {activeTab === "layers" && output.layers && (
                  <div role="tabpanel" id="tabpanel-layers" aria-labelledby="tab-layers">
                    <SectionDivider label="Ebenen-Analyse" color="var(--gold)" />
                    <div className="flex flex-col gap-2.5">
                      {[
                        ["world", "Welt"], ["subject", "Subjekt"], ["motion", "Bewegung"],
                        ["lighting", "Licht"], ["lens", "Linse"], ["color", "Farbe"],
                        ["physics", "Physik"], ["intention", "Intention"],
                      ].map(([key, label]) => {
                        const val = output.layers[key as keyof typeof output.layers];
                        if (!val) return null;
                        return <LayerRow key={key} layerKey={key} label={label} value={val} />;
                      })}
                    </div>
                  </div>
                )}

                {/* ── TOOLS TAB ── */}
                {activeTab === "tools" && (
                  <div role="tabpanel" id="tabpanel-tools" aria-labelledby="tab-tools">
                    <SectionDivider label="Tool Empfehlung" color="var(--green)" />
                    <div className="grid grid-cols-3 gap-3">
                      {tools.map(tool => {
                        const isRec = output.recommended_tool &&
                          tool.name.toLowerCase().includes(output.recommended_tool.toLowerCase().split(" ")[0]);
                        return (
                          <div
                            key={tool.name}
                            className="rounded-lg p-4 text-center"
                            style={{
                              background: isRec ? "var(--green-subtle)" : "var(--surface)",
                              border: `1px solid ${isRec ? "rgba(16,185,129,0.35)" : "var(--border)"}`,
                            }}
                          >
                            <div
                              className="text-[13px] font-semibold mb-2"
                              style={{ fontFamily: "var(--font-display)", color: isRec ? "var(--green)" : "var(--text)" }}
                            >
                              {tool.name}
                            </div>
                            <div
                              className="text-[10px] leading-relaxed mb-2"
                              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                            >
                              {tool.use}
                            </div>
                            {isRec && (
                              <span
                                className="inline-block text-[8px] uppercase tracking-widest px-2 py-0.5 rounded"
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  background: "rgba(16,185,129,0.12)",
                                  color: "var(--green)",
                                  border: "1px solid rgba(16,185,129,0.2)",
                                }}
                              >
                                Beste Wahl
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── ANALYSIS TAB ── */}
                {activeTab === "analyse" && (
                  geminiAnalysis ? (
                    <div role="tabpanel" id="tabpanel-analyse" aria-labelledby="tab-analyse">
                      <SectionDivider label="Gemini Vision — Rohdaten" color="var(--blue)" />
                      <div className="flex flex-col gap-2">
                        {Object.entries(geminiAnalysis).map(([k, v]) => (
                          <div key={k} className="grid gap-2.5 items-start" style={{ gridTemplateColumns: "80px 1fr" }}>
                            <span
                              className="text-[9px] uppercase tracking-wide pt-1.5"
                              style={{ fontFamily: "var(--font-mono)", color: "var(--blue)" }}
                            >
                              {k}
                            </span>
                            <span
                              className="text-[12px] leading-relaxed rounded-md px-3 py-1.5"
                              style={{
                                fontFamily: "var(--font-mono)",
                                color: "var(--text-secondary)",
                                background: "var(--blue-subtle)",
                                border: "1px solid rgba(59,130,246,0.1)",
                              }}
                            >
                              {String(v)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-center pt-16 text-[11px]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    >
                      Kein Bild hochgeladen — keine Gemini Analyse verfügbar.
                    </div>
                  )
                )}

                {/* ── FINAL TAB ── */}
                {activeTab === "final" && (
                  <div role="tabpanel" id="tabpanel-final" aria-labelledby="tab-final">
                    {!output ? (
                      <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-20 opacity-30">
                        <div className="text-4xl" aria-hidden="true">✦</div>
                        <div
                          className="text-[11px]"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                        >
                          Erst Prompt generieren — dann erscheint hier der gebündelte Export.
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {/* Header: Format-Toggle + Actions */}
                        <div className="flex items-center justify-between">
                          {/* Toggle */}
                          <div
                            className="flex p-0.5 rounded-lg gap-0.5"
                            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                          >
                            {(["text", "json"] as const).map(fmt => (
                              <button
                                key={fmt}
                                onClick={() => setFinalFormat(fmt)}
                                className="px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all duration-150"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  background: finalFormat === fmt ? "var(--accent)" : "transparent",
                                  color: finalFormat === fmt ? "#fff" : "var(--text-muted)",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                {fmt === "text" ? "Fließtext" : "JSON"}
                              </button>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const content = finalFormat === "json" ? buildFinalJson() : buildFinalText();
                                navigator.clipboard.writeText(content);
                              }}
                              className="copy-btn"
                            >
                              ⎘ Kopieren
                            </button>
                            <button
                              onClick={downloadFinal}
                              className="copy-btn"
                            >
                              ↓ Download .{finalFormat === "json" ? "json" : "txt"}
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <pre
                          className="prompt-block"
                          style={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "var(--font-mono)",
                            fontSize: finalFormat === "json" ? 11 : 11.5,
                            lineHeight: 1.7,
                            color: finalFormat === "json" ? "#A8D8A8" : "var(--text-secondary)",
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderLeft: `3px solid ${finalFormat === "json" ? "var(--green)" : "var(--accent)"}`,
                            padding: "16px 20px",
                            borderRadius: 8,
                            overflowX: "auto",
                          }}
                        >
                          {finalFormat === "json" ? buildFinalJson() : buildFinalText()}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── LIGHTBOX MODAL ────────────────────────────────────── */}
      {previewModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)" }}
          onClick={() => setPreviewModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Vorschau: ${previewModal.label}`}
        >
          {/* Counter + label */}
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px]"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--text-muted)", marginRight: 8 }}>
              {previewModal.index + 1}/{previews.length}
            </span>
            {previewModal.label}
          </div>

          {/* Image */}
          <img
            src={previewModal.url}
            alt={previewModal.label}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw, 900px)",
              maxHeight: "80vh",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              objectFit: "contain",
            }}
          />

          {/* Close */}
          <button
            onClick={() => setPreviewModal(null)}
            aria-label="Schließen (Escape)"
            style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
              width: 36, height: 36, borderRadius: 8,
              cursor: "pointer", fontSize: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ×
          </button>

          {/* Prev / Next */}
          {previews.length > 1 && (
            <>
              <button
                onClick={e => {
                  e.stopPropagation();
                  const p = (previewModal.index - 1 + previews.length) % previews.length;
                  setPreviewModal({ url: previews[p], label: getPreviewLabel(p, scenes), index: p });
                }}
                aria-label="Vorheriges Bild"
                style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-secondary)",
                  width: 40, height: 40, borderRadius: 8,
                  cursor: "pointer", fontSize: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ‹
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  const n = (previewModal.index + 1) % previews.length;
                  setPreviewModal({ url: previews[n], label: getPreviewLabel(n, scenes), index: n });
                }}
                aria-label="Nächstes Bild"
                style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-secondary)",
                  width: 40, height: 40, borderRadius: 8,
                  cursor: "pointer", fontSize: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ›
              </button>
            </>
          )}

          {/* Download in lightbox */}
          <a
            href={previewModal.url}
            download={`promptarchitect-${previewModal.label.replace(/\s+/g, "-").toLowerCase()}.png`}
            onClick={e => e.stopPropagation()}
            aria-label={`${previewModal.label} herunterladen`}
            title="Herunterladen"
            style={{
              position: "absolute", bottom: 16, right: 16,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
              width: 36, height: 36, borderRadius: 8,
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
            }}
          >
            ↓
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Pipeline Dot ──────────────────────────────────────────────

function PipelineDot({
  label, status, activeColor,
}: {
  label: string;
  status: "idle" | "active" | "done";
  activeColor: string;
}) {
  const dotColor = status === "done"
    ? "var(--green)"
    : status === "active"
      ? activeColor
      : "var(--text-muted)";

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: dotColor,
          boxShadow: status === "active" ? `0 0 6px ${activeColor}` : "none",
          animation: status === "active" ? "glowPulse 1.5s infinite" : "none",
        }}
        aria-hidden="true"
      />
      <span
        className="text-[10px] font-medium tracking-wide"
        style={{ fontFamily: "var(--font-mono)", color: dotColor }}
      >
        {label}
      </span>
      {status !== "idle" && (
        <span
          className="text-[9px]"
          style={{ fontFamily: "var(--font-mono)", color: dotColor }}
        >
          {status === "done" ? "✓" : "…"}
        </span>
      )}
    </div>
  );
}
