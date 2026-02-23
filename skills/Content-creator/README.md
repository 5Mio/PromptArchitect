# Project Content Creator Skill

Ein umfassender Skill zur Erstellung von hochwertigem, projektbezogenem Content mit integrierter Recherche, SEO/GEO-Optimierung und Bildgenerierung.

## Überblick

Dieser Skill automatisiert und strukturiert den gesamten Content-Erstellungsprozess – von der initialen Recherche über die strategische Planung bis zur finalen Ausgabe. Er kombiniert Best Practices aus SEO (Search Engine Optimization) und GEO (Generative Engine Optimization) mit professioneller Content-Strategie.

## Features

### 🔍 Phase 1: Projekt-Analyse & Recherche
- Strukturiertes Projekt-Briefing
- Automatisierte Web-Recherche mit `web_search`
- Wettbewerber-Analyse
- Umfassende Keyword-Recherche (Primary, Secondary, Long-Tail, LSI)
- Search Intent Analyse

### 📊 Phase 2: Content-Strategie & Struktur
- Format-Definition (Blog, Landing Page, Social Media, etc.)
- SEO-optimierte Content-Strukturierung
- GEO-Optimierung für KI-Suchmaschinen
- Visuelle Konzept-Entwicklung
- Schema Markup Planung

### ✍️ Phase 3: Content-Erstellung
- Professionelles Content Writing nach AIDA/PAS Frameworks
- On-Page SEO Optimierung
- GEO-Elemente (FAQ, How-to, Comparisons)
- Bildgenerierung mit optimierten Prompts
- Metadata-Erstellung

### 📦 Phase 4: Formatierung & Ausgabe
- Multiple Output-Formate (Markdown, HTML, DOCX)
- Strukturierte Content-Packages
- Metadata-Generierung
- Download-ready Deliverables

### ✅ Phase 5: Quality Check
- Content-Qualitätsprüfung
- SEO-Checkliste
- GEO-Compliance Check
- Bild-Optimierung Validation
- Technische Prüfung

## Voraussetzungen

### Erforderlich
- `web_search` Tool-Zugriff (für Recherche)
- `web_fetch` Tool-Zugriff (für detaillierte Content-Analyse)
- Textverarbeitung (Markdown, HTML oder DOCX)

### Optional
- Bildgenerierungs-Capabilities (für visuelle Elemente)
- Python 3.8+ (für Keyword-Analyse Scripts)
- Node.js + docx-js (für Word-Dokumente)

## Installation

1. Kopiere den gesamten `project-content-creator` Ordner in dein Skills-Verzeichnis
2. Optional: Installiere Python-Dependencies für Scripts:
   ```bash
   # Keine externen Dependencies erforderlich (Pure Python)
   python3 scripts/keyword_analyzer.py
   ```

## Verwendung

### Quick Start

```
User: "Erstelle einen Blog-Artikel über [THEMA] für [ZIELGRUPPE]"

Claude aktiviert automatisch den Skill und führt durch:
1. Projekt-Briefing (stellt Fragen zu Zielen, Tonalität, etc.)
2. Recherche (web_search für aktuelle Daten und Trends)
3. Keyword-Analyse (identifiziert relevante Keywords)
4. Content-Erstellung (schreibt SEO/GEO-optimierten Content)
5. Bild-Konzepte (entwickelt passende visuelle Elemente)
6. Ausgabe (liefert fertiges Content-Package)
```

### Trigger-Beispiele

Der Skill wird aktiviert bei Anfragen wie:
- "Erstelle Content für..."
- "Schreibe einen Artikel über..."
- "Generiere einen Blog-Post..."
- "Erstelle Website-Text für..."
- "Schreibe SEO-Content über..."
- "Erstelle Social Media Posts für..."
- "Generiere Marketing-Content..."

### Erweiterte Nutzung

**Mit Projekt-Briefing Template:**
```
1. Fülle templates/project-briefing.md aus
2. Reiche es mit deiner Anfrage ein
3. Skill nutzt die vorausgefüllten Informationen
```

**Mit Keyword-Analyse:**
```bash
# Keywords vorbereiten
python3 scripts/keyword_analyzer.py

# Generierte keywords.json in Anfrage referenzieren
"Nutze diese Keywords: [keywords.json] für den Content"
```

## Ordnerstruktur

```
project-content-creator/
├── SKILL.md                    # Haupt-Skill Dokumentation
├── README.md                   # Diese Datei
├── LICENSE.txt                 # Lizenz-Informationen
│
├── templates/                  # Templates für Workflow
│   ├── project-briefing.md     # Projekt-Briefing Template
│   ├── seo-checklist.md        # SEO Optimierung Checkliste
│   └── metadata-schema.json    # JSON Schema für Metadaten
│
├── examples/                   # Vollständige Beispiele
│   └── complete-workflow-example.md  # End-to-End Beispiel
│
└── scripts/                    # Hilfs-Scripts
    └── keyword_analyzer.py     # Keyword-Analyse Tool
```

## Templates

### Projekt-Briefing Template
Strukturiertes Formular zur Erfassung aller relevanten Projekt-Informationen:
- Projekt-Details und Ziele
- Zielgruppen-Analyse
- Content-Spezifikationen
- SEO-Anforderungen
- Brand Guidelines
- Visuelle Requirements

**Location:** `templates/project-briefing.md`

### SEO Checkliste
Umfassende Checkliste mit 100+ Prüfpunkten:
- Keyword Research & Strategy
- On-Page SEO Elemente
- Content Structure
- Keyword Optimization
- Internal/External Linking
- Image Optimization
- Readability & UX
- Schema Markup
- Mobile Optimization
- Performance

**Location:** `templates/seo-checklist.md`

### Metadata Schema
JSON Schema für strukturierte Content-Metadaten:
- Content-Type und Basis-Informationen
- Zielgruppen-Daten
- Umfassende Keyword-Daten
- SEO-Metriken
- GEO-Elemente
- Bild-Metadaten
- Research-Quellen
- Performance Goals

**Location:** `templates/metadata-schema.json`

## Scripts

### Keyword Analyzer
Python-basiertes Tool für Keyword-Management und -Analyse:

**Features:**
- Keyword-Kategorisierung (Primary, Secondary, Long-Tail, LSI)
- Search Intent Klassifizierung
- Keyword-Dichte Berechnung
- Content-Analyse
- SEO-Empfehlungen
- JSON Export

**Verwendung:**
```python
from keyword_analyzer import KeywordAnalyzer

analyzer = KeywordAnalyzer()
analyzer.add_primary_keyword("KI-Tools Marketing", volume=1200)
analyzer.add_secondary_keywords(["AI Tools", "Marketing Automation"])
analyzer.export_to_json("keywords.json")
```

**Location:** `scripts/keyword_analyzer.py`

## Beispiele

### Vollständiger Workflow
Ein detailliertes End-to-End Beispiel:
- **Projekt:** Blog-Artikel "Die 10 besten KI-Tools für Content Marketing 2026"
- **Durchlauf aller 5 Phasen** mit konkreten Outputs
- **Real-world Recherche-Ergebnisse**
- **Finale Deliverables** inkl. Metadaten

**Location:** `examples/complete-workflow-example.md`

## Best Practices

### Recherche
✅ **DO:**
- Aktuelle Daten verwenden (letzten 6-12 Monate)
- Multiple Quellen nutzen (3-5 minimum)
- Authority Sites bevorzugen (.edu, .gov, Industry Leaders)
- Trends und Statistiken belegen

❌ **DON'T:**
- Ohne Recherche Content erstellen
- Veraltete Daten nutzen
- Single-Source-Abhängigkeit
- Unbestätigte Behauptungen

### SEO
✅ **DO:**
- Natürliche Keyword-Integration (1-2% Dichte)
- User Intent fokussieren
- Mobile-first denken
- Interne Linking-Strategie
- Alt-Texte für alle Bilder

❌ **DON'T:**
- Keyword Stuffing (über 2% Dichte)
- Thin Content (unter 300 Wörter)
- Duplicate Content
- Broken Links
- Fehlende Metadaten

### GEO (Generative Engine Optimization)
✅ **DO:**
- Direkte Antworten für häufige Fragen
- Strukturierte Daten (Schema.org)
- FAQ-Sektionen
- Schritt-für-Schritt Anleitungen
- Vergleichstabellen
- Zitierbare Fakten mit Quellen

❌ **DON'T:**
- Vage Aussagen
- Fehlende Quellenangaben
- Unstrukturierter Text-Wall
- Keine klaren Definitionen

### Content-Qualität
✅ **DO:**
- Original und unique Content
- Mehrwert für Nutzer
- Expertise demonstrieren (E-E-A-T)
- Scanbare Struktur (Listen, Überschriften)
- Konkrete Beispiele und Daten
- Storytelling-Elemente

❌ **DON'T:**
- Generischer AI-Slop
- Oberflächlicher Content
- Copy-Paste von Quellen
- Clickbait ohne Substanz

## Output-Formate

Der Skill unterstützt verschiedene Output-Formate:

### Markdown (.md)
**Ideal für:**
- Blog-Systeme (WordPress, Ghost, Jekyll)
- CMS-Import
- Developer-Content
- Git-basierte Workflows

**Vorteile:**
- Universell kompatibel
- Leicht editierbar
- SEO-Plugin ready

### HTML (.html)
**Ideal für:**
- Direkte Website-Integration
- Landing Pages
- Email-Newsletter
- Custom Styling

**Vorteile:**
- Sofort renderbar
- Volle Style-Kontrolle
- Schema Markup integriert

### Word Document (.docx)
**Ideal für:**
- Client Deliverables
- Review-Prozesse
- Print-Vorbereitung
- Collaboration

**Vorteile:**
- Track Changes
- Kommentare
- Professionelles Layout
- Universelle Bearbeitbarkeit

## Integration mit anderen Skills

### docx Skill
Für professionelle Word-Dokumente:
```
- Nutzt docx-js für .docx Erstellung
- Integriert Bilder direkt
- Formatiert mit Styles
```

### frontend-design Skill
Für Landing Pages und Web-Content:
```
- Nutzt Frontend-Design Prinzipien
- Erstellt distinctive Designs
- Implementiert responsive Layouts
```

### image-prompt-generator Skill
Für optimierte Bildgenerierung:
```
- Generiert SEO-optimierte Bild-Prompts
- Erstellt passende Alt-Texte
```

## Tipps für optimale Ergebnisse

1. **Sei spezifisch im Briefing**
   - Je detaillierter die Anforderungen, desto besser der Output
   - Nutze das Projekt-Briefing Template

2. **Investiere Zeit in Recherche**
   - Qualität des Contents hängt von Recherche-Qualität ab
   - Nutze web_search extensiv

3. **Iteriere basierend auf Feedback**
   - Erste Version ist Draft, nicht Final
   - Nutze SEO-Checkliste für Optimierung

4. **Denke an die Zielgruppe**
   - Content für Menschen, nicht für Suchmaschinen
   - SEO/GEO sind Werkzeuge, nicht Ziele

5. **Plane Zeit für Quality Check**
   - Nutze alle 5 Checklisten
   - Prüfe besonders Fakten und Quellen

## Häufige Probleme & Lösungen

### Problem: Unklare Projektziele
**Lösung:** Nutze Projekt-Briefing Template, stelle gezielte Fragen

### Problem: Zu generische Keywords
**Lösung:** Long-Tail Keywords erforschen, Nischen-Fokus

### Problem: Content zu oberflächlich
**Lösung:** Tiefere Recherche, mehr Beispiele, konkrete Daten

### Problem: Bilder passen nicht
**Lösung:** Klareres Briefing, Brand Guidelines verwenden

## Lizenz

Siehe `LICENSE.txt` für vollständige Lizenz-Bedingungen.

## Support & Feedback

Für Fragen, Feedback oder Verbesserungsvorschläge:
- Erstelle ein Issue im Repository
- Kontaktiere den Skill-Maintainer

## Changelog

### Version 1.0 (2026-02-10)
- Initial Release
- Vollständiger 5-Phasen Workflow
- Templates und Beispiele
- Keyword Analyzer Script
- Umfassende Dokumentation

---

**Erstellt mit dem Project Content Creator Skill** 🚀
