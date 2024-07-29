// routes/compileRoutes.js
const express = require("express");
const router = express.Router();
const compileController = require("../controllers/compile.controller.js");

// Route to handle code compilation requests
router.post("/compile", compileController.compileCode);

module.exports = router;
