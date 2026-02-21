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
  const confColor = rec.confidence >= 90 ? "#4ade80" : rec.confidence >= 80 ? "#ffd166" : "#ff9944";

  const handleApply = () => {
    setApplied(true);
    onApply(rec);
    setTimeout(onDismiss, 1200);
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,77,0,0.06) 0%, rgba(255,209,102,0.04) 100%)",
      border: "1px solid rgba(255,77,0,0.25)",
      borderRadius: 10,
      overflow: "hidden",
      animation: "recBannerIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <style>{`
        @keyframes recBannerIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tagPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,0,0.4); }
          50%       { box-shadow: 0 0 0 4px rgba(255,77,0,0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderBottom: "1px solid rgba(255,77,0,0.12)",
        background: "rgba(255,77,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%", background: confColor,
            animation: "glowPulse 2s infinite",
            boxShadow: `0 0 6px ${confColor}`,
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5,
            textTransform: "uppercase", color: "#ff4d00",
          }}>
            Gemini Setup-Empfehlung
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            color: confColor, letterSpacing: 1,
          }}>
            {rec.confidence}% Sicherheit
          </span>
        </div>
        <button onClick={onDismiss} style={{
          background: "none", border: "none", color: "#444",
          cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 2px",
        }}>×</button>
      </div>

      {/* Summary */}
      <div style={{ padding: "10px 14px 8px" }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 11, color: "#888",
          lineHeight: 1.6, margin: 0,
        }}>{rec.setup_summary}</p>
      </div>

      {/* Recommended Settings Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "0 14px 12px" }}>
        <RecSetting
          label="Use Case"
          value={USE_CASE_LABELS[rec.use_case] || rec.use_case}
          reason={rec.use_case_reason}
          color="#ff4d00"
        />
        <RecSetting
          label="Tonalität"
          value={TONE_LABELS[rec.tone] || rec.tone}
          reason={rec.tone_reason}
          color="#ffd166"
        />
        <RecSetting
          label="Videolänge"
          value={`${rec.duration} Sekunden`}
          reason={rec.duration_reason}
          color="#4ade80"
        />
      </div>

      {/* Tags preview */}
      <div style={{ padding: "0 14px 12px" }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2,
          textTransform: "uppercase", color: "#555", marginBottom: 7,
        }}>
          {rec.tags.length} Tags empfohlen — {rec.tags_reason}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {rec.tags.map(tag => (
            <span key={tag} style={{
              padding: "3px 9px", borderRadius: 20, fontSize: 10,
              fontFamily: "var(--font-mono)", letterSpacing: 0.3,
              border: "1px solid rgba(255,77,0,0.35)",
              background: "rgba(255,77,0,0.08)",
              color: "#ff6622",
              animation: "tagPulse 2.5s ease-in-out infinite",
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div style={{
        padding: "10px 14px 12px",
        borderTop: "1px solid rgba(255,77,0,0.1)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <button
          onClick={handleApply}
          disabled={applied}
          style={{
            flex: 1, padding: "9px 0",
            background: applied ? "rgba(74,222,128,0.15)" : "rgba(255,77,0,0.85)",
            border: `1px solid ${applied ? "#4ade80" : "var(--accent)"}`,
            borderRadius: 7, cursor: applied ? "default" : "pointer",
            fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 800,
            letterSpacing: 2, textTransform: "uppercase",
            color: applied ? "#4ade80" : "white",
            transition: "all 0.3s",
          }}
        >
          {applied ? "✓ Setup Übernommen" : "Setup Übernehmen →"}
        </button>
        <button
          onClick={onDismiss}
          style={{
            padding: "9px 14px", background: "none",
            border: "1px solid var(--border2)", borderRadius: 7,
            cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--text-dim)", letterSpacing: 1,
          }}
        >
          Ignorieren
        </button>
      </div>
    </div>
  );
}

function RecSetting({ label, value, reason, color }: {
  label: string; value: string; reason: string; color: string;
}) {
  return (
    <div style={{
      background: `${color}08`,
      border: `1px solid ${color}25`,
      borderRadius: 7, padding: "8px 10px",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2,
        textTransform: "uppercase", color: `${color}99`, marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700,
        color, marginBottom: 4,
      }}>{value}</div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 9, color: "#555", lineHeight: 1.5,
      }}>{reason}</div>
    </div>
  );
}
