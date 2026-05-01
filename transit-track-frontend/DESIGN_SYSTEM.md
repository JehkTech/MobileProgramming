# TransitTrack — Design System

This file documents the core design tokens, component primitives, and usage guidance for the TransitTrack frontend.

## Colour Tokens
- Primary: #1B4FD8
- Secondary: #6366F1
- Success: #10B981
- Warning: #F59E0B
- Danger: #EF4444
- Text Dark: #111827
- Text Muted: #6B7280
- BG Light: #F9FAFB

Use semantic tokens from `theme/index.js` (exported under `tokens`) for backgrounds, borders, and soft variants (e.g., `primarySoft`, `warningSoft`).

## Typography Scale
- Page Title — 24px / 700 / Letter −0.5px
- Section Heading — 18px / 600 / Letter 0
- Card Title — 15px / 500 / Letter 0
- Body — 14px / 400 / LineHeight 1.6
- Caption — 12px / 400 / Muted
- Overline Tag — 11px / 700 / +0.5px / Upper

The tokens are defined in `theme/index.js` under `typography`. Always use these tokens for font sizes/weights and avoid hardcoded values.

## Spacing & Radius
- Spacing: 4 / 8 / 12 / 16 / 20 / 24 / 32 (tokens in `spacing`)
- Radius: 8 / 12 / 16 / 20 / 28 / pill (tokens in `radius`)

## Components (Primitives)
- `AppCanvas` — App shell and safe-area wrapper. Use as top-level container for screens.
- `ScreenScroll` — Standard vertical scroll with consistent padding/content width.
- `SurfaceCard` — Elevated content surface; uses `shadows.card` and `border` token.
- `Pill` — Small label chip for status/overlines.
- `ActionButton` — Primary, secondary, ghost and danger variants. 48px min touch height.
- `EtaCard` — ETA card implementation matching the ETA Card spec (height 80px, rounded 12px, route badge, ETA number styles, progress bar).
- `BottomTabs` — Mobile bottom tab navigation with active/inactive states.

Component props and usage examples are in `components/designSystem.js`.

## Accessibility
- Minimum touch target: 44x44px for all interactive controls.
- Colour contrast: ensure text on coloured backgrounds meets at least WCAG AA (4.5:1 for normal text). The tokens are chosen to meet this; verify with your tooling after edits.
- ETA numbers must remain readable at 200% text scale — prefer `fontWeight: 800` and large sizes for ETA numbers.

## Theming & Dark Mode
Tokens are structured for easy extension to dark mode. Dark theme values may be derived by replacing surface/overlay colors; update `theme/index.js` and re-run QA.

## Developer Handoff Checklist
- Use `tokens` from `theme/index.js` — do not duplicate colour or spacing values.
- New components must export a small prop API and be documented in this file or `components/`.
- Provide screenshots or storybook entries for complex components (ETA card, map preview).

---
Created: 2026-05-01 — Frontend developer handoff
