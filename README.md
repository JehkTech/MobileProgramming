# TransitTrack

A mobile app for tracking public transit in real-time, built with React Native (Expo) and Node.js (Express).

[![CI](https://github.com/your-org/transit-track/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/transit-track/actions/workflows/ci.yml)

## Sprint 1 Completion Status

**Status:** COMPLETED  
**Completion Date:** 2026-05-01

Sprint 1 established the foundation for TransitTrack. The backend API is operational with JWT authentication, PostgreSQL integration via Sequelize, and versioned routes at `/api/v1`. The frontend Expo app boots successfully with map screen, theme system, and notification services. CI/CD pipeline validates both projects on every push.

### What Was Built
- Express.js backend with JWT auth middleware and versioned API routes
- PostgreSQL models (User, Route, Stop, Vehicle) with Sequelize migrations
- Expo React Native app with navigation, map screen, and design tokens
- Push notification scaffolding (Firebase Admin SDK backend, expo-notifications frontend)
- CI/CD pipeline with GitHub Actions (lint, type-check, smoke tests, migrations)

## Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Expo CLI (`npm install -g expo-cli`)
- Git

## Project Structure

```
transit-track/
├── transit-track-backend/   # Node.js + Express API
├── transit-track-frontend/  # React Native + Expo app
├── .github/workflows/      # CI/CD
└── README.md
```

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd transit-track-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your PostgreSQL credentials and JWT secret.

4. Create the database:
   ```bash
   createdb transit_track
   ```

5. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

6. (Optional) Seed demo data:
   ```bash
   npx sequelize-cli db:seed:all
   ```

7. Start the server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000` by default.

8. Verify setup:
   ```bash
   curl http://localhost:5000/health
   ```

## Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd transit-track-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```
   Set `EXPO_PUBLIC_API_BASE_URL` to your backend URL (e.g., `http://localhost:5000/api/v1`).

4. Start Expo dev server:
   ```bash
   npm start
   ```

5. Run on device/emulator:
   - Scan QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## Running Tests

### Backend
```bash
cd transit-track-backend
npm run lint      # ESLint checks
npm run type-check # Syntax validation
npm run smoke     # Endpoint tests
```

### Frontend
```bash
cd transit-track-frontend
npm run lint      # ESLint checks
npm run type-check # Syntax validation
npm run smoke     # File existence checks
```

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push/PR:

### Backend Job
- Runs on: `ubuntu-latest` with PostgreSQL 16 service container
- Environment: Node.js 20
- Steps: install dependencies, lint (ESLint v10), type-check, run migrations, smoke tests
- Smoke tests: verifies `/health`, `/api/v1/health`, `/api/v1/stops`, `/api/v1/stops/:id`, `/api/v1/auth/me` (401/403/200)

### Frontend Job
- Runs on: `ubuntu-latest`
- Environment: Node.js 20
- Steps: install dependencies, lint (ESLint v9 with React plugin), type-check, smoke tests (file existence checks)

### CI Scripts

**Backend** (`transit-track-backend/package.json`):
| Script | Description |
|--------|-------------|
| `npm run lint` | ESLint v10 with flat config (`eslint.config.js`) |
| `npm run type-check` | Syntax validation on all `.js` files (`scripts/type-check.js`) |
| `npm run smoke` | Endpoint tests via `scripts/smoke-check.js` |

**Frontend** (`transit-track-frontend/package.json`):
| Script | Description |
|--------|-------------|
| `npm run lint` | ESLint v9 with flat config and React plugin |
| `npm run type-check` | Syntax validation on all `.js` files |
| `npm run smoke` | File existence checks |

## Environment Variables

### Backend (`.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `Jehoiachin` |
| `DB_NAME` | Database name | `transit_track` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_PORT` | Database port | `5454` |
| `JWT_SECRET` | Secret for JWT signing | (required) |
| `FRONTEND_ORIGIN` | Allowed CORS origin | (optional) |
| `FIREBASE_PROJECT_ID` | Firebase project ID | (optional) |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | (optional) |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | (optional) |

### Frontend (`.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api/v1` |

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Public Endpoints

#### Health Checks
- `GET /health` - Server health check
  ```json
  { "status": "OK", "timestamp": "2026-05-01T12:00:00.000Z" }
  ```

- `GET /api/v1/health` - API v1 health check
  ```json
  { "status": "OK", "timestamp": "2026-05-01T12:00:00.000Z" }
  ```

#### Stops
- `GET /api/v1/stops` - List all stops
  ```json
  [
    { "id": 1, "name": "Main St & 5th Ave", "latitude": 40.7128, "longitude": -74.0060 },
    { "id": 2, "name": "Broadway & 42nd", "latitude": 40.7549, "longitude": -73.9840 }
  ]
  ```

- `GET /api/v1/stops/:id` - Get stop by ID
  ```json
  { "id": 1, "name": "Main St & 5th Ave", "latitude": 40.7128, "longitude": -74.0060 }
  ```

  Error responses:
  - `404`: `{ "error": "Stop not found" }`
  - `500`: `{ "error": "Failed to fetch stop" }`

### Auth Endpoints (JWT)

#### Register
- `POST /api/v1/auth/register`
  ```json
  Request: { "email": "user@example.com", "password": "secure123", "firstName": "John", "lastName": "Doe" }
  Response (201): { "user": { "id": 1, "email": "user@example.com", "firstName": "John", "lastName": "Doe" }, "token": "jwt-token" }
  ```
  Error responses:
  - `400`: `{ "error": "Email and password required" }`
  - `409`: `{ "error": "Email already registered" }`
  - `500`: `{ "error": "Registration failed" }`

#### Login
- `POST /api/v1/auth/login`
  ```json
  Request: { "email": "user@example.com", "password": "secure123" }
  Response (200): { "user": { "id": 1, "email": "user@example.com", "firstName": "John", "lastName": "Doe" }, "token": "jwt-token" }
  ```
  Error responses:
  - `400`: `{ "error": "Email and password required" }`
  - `401`: `{ "error": "Invalid credentials" }`
  - `500`: `{ "error": "Login failed" }`

#### Get Current User
- `GET /api/v1/auth/me` (requires `Authorization: Bearer <token>` header)
  ```json
  Response (200): { "user": { "id": 1, "email": "user@example.com" } }
  ```
  Error responses:
  - `401`: `{ "error": "Access token required" }`
  - `403`: `{ "error": "Invalid or expired token" }`
  - `500`: `{ "error": "JWT secret is not configured" }`

## Push Notifications

### Backend (Firebase Admin SDK)
Backend Firebase Admin SDK (`src/services/firebase.js`) initializes safely - it no-ops when credentials are unset. Configure via backend `.env`:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Frontend (Expo Notifications)
Frontend uses `expo-notifications` with the following service functions in `services/notifications.js`:

| Function | Description |
|----------|-------------|
| `requestNotificationPermissions()` | Requests notification permissions, sets up Android channel |
| `scheduleStopAlert(stopName, minutes)` | Schedules a transit alert notification |
| `cancelAllNotifications()` | Cancels all scheduled notifications |

Usage example:
```javascript
import { scheduleStopAlert } from './services/notifications';

// Schedule alert for bus arriving in 10 minutes
await scheduleStopAlert('Main St & 5th Ave', 10);
```

For setup:
1. Install Expo notifications (already included in package.json):
   ```bash
   cd transit-track-frontend
   expo install expo-notifications
   ```
2. Configure your Firebase project and add credentials to backend `.env`.

## What's for Sprint 2?

Sprint 2 (32 SP) focuses on live tracking and user features. See [SPRINT2_PLAN.md](SPRINT2_PLAN.md) for the full plan.

### Sprint 2 Scope
| Feature | Story Points |
|---------|--------------|
| GTFS-RT Parser & Bus Location API | 6 SP |
| WebSocket Live Tracking | 6 SP |
| Stop Search Functionality | 4 SP |
| ETA Calculations | 5 SP |
| User Authentication UI | 4 SP |
| Favorites System | 4 SP |
| Journey Planning | 3 SP |

### Masterplan Reference
This project follows a 6-week masterplan for TransitTrack (real-time public transport tracking app). The masterplan covers:
- 6-agent coordination (UX Researcher, UI Designer, Backend Architect, Sprint Prioritizer, Mobile Builder, Growth Hacker, Rapid Prototyper)
- Detailed sprint plans (6 weeks)
- User research findings
- UI design specifications
- Backend architecture
- Growth strategy

If you have the `transit-app-masterplan.html` file, it provides the full 6-week roadmap. Sprint 2 corresponds to Weeks 2-3 of that masterplan.

### Next Steps (After Sprint 1)
1. Set up GTFS-RT feed parser for live vehicle positions
2. Implement WebSocket server for real-time map updates
3. Build stop search with autocomplete
4. Calculate ETAs from live data + static schedule
5. Create login/register screens with JWT token storage
6. Add favorites system for quick stop access
7. Basic journey planning between stops

---

## License

ISC
