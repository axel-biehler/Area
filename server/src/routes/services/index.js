const express = require('express');
const { authMiddleware } = require('../../authentication');

const router = express.Router();
router.use(authMiddleware);
router.post('/twitter/connect', require('./twitter/connect'));
router.post('/twitter/link', require('./twitter/link'));
router.get('/twitter/settings', require('./twitter/getSettingsExample'));

router.post('/github/validate', require('./github/validate'));
router.get('/github/user', require('./github/getUserExample'));

module.exports = router;
