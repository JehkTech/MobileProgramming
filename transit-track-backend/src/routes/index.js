const express = require('express');
const stopsRouter = require('./api/stops');
const authRouter = require('./api/auth');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.get('/', (req, res) => {
  res.json({ message: 'TransitTrack API v1' });
});

router.use('/stops', stopsRouter);
router.use('/auth', authRouter);

module.exports = router;
