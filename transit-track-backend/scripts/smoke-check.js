const http = require('http');
const jwt = require('jsonwebtoken');
const { createApp } = require('../server');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'smoke_secret';

function requestJson(baseUrl, path, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        headers,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => {
          raw += chunk;
        });
        res.on('end', () => {
          try {
            const body = raw ? JSON.parse(raw) : null;
            resolve({ status: res.statusCode, body });
          } catch {
            reject(new Error(`Invalid JSON response for ${path}: ${raw}`));
          }
        });
      },
    );

    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const app = createApp();
  const server = app.listen(0);

  await new Promise((resolve) => {
    server.on('listening', resolve);
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    const rootHealth = await requestJson(baseUrl, '/health');
    if (rootHealth.status !== 200 || rootHealth.body?.status !== 'OK') {
      throw new Error('GET /health failed');
    }

    const apiHealth = await requestJson(baseUrl, '/api/v1/health');
    if (apiHealth.status !== 200 || apiHealth.body?.status !== 'OK') {
      throw new Error('GET /api/v1/health failed');
    }

    const stops = await requestJson(baseUrl, '/api/v1/stops');
    if (stops.status !== 200 || !Array.isArray(stops.body) || stops.body.length < 1) {
      throw new Error('GET /api/v1/stops failed');
    }

    const firstStop = stops.body[0];
    const requiredFields = ['id', 'name', 'latitude', 'longitude'];
    for (const field of requiredFields) {
      if (!(field in firstStop)) {
        throw new Error(`Stop response missing ${field}`);
      }
    }

    const stopById = await requestJson(baseUrl, '/api/v1/stops/1');
    if (stopById.status !== 200 || stopById.body?.id !== 1) {
      throw new Error('GET /api/v1/stops/:id failed');
    }

    const noToken = await requestJson(baseUrl, '/api/v1/auth/me');
    if (noToken.status !== 401) {
      throw new Error('Expected 401 for /api/v1/auth/me without token');
    }

    const badToken = await requestJson(baseUrl, '/api/v1/auth/me', {
      Authorization: 'Bearer invalid.token.value',
    });
    if (badToken.status !== 403) {
      throw new Error('Expected 403 for /api/v1/auth/me with invalid token');
    }

    const token = jwt.sign(
      { id: 123, email: 'smoke@example.com' },
      process.env.JWT_SECRET,
      { expiresIn: '5m' },
    );

    const goodToken = await requestJson(baseUrl, '/api/v1/auth/me', {
      Authorization: `Bearer ${token}`,
    });
    if (goodToken.status !== 200 || goodToken.body?.user?.id !== 123) {
      throw new Error('Expected 200 for /api/v1/auth/me with valid token');
    }

    console.log('Backend smoke check passed');
  } finally {
    server.close();
  }
}

run().catch((_error) => {
  console.error(_error.message);
  process.exit(1);
});
