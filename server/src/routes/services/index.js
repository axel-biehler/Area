const express = require('express');
const { authMiddleware } = require('../../authentication');

const router = express.Router();

router.post('/github/webhook', require('./github/webhook'));

router.use(authMiddleware);
router.post('/twitter/connect', require('./twitter/connect'));
router.post('/twitter/link', require('./twitter/link'));
router.get('/twitter/getProfile', require('./twitter/getProfile'));
router.get('/twitter/unlink', require('./twitter/unlink'));

router.post('/trello/connect', require('./trello/connect'));
router.post('/trello/link', require('./trello/link'));
router.get('/trello/getProfile', require('./trello/getProfile'));
router.get('/trello/unlink', require('./trello/unlink'));

router.post('/github/link', require('./github/link'));
router.get('/github/unlink', require('./github/unlink'));
router.get('/github/user', require('./github/getUserExample'));
router.get('/github/env', require('./github/env'));
router.get('/github/unlink', require('./github/unlink'));

router.post('/discord/link', require('./discord/link'));
router.get('/discord/unlink', require('./discord/unlink'));
router.get('/discord/env', require('./discord/env'));
router.get('/discord/get/categoryChannels', require('./discord/get/categoryChannels'));

module.exports = router;
