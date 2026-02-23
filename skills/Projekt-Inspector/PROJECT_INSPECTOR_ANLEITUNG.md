# Project Inspector Skill - Übersicht

## Was kann dieser Skill?

Der **Project Inspector** Skill ermöglicht dir eine umfassende Analyse von Webprojekten mit Playwright. Er bietet drei Hauptfunktionen:

### 1. 🔍 Modul-Analyse
Analysiere einzelne Module oder Komponenten deines Projekts:
- **Verwendung**: "Schaue dir das Header-Modul an" oder "Analysiere die Navigation"
- **Liefert**: Position, Sichtbarkeit, CSS-Styles, HTML-Struktur
- **Beispiel**: Prüfe ob dein Sidebar-Modul responsive ist

### 2. 📊 Projekt-Gesamtanalyse
Vollständige Inspektion des gesamten Projekts:
- **Performance**: Ladezeiten, First Paint, DOM-Metriken
- **Accessibility**: Alt-Texte, ARIA-Labels, Landmarks
- **SEO**: Meta-Tags, Title, Description, H1-Tags
- **Frameworks**: Erkennung von React, Vue, Angular, etc.
- **Komponenten**: Inventar aller UI-Komponenten
- **Responsive Design**: Mobile, Tablet, Desktop-Tests

### 3. 🎯 Wettbewerberanalyse
Vergleiche dein Projekt mit der Konkurrenz:
- **Features**: Welche Features haben die Wettbewerber?
- **Design-Patterns**: Welche UI-Komponenten nutzen sie?
- **Technologien**: Welche Frameworks und Libraries?
- **Insights**: Was fehlt in deinem Projekt?
- **Empfehlungen**: Konkrete Verbesserungsvorschläge

## Installation

Der Skill ist einsatzbereit! Du musst ihn nur in Claude hochladen:
1. Lade die `project-inspector.skill` Datei in Claude hoch
2. Claude wird den Skill automatisch aktivieren

## Verwendung

### Beispiel 1: Modul analysieren
```
User: "Schaue dir das Header-Modul meines Projekts an"
Claude: Welche URL hat dein Projekt und wie ist der CSS-Selektor für den Header?
User: "http://localhost:3000 und der Selektor ist .header"
Claude: [Führt Analyse aus und zeigt Ergebnisse]
```

### Beispiel 2: Projekt analysieren
```
User: "Analysiere mein aktuelles Projekt auf Performance-Probleme"
Claude: Auf welcher URL läuft dein Projekt?
User: "http://localhost:3000"
Claude: [Führt vollständige Analyse aus, fokussiert auf Performance]
```

### Beispiel 3: Wettbewerber vergleichen
```
User: "Vergleiche mein Projekt mit zwei Konkurrenten"
Claude: Gerne! Gib mir bitte die URLs:
       - Dein Projekt
       - Konkurrent 1
       - Konkurrent 2
User: "localhost:3000, competitor1.com, competitor2.com"
Claude: [Analysiert alle drei und erstellt Vergleichsbericht]
```

## Was wird analysiert?

### Performance
- ✅ Ladezeit (Load Time)
- ✅ First Paint
- ✅ DOM Content Loaded
- ✅ Transfer Size

### Accessibility
- ✅ Bilder ohne Alt-Text
- ✅ Buttons ohne Label
- ✅ Inputs ohne Label
- ✅ Landmarks (nav, main, aside)
- ✅ Skip-Links

### SEO
- ✅ Title-Tag (Länge und Inhalt)
- ✅ Meta-Description
- ✅ H1-Tags (Anzahl und Inhalt)
- ✅ Canonical URL
- ✅ Open Graph Tags

### Features
- ✅ Authentication
- ✅ Suche
- ✅ Filter & Sortierung
- ✅ Pagination
- ✅ Dark Mode
- ✅ Multi-Language
- ✅ Notifications
- ✅ Social Media Integration
- ✅ Chat
- ✅ Maps
- ✅ Video/Audio
- ✅ File Upload
- ✅ Export-Funktionen

### Technologien
- ✅ Frameworks (React, Vue, Angular, Svelte)
- ✅ Libraries (jQuery, Lodash, Axios)
- ✅ CSS-Frameworks (Bootstrap, Tailwind, Material-UI)
- ✅ Analytics (Google Analytics, Matomo)
- ✅ Payment (Stripe, PayPal)

### Design-Patterns
- ✅ Carousel/Slider
- ✅ Tabs
- ✅ Accordion
- ✅ Modal/Dialog
- ✅ Dropdown
- ✅ Breadcrumbs
- ✅ Cards
- ✅ Grids
- ✅ Badges/Chips

## Ausgaben

Der Skill erstellt automatisch:
1. **Konsolen-Bericht**: Formatierte Übersicht der wichtigsten Findings
2. **JSON-Datei**: Detaillierte Rohdaten für weitere Verarbeitung
3. **Screenshots**: Bei Wettbewerbsanalyse (full-page)

## Verbesserungsempfehlungen

Nach jeder Analyse liefert der Skill konkrete Empfehlungen in den Bereichen:
- Performance-Optimierung
- Accessibility-Verbesserungen
- SEO-Optimierung
- UI/UX-Enhancements
- Sicherheits-Best-Practices
- Code-Qualität
- Feature-Vorschläge
- Mobile-Optimierungen

## Technische Details

### Systemanforderungen
- Python 3.8+
- Playwright (wird automatisch installiert)
- Chromium Browser (wird automatisch installiert)

### Scripts
- `inspect_project.py`: Hauptscript für Projekt- und Modulanalyse
- `competitor_analysis.py`: Script für Wettbewerbervergleich

### Referenzen
- `improvements.md`: Detaillierte Verbesserungsempfehlungen
- `playwright_guide.md`: Best Practices für Playwright

## Tipps & Tricks

### Lokale Entwicklung
Für lokale Projekte: `http://localhost:PORT` verwenden

### Produktions-Sites
Für Live-Sites: Vollständige URL angeben

### CSS-Selektoren
Bevorzuge stabile Selektoren:
1. `data-testid` Attribute (am besten)
2. IDs (`#element-id`)
3. Klassen (`.element-class`)
4. Semantische Tags (`nav`, `header`, `main`)

### Headless Mode
- Standard: Headless (unsichtbar, schneller)
- Debugging: `--no-headless` (Browser sichtbar)

### Performance
- Für schnellere Analysen: Bilder/CSS blockieren
- Für parallele Tests: Mehrere Browser-Contexts nutzen

## Häufige Fragen

**Q: Funktioniert das mit Single Page Applications (SPA)?**
A: Ja! Der Skill wartet auf `networkidle`, damit auch dynamische Inhalte geladen werden.

**Q: Kann ich mehrere Projekte gleichzeitig analysieren?**
A: Ja, bei der Wettbewerbsanalyse werden alle URLs parallel analysiert.

**Q: Werden die Daten irgendwo gespeichert?**
A: Nur lokal in JSON-Dateien. Keine Cloud-Speicherung.

**Q: Kann ich eigene Checks hinzufügen?**
A: Ja! Die Scripts sind anpassbar. Du kannst eigene Analyse-Funktionen ergänzen.

**Q: Funktioniert das auch mit geschützten Bereichen (Login)?**
A: Aktuell nicht automatisch. Du müsstest die Scripts erweitern, um Login-Credentials zu übergeben.

## Support & Erweiterungen

Der Skill ist modular aufgebaut und kann erweitert werden:
- Füge neue Analyse-Funktionen hinzu
- Erweitere die Feature-Erkennung
- Passe Empfehlungen an deine Branche an
- Integriere in CI/CD-Pipelines

## Viel Erfolg!

Dieser Skill hilft dir, dein Projekt kontinuierlich zu verbessern und immer einen Schritt voraus zu sein! 🚀
