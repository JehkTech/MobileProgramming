require('dotenv').config();

function resolveHost(value, fallback) {
  if (!value) {
    return fallback;
  }
  // Prefer IPv4 loopback for local dev to avoid "::1 refused" on Windows setups.
  return value === 'localhost' ? '127.0.0.1' : value;
}

function resolvePort(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "Jehoiachin",
    database: process.env.DB_NAME || "transit_track",
    host: resolveHost(process.env.DB_HOST, "127.0.0.1"),
    port: resolvePort(process.env.DB_PORT, 5454),
    dialect: "postgres"
  },
  test: {
    username: process.env.TEST_DB_USERNAME || null,
    password: process.env.TEST_DB_PASSWORD || null,
    database: process.env.TEST_DB_NAME || null,
    host: resolveHost(process.env.TEST_DB_HOST, "127.0.0.1"),
    port: resolvePort(process.env.TEST_DB_PORT, 5454),
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || null,
    host: resolveHost(process.env.DB_HOST, null),
    port: resolvePort(process.env.DB_PORT, 5432),
    dialect: "postgres"
  }
};
