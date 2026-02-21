"use client";

import { useState, useRef, useCallback } from "react";
import {
  USE_CASES, LIBRARY, VIDEO_TOOLS, IMAGE_TOOLS,
  type Mode, type Step, type UseCaseId,
  type GeminiAnalysis, type PromptOutput,
} from "@/lib/constants";
import { Tooltip } from "@/components/Tooltip";
import {
  USE_CASE_TOOLTIPS, TONE_TOOLTIPS, DURATION_TOOLTIPS,
  OUTPUT_TOOLTIPS, TAG_TOOLTIPS,
} from "@/lib/tooltips";
import { RecommendationBanner, type Recommendations } from "@/components/RecommendationBanner";

// ─── Helpers ──────────────────────────────────────────────────h

function getTagTooltip(label: string, promptContribution: string) {
  return TAG_TOOLTIPS[label] || { short: promptContribution };
}

// ─── Mini Components ──────────────────────────────────────────

function TagWithTooltip({
  label, color, selected, recommended, onClick, promptContribution,
}: {
  label: string; color: string; selected: boolean; recommended: boolean;
  onClick: () => void; promptContribution: string;
}) {
  return (
    <Tooltip data={getTagTooltip(label, promptContribution)}>
      <button
        onClick={onClick}
        style={{
          padding: "4px 11px", borderRadius: 20, fontSize: 11,
          overflow: "visible", margin: 4,
          fontFamily: "var(--font-mono)", cursor: "pointer", letterSpacing: "0.3px",
          border: `1px solid ${selected && recommended ? color : selected ? color : recommended ? `${color}80` : `${color}30`}`,
          background: selected && recommended ? `${color}30` : selected ? `${color}20` : recommended ? `${color}14` : `${color}08`,
          color: selected ? color : recommended ? `${color}dd` : "#555",
          boxShadow: recommended ? `0 0 6px ${color}40` : "none",
          transition: "all 0.2s",
          animation: recommended ? "recTagGlow 2.5s ease-in-out infinite" : "none",
          position: "relative",
        }}
      >
        {label}
        {recommended && (
          <span style={{
            position: "absolute", top: 0, right: 0,
            width: 8, height: 8, borderRadius: "50%",
            background: selected ? "var(--gold)" : "#ff4d00", boxShadow: selected ? "0 0 4px var(--gold)" : "0 0 4px #ff4d00",
            animation: "recTagGlow 1.5s ease-in-out infinite",
          }} />
        )}
      </button>
    </Tooltip>
  );
}

function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: 2.5, padding: "3px 10px",
        background: `${color}18`, color, borderRadius: 2,
        fontFamily: "var(--font-mono)", textTransform: "uppercase" as const,
      }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

function StepBadge({ num, label, status }: {
  num: string; label: string; status: "idle" | "active" | "done";
}) {
  const c = { idle: "#2a2a2a", active: "#ff4d00", done: "#4ade80" }[status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", border: `2px solid ${c}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 700, color: c, fontFamily: "var(--font-mono)",
        background: status === "active" ? "rgba(255,77,0,0.1)" : "transparent",
        transition: "all 0.3s",
      }}>{status === "done" ? "✓" : num}</div>
      <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: c, letterSpacing: 1 }}>
        {label}
      </span>
    </div>
  );
}

function ScoreBar({ label, value, color, tooltipKey }: {
  label: string; value: number; color: string; tooltipKey: string;
}) {
  return (
    <Tooltip data={OUTPUT_TOOLTIPS[tooltipKey] || { short: label }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12, padding: "9px 14px",
        background: "var(--surface)", borderRadius: 7, border: "1px solid var(--border)",
        cursor: "pointer",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2,
          textTransform: "uppercase" as const, color: "var(--text-dim)",
          whiteSpace: "nowrap", minWidth: 110,
        }}>{label}</span>
        <div style={{ flex: 1, height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 2, transition: "width 1.2s ease" }} />
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500,
          color, minWidth: 40, textAlign: "right" as const,
        }}>{value}%</span>
      </div>
    </Tooltip>
  );
}

function LayerRow({ layerKey, label, value }: {
  layerKey: string; label: string; value: string;
}) {
  return (
    <Tooltip data={OUTPUT_TOOLTIPS[layerKey] || { short: label }}>
      <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 10, alignItems: "start", cursor: "pointer" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)",
          textTransform: "uppercase" as const, letterSpacing: 1.5, paddingTop: 6,
        }}>{label}</span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: "#c8c4be",
          background: "var(--surface)", borderRadius: 5, padding: "6px 10px",
          border: "1px solid var(--border)", lineHeight: 1.6,
        }}>{value}</span>
      </div>
    </Tooltip>
  );
}

// ─── Breakdown Row ────────────────────────────────────────────
// New component: shows one tag + its product-specific explanation

function BreakdownRow({
  tagLabel,
  explanation,
  tagColor,
}: {
  tagLabel: string;
  explanation: string;
  tagColor: string;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 12,
      padding: "10px 14px",
      background: "var(--surface)",
      border: `1px solid var(--border)`,
      borderLeft: `3px solid ${tagColor}`,
      borderRadius: 7,
      alignItems: "start",
    }}>
      {/* Tag label pill */}
      <span style={{
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 10,
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.3px",
        border: `1px solid ${tagColor}50`,
        background: `${tagColor}12`,
        color: tagColor,
        whiteSpace: "nowrap",
        marginTop: 1,
      }}>
        {tagLabel}
      </span>
      {/* Product-specific explanation */}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "#a0a0a0",
        lineHeight: 1.65,
      }}>
        {explanation}
      </span>
    </div>
  );
}

// ─── Category color lookup ────────────────────────────────────
// Maps a tag label back to its category color for the breakdown display

function useTagColorMap() {
  const map: Record<string, string> = {};
  LIBRARY.forEach(cat => {
    cat.entries.forEach(entry => {
      map[entry.label] = cat.color;
    });
  });
  return map;
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
  const [geminiDone, setGeminiDone] = useState(false);  // true after analyze-only run
  const [isAnalyzing, setIsAnalyzing] = useState(false); // spinner for analyze button
  const [output, setOutput] = useState<PromptOutput | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("prompt");
  const [copied, setCopied] = useState(false);

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

  // ─── Analyze-only: Gemini vision + tag recommendations, no Claude ───────────
  const analyzeOnly = async () => {
    if (!imageBase64) return;
    setError("");
    setIsAnalyzing(true);
    setGeminiDone(false);
    setRecommendations(null);
    setRecDismissed(false);
    setGeminiAnalysis(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          mimeType: imageMime,
          useCaseInstruction: currentUseCase.geminiInstruction,
          mode,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGeminiAnalysis(data.analysis);
      if (data.recommendations) {
        setRecommendations(data.recommendations);
        applyRecommendations(data.recommendations);
      }
      setGeminiDone(true);
    } catch (e: any) {
      setError(e.message || "Gemini Analyse fehlgeschlagen");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generate = async () => {
    if (!imageBase64 && !text.trim()) return;
    setError("");
    setOutput(null);
    setGeminiAnalysis(null);
    setRecommendations(null);
    setRecDismissed(false);

    // Snapshot at generation time
    const snapshotTagContributions = LIBRARY
      .flatMap(cat => cat.entries)
      .filter(e => selectedTags.includes(e.label))
      .map(e => e.promptContribution);

    // Keep same order as selectedTags
    const orderedContributions = selectedTags.map(label => {
      const entry = LIBRARY.flatMap(c => c.entries).find(e => e.label === label);
      return entry?.promptContribution || "";
    });

    try {
      // If analyzeOnly was already run, reuse stored analysis — skip Gemini call
      let analysis: GeminiAnalysis | null = geminiDone
        ? (geminiAnalysis as GeminiAnalysis | null)
        : null;

      if (imageBase64 && !geminiDone) {
        setStep(1);
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64,
            mimeType: imageMime,
            useCaseInstruction: currentUseCase.geminiInstruction,
            mode,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        analysis = data.analysis;
        setGeminiAnalysis(analysis);
        if (data.recommendations) setRecommendations(data.recommendations);
      }

      setStep(2);
      const res = await fetch("/api/build-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageAnalysis: analysis || {},
          userText: text,
          tags: selectedTags,               // labels in selection order
          tagContributions: orderedContributions, // matched by index
          tone,
          duration,
          mode,
          useCase,
          useCaseInstruction: currentUseCase.claudeInstruction,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutput(data.prompt);
      setStep(3);
      setActiveTab("prompt");
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
  const qColor = qScore >= 92 ? "#4ade80" : qScore >= 82 ? "#ffd166" : "#ff6464";
  const dScore = output?.detail_accuracy || 0;
  const dColor = dScore >= 90 ? "#4ade80" : dScore >= 75 ? "#ffd166" : "#ff6464";
  const tagsIntegrated = (output as any)?.tags_integrated as number | undefined;
  const promptBreakdown = (output as any)?.prompt_breakdown as Record<string, string> | undefined;
  const hasBreakdown = promptBreakdown && Object.keys(promptBreakdown).length > 0;
  const canAnalyze = !!imageBase64 && !isAnalyzing && !isLoading;
  const canGenerate = (!!imageBase64 || !!text.trim()) && !isLoading && !isAnalyzing;

  // Tab list — breakdown tab only appears when we have data
  const tabs = [
    { id: "prompt", label: "Prompt" },
    { id: "breakdown", label: `Breakdown${hasBreakdown ? ` (${Object.keys(promptBreakdown!).length})` : ""}` },
    { id: "layers", label: "Ebenen" },
    { id: "tools", label: "Tools" },
    { id: "analyse", label: "Rohdaten" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes tooltipFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slide { 0%{left:-60%} 100%{left:120%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes recBannerIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes recTagGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,0,0.5); }
          50%       { box-shadow: 0 0 8px 2px rgba(255,77,0,0.2); }
        }
        @keyframes usecaseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,0,0.4); }
          50%       { box-shadow: 0 0 12px 3px rgba(255,77,0,0.15); }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "13px 28px", borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5 }}>PromptArchitect</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "var(--accent)", padding: "3px 8px", border: "1px solid var(--accent)", borderRadius: 2 }}>PRO v5.1</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", marginLeft: 6 }}>by AIJantaStack</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 14px", background: "var(--surface)", borderRadius: 6, border: "1px solid var(--border)" }}>
            <StepBadge num="1" label="Gemini Vision" status={step === 0 ? "idle" : step === 1 ? "active" : "done"} />
            <div style={{ width: 16, height: 1, background: "var(--border2)" }} />
            <StepBadge num="2" label="Claude Architect" status={step < 2 ? "idle" : step === 2 ? "active" : "done"} />
          </div>
          <div style={{ display: "flex", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, padding: 3, gap: 2 }}>
            {(["video", "image"] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "6px 14px", fontSize: 11, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", border: "none", borderRadius: 4, cursor: "pointer",
                fontFamily: "var(--font-display)", transition: "all 0.2s",
                background: mode === m ? (m === "video" ? "var(--accent)" : "var(--gold)") : "transparent",
                color: mode === m ? (m === "video" ? "white" : "#000") : "var(--text-muted)",
              }}>{m === "video" ? "▶ Video" : "◼ Bild"}</button>
            ))}
          </div>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: "calc(100vh - 55px)" }}>

        {/* ── LEFT: INPUT ── */}
        <div style={{ borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* USE CASE SELECTOR */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                Verwendungszweck
                <span style={{ fontSize: 9, color: "var(--text-dim)", letterSpacing: 1 }}>— Hover für Info · Klick für Details</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {USE_CASES.map(uc => {
                  const isRec = recommendations?.use_case === uc.id;
                  return (
                    <Tooltip key={uc.id} data={USE_CASE_TOOLTIPS[uc.id] || { short: uc.description }}>
                      <button
                        onClick={() => { setUseCase(uc.id); setSelectedTags([]); }}
                        style={{
                          padding: "8px 6px", width: "100%",
                          border: `1px solid ${useCase === uc.id ? "var(--accent)" : isRec ? "rgba(255,77,0,0.5)" : "var(--border)"}`,
                          borderRadius: 7,
                          background: useCase === uc.id ? "rgba(255,77,0,0.1)" : isRec ? "rgba(255,77,0,0.06)" : "var(--surface)",
                          cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                          animation: isRec && useCase !== uc.id ? "usecaseGlow 2s ease-in-out infinite" : "none",
                          position: "relative",
                        }}
                      >
                        {isRec && useCase !== uc.id && (
                          <span style={{
                            position: "absolute", top: -4, right: -4,
                            background: "#ff4d00", color: "white",
                            fontSize: 7, fontFamily: "var(--font-mono)", letterSpacing: 1,
                            padding: "1px 4px", borderRadius: 3, fontWeight: 700,
                          }}>AI</span>
                        )}
                        <div style={{ fontSize: 14, marginBottom: 3 }}>{uc.icon}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: useCase === uc.id ? "var(--accent)" : isRec ? "#ff6622" : "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                          {uc.label}
                        </div>
                      </button>
                    </Tooltip>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(255,77,0,0.04)", border: "1px solid rgba(255,77,0,0.1)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "#666", lineHeight: 1.6 }}>
                <span style={{ color: "var(--accent)" }}>►</span> {currentUseCase.description}
              </div>
              {/* ─── ANALYZE BUTTON — separate from generate ─── */}
              {imageBase64 && (
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={analyzeOnly}
                    disabled={!canAnalyze}
                    style={{
                      width: "100%", padding: "10px 0",
                      background: geminiDone ? "rgba(212,175,55,0.12)" : canAnalyze ? "rgba(66,133,244,0.15)" : "var(--surface)",
                      border: geminiDone ? "1px solid var(--gold)" : canAnalyze ? "1px solid #4285f4" : "1px solid var(--border)",
                      borderRadius: 6, cursor: canAnalyze ? "pointer" : "default",
                      color: geminiDone ? "var(--gold)" : canAnalyze ? "#4285f4" : "var(--text-dim)",
                      fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700,
                      letterSpacing: 2, textTransform: "uppercase",
                      transition: "all 0.2s",
                    }}
                  >
                    {isAnalyzing
                      ? <span style={{ animation: "pulse 1.2s infinite" }}>① Gemini analysiert Tags…</span>
                      : geminiDone
                        ? "✓ Tags analysiert — erneut analysieren"
                        : "◎ Tags analysieren →"}
                  </button>
                </div>
              )}

              {recommendations && !recDismissed && (
                <div style={{ marginTop: 8 }}>
                  <RecommendationBanner
                    recommendations={recommendations}
                    onApply={applyRecommendations}
                    onDismiss={() => setRecDismissed(true)}
                  />
                </div>
              )}
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
                Bild-Rohmaterial
                <span style={{ color: geminiDone ? "var(--gold)" : "var(--accent)", fontSize: 9 }}>
                  {geminiDone ? "— ✓ Gemini Analyse abgeschlossen" : "— Gemini analysiert auf Anfrage"}
                </span>
              </div>
              {imagePreview ? (
                <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid var(--accent)" }}>
                  <img src={imagePreview} alt="Referenz" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.88))", padding: "20px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold)" }}>
                      {geminiAnalysis ? "✓ Gemini Analyse abgeschlossen" : "Bereit für Gemini Analyse"}
                    </span>
                    <button onClick={() => { setImagePreview(null); setImageBase64(null); setGeminiAnalysis(null); setGeminiDone(false); setRecommendations(null); setRecDismissed(false); }} style={{ background: "rgba(0,0,0,0.7)", border: "1px solid #444", color: "#ccc", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: 14 }}>×</button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                  onDragOver={e => e.preventDefault()}
                  style={{ border: "1.5px dashed var(--border2)", borderRadius: 10, padding: "30px 20px", textAlign: "center", cursor: "pointer", background: "var(--surface)", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,77,0,0.04)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)"; (e.currentTarget as HTMLDivElement).style.background = "var(--surface)"; }}
                >
                  <div style={{ fontSize: 28, opacity: 0.15, marginBottom: 10 }}>⬆</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 5 }}>Produkt / Referenzbild hochladen</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", lineHeight: 1.7 }}>Drag & Drop oder klicken<br />Gemini Flash extrahiert alle visuellen Details automatisch</div>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>

            {/* GEMINI ANALYSIS PREVIEW */}
            {geminiAnalysis && (
              <div style={{ background: "rgba(66,133,244,0.04)", border: "1px solid rgba(66,133,244,0.15)", borderRadius: 8, padding: "14px", animation: "fadeUp 0.3s ease" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#4285f4", marginBottom: 10 }}>✓ Gemini Analyse — Extrahierte Details</div>
                {Object.entries(geminiAnalysis).slice(0, 5).map(([k, v]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 8, marginBottom: 5 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#4285f4", textTransform: "uppercase", letterSpacing: 1 }}>{k}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#777", lineHeight: 1.5 }}>{String(v).slice(0, 120)}{String(v).length > 120 ? "…" : ""}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TEXT INPUT */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                Zusätzliche Intention <span style={{ color: "var(--text-dim)" }}>(optional)</span>
              </div>
              <textarea rows={3} value={text} onChange={e => setText(e.target.value)}
                placeholder="z.B. Fokus auf die Handwerkskunst, mysteriöse Atmosphäre, luxuriöse Wirkung..."
                style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 8, color: "#c8c4be", fontSize: 12.5, lineHeight: 1.8, padding: "12px 14px", resize: "none", transition: "all 0.2s" }}
              />
            </div>

            {/* SETTINGS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 7, fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: 6 }}>
                  Stil-Tonalität
                  {recommendations?.tone && tone !== recommendations.tone && (
                    <span style={{ fontSize: 8, color: "#ff4d00", letterSpacing: 1, padding: "1px 5px", background: "rgba(255,77,0,0.1)", borderRadius: 2, animation: "recTagGlow 2s infinite" }}>→ {recommendations.tone}</span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <select value={tone} onChange={e => setTone(e.target.value)} style={{
                    width: "100%", appearance: "none", background: "var(--surface)",
                    border: `1px solid ${recommendations?.tone && tone !== recommendations.tone ? "rgba(255,77,0,0.4)" : "var(--border2)"}`,
                    borderRadius: 6, color: "#c8c4be", fontSize: 11, padding: "9px 28px 9px 12px", cursor: "pointer",
                  }}>
                    {[["luxury","Luxus / High-End"],["documentary","Dokumentarisch / Roh"],["editorial","Editorial / Fashion"],["dark","Dunkel / Dramatisch"],["artistic","Künstlerisch / Abstrakt"],["commercial","Kommerziell / Klar"]].map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", fontSize: 10, pointerEvents: "none" }}>▾</span>
                </div>
                {TONE_TOOLTIPS[tone] && (
                  <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(255,77,0,0.04)", border: "1px solid rgba(255,77,0,0.08)", borderRadius: 5, fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", lineHeight: 1.5 }}>
                    {TONE_TOOLTIPS[tone].short}
                  </div>
                )}
              </div>

              {mode === "video" && (
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 7, fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: 6 }}>
                    Videolänge
                    {recommendations?.duration && duration !== recommendations.duration && (
                      <span style={{ fontSize: 8, color: "#4ade80", letterSpacing: 1, padding: "1px 5px", background: "rgba(74,222,128,0.1)", borderRadius: 2, animation: "recTagGlow 2s infinite" }}>→ {recommendations.duration}s</span>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <select value={duration} onChange={e => setDuration(e.target.value)} style={{
                      width: "100%", appearance: "none", background: "var(--surface)",
                      border: `1px solid ${recommendations?.duration && duration !== recommendations.duration ? "rgba(74,222,128,0.4)" : "var(--border2)"}`,
                      borderRadius: 6, color: "#c8c4be", fontSize: 11, padding: "9px 28px 9px 12px", cursor: "pointer",
                    }}>
                      {[["3","3 Sek — Micro"],["5","5 Sek — Standard"],["8","8 Sek — Hero Shot"],["15","15 Sek — Feature"]].map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                    <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", fontSize: 10, pointerEvents: "none" }}>▾</span>
                  </div>
                  {DURATION_TOOLTIPS[duration] && (
                    <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(255,209,102,0.04)", border: "1px solid rgba(255,209,102,0.08)", borderRadius: 5, fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", lineHeight: 1.5 }}>
                      {DURATION_TOOLTIPS[duration].short}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ORCHESTRA LIBRARY */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>Orchestra Library</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: 1 }}>Hover · Klick für Details</span>
                {selectedTags.length > 0 && (
                  <button onClick={() => setSelectedTags([])} style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", letterSpacing: 1 }}>
                    LEEREN ({selectedTags.length})
                  </button>
                )}
              </div>

              {selectedTags.length > 0 && (
                <div style={{ marginBottom: 10, padding: "6px 12px", background: "rgba(255,77,0,0.05)", border: "1px solid rgba(255,77,0,0.15)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "#ff6622", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#ff4d00" }}>AKTIV</span>
                  <span>{selectedTags.length} Tags — alle werden im Breakdown einzeln erläutert</span>
                </div>
              )}

              {filteredLibrary.map(cat => (
                <div key={cat.id} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: cat.color + "80", marginBottom: 7, fontFamily: "var(--font-mono)" }}>{cat.label}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
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
                </div>
              ))}
            </div>
          </div>

          {/* GENERATE */}
          <div style={{ padding: "16px 24px 22px", borderTop: "1px solid var(--border)" }}>
            {selectedTags.length > 0 && (
              <div style={{ marginBottom: 10, padding: "6px 12px", background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)", borderRadius: 5, fontFamily: "var(--font-mono)", fontSize: 9, color: "#4ade8066", letterSpacing: 1 }}>
                ✓ {selectedTags.length} Tags · {tone} · {mode === "video" ? `${duration}s` : "Bild"} · {useCase}
              </div>
            )}
            <button onClick={generate} disabled={!canGenerate} style={{
              width: "100%", padding: "15px 0",
              background: canGenerate ? "var(--accent)" : "var(--surface)",
              border: "none", borderRadius: 8,
              color: canGenerate ? "white" : "var(--text-dim)",
              fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800,
              letterSpacing: 2, textTransform: "uppercase",
              cursor: canGenerate ? "pointer" : "not-allowed",
              transition: "all 0.2s", position: "relative", overflow: "hidden",
            }}>
              {step === 1 ? <span style={{ animation: "pulse 1.2s infinite" }}>① Gemini analysiert Bild...</span>
               : step === 2 ? <span style={{ animation: "pulse 1.2s infinite" }}>② Claude erstellt Prompt...</span>
               : geminiDone
                 ? `${currentUseCase.icon} ② ${mode === "video" ? "Video" : "Bild"} Prompt generieren →`
                 : `${currentUseCase.icon} ${mode === "video" ? "Video" : "Bild"} Prompt für "${currentUseCase.label}" generieren →`}
              {isLoading && (
                <div style={{ position: "absolute", bottom: 0, left: "-60%", width: "60%", height: 2, background: step === 1 ? "#4285f4" : "var(--accent)", animation: "slide 1.4s ease-in-out infinite" }} />
              )}
            </button>
            {error && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(255,100,100,0.07)", border: "1px solid rgba(255,100,100,0.18)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "#ff6464", lineHeight: 1.6 }}>
                ⚠ {error}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: OUTPUT ── */}
        <div style={{ background: "#060606", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "13px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 2 }}>
              {tabs.map(({ id, label }) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{
                  padding: "6px 12px", fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
                  textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-mono)",
                  border: "none", borderRadius: 5, transition: "all 0.15s",
                  background: activeTab === id ? "var(--surface2)" : "transparent",
                  color: activeTab === id
                    ? id === "breakdown" ? "var(--gold)" : "var(--text)"
                    : id === "breakdown" && hasBreakdown ? "#665500" : "var(--text-dim)",
                }}>{label}</button>
              ))}
            </div>
            {output && (
              <button onClick={copyAll} style={{
                padding: "6px 13px", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: 1,
                cursor: "pointer", border: `1px solid ${copied ? "var(--green)" : "var(--border2)"}`,
                borderRadius: 5, background: "transparent",
                color: copied ? "var(--green)" : "var(--text-muted)", transition: "all 0.2s",
              }}>{copied ? "✓ KOPIERT" : "⎘ ALLES KOPIEREN"}</button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

            {/* EMPTY */}
            {!output && step === 0 && (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center", opacity: 0.3 }}>
                <div style={{ fontSize: 44 }}>◈</div>
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, color: "#888" }}>Deine Vision wartet</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#555", lineHeight: 2 }}>
                  Tags wählen → generieren → im Breakdown Tab<br />
                  siehst du wie jeder Tag konkret angewendet wurde
                </div>
              </div>
            )}

            {/* LOADING */}
            {isLoading && !output && (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <div style={{ fontSize: 36, animation: "pulse 1.2s infinite" }}>◈</div>
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, color: "#555" }}>
                  {step === 1 ? "Gemini liest dein Bild..." : "Claude erstellt den Prompt..."}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#333", letterSpacing: 1, textAlign: "center", lineHeight: 1.8 }}>
                  {step === 1 ? "Farben · Materialien · Licht · Details" : "Bild-Daten + Tags + Breakdown → Prompt"}
                </div>
              </div>
            )}

            {/* OUTPUT */}
            {output && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp 0.4s ease" }}>

                {/* Score Bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <ScoreBar label="Prompt Qualität" value={qScore} color={qColor} tooltipKey="quality_score" />
                  <ScoreBar label="Detail-Genauigkeit" value={dScore} color={dColor} tooltipKey="detail_accuracy" />

                  {selectedTags.length > 0 && tagsIntegrated !== undefined && (
                    <Tooltip data={{
                      short: `${tagsIntegrated} von ${selectedTags.length} Tags wurden in den Prompt integriert.`,
                      effekt: "Prüft ob alle Orchestra Tags tatsächlich im generierten Prompt landen.",
                      profi_tipp: tagsIntegrated < selectedTags.length
                        ? "Breakdown Tab öffnen um zu sehen welche Tags fehlen."
                        : "Alle Tags erfolgreich integriert — Breakdown Tab zeigt die Details.",
                    }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "9px 14px",
                        background: "var(--surface)", borderRadius: 7, border: "1px solid var(--border)",
                        cursor: "pointer",
                      }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-dim)", whiteSpace: "nowrap", minWidth: 110 }}>Tags integriert</span>
                        <div style={{ flex: 1, height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{
                            width: `${(tagsIntegrated / selectedTags.length) * 100}%`,
                            height: "100%",
                            background: tagsIntegrated === selectedTags.length ? "#4ade80" : "#ffd166",
                            borderRadius: 2, transition: "width 1.2s ease",
                          }} />
                        </div>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500,
                          color: tagsIntegrated === selectedTags.length ? "#4ade80" : "#ffd166",
                          minWidth: 55, textAlign: "right",
                        }}>{tagsIntegrated}/{selectedTags.length}</span>
                      </div>
                    </Tooltip>
                  )}
                </div>

                {/* Ghost Director */}
                {output.ghost_director && (
                  <Tooltip data={OUTPUT_TOOLTIPS["ghost_director"] || { short: "Unsichtbare Regie-Philosophie" }}>
                    <div style={{ padding: "11px 15px", background: "rgba(255,77,0,0.03)", border: "1px solid rgba(255,77,0,0.1)", borderRadius: 8, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: "#666", lineHeight: 1.7, cursor: "pointer" }}>
                      "{output.ghost_director}"
                    </div>
                  </Tooltip>
                )}

                {/* Use Case Note */}
                {output.use_case_notes && (
                  <div style={{ padding: "8px 12px", background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "#4ade8088", lineHeight: 1.6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span>{currentUseCase.icon}</span>
                    <span style={{ flex: 1 }}>{output.use_case_notes}</span>
                    <span style={{ marginLeft: "auto", fontSize: 8, letterSpacing: 1.5, color: "#333", whiteSpace: "nowrap", paddingTop: 1 }}>
                      {tone.toUpperCase()} · {mode === "video" ? `${duration}S` : "IMG"}
                    </span>
                  </div>
                )}

                {/* ── TAB: PROMPT ── */}
                {activeTab === "prompt" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <SectionLabel color="var(--accent)">Haupt-Prompt (Englisch — Copy & Paste)</SectionLabel>
                      <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderLeft: "3px solid var(--accent)", borderRadius: 8, padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.9, color: "#c8c4be", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {output.main_prompt}
                      </div>
                    </div>
                    <div>
                      <SectionLabel color="#ff6464">Negative Prompt</SectionLabel>
                      <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderLeft: "3px solid #ff6464", borderRadius: 8, padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.9, color: "#ff9999", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {output.negative_prompt}
                      </div>
                    </div>
                    {hasBreakdown && (
                      <div style={{ padding: "8px 12px", background: "rgba(255,209,102,0.04)", border: "1px solid rgba(255,209,102,0.1)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "#665500", display: "flex", alignItems: "center", gap: 8 }}>
                        <span>◈</span>
                        <span>
                          {Object.keys(promptBreakdown!).length} Tags erklärt im
                          <button onClick={() => setActiveTab("breakdown")} style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 10, padding: "0 4px", textDecoration: "underline" }}>
                            Breakdown Tab
                          </button>
                          — sieh wie jeder Tag auf dein Produkt angewendet wurde
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* ── TAB: BREAKDOWN (new) ── */}
                {activeTab === "breakdown" && (
                  <div>
                    <SectionLabel color="var(--gold)">Prompt Breakdown — Tag-Anwendung auf dieses Produkt</SectionLabel>

                    {hasBreakdown ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {/* Intro note */}
                        <div style={{ padding: "8px 12px", background: "rgba(255,209,102,0.04)", border: "1px solid rgba(255,209,102,0.08)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", lineHeight: 1.6, marginBottom: 4 }}>
                          Jeder Eintrag zeigt wie der Tag <em>spezifisch auf dieses Bild/Produkt</em> angewendet wurde — nicht die generische Definition.
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
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", paddingTop: 60 }}>
                        Keine Tags ausgewählt — wähle Tags aus der Orchestra Library und generiere erneut.
                      </div>
                    )}
                  </div>
                )}

                {/* ── TAB: LAYERS ── */}
                {activeTab === "layers" && output.layers && (
                  <div>
                    <SectionLabel color="var(--gold)">Ebenen-Analyse</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        ["world","Welt"], ["subject","Subjekt"], ["motion","Bewegung"],
                        ["lighting","Licht"], ["lens","Linse"], ["color","Farbe"],
                        ["physics","Physik"], ["intention","Intention"],
                      ].map(([key, label]) => {
                        const val = output.layers[key as keyof typeof output.layers];
                        if (!val) return null;
                        return <LayerRow key={key} layerKey={key} label={label} value={val} />;
                      })}
                    </div>
                  </div>
                )}

                {/* ── TAB: TOOLS ── */}
                {activeTab === "tools" && (
                  <div>
                    <SectionLabel color="var(--green)">Tool Empfehlung</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {tools.map(tool => {
                        const isRec = output.recommended_tool &&
                          tool.name.toLowerCase().includes(output.recommended_tool.toLowerCase().split(" ")[0]);
                        return (
                          <div key={tool.name} style={{ background: isRec ? "rgba(74,222,128,0.05)" : "var(--surface)", border: `1px solid ${isRec ? "var(--green)" : "var(--border)"}`, borderRadius: 8, padding: "12px 10px", textAlign: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>{tool.name}</div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", lineHeight: 1.5 }}>{tool.use}</div>
                            {isRec && <div style={{ display: "inline-block", marginTop: 7, fontSize: 8, padding: "2px 8px", background: "rgba(74,222,128,0.12)", color: "var(--green)", borderRadius: 2, fontFamily: "var(--font-mono)", letterSpacing: 1.5 }}>BESTE WAHL</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── TAB: ANALYSE ── */}
                {activeTab === "analyse" && (
                  geminiAnalysis ? (
                    <div>
                      <SectionLabel color="#4285f4">Gemini Vision — Rohdaten</SectionLabel>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {Object.entries(geminiAnalysis).map(([k, v]) => (
                          <div key={k} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 10, alignItems: "start" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#4285f4", textTransform: "uppercase", letterSpacing: 1.5, paddingTop: 6 }}>{k}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#888", background: "rgba(66,133,244,0.04)", borderRadius: 5, padding: "6px 10px", border: "1px solid rgba(66,133,244,0.1)", lineHeight: 1.6 }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", paddingTop: 60 }}>
                      Kein Bild hochgeladen — keine Gemini Analyse verfügbar.
                    </div>
                  )
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
