# Week 1 Execution Plan: TransitTrack Foundation & Setup

## Overview
This document outlines the execution plan for Week 1 (Sprint 1) of the TransitTrack masterplan. The goal is to establish the foundation so that any developer can run the app on a device and see a map screen.

## Sprint 1 Goals (from masterplan)
- **Story Points**: 28 SP
- **Goal**: Any dev can run the app on device and see a map screen

## Tasks to Complete
1. **Project bootstrap** — React Native + Expo setup, CI/CD pipeline
2. **Node.js API skeleton** with auth middleware (JWT)
3. **PostgreSQL schema**: users, routes, stops, vehicles
4. **Firebase push notification scaffolding**
5. **Map integration** (react-native-maps + Mapbox)
6. **Design system tokens** implemented in-app

## Detailed Execution Plan

### Phase 1: Project Bootstrap & Frontend Setup
1. Create React Native + Expo project
2. Set up basic project structure
3. Configure ESLint/Prettier
4. Set up Git repository with initial commit
5. Configure basic CI/CD (GitHub Actions placeholder)

### Phase 2: Backend Setup
1. Initialize Node.js/Express API project
2. Set up basic server structure
3. Implement JWT authentication middleware
4. Set up PostgreSQL connection
5. Create database schema migrations

### Phase 3: Infrastructure & Services
1. Set up Firebase project for push notifications
2. Install and configure react-native-maps
3. Set up Mapbox API access
4. Implement design system tokens (colors, typography, spacing)

### Phase 4: Integration & Verification
1. Connect frontend to basic API endpoints
2. Verify map renders with placeholder data
3. Test push notification setup
4. Verify authentication flow
5. Final verification: Run app on device/emulator showing map screen

## File Structure to Create
```
transit-track/
├── frontend/                 # React Native + Expo app
│   ├── App.js
│   ├── assets/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── theme/
│   └── utils/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── config/
│   ├── migrations/
│   ├── seeds/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── docs/
├── .github/
│   └── workflows/
├── .gitignore
├── README.md
└── package.json (root)
```

## Verification Criteria
By end of Week 1, we should be able to:
1. `npm start` in frontend directory and see Expo dev tools
2. Scan QR code with Expo Go app and see a basic screen
3. See a map rendered using react-native-maps/Mapbox
4. Have a running Node.js API server on localhost:PORT
5. Have PostgreSQL database with tables created
6. Have Firebase configured for push notifications (test mode)
7. See design system tokens being used in the UI

## Dependencies to Install
### Frontend (Expo)
- expo
- react-native
- react-native-maps
- @react-navigation/native
- @react-navigation/stack
- axios
- expo-font
- expo-splash-screen

### Backend
- express
- pg (PostgreSQL client)
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- firebase-admin
- sequelize (ORM) or knex (query builder)

## Time Allocation (Based on 28 SP)
- Project bootstrap: 4 SP
- Backend API skeleton: 6 SP
- Database schema: 4 SP
- Firebase setup: 3 SP
- Map integration: 5 SP
- Design system tokens: 3 SP
- Integration & testing: 4 SP

## Risks & Mitigations
1. **Expo compatibility issues** → Use managed workflow, avoid ejecting unless necessary
2. **Mapbox API key/setup** → Have backup plan to use MapKit/Google Maps if needed
3. **Firebase setup complexity** → Start with test credentials, move to production later
4. **Database connection issues** → Use Docker for local PostgreSQL setup
5. **Authentication middleware bugs** → Implement incrementally with testing

## Next Steps (After Week 1 Completion)
- Week 2: Bus location API, live tracking, stop search, ETA calculations
- Week 3: WebSocket real-time updates, user auth flows, favorites, journey planning
- etc. (as defined in masterplan)

---
*Plan created for execution starting: $(date)*
*Reference: TransitTrack Masterplan - Sprint 1: Foundation & Setup*