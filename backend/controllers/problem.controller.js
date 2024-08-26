const Problem = require("../models/problem.model.js");

// creating a new problem
const createProblem = async (req, res) => {
  try {
    console.log(req.body);
    const problem = await Problem.create(req.body);
    res.status(200).send(problem);
  } catch (error) {
    res.status(400).send("please fill all the fields");
  }
};

// fetching all problems
const getAllProblem = async (req, res) => {
  try {
    console.log("ALl problem");
    const problems = await Problem.find({});
    res.status(200).send(problems);
  } catch (error) {
    res.status(400).send("problems don't exist");
  }
};

//fetching a particular problem by id
const getProblem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const problem = await Problem.findById(id);
    res.status(200).send(problem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//update a problem
const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findByIdAndUpdate(id, req.body);
    if (!problem) {
      return res.status(400).send({ error: error.message });
    }
    const updatedProblem = await Problem.findById(id);
    res.status(200).send(updatedProblem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//delete a problem
const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findByIdAndDelete(id);
    res.status(200).send("problem deleted succesfully");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createProblem,
  getAllProblem,
  getProblem,
  updateProblem,
  deleteProblem,
};
