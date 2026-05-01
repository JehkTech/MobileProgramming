const express = require('express');
const router = express.Router();
const db = require('../../../models');

function shapeStop(stop) {
  return {
    id: stop.id,
    name: stop.name,
    latitude: Number(stop.latitude),
    longitude: Number(stop.longitude),
  };
}

router.get('/', async (req, res) => {
  try {
    const stops = await db.Stop.findAll();
    res.json(stops.map(shapeStop));
  } catch {
    res.status(500).json({ error: 'Failed to fetch stops' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const stopId = Number(req.params.id);
    const stop = await db.Stop.findByPk(stopId);
    if (!stop) {
      return res.status(404).json({ error: 'Stop not found' });
    }
    res.json(shapeStop(stop));
  } catch {
    res.status(500).json({ error: 'Failed to fetch stop' });
  }
});

module.exports = router;
