const express = require('express');
const router = express.Router();

// Get all stops (mock data)
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'High St / Market', latitude: 37.78825, longitude: -122.4324 },
    { id: 2, name: 'University Gate', latitude: 37.78945, longitude: -122.4301 }
  ]);
});

// Get stop by ID
router.get('/:id', (req, res) => {
  const stopId = req.params.id;
  res.json({ id: stopId, name: `Stop ${stopId}`, latitude: 0, longitude: 0 });
});

module.exports = router;
