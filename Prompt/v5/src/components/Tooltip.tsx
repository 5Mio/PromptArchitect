"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────

export interface TooltipData {
  short: string;           // 1 Zeile — erscheint beim Hover
  wann?: string;           // Wann einsetzen?
  effekt?: string;         // Was macht es im Prompt?
  beispiel?: string;       // Bekannte Referenzen
  nicht_wenn?: string;     // Wann NICHT verwenden?
  profi_tipp?: string;     // Bonus Insider Tipp
}

interface TooltipProps {
  data: TooltipData;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "auto";
}

// ─── Portal helper ────────────────────────────────────────────

function useTooltipPosition(
  triggerRef: React.RefObject<HTMLElement>,
  isVisible: boolean
) {
  const [pos, setPos] = useState({ top: 0, left: 0, placement: "top" as string });

  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceAbove = rect.top;
    const spaceBelow = vh - rect.bottom;
    const placement = spaceBelow < 200 && spaceAbove > spaceBelow ? "top" : "bottom";

    const tooltipWidth = 280;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(8, Math.min(left, vw - tooltipWidth - 8));

    const top = placement === "bottom"
      ? rect.bottom + window.scrollY + 8
      : rect.top + window.scrollY - 8;

    setPos({ top, left, placement });
  }, [isVisible, triggerRef]);

  return pos;
}

// ─── Main Tooltip Component ───────────────────────────────────

export function Tooltip({ data, children }: TooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null!);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();

  const pos = useTooltipPosition(triggerRef, hovered || expanded);
  const hasDetail = !!(data.wann || data.effekt || data.beispiel || data.nicht_wenn || data.profi_tipp);

  useEffect(() => { setMounted(true); }, []);

  // Close on outside click
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
        setHovered(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded]);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHovered(true), 180);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    if (!expanded) {
      hoverTimer.current = setTimeout(() => setHovered(false), 120);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasDetail) return;
    e.stopPropagation();
    setExpanded(p => !p);
    setHovered(false);
  };

  const visible = (hovered && !expanded) || expanded;

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ display: "inline-flex", cursor: hasDetail ? "pointer" : "default" }}
      >
        {children}
      </span>

      {mounted && visible && typeof document !== "undefined" && (
        <TooltipPortal>
          <div
            ref={tooltipRef}
            onMouseEnter={() => { clearTimeout(hoverTimer.current); setHovered(true); }}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "absolute",
              top: pos.placement === "bottom" ? pos.top : undefined,
              bottom: pos.placement === "top" ? `calc(100vh - ${pos.top}px)` : undefined,
              left: pos.left,
              width: expanded ? 300 : 280,
              zIndex: 9999,
              animation: "tooltipFade 0.15s ease",
            }}
          >
            {/* Arrow */}
            <div style={{
              position: "absolute",
              [pos.placement === "bottom" ? "top" : "bottom"]: -5,
              left: "50%",
              width: 10, height: 10,
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRight: "none", borderBottom: "none",
              transform: pos.placement === "bottom"
                ? "translateX(-50%) rotate(45deg)"
                : "translateX(-50%) rotate(225deg)",
            }} />

            {/* Box */}
            <div style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            }}>
              {/* Short description — always visible */}
              <div style={{
                padding: "10px 14px",
                background: "#1a1a1a",
                borderBottom: expanded ? "1px solid #222" : "none",
                display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 11.5,
                  color: "#d0ccc8", lineHeight: 1.55, flex: 1,
                }}>
                  {data.short}
                </span>
                {hasDetail && (
                  <span style={{
                    fontSize: 9, fontFamily: "var(--font-mono)", letterSpacing: 1.5,
                    color: expanded ? "#ff4d00" : "#444",
                    whiteSpace: "nowrap", paddingTop: 2, transition: "color 0.15s",
                  }}>
                    {expanded ? "▲ WENIGER" : "▼ MEHR"}
                  </span>
                )}
              </div>

              {/* Expanded detail */}
              {expanded && (
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {data.wann && (
                    <DetailRow icon="✓" label="Wann einsetzen" text={data.wann} color="#4ade80" />
                  )}
                  {data.effekt && (
                    <DetailRow icon="◈" label="Prompt-Effekt" text={data.effekt} color="#38bdf8" />
                  )}
                  {data.beispiel && (
                    <DetailRow icon="◎" label="Referenzen" text={data.beispiel} color="#ffd166" />
                  )}
                  {data.nicht_wenn && (
                    <DetailRow icon="✕" label="Nicht wenn" text={data.nicht_wenn} color="#f87171" />
                  )}
                  {data.profi_tipp && (
                    <DetailRow icon="★" label="Profi-Tipp" text={data.profi_tipp} color="#c084fc" />
                  )}
                </div>
              )}
            </div>
          </div>
        </TooltipPortal>
      )}
    </>
  );
}

// ─── Detail Row ───────────────────────────────────────────────

function DetailRow({ icon, label, text, color }: {
  icon: string; label: string; text: string; color: string;
}) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 10, color, minWidth: 12, paddingTop: 1 }}>{icon}</span>
      <div>
        <div style={{
          fontSize: 8, letterSpacing: 2, textTransform: "uppercase",
          color: color + "99", fontFamily: "var(--font-mono)", marginBottom: 3,
        }}>{label}</div>
        <div style={{
          fontSize: 11, fontFamily: "var(--font-mono)",
          color: "#999", lineHeight: 1.55,
        }}>{text}</div>
      </div>
    </div>
  );
}

// ─── Portal ───────────────────────────────────────────────────

function TooltipPortal({ children }: { children: React.ReactNode }) {
  const [el] = useState(() => {
    if (typeof document === "undefined") return null;
    const div = document.createElement("div");
    div.style.cssText = "position:fixed;top:0;left:0;width:100%;height:0;overflow:visible;z-index:9999;pointer-events:none;";
    return div;
  });

  useEffect(() => {
    if (!el) return;
    // Make tooltip children pointer-events active
    el.style.pointerEvents = "none";
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, [el]);

  if (!el) return null;

  const { createPortal } = require("react-dom");
  return createPortal(
    <div style={{ pointerEvents: "all" }}>{children}</div>,
    el
  );
}
