# TransitTrack Sprint 2: Live Tracking & User Features

**Sprint Goal:** Implement live bus tracking, stop search, ETA calculations, and user authentication flows.

**Story Points:** 32 SP

**Prerequisites (All Met):**
- [x] Backend API boots and serves health endpoints
- [x] DB migrations run cleanly
- [x] JWT middleware returns 401/403/200 correctly
- [x] Frontend boots in Expo without errors
- [x] Map renders markers from backend API
- [x] Firebase scaffold no-ops when credentials unset
- [x] CI workflow runs and completes successfully

---

## Sprint 2 Goals

1. **Bus location API** — GTFS-RT parser consuming real-time transit feeds
2. **Live tracking** — WebSocket updates for real-time bus positions on map
3. **Stop search** — Searchable stop list with autocomplete
4. **ETA calculations** — Real-time arrival predictions
5. **User auth flows** — Registration and login UI screens
6. **Favorites system** — Save/unsave stops for quick access
7. **Journey planning** — Basic route planning between stops

---

## Tasks to Complete

### 1. GTFS-RT Parser & Bus Location API (6 SP)
- Create `services/gtfs-rt.js` to parse Protocol Buffer GTFS-RT feed
- Add `GET /api/v1/vehicles` endpoint returning live bus positions
- Add `GET /api/v1/vehicles/:routeId` for route-specific tracking
- Create database model for vehicle locations (already has `Vehicle` model)
- Seed with sample GTFS-RT data for development

**Files to create/modify:**
- `transit-track-backend/src/services/gtfs-rt.js` (NEW)
- `transit-track-backend/src/routes/api/vehicles.js` (NEW)
- `transit-track-backend/src/routes/index.js` (modify — mount vehicles router)
- `transit-track-backend/models/vehicle.js` (modify — add associations)

### 2. WebSocket Live Tracking (6 SP)
- Set up Socket.IO or native WebSocket server on backend
- Broadcast vehicle position updates every 10 seconds
- Frontend: `services/websocket.js` to manage WebSocket connection
- Update `HomeScreen` to show live bus markers on map
- Animate bus movements between position updates

**Files to create/modify:**
- `transit-track-backend/src/services/websocket.js` (NEW)
- `transit-track-backend/server.js` (modify — attach WebSocket server)
- `transit-track-frontend/services/websocket.js` (NEW)
- `transit-track-frontend/screens/HomeScreen.js` (modify — add live bus markers)

### 3. Stop Search Functionality (4 SP)
- Create `components/StopSearchBar.js` with autocomplete
- Add `GET /api/v1/stops/search?q=query` endpoint
- Integrate search bar into HomeScreen
- Add recent searches persistence (AsyncStorage)

**Files to create/modify:**
- `transit-track-backend/src/routes/api/stops.js` (modify — add search endpoint)
- `transit-track-frontend/components/StopSearchBar.js` (NEW)
- `transit-track-frontend/screens/HomeScreen.js` (modify — integrate search)

### 4. ETA Calculations (5 SP)
- Create `services/eta-engine.js` to calculate arrival times
- Use GTFS-RT vehicle positions + static GTFS stop times
- Add `GET /api/v1/stops/:id/arrivals` endpoint
- Update StopDetailScreen to show real ETAs

**Files to create/modify:**
- `transit-track-backend/src/services/eta-engine.js` (NEW)
- `transit-track-backend/src/routes/api/stops.js` (modify — add arrivals endpoint)
- `transit-track-frontend/screens/StopDetailScreen.js` (modify — show real ETAs)

### 5. User Authentication UI (4 SP)
- Create `screens/LoginScreen.js` with email/password form
- Create `screens/RegisterScreen.js` with registration form
- Add auth navigation flow (redirect if not authenticated)
- Store JWT token with SecureStore

**Files to create/modify:**
- `transit-track-frontend/screens/LoginScreen.js` (NEW)
- `transit-track-frontend/screens/RegisterScreen.js` (NEW)
- `transit-track-frontend/services/auth.js` (NEW — token management)
- `transit-track-frontend/App.js` (modify — add auth navigator)

### 6. Favorites System (4 SP)
- Create `POST /api/v1/users/:id/favorites` endpoint
- Create `GET /api/v1/users/:id/favorites` endpoint
- Add favorite toggle in StopDetailScreen
- Create `screens/FavoritesScreen.js`

**Files to create/modify:**
- `transit-track-backend/src/routes/api/favorites.js` (NEW)
- `transit-track-backend/src/routes/index.js` (modify — mount favorites)
- `transit-track-frontend/screens/FavoritesScreen.js` (NEW)
- `transit-track-frontend/screens/StopDetailScreen.js` (modify — add favorite button)

### 7. Journey Planning (3 SP)
- Create `POST /api/v1/journey/plan` endpoint
- Basic routing using GTFS stop times + transfers
- Create `screens/JourneyPlanScreen.js`

**Files to create/modify:**
- `transit-track-backend/src/routes/api/journey.js` (NEW)
- `transit-track-frontend/screens/JourneyPlanScreen.js` (NEW)

---

## File Structure Changes

```
transit-track-backend/
├── src/
│   ├── routes/api/
│   │   ├── vehicles.js          (NEW - live bus positions)
│   │   ├── favorites.js         (NEW - user favorites)
│   │   └── journey.js           (NEW - journey planning)
│   ├── services/
│   │   ├── gtfs-rt.js          (NEW - GTFS-RT parser)
│   │   ├── eta-engine.js        (NEW - ETA calculations)
│   │   └── websocket.js         (NEW - WebSocket server)
│   └── models/
│       └── vehicle.js           (modify - add route association)
│
transit-track-frontend/
├── screens/
│   ├── LoginScreen.js          (NEW)
│   ├── RegisterScreen.js       (NEW)
│   ├── FavoritesScreen.js     (NEW)
│   ├── JourneyPlanScreen.js   (NEW)
│   ├── HomeScreen.js           (modify - live buses, search)
│   └── StopDetailScreen.js   (modify - real ETAs, favorites)
├── components/
│   └── StopSearchBar.js      (NEW)
└── services/
    ├── websocket.js            (NEW)
    └── auth.js                (NEW - token management)
```

---

## API Endpoints to Add

### Vehicles (New)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/vehicles` | GET | List all live vehicle positions |
| `/api/v1/vehicles/:routeId` | GET | Vehicles for specific route |

### Stops (Extended)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/stops/search?q=query` | GET | Search stops by name |
| `/api/v1/stops/:id/arrivals` | GET | Get arrivals with ETAs |

### Favorites (New)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/users/:id/favorites` | GET | List user's favorite stops |
| `/api/v1/users/:id/favorites` | POST | Add stop to favorites |
| `/api/v1/users/:id/favorites/:stopId` | DELETE | Remove from favorites |

### Journey (New)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/journey/plan` | POST | Plan journey between stops |

### Auth (Already Exists — Add UI)
- `POST /api/v1/auth/register` (exists)
- `POST /api/v1/auth/login` (exists)
- `GET /api/v1/auth/me` (exists)

---

## Updated API Response Shapes

### Vehicle (Live Position)
```json
{
  "id": 1,
  "gtfsVehicleId": "BUS-42A-001",
  "routeId": 1,
  "latitude": 37.78825,
  "longitude": -122.4324,
  "heading": 45,
  "recordedAt": "2026-05-01T12:34:56Z"
}
```

### Arrival (ETA)
```json
{
  "routeId": 1,
  "routeName": "42A",
  "destination": "City Centre",
  "etaMinutes": 3,
  "arrivalTime": "12:37 PM"
}
```

---

## Test Plan

### Backend
- GTFS-RT parser returns valid vehicle positions
- WebSocket broadcasts vehicle updates
- Stop search returns matching results
- ETA engine calculates accurate arrival times
- Favorites CRUD operations work
- Journey planner returns valid route

### Frontend
- Live bus markers appear and move on map
- Stop search shows autocomplete results
- Login/Register screens submit and store JWT
- StopDetailScreen shows real ETAs
- Favorite toggle updates backend and UI
- Journey plan screen shows route options

### CI Updates
- Add WebSocket test to backend smoke-check
- Add new endpoints to type-check
- Frontend: add auth flow smoke test

---

## Dependencies to Install

### Backend
- `socket.io` — WebSocket server
- `protobufjs` — GTFS-RT Protocol Buffer parsing

### Frontend
- `socket.io-client` — WebSocket client
- `@react-navigation/auth-flow` — Auth flow navigation
- `expo-secure-store` — JWT token storage
- `expo-location` — User location for nearby stops

---

## Risks & Mitigations

1. **GTFS-RT feed availability** — Use sample GTFS-RT data for dev, handle feed outages gracefully
2. **WebSocket scaling** — Start with single server, add Redis adapter later if needed
3. **ETA accuracy** — Use static schedule as fallback when live data unavailable
4. **Auth flow complexity** — Build incrementally, test each screen independently
5. **Map performance** — Limit visible markers, use region-based filtering

---

## Sprint 2 Completion Criteria

By end of Sprint 2, we should be able to:
1. Open app and see live bus positions moving on map
2. Search for a stop by name
3. View real-time ETAs for a stop
4. Register a new account and log in
5. Save/unsave favorite stops
6. Plan a basic journey between two stops
7. Receive push notification when bus is arriving
8. All new code covered by lint, type-check, and smoke tests
9. CI workflow passes with new endpoints

---

## Next Steps (Sprint 3+)
- Advanced journey planning (multiple routes, accessibility)
- User profile & settings
- Push notification preferences
- Stop crowding estimates
- Social features (share journey, meet friends)
- Offline mode with cached data
