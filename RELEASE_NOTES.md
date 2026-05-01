# TransitTrack Release Notes

This document groups delivered work by sprint and captures the remaining Sprint 2 items that are still planned.

## Sprint 1 - Foundation & Setup

Delivered in the foundation sprint:

- Backend API bootstrapping with Express, Sequelize, PostgreSQL, and versioned routes.
- JWT auth middleware and auth endpoints for protected API access.
- Expo frontend setup with the base mobile shell and map screen.
- Initial theme and notification scaffolding.
- CI pipeline baseline for backend and frontend validation.
- DB migrations and starter data patterns for local and CI environments.

## Sprint 2 - Live Tracking & User Features

Delivered during the Sprint 2 UI and product pass:

- Centralized design tokens for color, spacing, radius, typography, shadows, and layout.
- Reusable UI primitives for cards, pills, action buttons, metric tiles, ETA cards, and bottom tabs.
- Five core app screens implemented in the mobile-first shell:
  - Home / map overview
  - Stop detail
  - Journey planner
  - Alerts
  - Profile
- ETA card treatment aligned to the requested card spec.
- Responsive web preview that preserves the mobile layout.
- Accessibility improvements for touch targets and action semantics.
- Supporting design documentation:
  - `transit-track-frontend/DESIGN_SYSTEM.md`
  - `transit-track-frontend/SCREEN_SPECS.md`
- GitHub Actions workflow fix:
  - backend CI now seeds test data after migrations before running smoke checks

## Sprint 2 - Remaining Items

The following Sprint 2 items are still planned and not yet shipped in the codebase:

- GTFS-RT parser and live vehicle position API.
- WebSocket-based live tracking updates.
- Stop search with autocomplete and recent searches.
- Real-time ETA engine backed by live data.
- Login and registration UI flows.
- Favorites system for saving stops.
- Push notification flow for arriving buses.

## Validation Summary

- Frontend type-check passed.
- Frontend lint passed.
- Frontend smoke check passed.
- Expo web app renders successfully on `http://localhost:8082`.
- Backend CI workflow fix added to improve reliability of smoke tests.
