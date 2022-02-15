const express = require('express');
const { authMiddleware } = require('../../authentication');

const router = express.Router();
router.use(authMiddleware);
router.post('/twitter/connect', require('./twitter/connect'));
router.post('/twitter/link', require('./twitter/link'));
router.get('/twitter/getProfile', require('./twitter/getProfile'));

router.post('/trello/connect', require('./trello/connect'));
router.post('/trello/link', require('./trello/link'));
router.get('/trello/getProfile', require('./trello/getProfile'));

router.post('/github/validate', require('./github/validate'));
router.get('/github/user', require('./github/getUserExample'));
router.get('/github/env', require('./github/env'));
module.exports = router;
