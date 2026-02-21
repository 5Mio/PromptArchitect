# PromptArchitect Pro v3
### Gemini Vision + Claude AI — AIJantaStack

Ein intelligentes Prompt-Engineering Tool das Bild-Rohmaterial analysiert und daraus perfekte Video/Bild Prompts generiert.

## Pipeline

```
Image Upload → Gemini Flash Vision → Claude Sonnet → Perfect Prompt
```

## Setup

### 1. API Keys eintragen
Öffne `.env.local` und trage deine Keys ein:

```env
GEMINI_API_KEY=dein_gemini_key_hier
ANTHROPIC_API_KEY=dein_claude_key_hier
```

**Gemini Key:** https://aistudio.google.com → Get API Key (kostenlos)  
**Claude Key:** https://console.anthropic.com → API Keys

### 2. Dependencies installieren
```bash
npm install
```

### 3. Starten
```bash
npm run dev
```

Öffne http://localhost:3000

---

## Projekt Struktur

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts        ← Gemini Vision API Route
│   │   └── build-prompt/route.ts   ← Claude Prompt API Route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    ← Main UI
└── lib/
    └── constants.ts                ← Library, Tools, Types
```

## Features

- **Dual Pipeline:** Gemini analysiert das Bild, Claude baut den Prompt
- **4 Output Tabs:** Prompt, Layers, Tools, Raw Analysis
- **Orchestra Library:** Style, Mood, Technical Tags
- **Video & Image Mode**
- **Quality Score** pro generiertem Prompt
- **Ghost Director** Philosophie
- **Tool Recommendations** mit Best Match

## Deployment auf Vercel

```bash
npm install -g vercel
vercel
```

Environment Variables in Vercel Dashboard eintragen:
- `GEMINI_API_KEY`
- `ANTHROPIC_API_KEY`
