const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  Title: {
    type: String,
    Required: true,
  },
  description: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  constraints: { type: String, required: true },
});

module.exports = mongoose.model('Problem', problemSchema);
