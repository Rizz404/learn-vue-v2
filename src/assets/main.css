@import 'tailwindcss';

/* ============================================
   DARK MODE SETUP (Tailwind v4 official way)
   ============================================ */
@custom-variant dark (&:where(.dark, .dark *));

/* ============================================
   DESIGN TOKENS - 70/20/10 Semantic Color System
   ============================================ */
@theme {
  /* Reset semua default Tailwind colors */
  --color-*: initial;

  /* ==========================
     70% - NEUTRAL
     Dominant background & surfaces
     ========================== */
  --color-background: oklch(1 0 0);
  --color-surface: oklch(0.97 0 0);
  --color-surface-raised: oklch(0.93 0 0);

  /* ==========================
     20% - SECONDARY
     Supporting elements, chips, tags, panels
     ========================== */
  --color-secondary: oklch(0.9 0 0);
  --color-secondary-hover: oklch(0.85 0 0);
  --color-secondary-fg: oklch(0.15 0 0);

  /* ==========================
     10% - PRIMARY
     Brand accent, CTA, active state, highlights
     ========================== */
  --color-primary: oklch(0.55 0.18 250);
  --color-primary-hover: oklch(0.46 0.17 250);
  --color-primary-muted: oklch(0.93 0.03 250);
  --color-primary-fg: oklch(1 0 0);

  /* ==========================
     CONTENT - Typography
     ========================== */
  --color-content: oklch(0.15 0 0);
  --color-content-secondary: oklch(0.4 0 0);
  --color-content-muted: oklch(0.62 0 0);

  /* ==========================
     BORDER
     ========================== */
  --color-border: oklch(0.88 0 0);
  --color-border-subtle: oklch(0.93 0 0);

  /* ==========================
     STATUS
     ========================== */
  --color-success: oklch(0.62 0.17 150);
  --color-success-fg: oklch(1 0 0);
  --color-warning: oklch(0.75 0.17 75);
  --color-warning-fg: oklch(0.15 0 0);
  --color-danger: oklch(0.6 0.22 25);
  --color-danger-fg: oklch(1 0 0);
  --color-info: oklch(0.62 0.16 230);
  --color-info-fg: oklch(1 0 0);

  /* ==========================
     SPACING & RADIUS
     ========================== */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
  --spacing-88: 22rem;
  --spacing-128: 32rem;
  --radius-card: 0.75rem;

  /* ==========================
     TYPOGRAPHY
     ========================== */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

/* ============================================
   DARK MODE TOKEN OVERRIDES
   Hanya ini yang perlu diubah untuk dark mode!
   Semua komponen otomatis ikut tanpa dark: variants.
   ============================================ */
:root.dark {
  /* 70% Neutral */
  --color-background: oklch(0.1 0.01 250);
  --color-surface: oklch(0.13 0.01 250);
  --color-surface-raised: oklch(0.17 0.01 250);

  /* 20% Secondary */
  --color-secondary: oklch(0.21 0.01 250);
  --color-secondary-hover: oklch(0.26 0.01 250);
  --color-secondary-fg: oklch(0.93 0 0);

  /* 10% Primary - sedikit lebih terang di dark */
  --color-primary: oklch(0.64 0.15 250);
  --color-primary-hover: oklch(0.55 0.18 250);
  --color-primary-muted: oklch(0.17 0.04 250);

  /* Content */
  --color-content: oklch(0.95 0 0);
  --color-content-secondary: oklch(0.72 0 0);
  --color-content-muted: oklch(0.52 0 0);

  /* Border */
  --color-border: oklch(0.28 0.01 250);
  --color-border-subtle: oklch(0.22 0.01 250);
}

/* ============================================
   BASE STYLES
   ============================================ */
body {
  background-color: var(--color-background);
  color: var(--color-content);
  font-family: var(--font-sans);
  transition:
    background-color 0.2s,
    color 0.2s;
}
