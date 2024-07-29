const mongoose = require("mongoose");

const testCaseSchema = mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  testCase: [testCaseSchema],
  constraints: { type: String, required: true },
});

module.exports = mongoose.model("Problem", problemSchema);
