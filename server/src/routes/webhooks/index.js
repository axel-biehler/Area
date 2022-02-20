const express = require('express');
const { authMiddleware } = require('../../authentication');

const router = express.Router();

router.use(authMiddleware);
router.post('/trello', require('./trello/trelloWebhooks'));

module.exports = router;
