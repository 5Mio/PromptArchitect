---
name: maximal-web-design
description: Create bold, visually dense, maximalist web interfaces with multiple layers, rich color palettes, experimental typography, and abundant visual elements. Use this skill when the user requests maximalist, bold, busy, colorful, expressive, or "more is more" web designs. Perfect for creative industries, artistic portfolios, event websites, youth-oriented brands, and projects that need to make a statement. NOT suitable for corporate, financial, healthcare, or conversion-focused e-commerce sites.
license: MIT
---

# Maximalist Web Design Skill

## Overview

Maximalismus im Webdesign ist eine Design-Philosophie, die **visuelle Fülle, Komplexität und mutige Ausdrucksstärke** über Zurückhaltung stellt. Es ist das bewusste Gegenteil von Minimalismus: "More is More" statt "Less is More".

**Kernprinzip:** Kontrolliertes visuelles Chaos mit klarer künstlerischer Vision.

---

## When to Use This Skill

### ✅ IDEAL FÜR:

**Branchen & Projekte:**
- Kreative Agenturen (Design, Werbung, Kunst)
- Musik-Industry (Künstler, Labels, Festivals)
- Fashion & Streetwear Brands
- Gaming & E-Sports
- Event-Websites (Konzerte, Festivals, Konferenzen)
- Künstler-Portfolios
- Experimentelle/Avantgarde-Projekte
- Youth Culture Brands (Gen Z Targeting)
- Editorial/Magazine-Websites
- NFT/Crypto-Projekte (wenn passend)

**Zielgruppen:**
- 18-35 Jahre alt
- Design-affin, experimentierfreudig
- Künstlerisch/kreativ orientiert
- Frühe Technologie-Adopter

**Projekt-Typen:**
- Landing Pages für Produkt-Launches
- Brand-Statement-Sites
- Kampagnen-Microsites
- Künstler/Designer-Portfolios
- Digitale Ausstellungen

### ❌ NICHT GEEIGNET FÜR:

**Branchen:**
- B2B-Services (Consulting, SaaS)
- Finanzdienstleistungen (Banken, Versicherungen)
- Gesundheitswesen (Ärzte, Kliniken)
- Rechtsdienste (Anwälte, Notare)
- E-Commerce mit Conversion-Fokus
- Corporate Websites
- Regierungs-/Behörden-Sites

**Gründe:**
- Zu ablenkend für Conversion-Optimierung
- Mangel an Seriosität/Vertrauen
- Zu verspielt für B2B-Kontext
- Accessibility-Probleme möglich
- Nicht altersgruppengerecht (50+ Zielgruppe)

---

## Core Principles of Maximalist Web Design

### 1. Visual Density & Layering
- **Multiple Ebenen** übereinander geschichtet
- **Überlappende Elemente** statt getrennter Sections
- **Controlled Chaos** – visuell komplex, aber mit System
- **Z-Index Management** als Kunst-Form

**Technisch:**
```css
.layered-section {
  position: relative;
  z-index: 1;
}

.layer-1 { z-index: 1; } /* Background pattern */
.layer-2 { z-index: 2; } /* Image */
.layer-3 { z-index: 3; } /* Text */
.layer-4 { z-index: 4; } /* Decorative elements */
.layer-5 { z-index: 5; } /* Interactive elements */
```

### 2. Rich Color Palettes
- **6-10+ Farben** gleichzeitig verwenden
- **Kontrastreiche Kombinationen** (aber harmonisch)
- **Unerwartete Pairings** (Pink + Orange, Türkis + Gelb)
- **Gradients überall** (nicht nur Hintergründe)

**Beispiel-Paletten:**

**Y2K/Cyber:**
```css
:root {
  --neon-pink: #FF006E;
  --electric-blue: #00F5FF;
  --acid-green: #39FF14;
  --cyber-purple: #8B00FF;
  --solar-yellow: #FFD700;
  --hot-magenta: #FF00FF;
}
```

**Retro-Pop:**
```css
:root {
  --coral: #FF6B6B;
  --sunshine: #FFE66D;
  --teal: #4ECDC4;
  --lavender: #C7CEEA;
  --peach: #FFDAB9;
  --mint: #B4F8C8;
}
```

### 3. Typographic Chaos
- **3-5 verschiedene Schriftarten** mixen
- **Extreme Größen-Kontraste** (10px neben 200px)
- **Experimentelle Font-Pairings**
- **Typografie als visuelles Element**, nicht nur Text

**Schrift-Kombinationen:**

**Editorial Maximalismus:**
```css
.hero-title {
  font-family: 'Playfair Display', serif; /* 900 weight */
  font-size: clamp(4rem, 12vw, 12rem);
}

.sub-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 0.3em;
}

.accent-text {
  font-family: 'Brush Script MT', cursive;
  font-size: 2.5rem;
}

.body {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
}

.labels {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
```

### 4. Patterns, Textures & Decorative Elements
- **Hintergrund-Patterns** (Geometric, Organic)
- **Noise/Grain Overlays** für Texture
- **Dekorative Shapes** (Circles, Blobs, Lines)
- **Illustrative Elements** verstreut

**Pattern-Techniken:**

**Dot Grid Pattern:**
```css
.dot-pattern {
  background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

**Diagonal Stripes:**
```css
.stripe-pattern {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.05) 10px,
    rgba(255,255,255,0.05) 20px
  );
}
```

**Organic Noise:**
```css
.noise-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,...'); /* SVG noise */
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### 5. Abundant Animation & Motion
- **Viele gleichzeitige Animationen**
- **Komplexe Scroll-Effekte**
- **Parallax auf mehreren Ebenen**
- **Hover-Reaktionen überall**
- **Continuous Motion** (nicht nur on-trigger)

**Animation-Arsenal:**

```css
/* Kontinuierliche Rotationen */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning-element {
  animation: spin-slow 20s linear infinite;
}

/* Floating/Levitating */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

.floating {
  animation: float 4s ease-in-out infinite;
}

/* Pulsing Glow */
@keyframes pulse-glow {
  0%, 100% { 
    filter: drop-shadow(0 0 5px currentColor);
  }
  50% { 
    filter: drop-shadow(0 0 20px currentColor);
  }
}

.glowing {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Color Shift */
@keyframes hue-rotate {
  from { filter: hue-rotate(0deg); }
  to { filter: hue-rotate(360deg); }
}

.color-shift {
  animation: hue-rotate 10s linear infinite;
}

/* Gradient Shift */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(270deg, #FF006E, #8B00FF, #00F5FF);
  background-size: 600% 600%;
  animation: gradient-shift 15s ease infinite;
}
```

### 6. Asymmetric & Broken Layouts
- **Grid-Breaking** Elemente
- **Diagonale Kompositionen**
- **Überlappungen** zwischen Sections
- **Chaos mit Methode**

**Layout-Techniken:**

```css
/* Diagonal Section Split */
.diagonal-section {
  clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);
}

/* Overlapping Sections */
.overlap-section {
  position: relative;
  z-index: 2;
  margin-top: -100px; /* Overlap previous section */
}

/* Asymmetric Grid */
.asymmetric-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  grid-template-rows: auto 200px 300px auto;
  gap: 2rem;
}

.grid-breaker {
  grid-column: 1 / -1; /* Spans all columns */
  transform: rotate(-2deg);
}
```

---

## Maximalist Design Flavors

Es gibt verschiedene "Geschmacksrichtungen" von Maximalismus. Wähle eine und execute sie mit Präzision:

### 1. Y2K / Retro-Futuristic Maximalism

**Charakteristika:**
- Neon-Farben (Pink, Cyan, Acid Green)
- Chrome-Effekte & Glassmorphism
- Cyber-Schriftarten (Orbitron, Exo)
- Grid-Patterns & Scan Lines
- Glitch-Effects

**Technologie-Stack:**
```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;600&display=swap" rel="stylesheet">
```

**CSS Signature:**
```css
/* Chrome Text Effect */
.chrome-text {
  background: linear-gradient(90deg, #C0C0C0, #FFFFFF, #C0C0C0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.8));
}

/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Neon Glow */
.neon-glow {
  text-shadow:
    0 0 10px #FF006E,
    0 0 20px #FF006E,
    0 0 30px #FF006E,
    0 0 40px #FF006E;
}
```

### 2. Brutalist Maximalism

**Charakteristika:**
- Schwarz/Weiß + aggressive Akzente
- Anti-Design Ästhetik
- Raw HTML-Feeling
- Viele Borders & Outlines
- Industrial Typography

**Signatur-Elemente:**
```css
/* Brutalist Border Chaos */
.brutal-element {
  border: 3px solid #000;
  outline: 2px solid #FF0000;
  outline-offset: 5px;
  box-shadow: 8px 8px 0 #000;
}

/* Industrial Typography */
.brutal-text {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-left: 8px solid #000;
  padding-left: 1rem;
}

/* Raw Grid */
.brutal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  background: #000;
}

.brutal-grid > * {
  background: #FFF;
  padding: 2rem;
  border: 2px solid #000;
}
```

### 3. Editorial / Magazine Maximalism

**Charakteristika:**
- 4-5 Schriftarten wie in Print-Magazinen
- Asymmetrische Grids
- Große, dominante Typografie
- Overlap & Layering
- Redaktionelle Farbpaletten

**Layout-Ansatz:**
```css
/* Magazine-Style Hero */
.editorial-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 0;
}

.hero-text {
  grid-column: 1 / 2;
  grid-row: 1;
  z-index: 2;
  padding: 4rem;
}

.hero-image {
  grid-column: 2 / 3;
  grid-row: 1;
  transform: translateX(-100px); /* Overlap */
}

/* Magazine Typography */
.magazine-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 10rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
}

.kicker {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #FF6B6B;
  margin-bottom: 1rem;
}
```

### 4. Organic / Natural Maximalism

**Charakteristika:**
- Erdtöne + kräftige Naturfarben
- Organische Shapes (Blobs, Curves)
- Illustrative Elemente
- Fließende Kompositionen
- Handwritten Fonts

**Organische Shapes:**
```css
/* Blob Shape mit clip-path */
.blob {
  clip-path: path('M 200,100 C 200,50 250,0 300,0 C 350,0 400,50 400,100 C 400,150 350,200 300,200 C 250,200 200,150 200,100 Z');
}

/* Oder mit border-radius (einfacher) */
.blob-simple {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}

/* Flowing Text Around Shape */
.organic-layout {
  shape-outside: circle(50%);
  float: left;
  width: 300px;
  height: 300px;
}
```

### 5. Cyberpunk / Dystopian Maximalism

**Charakteristika:**
- Dunkle Basis (Schwarz/Dark Gray)
- Neon-Akzente (Pink, Cyan, Purple)
- Glitch-Effekte
- Holographic Elements
- Tech-Noir Vibe

**Glitch Effect:**
```css
@keyframes glitch {
  0% {
    transform: translate(0);
    text-shadow: 2px 2px #FF006E, -2px -2px #00F5FF;
  }
  20% {
    transform: translate(-2px, 2px);
    text-shadow: 2px 2px #00F5FF, -2px -2px #FF006E;
  }
  40% {
    transform: translate(2px, -2px);
    text-shadow: 2px 2px #FF006E, -2px -2px #00F5FF;
  }
  60% {
    transform: translate(-2px, 2px);
    text-shadow: 2px 2px #00F5FF, -2px -2px #FF006E;
  }
  80% {
    transform: translate(2px, -2px);
    text-shadow: 2px 2px #FF006E, -2px -2px #00F5FF;
  }
  100% {
    transform: translate(0);
    text-shadow: 2px 2px #FF006E, -2px -2px #00F5FF;
  }
}

.glitch-text {
  animation: glitch 0.3s infinite;
}

/* Holographic Effect */
.holographic {
  background: linear-gradient(
    45deg,
    #FF00FF 0%,
    #00FFFF 25%,
    #FF00FF 50%,
    #00FFFF 75%,
    #FF00FF 100%
  );
  background-size: 400% 400%;
  animation: gradient-shift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Technical Implementation Guide

### HTML Structure for Maximalist Layouts

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maximalist Design</title>
    
    <!-- Fonts: Mix mindestens 3 -->
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;700;900&family=Space+Mono:wght@400;700&family=Indie+Flower&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables für Farb-Chaos */
        :root {
            --color-1: #FF006E;
            --color-2: #00F5FF;
            --color-3: #39FF14;
            --color-4: #8B00FF;
            --color-5: #FFD700;
            --color-6: #FF6B6B;
        }
        
        body {
            margin: 0;
            overflow-x: hidden;
            background: #000;
            color: #FFF;
        }
    </style>
</head>
<body>
    <!-- Layer 1: Background Pattern -->
    <div class="background-layer layer-1">
        <!-- Animated gradient mesh -->
    </div>
    
    <!-- Layer 2: Decorative Elements -->
    <div class="decorative-layer layer-2">
        <!-- Floating shapes, patterns -->
    </div>
    
    <!-- Layer 3: Content -->
    <main class="content-layer layer-3">
        <!-- Actual content -->
    </main>
    
    <!-- Layer 4: Interactive Overlays -->
    <div class="overlay-layer layer-4">
        <!-- Cursor effects, tooltips -->
    </div>
</body>
</html>
```

### Advanced CSS Techniques

**Multi-Layer Backgrounds:**
```css
.complex-background {
  background: 
    /* Layer 1: Radial gradient */
    radial-gradient(circle at 20% 50%, rgba(255,0,110,0.3) 0%, transparent 50%),
    /* Layer 2: Linear gradient */
    linear-gradient(135deg, #667eea 0%, #764ba2 100%),
    /* Layer 3: Pattern */
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255,255,255,0.05) 10px,
      rgba(255,255,255,0.05) 20px
    ),
    /* Layer 4: Base color */
    #1a1a2e;
  background-blend-mode: screen, normal, overlay;
}
```

**Crazy Clip Paths:**
```css
/* Irregular polygon */
.irregular-shape {
  clip-path: polygon(
    0 0,
    90% 0,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0 90%,
    0 10%
  );
}

/* Star shape */
.star-shape {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}
```

**Multiple Box Shadows (Depth):**
```css
.deep-shadow {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 4px 6px rgba(0,0,0,0.16),
    0 10px 20px rgba(0,0,0,0.19),
    0 15px 30px rgba(0,0,0,0.22),
    0 20px 40px rgba(0,0,0,0.25),
    /* Colored glow layers */
    0 0 30px rgba(255,0,110,0.3),
    0 0 60px rgba(0,245,255,0.2);
}
```

### JavaScript for Interactive Chaos

**Custom Cursor:**
```javascript
// Animated cursor follower
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add glow on hover over elements
document.querySelectorAll('.interactive').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.filter = 'drop-shadow(0 0 20px currentColor)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.filter = 'none';
  });
});
```

**Parallax Scroll (Multiple Layers):**
```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Different speeds for different layers
  document.querySelector('.layer-1').style.transform = 
    `translateY(${scrolled * 0.5}px)`;
  document.querySelector('.layer-2').style.transform = 
    `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg)`;
  document.querySelector('.layer-3').style.transform = 
    `translateY(${scrolled * 0.1}px)`;
});
```

**Random Color Shifts:**
```javascript
const colors = ['#FF006E', '#00F5FF', '#39FF14', '#8B00FF', '#FFD700'];

setInterval(() => {
  document.querySelectorAll('.color-shift-element').forEach(el => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.color = randomColor;
  });
}, 3000);
```

---

## Performance Considerations

Maximalistisches Design = Performance-Challenge. Wichtige Optimierungen:

### 1. Animation Performance
```css
/* USE: Transform & Opacity (GPU-accelerated) */
.optimized-animation {
  transform: translateX(100px);
  opacity: 0.5;
  will-change: transform, opacity;
}

/* AVOID: Width, Height, Left, Top, Margin */
.slow-animation {
  width: 100px; /* Triggers layout recalculation */
  margin-left: 50px; /* Triggers layout */
}
```

### 2. Reduce Repaints
```css
/* Separate animated layers */
.animated-layer {
  position: fixed;
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}
```

### 3. Lazy Load Heavy Elements
```javascript
// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

document.querySelectorAll('.lazy-animate').forEach(el => {
  observer.observe(el);
});
```

### 4. Optimize Images
- **WebP format** für alle Bilder
- **Responsive images** mit srcset
- **Lazy loading** mit loading="lazy"
- **Compress heavily** – visuelle Dichte kann Qualitäts-Verlust verbergen

---

## Accessibility in Maximalist Design

Maximalism ≠ Inaccessible! Wichtige Regeln:

### 1. Contrast Ratios
```css
/* Trotz bunter Farben: Text muss lesbar sein */
.text-on-colorful-bg {
  color: #FFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8); /* Für Lesbarkeit */
}

/* WCAG AA: mindestens 4.5:1 für normalen Text */
/* WCAG AAA: mindestens 7:1 */
```

### 2. Reduce Motion für Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Focus States (trotz Chaos)
```css
a:focus, button:focus {
  outline: 3px solid #00F5FF;
  outline-offset: 3px;
  /* Muss sichtbar sein, auch bei buntem Hintergrund */
}
```

### 4. Alt-Texte & ARIA
```html
<!-- Auch dekorative Elemente semantisch korrekt -->
<div class="decorative-blob" role="presentation" aria-hidden="true"></div>

<!-- Wichtige Bilder mit Alt-Text -->
<img src="crazy-visual.jpg" alt="Abstract colorful composition with overlapping geometric shapes">
```

---

## Common Pitfalls & How to Avoid Them

### ❌ FEHLER 1: Unlesbare Typografie
**Problem:** Zu viele Fonts, zu klein, zu kontrastarm
**Lösung:**
```css
/* Body Text MUSS lesbar bleiben */
.body-text {
  font-family: 'Space Mono', monospace; /* Gute Lesbarkeit */
  font-size: clamp(1rem, 2vw, 1.125rem); /* Nie unter 16px */
  line-height: 1.6; /* Ausreichend Zeilenhöhe */
  color: #FFF;
  background: rgba(0,0,0,0.7); /* Kontrast-Hilfe */
  padding: 1rem;
}
```

### ❌ FEHLER 2: Chaos ohne Struktur
**Problem:** Zufälliges Placement, keine visuelle Hierarchie
**Lösung:**
```css
/* Trotz Chaos: Klare Hierarchie */
.h1-max { font-size: 8rem; font-weight: 900; }
.h2-max { font-size: 4rem; font-weight: 700; }
.h3-max { font-size: 2rem; font-weight: 600; }
.body-max { font-size: 1rem; font-weight: 400; }

/* Grid als unsichtbare Struktur */
.controlled-chaos {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  /* Elemente können Grid brechen, aber Grid existiert */
}
```

### ❌ FEHLER 3: Zu langsame Performance
**Problem:** 50+ Animationen, riesige Bilder, kein Lazy Loading
**Lösung:**
- Max **5-7 aktive Animationen** gleichzeitig
- **Stagger delays** statt alles auf einmal
- **Intersection Observer** für scroll-triggered Animationen
- **will-change** nur für aktiv animierte Elemente

### ❌ FEHLER 4: Mobile wird vergessen
**Problem:** Funktioniert nur auf Desktop
**Lösung:**
```css
/* Mobile: Reduzierte Komplexität */
@media (max-width: 768px) {
  .complex-grid {
    grid-template-columns: 1fr; /* Simplified */
  }
  
  .large-typography {
    font-size: clamp(2rem, 10vw, 4rem); /* Responsive */
  }
  
  .decorative-elements {
    display: none; /* Hide on mobile */
  }
  
  .animated-background {
    animation: none; /* Reduce motion */
  }
}
```

---

## Complete Example: Y2K Maximalist Landing Page

Siehe `./templates/y2k-landing-page.html` für vollständiges Code-Beispiel.

**Key Features:**
- 7 Farben gleichzeitig
- 4 Schriftarten
- 3 Ebenen Parallax
- Glassmorphism + Neon Glows
- Animated Gradient Background
- Floating Shapes
- Custom Cursor
- Grid-Breaking Layout

---

## Workflow: Creating a Maximalist Design

### Step 1: Choose Your Flavor
Entscheide dich für einen Stil:
- Y2K/Cyber
- Brutalist
- Editorial
- Organic
- Cyberpunk

### Step 2: Define Your Palette
Wähle **6-10 Farben**, die harmonieren (aber kontrastieren):
```css
:root {
  --primary-1: #...;
  --primary-2: #...;
  --accent-1: #...;
  --accent-2: #...;
  --accent-3: #...;
  --neutral: #...;
}
```

### Step 3: Font Stack
Mix **3-5 Fonts**:
- 1x Display (Headlines)
- 1x Decorative (Akzente)
- 1x Readable (Body)
- Optional: Monospace, Script

### Step 4: Layout Structure
Erstelle ein Grid (auch wenn du es brichst):
```css
.main-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}
```

### Step 5: Add Layers
- Layer 1: Background (Pattern/Gradient)
- Layer 2: Decorative Elements
- Layer 3: Content
- Layer 4: Interactive Overlays

### Step 6: Animate Everything
Aber: **Stagger the delays!**
```css
.element-1 { animation-delay: 0s; }
.element-2 { animation-delay: 0.1s; }
.element-3 { animation-delay: 0.2s; }
```

### Step 7: Polish & Optimize
- Check contrast ratios
- Test on mobile
- Reduce animations for prefers-reduced-motion
- Optimize images
- Add focus states

---

## Inspiration Resources

**Websites für Maximalist Design:**
- Awwwards.com (Filters: "Experimental", "Colorful")
- Behance.com (Search: "Maximalist Web Design")
- Dribbble.com (Tags: #maximalism #bolddesign)
- SiteInspire.com

**Font Pairings:**
- FontPair.co
- Typewolf.com

**Color Tools:**
- Coolors.co (Generate palettes)
- ColorHunt.co (Trending palettes)
- Adobe Color (Harmony rules)

---

## Final Checklist

Before shipping a maximalist design:

### Visual
- [ ] 6-10 colors used harmoniously?
- [ ] 3-5 fonts that work together?
- [ ] Clear visual hierarchy despite chaos?
- [ ] Decorative elements enhance, not distract?
- [ ] Every element has a purpose?

### Technical
- [ ] Performance < 3s load time?
- [ ] Animations run at 60fps?
- [ ] Mobile responsive?
- [ ] Images optimized (WebP)?
- [ ] Lazy loading implemented?

### Accessibility
- [ ] Text contrast ratio ≥ 4.5:1?
- [ ] Reduced motion alternative?
- [ ] Focus states visible?
- [ ] Alt texts for images?
- [ ] Keyboard navigation works?

### Brand Fit
- [ ] Matches target audience (18-35, creative)?
- [ ] NOT for corporate/finance/healthcare?
- [ ] Client understands "bold choice"?
- [ ] Conversion goals don't require minimalism?

---

## When NOT to Go Maximalist

**Red Flags:**
- Client sagt "professionell" und meint "seriös"
- Zielgruppe 45+ Jahre
- B2B-Kontext
- E-Commerce mit hoher Conversion-Priorität
- Accessibility absolut kritisch (z.B. Government)
- Client hat kein Budget für Custom-Development

**Alternative:** Stick to **elegant minimalism** with **subtle accents**.

---

## Summary

Maximalistisches Webdesign ist:
- **Mut** zu visueller Fülle
- **Kontrolle** über Chaos
- **Harmonie** in Vielfalt
- **Performance** trotz Komplexität
- **Accessibility** mit Kreativität

**Kernbotschaft:** More is More – aber mit Methode!

---

*Skill Version: 1.0*  
*Last Updated: Februar 2026*  
*Maintained by: WebdesignPro Team*
