const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'TransitTrack API is running!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes will be mounted here
// app.use('/api/v1/stops', stopsRouter);
// app.use('/api/v1/routes', routesRouter);
// app.use('/api/v1/vehicles', vehiclesRouter);
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/alerts', alertsRouter);
// app.use('/api/v1/journeys', journeysRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
