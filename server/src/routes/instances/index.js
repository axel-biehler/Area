const express = require('express');

const router = express.Router();
router.post('/', require('./createInstance'));

module.exports = router;
