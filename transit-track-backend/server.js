const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./src/routes');
const { initFirebaseAdmin } = require('./src/services/firebase');

dotenv.config();

function createApp() {
  const app = express();
  const firebaseApp = initFirebaseAdmin();
  const frontendOrigin = process.env.FRONTEND_ORIGIN;

  app.use(
    cors(
      frontendOrigin
        ? {
            origin: frontendOrigin,
          }
        : undefined,
    ),
  );
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'TransitTrack API is running!' });
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      firebase: firebaseApp ? 'configured' : 'not_configured',
    });
  });

  app.use('/api/v1', apiRouter);

  return app;
}

function startServer() {
  const app = createApp();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  createApp,
  startServer,
};
