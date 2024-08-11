// In your backend (Express.js)

const express = require('express');
const router = express.Router();
const { submitCode,getSubmissions } = require('../controllers/submission.controller.js');
const { authorizeUser } = require('../middleware/user.middleware.js');

// POST /api/submit
router.post('/submit', authorizeUser,submitCode);
router.get('/submissions', authorizeUser,getSubmissions)

module.exports = router;
