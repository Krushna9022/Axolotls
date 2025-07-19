const express = require('express');
const router = express.Router();
const decodeController = require('../controller/decodeController');

// GET /decode page
router.get('/decode', decodeController.getDecodePage);

// POST scanned data
router.post('/decode', decodeController.postDecode);

module.exports = router;
