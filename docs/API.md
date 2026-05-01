# TransitTrack API Documentation

Base URL: `http://localhost:5000/api/v1`

All endpoints return JSON responses. Protected endpoints require a valid JWT token in the Authorization header.

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are obtained via the login or register endpoints and must be included in subsequent requests to protected routes.

### Getting a Token

Register a new user or login with existing credentials to receive a JWT token:

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secure123", "firstName": "John", "lastName": "Doe"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secure123"}'
```

Response:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Using the Token

Include the token in the Authorization header for protected endpoints:

```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Endpoints

### Health Check

#### GET /health
Server-level health check.

**Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2026-05-01T12:00:00.000Z"
}
```

#### GET /api/v1/health
API v1 health check.

**Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2026-05-01T12:00:00.000Z"
}
```

---

### Stops

#### GET /api/v1/stops
List all transit stops.

**Authentication:** Not required

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Main St & 5th Ave",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  {
    "id": 2,
    "name": "Broadway & 42nd",
    "latitude": 40.7549,
    "longitude": -73.9840
  }
]
```

**Response (500):**
```json
{
  "error": "Failed to fetch stops"
}
```

#### GET /api/v1/stops/:id
Get a specific stop by ID.

**Authentication:** Not required

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Stop ID |

**Response (200):**
```json
{
  "id": 1,
  "name": "Main St & 5th Ave",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response (404):**
```json
{
  "error": "Stop not found"
}
```

**Response (500):**
```json
{
  "error": "Failed to fetch stop"
}
```

---

### Authentication Endpoints

#### POST /api/v1/auth/register
Register a new user account.

**Authentication:** Not required

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password (min 6 characters recommended) |
| `firstName` | string | No | User's first name |
| `lastName` | string | No | User's last name |

**Request Example:**
```json
{
  "email": "user@example.com",
  "password": "secure123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (400):**
```json
{
  "error": "Email and password required"
}
```

**Response (409):**
```json
{
  "error": "Email already registered"
}
```

**Response (500):**
```json
{
  "error": "Registration failed"
}
```

#### POST /api/v1/auth/login
Login with existing credentials.

**Authentication:** Not required

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |

**Request Example:**
```json
{
  "email": "user@example.com",
  "password": "secure123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (400):**
```json
{
  "error": "Email and password required"
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Response (500):**
```json
{
  "error": "Login failed"
}
```

#### GET /api/v1/auth/me
Get the currently authenticated user's information.

**Authentication:** Required (Bearer Token)

**Headers:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <jwt-token>` |

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Response (401):**
```json
{
  "error": "Access token required"
}
```

**Response (403):**
```json
{
  "error": "Invalid or expired token"
}
```

**Response (500):**
```json
{
  "error": "JWT secret is not configured"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Resource created successfully |
| 400 | Bad request (missing or invalid parameters) |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (invalid or expired token) |
| 404 | Resource not found |
| 409 | Conflict (e.g., email already registered) |
| 500 | Internal server error |

---

## Data Models

### Stop
| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `name` | string | Stop name |
| `latitude` | number | Latitude coordinate |
| `longitude` | number | Longitude coordinate |

### User
| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `email` | string | User's email address |
| `firstName` | string | User's first name |
| `lastName` | string | User's last name |

---

## Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | (required) |
| `DB_NAME` | Database name | `transit_track` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_PORT` | Database port | `5432` |
| `JWT_SECRET` | Secret for JWT signing | (required) |
| `JWT_EXPIRES_IN` | Token expiration time | `24h` |
| `FRONTEND_ORIGIN` | Allowed CORS origin | (optional) |
| `FIREBASE_PROJECT_ID` | Firebase project ID | (optional) |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | (optional) |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | (optional) |

---

## Rate Limiting

Currently, there is no rate limiting implemented. This will be added in a future sprint.

---

## Versioning

The API is versioned via the URL path (`/api/v1`). Future versions will be accessible at `/api/v2`, etc.

---

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:5000/health
curl http://localhost:5000/api/v1/health

# List stops
curl http://localhost:5000/api/v1/stops

# Get specific stop
curl http://localhost:5000/api/v1/stops/1

# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# Login and save token
TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}' | jq -r '.token')

# Get current user
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Using the smoke test

The backend includes a smoke test script that validates all endpoints:

```bash
cd transit-track-backend
npm run smoke
```

This runs `scripts/smoke-check.js` which tests:
- `/health` (200)
- `/api/v1/health` (200)
- `/api/v1/stops` (200)
- `/api/v1/stops/:id` (200)
- `/api/v1/auth/me` without token (401)
- `/api/v1/auth/me` with invalid token (403)
