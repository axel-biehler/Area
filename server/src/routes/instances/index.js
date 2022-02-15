const express = require('express');
const { authMiddleware } = require('../../authentication');

const router = express.Router();
router.use(authMiddleware);

router.post('/', require('./createInstance'));

module.exports = router;
