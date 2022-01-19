const express = require('express');

const router = express.Router();
router.get('/', require('./get'));
router.patch('/', require('./patch'));

module.exports = router;