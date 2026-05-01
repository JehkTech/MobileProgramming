# TransitTrack — Screen Specs (Core 5)

This document describes the five core screens, layout measurements, accessibility notes, and component composition for implementation and QA.

1) Home / Map (Mobile-first)
- Purpose: Live map with ETA cards and quick nav to saved stops and planner.
- Layout:
  - Full-bleed map area inside a `SurfaceCard` with `borderRadius: 12px`.
  - Top safe area host with app title and small `Pill` indicating live status.
  - Bottom sheet styled list of `EtaCard` components stacked vertically.
- Measurements:
  - ETA Card: height 80px, corner radius 12px, route badge 28px × 22px, ETA number 20px weight 800.
  - Touch targets: 48px min.
- Accessibility:
  - ETA numbers readable at 200% text scale.

2) Stop Detail
- Purpose: List all services at a single stop with alert actions and save controls.
- Layout:
  - Header with back action and large stop name (24px).
  - Summary `SurfaceCard` for stop metadata.
  - `EtaCard` list for departures.
- Actions:
  - `Alert` primary button (48px min) that schedules notification; confirm via native alert.
  - `Save stop` ghost action.

3) Journey Planner
- Purpose: A→B planning with options, fares, and ETA previews.
- Layout:
  - From/To inputs as `MetricTile` primitives.
  - Results list of `RouteOptionCard` components with duration/fare metadata.
  - Single `EtaCard` preview for the chosen route (matches card 3 spec).

4) My Alerts
- Purpose: Manage push notifications, view active/paused/delay alerts.
- Layout:
  - Summary `SurfaceCard` with counts and CTA `+ Add alert`.
  - List of alert cards (surface with status `Pill` and copy).
  - ETA card preview for sample.

5) Profile
- Purpose: Saved stops, settings and account features.
- Layout:
  - Profile `SurfaceCard` with avatar, name, journey stats.
  - Saved stops as small `SurfaceCard` rows.
  - Settings rows using `SettingsRow` primitive (icon, title, subtitle, trailing chevron).

Common Notes
- Colour tokens: use `colors` from `theme/index.js`.
- Typographic tokens: use `typography` values; do not hardcode sizes.
- Responsive: the mobile size must be preserved on web preview; content max-width 430px and centered.
- Interaction: all buttons should implement accessible focus-visible styling (outline or ring) on web.

QA Checklist
- Run `npm run lint` and `npm run type-check`.
- Verify ETA card contrast and 200% readability.
- Validate touch target sizes in a simulator and on device.

---
Created: 2026-05-01 — Screen specs for frontend implementation
