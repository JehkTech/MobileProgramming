const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic routes - these will be expanded in later sprints
router.get('/', (req, res) => {
  res.json({ message: 'TransitTrack API v1' });
});

module.exports = router;
