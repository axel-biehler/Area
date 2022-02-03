const express = require('express');

const router = express.Router();
router.get('/twitter/connect', require('./twitter/connect'));
router.post('/twitter/link', require('./twitter/link'));
router.get('/twitter/settings', require('./twitter/getSettingsExample'));

module.exports = router;
