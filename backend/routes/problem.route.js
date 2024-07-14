const express = require("express");
const app = express();
const router = express.Router();
const {
  createProblem,
  getProblem,
  updateProblem,
  deleteProblem,
  getAllProblem,
} = require("../controllers/problem.controller.js");

// creating a new problem
router.post("/", createProblem);

// fetching all problems
router.get("/", getAllProblem);

//fetching a particular problem by id
router.get("/:id", getProblem);

//update a problem
router.put("/:id", updateProblem);

//delete a problem
router.delete("/:id", deleteProblem);

module.exports = router;
