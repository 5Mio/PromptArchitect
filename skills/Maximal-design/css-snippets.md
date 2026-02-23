# Maximalist CSS Snippet Library

## Table of Contents
1. [Color Palettes](#color-palettes)
2. [Background Effects](#background-effects)
3. [Typography Styles](#typography-styles)
4. [Animation Presets](#animation-presets)
5. [Shape Clip-Paths](#shape-clip-paths)
6. [Glow & Shadow Effects](#glow--shadow-effects)

---

## Color Palettes

### Y2K / Cyber
```css
:root {
  --neon-pink: #FF006E;
  --electric-blue: #00F5FF;
  --acid-green: #39FF14;
  --cyber-purple: #8B00FF;
  --solar-yellow: #FFD700;
  --hot-magenta: #FF00FF;
  --deep-black: #0A0A0A;
}
```

### Retro Pop
```css
:root {
  --coral: #FF6B6B;
  --sunshine: #FFE66D;
  --teal: #4ECDC4;
  --lavender: #C7CEEA;
  --peach: #FFDAB9;
  --mint: #B4F8C8;
  --cream: #FFF8DC;
}
```

### Brutalist
```css
:root {
  --brutal-black: #000000;
  --brutal-white: #FFFFFF;
  --brutal-red: #FF0000;
  --brutal-yellow: #FFFF00;
  --brutal-blue: #0000FF;
  --brutal-gray: #808080;
}
```

### Organic / Natural
```css
:root {
  --forest-green: #2D5016;
  --sage: #9CAF88;
  --terracotta: #E07A5F;
  --sand: #F4F1DE;
  --ocean: #3D5A80;
  --coral: #F2CC8F;
}
```

---

## Background Effects

### Multi-Layer Gradient Mesh
```css
.gradient-mesh-bg {
  background: 
    radial-gradient(circle at 20% 50%, rgba(255,0,110,0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0,245,255,0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(57,255,20,0.2) 0%, transparent 50%),
    linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-blend-mode: screen, screen, screen, normal;
}
```

### Animated Gradient Shift
```css
.animated-gradient {
  background: linear-gradient(270deg, #FF006E, #8B00FF, #00F5FF, #39FF14);
  background-size: 800% 800%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Dot Grid Pattern
```css
.dot-grid {
  background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
```

### Diagonal Stripe Pattern
```css
.diagonal-stripes {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.05) 10px,
    rgba(255,255,255,0.05) 20px
  );
}
```

### Noise Texture Overlay
```css
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>');
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### Holographic Shimmer
```css
.holographic {
  background: linear-gradient(
    90deg,
    #FF00FF 0%,
    #00FFFF 25%,
    #FF00FF 50%,
    #00FFFF 75%,
    #FF00FF 100%
  );
  background-size: 400% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 400% 0%; }
}
```

---

## Typography Styles

### Chrome Text Effect
```css
.chrome-text {
  background: linear-gradient(90deg, #C0C0C0, #FFFFFF, #C0C0C0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  font-weight: 900;
}
```

### Neon Glow Text
```css
.neon-text {
  color: #00F5FF;
  text-shadow:
    0 0 5px #00F5FF,
    0 0 10px #00F5FF,
    0 0 20px #00F5FF,
    0 0 40px #00F5FF;
  animation: neonPulse 2s ease-in-out infinite;
}

@keyframes neonPulse {
  0%, 100% {
    text-shadow:
      0 0 5px #00F5FF,
      0 0 10px #00F5FF,
      0 0 20px #00F5FF;
  }
  50% {
    text-shadow:
      0 0 10px #00F5FF,
      0 0 20px #00F5FF,
      0 0 30px #00F5FF,
      0 0 50px #00F5FF;
  }
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #FF006E 0%, #00F5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Glitch Text
```css
.glitch-text {
  position: relative;
  animation: glitch 0.3s infinite;
}

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
```

---

## Animation Presets

### Floating / Levitating
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.floating {
  animation: float 4s ease-in-out infinite;
}
```

### Spinning
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 20s linear infinite;
}
```

### Pulsing Scale
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulsing {
  animation: pulse 2s ease-in-out infinite;
}
```

### Color Cycling
```css
@keyframes hue-rotate {
  from { filter: hue-rotate(0deg); }
  to { filter: hue-rotate(360deg); }
}

.color-cycle {
  animation: hue-rotate 10s linear infinite;
}
```

### Wobble
```css
@keyframes wobble {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
}

.wobble {
  animation: wobble 2s ease-in-out infinite;
}
```

---

## Shape Clip-Paths

### Irregular Polygon
```css
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
```

### Star Shape
```css
.star {
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

### Blob Shape (CSS Only)
```css
.blob {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: blobMorph 8s ease-in-out infinite;
}

@keyframes blobMorph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
}
```

### Diagonal Cut
```css
.diagonal-cut {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
```

---

## Glow & Shadow Effects

### Neon Box Glow
```css
.neon-box {
  box-shadow:
    0 0 10px rgba(0,245,255,0.5),
    0 0 20px rgba(0,245,255,0.3),
    0 0 30px rgba(0,245,255,0.2),
    inset 0 0 10px rgba(0,245,255,0.1);
}
```

### Deep Shadow Stack
```css
.deep-shadow {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 4px 6px rgba(0,0,0,0.16),
    0 10px 20px rgba(0,0,0,0.19),
    0 15px 30px rgba(0,0,0,0.22),
    0 20px 40px rgba(0,0,0,0.25);
}
```

### Colored Glow Layers
```css
.colored-glow {
  box-shadow:
    0 0 20px rgba(255,0,110,0.4),
    0 0 40px rgba(0,245,255,0.3),
    0 0 60px rgba(57,255,20,0.2);
}
```

### Inner Glow
```css
.inner-glow {
  box-shadow: inset 0 0 30px rgba(255,255,255,0.3);
}
```

---

## Glassmorphism

### Standard Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Frosted Glass (Stronger Blur)
```css
.frosted-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## Utility Classes

### Text Alignment
```css
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
```

### Transform Helpers
```css
.rotate-45 { transform: rotate(45deg); }
.rotate-90 { transform: rotate(90deg); }
.rotate-180 { transform: rotate(180deg); }
.scale-110 { transform: scale(1.1); }
.scale-150 { transform: scale(1.5); }
```

### Z-Index Layers
```css
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-30 { z-index: 30; }
.z-40 { z-index: 40; }
.z-50 { z-index: 50; }
```

---

## Usage Tips

1. **Combine Effects:** Mix 2-3 effects per element maximum
2. **Performance:** Use `will-change` for animated properties
3. **Browser Compatibility:** Always include `-webkit-` prefixes for clips and filters
4. **Accessibility:** Provide `@media (prefers-reduced-motion)` alternatives
5. **Mobile:** Reduce complexity on smaller screens

---

**Pro Tip:** Start with one effect category (e.g., backgrounds) and layer on others (typography, animations) gradually. Too many effects at once = visual chaos without intention.
