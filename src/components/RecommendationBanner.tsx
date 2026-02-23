"use client";

import { useState } from "react";

export interface Recommendations {
  use_case: string;
  use_case_reason: string;
  tone: string;
  tone_reason: string;
  duration: string;
  duration_reason: string;
  tags: string[];
  tags_reason: string;
  confidence: number;
  setup_summary: string;
}

interface Props {
  recommendations: Recommendations;
  onApply: (rec: Recommendations) => void;
  onDismiss: () => void;
}

const USE_CASE_LABELS: Record<string, string> = {
  produkt: "Produkt", marketing: "Marketing", story: "Story", humor: "Funny / Humor",
  lifestyle: "Lifestyle", food: "Food & Gastro", fashion: "Fashion & Beauty",
  architektur: "Architektur", natur: "Natur & Landschaft", technologie: "Technologie",
  event: "Event & Experience", portrait: "Portrait & Menschen",
};
const TONE_LABELS: Record<string, string> = {
  luxury: "Luxus / High-End", documentary: "Dokumentarisch / Roh",
  editorial: "Editorial / Fashion", dark: "Dunkel / Dramatisch",
  artistic: "Künstlerisch", commercial: "Kommerziell / Klar",
};

export function RecommendationBanner({ recommendations: rec, onApply, onDismiss }: Props) {
  const [applied, setApplied] = useState(false);

  const confColor = rec.confidence >= 90
    ? "var(--green)"
    : rec.confidence >= 80
      ? "var(--gold)"
      : "#FB923C";

  const handleApply = () => {
    setApplied(true);
    onApply(rec);
    setTimeout(onDismiss, 1200);
  };

  return (
    <div
      role="region"
      aria-label="KI Setup-Empfehlung"
      aria-live="polite"
      style={{
        background: "linear-gradient(135deg, rgba(255,77,0,0.05) 0%, rgba(245,158,11,0.03) 100%)",
        border: "1px solid rgba(255,77,0,0.2)",
        borderRadius: 10,
        overflow: "hidden",
        animation: "recBannerIn 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{
          borderBottom: "1px solid rgba(255,77,0,0.1)",
          background: "rgba(255,77,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden="true"
            className="w-2 h-2 rounded-full"
            style={{
              background: confColor,
              boxShadow: `0 0 6px ${confColor}`,
              animation: "glowPulse 2s infinite",
            }}
          />
          <span
            className="text-[9px] uppercase tracking-widest font-medium"
            style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
          >
            Gemini Setup-Empfehlung
          </span>
          <span
            className="text-[9px] tracking-wide"
            style={{ fontFamily: "var(--font-mono)", color: confColor }}
          >
            {rec.confidence}%
          </span>
        </div>
        <button
          onClick={onDismiss}
          aria-label="Empfehlung schließen"
          className="btn-ghost w-6 h-6 flex items-center justify-center text-base leading-none"
        >
          ×
        </button>
      </div>

      {/* Summary */}
      <div className="px-3.5 py-2.5">
        <p
          className="text-[11px] leading-relaxed m-0"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {rec.setup_summary}
        </p>
      </div>

      {/* Settings grid */}
      <div className="grid grid-cols-3 gap-2 px-3.5 pb-3">
        <RecSetting
          label="Use Case"
          value={USE_CASE_LABELS[rec.use_case] || rec.use_case}
          reason={rec.use_case_reason}
          color="var(--accent)"
          colorRaw="rgba(255,77,0"
        />
        <RecSetting
          label="Tonalität"
          value={TONE_LABELS[rec.tone] || rec.tone}
          reason={rec.tone_reason}
          color="var(--gold)"
          colorRaw="rgba(245,158,11"
        />
        <RecSetting
          label="Videolänge"
          value={`${rec.duration}s`}
          reason={rec.duration_reason}
          color="var(--green)"
          colorRaw="rgba(16,185,129"
        />
      </div>

      {/* Tags */}
      <div className="px-3.5 pb-3">
        <div
          className="text-[8px] uppercase tracking-widest mb-2"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
        >
          {rec.tags.length} Tags empfohlen — {rec.tags_reason}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {rec.tags.map(tag => (
            <span
              key={tag}
              aria-label={`Empfohlener Tag: ${tag}`}
              className="text-[10px] px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "var(--font-mono)",
                border: "1px solid rgba(255,77,0,0.3)",
                background: "rgba(255,77,0,0.07)",
                color: "#FF6622",
                animation: "tagPulse 2.5s ease-in-out infinite",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5"
        style={{ borderTop: "1px solid rgba(255,77,0,0.08)" }}
      >
        <button
          onClick={handleApply}
          disabled={applied}
          className="flex-1 py-2 rounded-lg text-[11px] uppercase tracking-widest font-bold transition-all duration-200"
          style={{
            fontFamily: "var(--font-display)",
            background: applied ? "var(--green-subtle)" : "rgba(255,77,0,0.85)",
            border: `1px solid ${applied ? "rgba(16,185,129,0.4)" : "var(--accent)"}`,
            color: applied ? "var(--green)" : "#fff",
            cursor: applied ? "default" : "pointer",
          }}
        >
          {applied ? "✓ Setup übernommen" : "Setup übernehmen →"}
        </button>
        <button
          onClick={onDismiss}
          className="btn-secondary px-3 py-2 text-[10px]"
        >
          Ignorieren
        </button>
      </div>
    </div>
  );
}

// ─── Setting Card ─────────────────────────────────────────────

function RecSetting({ label, value, reason, color, colorRaw }: {
  label: string; value: string; reason: string;
  color: string; colorRaw: string;
}) {
  return (
    <div
      className="rounded-lg p-2.5"
      style={{
        background: `${colorRaw},0.06)`,
        border: `1px solid ${colorRaw},0.2)`,
      }}
    >
      <div
        className="text-[8px] uppercase tracking-widest mb-1"
        style={{ fontFamily: "var(--font-mono)", color: `${colorRaw},0.6)` }}
      >
        {label}
      </div>
      <div
        className="text-[12px] font-bold mb-1"
        style={{ fontFamily: "var(--font-display)", color }}
      >
        {value}
      </div>
      <div
        className="text-[9px] leading-snug"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
      >
        {reason}
      </div>
    </div>
  );
}
