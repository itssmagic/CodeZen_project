// In your backend (Express.js)

const express = require('express');
const router = express.Router();
const { submitCode } = require('../controllers/submission.controller.js');

// POST /api/submit
router.post('/', submitCode);

module.exports = router;
